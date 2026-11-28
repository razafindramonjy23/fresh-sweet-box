"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
  /** Agrandissement à l'entrée dans l'écran (1.12 = +12 %). */
  from?: number;
};

/**
 * Zoom lié au défilement : l'image entre légèrement agrandie et se pose à sa
 * taille réelle en arrivant au milieu de l'écran, puis reprend un peu
 * d'ampleur en sortant.
 *
 * Pensé pour le mobile, où le zoom au survol n'existe pas : c'est le doigt
 * qui fait défiler qui anime la photo. Sur ordinateur les deux cohabitent —
 * ce composant agit sur `transform` de l'enveloppe, le survol sur `scale` de
 * l'image.
 *
 * Contrairement à <Parallax>, il reste actif sur téléphone : un `scale` sur
 * une seule couche ne coûte qu'une composition, pas un repeint.
 *
 * L'enveloppe doit être dans un parent en `overflow: hidden` : c'est lui qui
 * recadre l'agrandissement.
 */
export function ScrollZoom({ className, children, from = 1.12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduce ? [1, 1, 1] : [from, 1, 1 + (from - 1) / 2],
  );

  return (
    <m.div ref={ref} className={className} style={{ scale }}>
      {children}
    </m.div>
  );
}
