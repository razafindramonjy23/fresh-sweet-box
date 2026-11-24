"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

type Props = {
  className?: string;
  children?: ReactNode;
  /** Amplitude du décalage, en pixels. */
  distance?: number;
  /**
   * Largeur en dessous de laquelle l'effet est coupé.
   *
   * Sur un téléphone la parallaxe coûte cher (elle repeint à chaque image
   * sur un GPU modeste) et se voit à peine : les éléments y sont empilés,
   * donc tous décalés de la même façon. `0` la laisse active partout.
   */
  disableBelow?: number;
};

/**
 * Léger décalage au défilement.
 *
 * `MotionConfig reducedMotion` ne couvre pas les valeurs pilotées par le
 * défilement : la neutralisation est faite à la main ici.
 */
export function Parallax({
  className,
  children,
  distance = 20,
  disableBelow = 760,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const small = useMediaQuery(`(max-width: ${disableBelow}px)`);
  const off = reduce || (disableBelow > 0 && small);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    off ? [0, 0] : [distance, -distance],
  );

  return (
    <m.div ref={ref} className={className} style={{ y }}>
      {children}
    </m.div>
  );
}
