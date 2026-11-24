"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion";
import { BrandLoader } from "@/components/ui/BrandLoader";
import { SPLASH_KEY } from "@/lib/splash";

/**
 * Temps d'affichage avant le fondu.
 *
 * Deux animations doivent tenir dedans (toutes deux dans
 * `styles/components/brand-loader.css`) :
 *
 * - le nom est posé au bout de ~0,86 s (`--loader-letter-window` +
 *   `--loader-letter-duration`) ;
 * - le logo achève son tour à 1,8 s (`--loader-logo-duration`).
 *
 * 2,4 s laisse donc voir le tour en entier, puis une demi-seconde de calme
 * avec le logo posé et le nom lisible, avant que l'écran s'efface.
 *
 * C'est le prix à payer : chaque première visite attend d'autant. Baisser
 * cette valeur sous 1,8 s couperait la rotation en plein mouvement.
 */
const VISIBLE_MS = 2400;

/** Durée du fondu de sortie, en secondes. */
const FADE_OUT = 0.65;

/**
 * Écran d'ouverture : le nom de la marque pendant une seconde, puis fondu.
 *
 * Rendu dès le HTML initial (`visible` part à `true`) pour éviter que la page
 * apparaisse une fraction de seconde avant lui. Le contenu, lui, est déjà
 * dans le DOM sous l'écran : rien n'est différé pour les moteurs de recherche.
 * Si le système demande moins de mouvement, l'écran est retiré immédiatement.
 * Il ne s'affiche **qu'une fois par session** : au retour sur la page, le
 * script d'amorçage du layout le masque avant la première peinture.
 */
export function SplashScreen() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    /* Déjà vu dans cette session : on retire sans attendre. Le script
       d'amorçage du layout l'a de toute façon déjà masqué en CSS, donc
       rien ne clignote. */
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SPLASH_KEY) !== null;
      window.sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      /* Navigation privée ou stockage bloqué : l'écran s'affiche, c'est
         le comportement d'une première visite. */
    }

    const delay = seen || reduce ? 0 : VISIBLE_MS;
    const timer = window.setTimeout(() => setVisible(false), delay);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="brand-loader"
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: FADE_OUT, ease: EASE }}
        >
          <BrandLoader />
        </m.div>
      )}
    </AnimatePresence>
  );
}
