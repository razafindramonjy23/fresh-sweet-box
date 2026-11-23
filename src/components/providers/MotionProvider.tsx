"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE } from "@/components/motion/variants";

/**
 * Réglages d'animation partagés par toute l'application.
 *
 * `reducedMotion="user"` neutralise toutes les animations déclaratives si le
 * système le demande.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION, ease: EASE }}
    >
      {children}
    </MotionConfig>
  );
}
