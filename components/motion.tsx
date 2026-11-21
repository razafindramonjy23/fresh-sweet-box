"use client";

import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, type ComponentProps, type ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Vocabulaire d'animation unique pour toute la page.

   Trois règles qui expliquent la forme de ce fichier :

   1. La cadence vient du conteneur (`staggerChildren`), jamais d'un délai
      calculé par enfant. Ajouter un élément dans une liste ne demande donc
      aucune renumérotation.
   2. Un enfant de <Stagger> ne porte pas d'`initial` : cela couperait
      l'héritage d'état depuis le conteneur et l'élément resterait invisible.
   3. Un élément n'anime qu'un seul `y`. Le cadre photo du hero a deux
      couches : <FloatIn> porte l'entrée et la lévitation, la rotation reste
      en CSS sur l'élément intérieur.

   `MotionProvider` pose `reducedMotion="user"` : tout ce fichier est neutralisé
   si le système demande moins d'animation. Les effets pilotés par le
   défilement ne passent pas par là et sont désactivés à la main.
--------------------------------------------------------------------------- */

// Tuple explicite : sans cela TypeScript le voit comme number[]
// et le refuse là où Framer Motion attend une courbe de Bézier.
const EASE: [number, number, number, number] = [0.22, 0.61, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.25 } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* Les balises utilisables : on anime l'élément lui-même plutôt que d'ajouter
   une enveloppe, pour ne pas casser les sélecteurs enfants du CSS. */
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

type Tag = keyof typeof TAGS;
type Base = { as?: Tag; className?: string; children?: ReactNode };
type Extra = Omit<ComponentProps<typeof motion.div>, "children" | "className">;

function pick(as: Tag) {
  return TAGS[as] as typeof motion.div;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.55, ease: EASE }}>
      {children}
    </MotionConfig>
  );
}

/** Un élément seul qui apparaît : au défilement, ou tout de suite (`now`). */
export function Reveal({
  as = "div",
  className,
  children,
  delay = 0,
  now = false,
  ...rest
}: Base & Extra & { delay?: number; now?: boolean }) {
  const Comp = pick(as);
  const shown = { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE, delay } };
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

/** Conteneur : donne la cadence à ses <StaggerItem>. */
export function Stagger({
  as = "div",
  className,
  children,
  delay = 0,
  gap = 0.08,
  now = false,
  ...rest
}: Base & Extra & { delay?: number; gap?: number; now?: boolean }) {
  const Comp = pick(as);
  const variants: Variants = {
    hidden: {},
    shown: { transition: { staggerChildren: gap, delayChildren: delay } },
  };
  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      {...(now ? { animate: "shown" } : { whileInView: "shown", viewport: VIEWPORT })}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Enfant d'un <Stagger>. `lift` ajoute le retour au survol et à l'appui. */
export function StaggerItem({
  as = "div",
  className,
  children,
  lift = false,
  ...rest
}: Base & Extra & { lift?: boolean }) {
  const Comp = pick(as);
  return (
    <Comp
      className={className}
      variants={fadeUp}
      {...(lift
        ? {
            whileHover: { y: -6 },
            whileTap: { scale: 0.99 },
            transition: { type: "spring" as const, stiffness: 320, damping: 26 },
          }
        : {})}
      {...rest}
    >
      {children}
    </Comp>
  );
}

/** Entrée en fondu/zoom puis lévitation lente et continue. */
export function FloatIn({
  as = "div",
  className,
  children,
  delay = 0,
  amplitude = 10,
  duration = 7,
  ...rest
}: Base & Extra & { delay?: number; amplitude?: number; duration?: number }) {
  const Comp = pick(as);
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

/** Léger décalage au défilement. Neutralisé si le système le demande. */
export function Parallax({
  className,
  children,
  distance = 20,
}: {
  className?: string;
  children?: ReactNode;
  distance?: number;
}) {
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
