"use client";

import { Fragment } from "react";
import { motion, type Variants } from "framer-motion";
import { EASE, VIEWPORT } from "./variants";

type Props = {
  /** Le texte à animer. Un mot = un élément de la cadence. */
  text: string;
  className?: string;
  /** Attente avant le premier mot. */
  delay?: number;
  /** Intervalle entre deux mots. */
  gap?: number;
  /** Jouer tout de suite plutôt qu'à l'entrée dans le champ. */
  now?: boolean;
};

const word: Variants = {
  hidden: { y: "105%" },
  shown: { y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Les mots montent un à un depuis sous la ligne.
 *
 * Chaque mot est un masque (`overflow: hidden`) qui contient le mot décalé
 * vers le bas : c'est la montée derrière ce masque qui donne l'effet, et non
 * un fondu. Réservé aux titres — sur du texte courant, l'effet retarde la
 * lecture sans rien apporter.
 *
 * `MotionConfig reducedMotion="user"` neutralise la montée : les mots sont
 * alors simplement en place.
 */
export function WordReveal({
  text,
  className,
  delay = 0,
  gap = 0.055,
  now = false,
}: Props) {
  const words = text.split(" ");
  const container: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: gap, delayChildren: delay } },
  };

  return (
    <motion.span
      className={className ? `word-reveal ${className}` : "word-reveal"}
      variants={container}
      initial="hidden"
      {...(now
        ? { animate: "shown" }
        : { whileInView: "shown", viewport: VIEWPORT })}
    >
      {words.map((value, index) => (
        <Fragment key={`${value}-${index}`}>
          <span className="word-reveal__mask">
            <motion.span className="word-reveal__word" variants={word}>
              {value}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
