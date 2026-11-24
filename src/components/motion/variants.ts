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

/**
 * Sens d'entrée d'un élément.
 *
 * Le choix n'est pas décoratif : une entrée latérale suggère que l'élément
 * vient d'ailleurs sur la page, une entrée verticale qu'il appartient à la
 * colonne en cours de lecture. `scale` est réservé aux images et aux
 * pastilles, `none` au texte long, qu'un déplacement rendrait pénible à lire.
 */
export type RevealFrom = "up" | "left" | "right" | "scale" | "none";

/** État de départ de chaque sens. L'arrivée remet toujours tout à zéro. */
const FROM: Record<RevealFrom, Record<string, number>> = {
  up: { opacity: 0, y: 20 },
  left: { opacity: 0, x: -30 },
  right: { opacity: 0, x: 30 },
  scale: { opacity: 0, scale: 0.94 },
  none: { opacity: 0 },
};

const TO: Record<RevealFrom, Record<string, number>> = {
  up: { opacity: 1, y: 0 },
  left: { opacity: 1, x: 0 },
  right: { opacity: 1, x: 0 },
  scale: { opacity: 1, scale: 1 },
  none: { opacity: 1 },
};

/**
 * Les variantes d'un sens donné, éventuellement décalées dans le temps.
 *
 * Le délai est intégré à la variante plutôt que posé en `transition` sur le
 * composant : une transition déclarée dans une variante l'emporte sur celle
 * du composant, et le délai serait silencieusement ignoré.
 */
export function revealVariants(from: RevealFrom = "up", delay = 0): Variants {
  return {
    hidden: FROM[from],
    shown: {
      ...TO[from],
      transition: { duration: DURATION, ease: EASE, delay },
    },
  };
}

/** Entrée par défaut : montée de 20 px en fondu. */
export const fadeUp: Variants = revealVariants("up");
