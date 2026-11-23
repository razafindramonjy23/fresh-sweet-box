"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion";
import { BrandLoader } from "@/components/ui/BrandLoader";

/**
 * Temps d'affichage avant le fondu.
 *
 * Le nom est entièrement posé au bout de ~0,86 s (`--loader-letter-window` +
 * `--loader-letter-duration` dans `styles/components/brand-loader.css`) :
 * une seconde laisse donc le temps de le lire avant que l'écran s'efface.
 */
const VISIBLE_MS = 1000;

/** Durée du fondu de sortie, en secondes. */
const FADE_OUT = 0.65;

/**
 * Écran d'ouverture : le nom de la marque pendant une seconde, puis fondu.
 *
 * Rendu dès le HTML initial (`visible` part à `true`) pour éviter que la page
 * apparaisse une fraction de seconde avant lui. Le contenu, lui, est déjà
 * dans le DOM sous l'écran : rien n'est différé pour les moteurs de recherche.
 * Si le système demande moins de mouvement, l'écran est retiré immédiatement.
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(
      () => setVisible(false),
      reduce ? 0 : VISIBLE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="brand-loader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: FADE_OUT, ease: EASE }}
        >
          <BrandLoader />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
