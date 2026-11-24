"use client";

import { revealVariants, type RevealFrom } from "./variants";
import {
  MOTION_TAGS,
  type MotionBaseProps,
  type MotionExtraProps,
} from "./tags";

type Props = MotionBaseProps &
  MotionExtraProps & {
    /** Sens d'entrée : `up` (défaut), `left`, `right`, `scale` ou `none`. */
    from?: RevealFrom;
    /** Ajoute le retour au survol et à l'appui. */
    lift?: boolean;
  };

/** Enfant d'un <Stagger> : hérite de l'état du conteneur, jamais d'`initial`. */
export function StaggerItem({
  as = "div",
  className,
  children,
  from = "up",
  lift = false,
  ...rest
}: Props) {
  const Comp = MOTION_TAGS[as];

  return (
    <Comp
      className={className}
      variants={revealVariants(from)}
      {...(lift
        ? {
            whileHover: { y: -6 },
            whileTap: { scale: 0.99 },
            transition: {
              type: "spring" as const,
              stiffness: 320,
              damping: 26,
            },
          }
        : {})}
      {...rest}
    >
      {children}
    </Comp>
  );
}
