"use client";

import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";

/** Les balises que les primitives savent animer. */
export type Tag =
  | "div"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "ul"
  | "li"
  | "a"
  | "span"
  | "article"
  | "section"
  | "header"
  | "footer";

/**
 * Table figée au chargement du module : on anime l'élément lui-même plutôt
 * que d'ajouter une enveloppe, pour ne pas casser les sélecteurs enfants du
 * CSS.
 *
 * Les composants la lisent directement (`MOTION_TAGS[as]`) : la référence
 * reste identique d'un rendu à l'autre, React ne remonte donc jamais l'élément.
 */
const TAGS = {
  div: motion.div,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  ul: motion.ul,
  li: motion.li,
  a: motion.a,
  span: motion.span,
  article: motion.article,
  section: motion.section,
  header: motion.header,
  footer: motion.footer,
};

/*
 * Chaque entrée a le type de son élément (`motion.a` n'accepte pas les mêmes
 * props que `motion.div`). Les primitives exposent une seule signature, celle
 * de `motion.div` : la conversion est faite ici, une fois, plutôt qu'à chaque
 * appel.
 */
export const MOTION_TAGS = TAGS as unknown as Record<Tag, typeof motion.div>;

/** Props communes à toutes les primitives d'animation. */
export type MotionBaseProps = {
  as?: Tag;
  className?: string;
  children?: ReactNode;
};

/** Le reste des props de Framer Motion, passées telles quelles. */
export type MotionExtraProps = Omit<
  ComponentProps<typeof motion.div>,
  "children" | "className"
>;
