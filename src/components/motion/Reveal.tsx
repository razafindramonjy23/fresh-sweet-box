"use client";

import { DURATION, EASE, VIEWPORT } from "./variants";
import {
  MOTION_TAGS,
  type MotionBaseProps,
  type MotionExtraProps,
} from "./tags";

type Props = MotionBaseProps &
  MotionExtraProps & {
    delay?: number;
    /** Jouer tout de suite plutôt qu'à l'entrée dans le champ. */
    now?: boolean;
  };

/** Un élément seul qui apparaît : au défilement, ou tout de suite (`now`). */
export function Reveal({
  as = "div",
  className,
  children,
  delay = 0,
  now = false,
  ...rest
}: Props) {
  const Comp = MOTION_TAGS[as];
  const shown = {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE, delay },
  };

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 20 }}
      {...(now
        ? { animate: shown }
        : { whileInView: shown, viewport: VIEWPORT })}
      {...rest}
    >
      {children}
    </Comp>
  );
}
