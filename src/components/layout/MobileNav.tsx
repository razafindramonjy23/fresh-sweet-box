"use client";

import { AnimatePresence, m, type Variants } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

type Props = {
  /** Les liens, rendus côté serveur et passés tels quels. */
  children: ReactNode;
  /** Le bouton d'appel à l'action, entre les liens et le hamburger. */
  cta: ReactNode;
};

/* Le panneau mobile est un élément distinct de la barre de liens : il n'existe
   dans le DOM que lorsqu'il est ouvert, ce qui laisse AnimatePresence jouer la
   sortie. La barre de liens, elle, reste en place pour le grand écran. */
const panel: Variants = {
  hidden: { opacity: 0, y: -10, transition: { duration: 0.16 } },
  shown: { opacity: 1, y: 0, transition: { duration: 0.24 } },
};

/**
 * Seul îlot interactif de la page. Les liens arrivent en `children` depuis le
 * composant serveur : rien du contenu n'est reconstruit côté client.
 */
export function MobileNav({ children, cta }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <nav className="navlinks" aria-label="Navigation principale">
        {children}
      </nav>
      {cta}
      <button
        type="button"
        /* `size-11` = 44 px : le minimum recommandé pour une cible
           tactile. L'ancien bouton mesurait 42 px de large. */
        className="hidden size-11 cursor-pointer place-items-center rounded-xl border-0 bg-transparent text-[25px] leading-none text-deep max-[850px]:grid"
        aria-controls={open ? "menu-mobile" : undefined}
        aria-expanded={open}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        data-haptic="tap"
        data-press=""
        onClick={() => setOpen((value) => !value)}
      >
        <m.span
          aria-hidden="true"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.25 }}
        >
          {open ? "×" : "☰"}
        </m.span>
      </button>

      <AnimatePresence>
        {open && (
          <m.nav
            id="menu-mobile"
            className="menu-panel"
            aria-label="Navigation"
            variants={panel}
            initial="hidden"
            animate="shown"
            exit="hidden"
            onClick={() => setOpen(false)}
          >
            {children}
          </m.nav>
        )}
      </AnimatePresence>
    </>
  );
}
