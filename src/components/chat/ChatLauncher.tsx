"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

/**
 * Le bouton flottant qui ouvre l'assistant.
 *
 * Seul ce fichier est présent au chargement de la page ; le panneau et sa
 * logique n'arrivent qu'au premier clic. C'est la raison d'être de la
 * séparation en deux composants : le visiteur qui ne clique jamais ne
 * télécharge jamais la conversation.
 *
 * `ssr: false` : le panneau n'a rien à produire côté serveur, il n'existe
 * qu'après une interaction.
 */
const ChatPanel = dynamic(
  () => import("./ChatPanel").then((mod) => mod.ChatPanel),
  { ssr: false },
);

export function ChatLauncher() {
  const [open, setOpen] = useState(false);
  /* Une fois chargé, le panneau reste monté : fermer ne doit pas effacer la
     conversation. */
  const [loaded, setLoaded] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function toggle() {
    setLoaded(true);
    setOpen((value) => !value);
  }

  function close() {
    setOpen(false);
    /* Le focus revient sur le bouton : sans cela il retomberait en haut du
       document après la fermeture. */
    buttonRef.current?.focus();
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="chat-launcher"
        data-haptic="tap"
        data-press=""
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Fermer l'assistant" : "Poser une question"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 9 9 0 0 1-3.2-.6L4 21l1.3-4.1A8.2 8.2 0 0 1 4 11.5 8.4 8.4 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="chat-launcher__label">Une question&nbsp;?</span>
      </button>

      {loaded && <ChatPanel open={open} onClose={close} />}
    </>
  );
}
