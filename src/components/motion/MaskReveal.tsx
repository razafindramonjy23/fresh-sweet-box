"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, VIEWPORT } from "./variants";

type Props = {
  className?: string;
  children?: ReactNode;
  /** Côté par lequel le voile se retire. */
  from?: "left" | "bottom";
  duration?: number;
};

const CLOSED = {
  left: "inset(0 100% 0 0)",
  bottom: "inset(100% 0 0 0)",
} as const;

/**
 * L'image se découvre derrière un voile qui glisse, au lieu d'apparaître en
 * fondu.
 *
 * `clipPath` n'est pas une transformation : `MotionConfig` ne la neutralise
 * pas, la préférence système est donc lue ici à la main, comme dans
 * `Parallax`.
 */
export function MaskReveal({
  className,
  children,
  from = "left",
  duration = 0.9,
}: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ clipPath: CLOSED[from] }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
