"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * Fil d'avancement en haut de l'écran.
 *
 * Ce n'est pas un ornement : sur une page longue, il indique combien il
 * reste, ce qui donne une raison de continuer. Le ressort n'est posé que si
 * le système accepte le mouvement — sinon le fil suit le défilement sans
 * lissage, il reste informatif.
 */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });

  return (
    <motion.div
      className="scroll-progress"
      aria-hidden="true"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
