"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import { EASE } from "@/components/motion";

/** En dessous de ce défilement, l'en-tête reste toujours visible. */
const HIDE_AFTER = 180;
/** Amplitude ignorée : évite que l'en-tête clignote au moindre soubresaut. */
const NOISE = 6;

/**
 * En-tête collant qui s'efface quand on descend et revient quand on remonte.
 *
 * C'est le seul endroit de la page où l'appel à l'action reste atteignable
 * sans remonter : sur grand écran, c'est l'équivalent de la barre d'action
 * mobile.
 *
 * Sous `prefers-reduced-motion`, Framer neutralise la translation : l'en-tête
 * reste alors simplement collé en haut, ce qui est le comportement sûr.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const previous = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    const last = previous.current;
    previous.current = value;
    setScrolled(value > 8);

    if (value < HIDE_AFTER) {
      setHidden(false);
      return;
    }
    if (Math.abs(value - last) < NOISE) return;
    setHidden(value > last);
  });

  return (
    <motion.header
      className="nav-bar"
      data-scrolled={scrolled || undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      <div className="shell nav">{children}</div>
    </motion.header>
  );
}
