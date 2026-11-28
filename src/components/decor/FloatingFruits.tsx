"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type CSSProperties } from "react";

/* ---------------------------------------------------------------------------
   Fruits décoratifs qui flottent autour des titres de section.

   Deux mouvements superposés, sur deux nœuds différents pour ne jamais se
   disputer la même propriété :
   - l'enveloppe (Framer) glisse au défilement, chaque fruit à sa vitesse,
     ce qui crée de la profondeur ;
   - le SVG intérieur (CSS) se balance doucement en boucle.

   Purement décoratif : `aria-hidden`, aucune interaction, et le calque est
   derrière le contenu. Les fruits sont dessinés en SVG dans ce fichier :
   aucune image à télécharger.
--------------------------------------------------------------------------- */

/** Fruits frais et fruits secs : le mélange du comptoir. */
export type Fruit =
  "citrus" | "strawberry" | "leaf" | "berry" | "almond" | "cashew" | "raisin";

export type Floater = {
  fruit: Fruit;
  /** Position dans la section, en CSS (`"8%"`, `"-12px"`…). */
  top?: string;
  left?: string;
  right?: string;
  /** Taille en px sur mobile ; agrandie de 40 % au-delà de 760 px. */
  size: number;
  /** Vitesse au défilement : positif descend, négatif monte. */
  depth?: number;
  /** Inclinaison de départ, en degrés. */
  rotate?: number;
  /** Décalage de la boucle de balancement, en secondes. */
  delay?: number;
};

export function FloatingFruits({ items }: { items: Floater[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {items.map((item, index) => (
        <FloatingFruit key={index} {...item} />
      ))}
    </div>
  );
}

function FloatingFruit({
  fruit,
  top,
  left,
  right,
  size,
  depth = 40,
  rotate = 0,
  delay = 0,
}: Floater) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [depth, -depth],
  );

  return (
    <m.div
      ref={ref}
      className="floating-fruit"
      style={{
        y,
        top,
        left,
        right,
        /* Variables CSS : TypeScript ne les connaît pas, d'où la conversion
           limitée à ce seul objet. */
        ...({
          "--fruit-size": `${size}px`,
          "--fruit-rotate": `${rotate}deg`,
          "--fruit-delay": `${delay}s`,
        } as CSSProperties),
      }}
    >
      <FruitSvg fruit={fruit} />
    </m.div>
  );
}

function FruitSvg({ fruit }: { fruit: Fruit }) {
  switch (fruit) {
    case "citrus":
      return (
        <svg viewBox="0 0 64 64" focusable="false">
          <circle cx="32" cy="32" r="30" fill="#f2b45a" />
          <circle cx="32" cy="32" r="25" fill="#fff4d6" />
          <circle cx="32" cy="32" r="22" fill="#f8cf72" />
          {[0, 45, 90, 135].map((angle) => (
            <line
              key={angle}
              x1="32"
              y1="10"
              x2="32"
              y2="54"
              stroke="#fff4d6"
              strokeWidth="2.5"
              transform={`rotate(${angle} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="3.5" fill="#fff4d6" />
        </svg>
      );

    case "strawberry":
      return (
        <svg viewBox="0 0 64 64" focusable="false">
          <path
            d="M32 58C18 50 9 37 11 25c1.5-8 9-11 21-11s19.5 3 21 11c2 12-7 25-21 33Z"
            fill="var(--color-berry)"
          />
          {[
            [22, 26],
            [32, 24],
            [42, 26],
            [18, 35],
            [28, 34],
            [38, 34],
            [46, 35],
            [24, 43],
            [34, 43],
            [30, 51],
          ].map(([cx, cy]) => (
            <ellipse
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              rx="1.4"
              ry="2.1"
              fill="#ffe7a8"
            />
          ))}
          <path
            d="M32 17c-4-6-11-7-15-5 4 1 7 4 8 7-5-1-9 0-11 3 6 0 12-1 18-5 6 4 12 5 18 5-2-3-6-4-11-3 1-3 4-6 8-7-4-2-11-1-15 5Z"
            fill="var(--color-sage)"
          />
        </svg>
      );

    case "leaf":
      return (
        <svg viewBox="0 0 64 64" focusable="false">
          <path
            d="M8 56C8 28 26 9 56 8c0 30-19 48-48 48Z"
            fill="var(--color-sage)"
          />
          <path
            d="M10 54 50 14M24 40l-2-12M32 32l-1-12M24 40l12 1M32 32l11 1"
            stroke="var(--color-leaf)"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case "almond":
      return (
        <svg viewBox="0 0 64 64" focusable="false">
          <path
            d="M32 5c13 10 20 27 15 42-3 9-9 12-15 12s-12-3-15-12C12 32 19 15 32 5Z"
            fill="#c48a57"
          />
          {/* Stries de la peau, en arcs qui suivent la forme. */}
          <path
            d="M32 12c-6 9-8 22-5 38M37 15c2 10 2 22-1 34M26 18c-4 9-5 19-2 28"
            stroke="#a46d40"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M30 10c-5 6-8 12-9 18"
            stroke="#e2b58a"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case "cashew":
      return (
        <svg viewBox="0 0 64 64" focusable="false">
          {/* Croissant : le dos bombé à gauche, le creux à droite. */}
          <path
            d="M40 8c-14-2-27 8-29 22-2 14 7 26 20 28 9 1 17-4 19-11 1-5-3-9-8-8-4 1-6 4-10 3-6-1-9-7-8-13 1-7 7-11 13-11 5 0 9-3 8-6-1-2-3-3-5-4Z"
            fill="#efd09c"
          />
          <path
            d="M18 26c-1 10 4 20 13 24"
            stroke="#d6ad72"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M24 16c3-3 7-4 11-4"
            stroke="#fbe8c6"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case "raisin":
      return (
        <svg viewBox="0 0 64 64" focusable="false">
          <path
            d="M19 17c7-7 19-8 26-2 8 5 10 16 7 24-3 10-13 15-22 14-10-1-16-9-17-18-1-7 1-13 6-18Z"
            fill="#6b3049"
          />
          {/* Rides du fruit séché. */}
          <path
            d="M22 24c5 3 9 2 13-1M18 35c6 1 10 5 12 11M36 30c4 4 9 5 13 3M33 41c3 2 7 2 10 0"
            stroke="#8f4c69"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="27" cy="20" r="2.4" fill="#fff" opacity="0.35" />
        </svg>
      );

    case "berry":
      return (
        <svg viewBox="0 0 64 64" focusable="false">
          {[
            [24, 26],
            [40, 26],
            [32, 38],
            [20, 40],
            [44, 40],
            [32, 50],
          ].map(([cx, cy]) => (
            <circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="9"
              fill="var(--color-berry-ink)"
            />
          ))}
          {[
            [21, 23],
            [37, 23],
            [29, 35],
          ].map(([cx, cy]) => (
            <circle
              key={`h-${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r="2.4"
              fill="#fff"
              opacity="0.55"
            />
          ))}
          <path
            d="M32 17c-3-5-8-7-12-6 3 2 6 4 7 7M32 17c3-5 8-7 12-6-3 2-6 4-7 7"
            stroke="var(--color-sage)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );
  }
}
