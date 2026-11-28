"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PHONE, SITE } from "@/content";
import { CHAT } from "@/lib/chat/config";
import { haptic } from "@/lib/haptics";
import type { ChatMessage } from "@/types";

/**
 * Le panneau de conversation.
 *
 * Chargé en différé par `ChatLauncher`, au premier clic seulement : tout le
 * poids de ce fichier reste hors du chargement initial de la page.
 *
 * Une fois monté il ne se démonte plus — fermer le panneau le fait sortir en
 * animation mais conserve l'historique, pour qu'un visiteur qui le rouvre
 * retrouve sa conversation.
 */

const GREETING =
  "Bonjour ! Posez-moi vos questions sur nos salades, nos jus et nos desserts.";

/** Repli quand l'assistant ne répond pas : jamais une erreur technique. */
const FALLBACK = `Je ne peux pas répondre pour le moment — appelez-nous au ${PHONE.display}, on vous renseigne tout de suite.`;

/** Quota de questions atteint (limitation de débit). */
const THROTTLED = `J'ai besoin d'une petite pause. Pour une réponse immédiate, appelez le ${PHONE.display}.`;

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ChatPanel({ open, onClose }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", text: GREETING },
  ]);
  /** Réponse en cours de réception, affichée au fur et à mesure. */
  const [streaming, setStreaming] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  /* À l'ouverture : le curseur dans le champ, et Échap pour fermer. */
  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  /* Garde la dernière réponse visible, y compris pendant qu'elle s'écrit. */
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [messages, streaming, notice]);

  async function send(event: React.FormEvent) {
    event.preventDefault();

    const question = draft.trim();
    if (!question || busy) return;

    const history: ChatMessage[] = [
      ...messages,
      { role: "user", text: question },
    ];

    setMessages(history);
    setDraft("");
    setNotice(null);
    setStreaming("");
    setBusy(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        /* Le message d'accueil est écrit par le site, pas par le modèle :
           il ne fait pas partie de la conversation qu'on lui renvoie. */
        body: JSON.stringify({ messages: history.slice(1) }),
      });

      if (response.status === 429) {
        setNotice(THROTTLED);
        return;
      }
      if (!response.ok || !response.body) {
        throw new Error(`réponse ${response.status}`);
      }

      /* Lecture du flux : le texte s'affiche à mesure qu'il arrive, au lieu
         d'un écran figé pendant plusieurs secondes. */
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        /* `stream: true` : un caractère accentué peut être coupé entre deux
           fragments réseau. */
        answer += decoder.decode(value, { stream: true });
        setStreaming(answer);
      }
      answer += decoder.decode();

      const complete = answer.trim();
      if (!complete) throw new Error("réponse vide");

      setMessages([...history, { role: "assistant", text: complete }]);
      /* La réponse est arrivée : le geste d'envoi date de quelques secondes,
         le navigateur peut donc refuser de vibrer — sans conséquence. */
      haptic("success");
    } catch (error) {
      console.error("[chat]", error);
      setNotice(FALLBACK);
    } finally {
      setStreaming(null);
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <m.section
          id="chat-panel"
          className="chat-panel"
          role="dialog"
          aria-label={`Assistant de ${SITE.name}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22 }}
        >
          <header className="chat-panel__head">
            <p className="chat-panel__title">Une question&nbsp;?</p>
            <button
              type="button"
              className="chat-panel__close"
              onClick={onClose}
              aria-label="Fermer la conversation"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div className="chat-panel__log" ref={logRef} aria-live="polite">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`chat-bubble chat-bubble--${message.role}`}
              >
                {message.text}
              </p>
            ))}

            {streaming !== null && (
              <p className="chat-bubble chat-bubble--assistant">
                {streaming || (
                  <span
                    className="chat-bubble__wait"
                    aria-label="Réponse en cours"
                  >
                    …
                  </span>
                )}
              </p>
            )}

            {notice && <p className="chat-panel__notice">{notice}</p>}
          </div>

          <form className="chat-panel__form" onSubmit={send}>
            <label className="chat-panel__label" htmlFor="chat-question">
              Votre question
            </label>
            <input
              id="chat-question"
              ref={inputRef}
              className="chat-panel__input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Vous avez des jus de mangue&nbsp;?"
              maxLength={CHAT.maxQuestionLength}
              autoComplete="off"
              disabled={busy}
            />
            <button
              type="submit"
              className="chat-panel__send"
              data-haptic="tap"
              data-press=""
              disabled={busy || draft.trim().length === 0}
              aria-label="Envoyer"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path
                  d="M4 12h14M12 5l7 7-7 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>

          <p className="chat-panel__foot">
            Réponses automatiques. Pour une commande&nbsp;:{" "}
            <a href={PHONE.href}>{PHONE.display}</a>
          </p>
        </m.section>
      )}
    </AnimatePresence>
  );
}
