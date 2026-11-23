"use client";

import { EASE } from "./variants";
import {
  MOTION_TAGS,
  type MotionBaseProps,
  type MotionExtraProps,
} from "./tags";

type Props = MotionBaseProps &
  MotionExtraProps & {
    delay?: number;
    /** Amplitude de la lévitation, en pixels. */
    amplitude?: number;
    /** Durée d'un aller-retour, en secondes. */
    duration?: number;
  };

/** Entrée en fondu/zoom puis lévitation lente et continue. */
export function FloatIn({
  as = "div",
  className,
  children,
  delay = 0,
  amplitude = 10,
  duration = 7,
  ...rest
}: Props) {
  const Comp = MOTION_TAGS[as];

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1, y: [0, -amplitude, 0] }}
      transition={{
        opacity: { duration: 0.7, ease: EASE, delay },
        scale: { duration: 0.7, ease: EASE, delay },
        y: {
          duration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + 0.7,
        },
      }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
