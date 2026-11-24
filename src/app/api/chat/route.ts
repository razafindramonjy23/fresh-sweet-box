import { GoogleGenAI } from "@google/genai";
import { CHAT } from "@/lib/chat/config";
import { buildSystemInstruction } from "@/lib/chat/prompt";
import { checkRateLimit, getClientIp } from "@/lib/chat/rate-limit";
import type { ChatMessage } from "@/types";

/**
 * L'assistant du site, côté serveur.
 *
 * Cette route existe pour une seule raison : la clé de l'API ne doit jamais
 * quitter le serveur. Le widget parle à `/api/chat`, et c'est `/api/chat`
 * qui parle à Gemini.
 *
 * Elle est sans état — une fonction serverless ne se souvient de rien d'une
 * requête à l'autre. L'historique est donc envoyé par le navigateur à chaque
 * question, et `store: false` demande à Google de ne rien conserver de son
 * côté non plus.
 *
 * La réponse est diffusée en flux de texte brut (et non en SSE) : le widget
 * n'a besoin que du texte, et le lire avec un `TextDecoder` tient en dix
 * lignes.
 */

/* Les routes `route.ts` ne sont pas mises en cache, et une requête POST ne
   l'est jamais — rien à déclarer de ce côté. Seule la durée est bornée. */
export const maxDuration = 30;

/** Réponse d'erreur, dans la forme que le widget sait afficher. */
function fail(status: number, reason: string) {
  return Response.json({ error: reason }, { status });
}

/**
 * Validation de l'entrée.
 *
 * L'endpoint est public : tout ce qui arrive est suspect. On vérifie la
 * forme, on borne les longueurs, et on exige que le dernier tour soit une
 * question du visiteur — sans quoi la requête n'a pas de sens.
 */
function parseMessages(payload: unknown): ChatMessage[] | null {
  if (typeof payload !== "object" || payload === null) return null;

  const { messages } = payload as { messages?: unknown };
  if (!Array.isArray(messages) || messages.length === 0) return null;
  if (messages.length > 2 * CHAT.maxHistoryTurns + 1) return null;

  const parsed: ChatMessage[] = [];

  for (const entry of messages) {
    if (typeof entry !== "object" || entry === null) return null;
    const { role, text } = entry as { role?: unknown; text?: unknown };

    if (role !== "user" && role !== "assistant") return null;
    if (typeof text !== "string") return null;

    const trimmed = text.trim();
    if (trimmed.length === 0) return null;
    if (trimmed.length > CHAT.maxQuestionLength) return null;

    parsed.push({ role, text: trimmed });
  }

  if (parsed[parsed.length - 1].role !== "user") return null;

  return parsed;
}

/**
 * L'historique au format attendu par l'API Interactions : une suite d'étapes
 * typées, et non une liste de messages avec un rôle.
 */
function toSteps(messages: ChatMessage[]) {
  return messages.slice(-(2 * CHAT.maxHistoryTurns)).map((message) =>
    message.role === "user"
      ? {
          type: "user_input" as const,
          content: [{ type: "text" as const, text: message.text }],
        }
      : {
          type: "model_output" as const,
          content: [{ type: "text" as const, text: message.text }],
        },
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[chat] GEMINI_API_KEY absente : la route est inopérante");
    return fail(503, "indisponible");
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return fail(400, "requête illisible");
  }

  const messages = parseMessages(payload);
  if (!messages) return fail(400, "requête invalide");

  const verdict = await checkRateLimit(getClientIp(request));
  if (!verdict.allowed) return fail(429, "trop de questions");
  if (!verdict.configured) {
    console.warn(
      "[chat] aucune limitation de débit configurée " +
        "(UPSTASH_REDIS_REST_URL / _TOKEN) : le quota de l'API est exposé",
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  /*
   * Tout l'appel tient dans un seul `try` : si Gemini refuse la requête,
   * aucun octet n'est encore parti et on peut répondre par un vrai code
   * d'erreur. Une fois le flux ouvert, les en-têtes sont envoyés et il est
   * trop tard — d'où la gestion d'erreur séparée dans `start()`.
   */
  try {
    const stream = await ai.interactions.create({
      model: CHAT.model,
      /* Rien n'est conservé chez Google : la conversation d'un client ne
         survit pas à sa visite. */
      store: false,
      stream: true,
      /* L'instruction système n'est pas reportée d'un tour à l'autre par
         l'API : elle se renvoie à chaque requête. */
      system_instruction: buildSystemInstruction(),
      input: toSteps(messages),
      generation_config: {
        thinking_level: CHAT.thinkingLevel,
        max_output_tokens: CHAT.maxOutputTokens,
      },
    });

    const encoder = new TextEncoder();

    const body = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for await (const event of stream) {
            /* La documentation demande d'ignorer poliment les types
               d'événements inconnus : seuls les fragments de texte nous
               intéressent. */
            if (
              event.event_type === "step.delta" &&
              event.delta.type === "text"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
              continue;
            }
            if (event.event_type === "error") {
              console.error("[chat] erreur signalée dans le flux", event);
              break;
            }
          }
        } catch (error) {
          /* Flux coupé en cours de route : on ferme proprement. Le visiteur
             garde le texte déjà reçu, et le widget affiche son repli si rien
             n'est arrivé. */
          console.error("[chat] flux interrompu", error);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(body, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        /* Décourage la mise en tampon par un relais : sans cela, le flux
           arriverait d'un bloc et le mot-à-mot serait perdu. */
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("[chat] appel à Gemini refusé", error);
    return fail(502, "assistant momentanément indisponible");
  }
}
