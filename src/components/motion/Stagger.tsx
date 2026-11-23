"use client";

import type { Variants } from "framer-motion";
import { VIEWPORT } from "./variants";
import {
  MOTION_TAGS,
  type MotionBaseProps,
  type MotionExtraProps,
} from "./tags";

type Props = MotionBaseProps &
  MotionExtraProps & {
    /** Attente avant le premier enfant. */
    delay?: number;
    /** Intervalle entre deux enfants. */
    gap?: number;
    now?: boolean;
  };

/** Conteneur : donne la cadence à ses <StaggerItem>. */
export function Stagger({
  as = "div",
  className,
  children,
  delay = 0,
  gap = 0.08,
  now = false,
  ...rest
}: Props) {
  const Comp = MOTION_TAGS[as];
  const variants: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: gap, delayChildren: delay } },
  };

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      {...(now
        ? { animate: "shown" }
        : { whileInView: "shown", viewport: VIEWPORT })}
      {...rest}
    >
      {children}
    </Comp>
  );
}
