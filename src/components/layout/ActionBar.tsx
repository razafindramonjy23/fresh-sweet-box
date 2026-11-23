"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import { ContactIcon } from "@/components/ui/ContactIcon";
import { QUICK_ACTIONS } from "@/content";

/** Hauteur de défilement à partir de laquelle la barre apparaît. */
const SHOW_AFTER = 420;

/**
 * Barre d'action fixe, mobile uniquement (masquée au-delà de 850 px par le
 * CSS, où les mêmes liens sont déjà visibles dans l'en-tête et le pied de
 * page).
 *
 * Elle n'apparaît qu'une fois le hero passé : tant que les boutons du hero
 * sont à l'écran, elle ferait doublon.
 */
export function ActionBar() {
  const [shown, setShown] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    setShown(value > SHOW_AFTER);
  });

  return (
    <AnimatePresence>
      {shown && (
        <motion.nav
          className="action-bar"
          aria-label="Nous contacter"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3 }}
        >
          {QUICK_ACTIONS.map((action) => (
            <a
              key={action.label}
              className="action-bar__item"
              href={action.href}
              {...(action.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <ContactIcon name={action.icon} />
              {action.label}
            </a>
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
