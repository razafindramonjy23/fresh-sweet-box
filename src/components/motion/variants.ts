import type { Variants } from "framer-motion";

/* ---------------------------------------------------------------------------
   Vocabulaire d'animation unique pour toute la page.

   Trois règles qui expliquent la forme de ce dossier :

   1. La cadence vient du conteneur (`staggerChildren`), jamais d'un délai
      calculé par enfant. Ajouter un élément dans une liste ne demande donc
      aucune renumérotation.
   2. Un enfant de <Stagger> ne porte pas d'`initial` : cela couperait
      l'héritage d'état depuis le conteneur et l'élément resterait invisible.
   3. Un élément n'anime qu'un seul `y`. Le cadre photo du hero a deux
      couches : <FloatIn> porte l'entrée et la lévitation, la rotation reste
      en CSS sur l'élément intérieur.

   `MotionProvider` pose `reducedMotion="user"` : tout ce dossier est
   neutralisé si le système demande moins d'animation. Les effets pilotés par
   le défilement ne passent pas par là et sont désactivés à la main.
--------------------------------------------------------------------------- */

/**
 * Courbe partagée par toutes les entrées.
 *
 * Tuple explicite : sans cela TypeScript le voit comme `number[]` et le refuse
 * là où Framer Motion attend une courbe de Bézier.
 */
export const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

/** Durée de référence d'une entrée. */
export const DURATION = 0.55;

/** Déclenchement au défilement : une seule fois, au quart visible. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
};
