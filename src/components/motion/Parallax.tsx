"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
  /** Amplitude du décalage, en pixels. */
  distance?: number;
};

/**
 * Léger décalage au défilement.
 *
 * `MotionConfig reducedMotion` ne couvre pas les valeurs pilotées par le
 * défilement : la neutralisation est faite à la main ici.
 */
export function Parallax({ className, children, distance = 20 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance, -distance],
  );

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
