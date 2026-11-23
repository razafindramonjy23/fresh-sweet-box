"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, VIEWPORT } from "./variants";

type Props = {
  className?: string;
  children?: ReactNode;
  /** Sens dans lequel l'image se découvre. */
  from?: "left" | "bottom";
  duration?: number;
};

/* Le voile sort par le côté opposé à celui par lequel on découvre l'image.
   101 % plutôt que 100 % : évite un liseré d'un pixel en fin de course sur
   les écrans à densité fractionnaire. */
const EXIT = {
  left: { x: "101%" },
  bottom: { y: "-101%" },
} as const;

/**
 * L'image se découvre derrière un voile qui glisse, au lieu d'apparaître en
 * fondu.
 *
 * Le voile est un élément réel animé en `transform`, et non un `clip-path` :
 * **Framer Motion n'anime pas `clip-path: inset(...)`** — il laisse la valeur
 * initiale en place et l'image ne réapparaît jamais. Une translation est par
 * ailleurs composée par le GPU, donc moins coûteuse.
 *
 * Le conteneur doit rogner son contenu : `.mask-reveal` s'en charge, mais la
 * classe passée par l'appelant peut le faire aussi (c'est le cas de
 * `.story-photo`).
 *
 * Sous `prefers-reduced-motion`, le voile **n'est pas rendu du tout** : s'il
 * l'était, Framer neutraliserait sa translation et il resterait en place,
 * masquant l'image pour de bon.
 */
export function MaskReveal({
  className,
  children,
  from = "left",
  duration = 0.9,
}: Props) {
  const reduce = useReducedMotion();
  const classes = className ? `mask-reveal ${className}` : "mask-reveal";

  if (reduce) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <div className={classes}>
      {children}
      <m.span
        className="mask-reveal__curtain"
        aria-hidden="true"
        initial={{ x: "0%", y: "0%" }}
        whileInView={EXIT[from]}
        viewport={VIEWPORT}
        transition={{ duration, ease: EASE }}
      />
    </div>
  );
}
