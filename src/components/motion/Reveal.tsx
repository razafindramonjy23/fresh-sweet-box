"use client";

import { revealVariants, VIEWPORT, type RevealFrom } from "./variants";
import {
  MOTION_TAGS,
  type MotionBaseProps,
  type MotionExtraProps,
} from "./tags";

type Props = MotionBaseProps &
  MotionExtraProps & {
    delay?: number;
    /** Sens d'entrée : `up` (défaut), `left`, `right`, `scale` ou `none`. */
    from?: RevealFrom;
    /** Jouer tout de suite plutôt qu'à l'entrée dans le champ. */
    now?: boolean;
  };

/** Un élément seul qui apparaît : au défilement, ou tout de suite (`now`). */
export function Reveal({
  as = "div",
  className,
  children,
  delay = 0,
  from = "up",
  now = false,
  ...rest
}: Props) {
  const Comp = MOTION_TAGS[as];

  return (
    <Comp
      className={className}
      variants={revealVariants(from, delay)}
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
