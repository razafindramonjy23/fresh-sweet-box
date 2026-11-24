import { CHAT } from "./config";

/**
 * Limitation de débit par adresse IP, via l'API REST d'Upstash Redis.
 *
 * Pourquoi Redis et pas un simple compteur en mémoire : sur Vercel, chaque
 * requête peut tomber sur une instance différente, et les instances
 * redémarrent à froid. Un compteur dans une `Map` serait remis à zéro en
 * permanence — une protection en trompe-l'œil.
 *
 * Pourquoi l'API REST et pas le paquet `@upstash/ratelimit` : deux appels
 * `fetch` suffisent et n'ajoutent aucune dépendance au projet.
 */

const REST_URL = process.env.UPSTASH_REDIS_REST_URL;
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

export type RateLimitVerdict = {
  /** `false` : la requête doit être refusée (429). */
  allowed: boolean;
  /** `false` : aucune base configurée, donc aucune protection active. */
  configured: boolean;
};

/**
 * L'adresse du visiteur, telle que Vercel la transmet.
 *
 * `x-forwarded-for` peut contenir une chaîne de relais : la première entrée
 * est le client d'origine.
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") ?? "inconnue";
}

export async function checkRateLimit(ip: string): Promise<RateLimitVerdict> {
  if (!REST_URL || !REST_TOKEN) {
    return { allowed: true, configured: false };
  }

  const key = `fsb:chat:${ip}`;

  try {
    /*
     * `INCR` puis `EXPIRE … NX` : le délai n'est posé qu'au premier appel de
     * la fenêtre, sinon chaque question repousserait l'expiration et la
     * limite ne tomberait jamais.
     */
    const response = await fetch(`${REST_URL}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${REST_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, String(CHAT.rateLimit.windowSeconds), "NX"],
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `[chat] Upstash a répondu ${response.status} : limitation inopérante`,
      );
      return { allowed: true, configured: true };
    }

    const results = (await response.json()) as Array<{ result?: number }>;
    const count = results[0]?.result ?? 0;

    return { allowed: count <= CHAT.rateLimit.max, configured: true };
  } catch (error) {
    /*
     * Choix assumé : en cas de panne de Redis on laisse passer. Un incident
     * sur le compteur ne doit pas couper le chat ; l'inverse rendrait le
     * widget dépendant d'un second service pour fonctionner.
     */
    console.error("[chat] limitation de débit indisponible", error);
    return { allowed: true, configured: true };
  }
}
