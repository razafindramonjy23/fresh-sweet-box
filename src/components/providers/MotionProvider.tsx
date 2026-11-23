"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/components/motion/variants";

/**
 * Réglages d'animation partagés par toute l'application.
 *
 * `reducedMotion="user"` neutralise toutes les animations déclaratives si le
 * système le demande.
 *
 * `LazyMotion` ne charge que le jeu de fonctions réellement utilisé
 * (`domAnimation` : animations, variantes, sortie, survol, appui, entrée
 * dans le champ) au lieu du moteur complet. Les composants doivent alors
 * s'écrire `m.div` et non `motion.div` ; `strict` fait échouer tout oubli
 * au lieu de le laisser recharger le moteur entier en silence.
 *
 * Non inclus, et non utilisés par la page : les animations de mise en page
 * et le glisser-déposer.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: DURATION, ease: EASE }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
