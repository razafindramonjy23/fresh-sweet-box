"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Critter } from "@/components/ui/fuzzy-critter-footer";

/**
 * Ruban compact de petites créatures duveteuses (des « fruits ») qui
 * tombent et rebondissent le long du bas du pied de page, sous la ligne du
 * copyright. Purement décoratif (`aria-hidden`) — toute l'information
 * (contacts, horaires, liens, `#contact`) reste dans `SiteFooter`.
 *
 * Pas de mot géant ici : on veut un bandeau fin qui tient dans le pied de
 * page, pas une section à part. La hauteur est fixée en CSS (`.fsb-critters`)
 * et les créatures sont volontairement petites (`size`).
 *
 * `three` pèse lourd : on le charge donc
 *   1. uniquement côté client (`ssr: false`, voir `next/dynamic`), et
 *   2. seulement quand le pied de page approche de l'écran (sentinelle +
 *      IntersectionObserver), pour ne rien ajouter au bundle initial.
 */
const FuzzyCritterFooter = dynamic(
  () => import("@/components/ui/fuzzy-critter-footer"),
  { ssr: false },
);

/**
 * De vraies silhouettes de fruits (option 2), toujours en pelage duveteux.
 * Six teintes distinctes pour éviter les doublons : fraise (rouge), citron
 * (jaune), poire (vert), myrtille (bleu), pêche (pêche), raisin (violet).
 * Chaque paire est [racine, pointe] du pelage.
 */
const CRITTERS: Critter[] = [
  {
    shape: "strawberry",
    colors: ["#e23046", "#ff95a2"],
    eyes: "short",
    size: 0.6,
  },
  { shape: "lemon", colors: ["#e6bd1e", "#fff07f"], eyes: "pills", size: 0.58 },
  { shape: "pear", colors: ["#8fae34", "#dcec9c"], eyes: "big", size: 0.6 },
  {
    shape: "blueberry",
    colors: ["#3b5aa6", "#9fb6ec"],
    eyes: "short",
    size: 0.5,
  },
  { shape: "peach", colors: ["#f0a97a", "#ffd8c2"], eyes: "pills", size: 0.58 },
  {
    shape: "grape",
    colors: ["#7d4fa8", "#c7a8e6"],
    eyes: "dashes",
    size: 0.54,
  },
];

export function FooterCritters() {
  const sentinel = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || show) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      // on charge un peu en avance pour que la chute soit prête à l'arrivée
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show]);

  return (
    <div ref={sentinel} className="fsb-critter-band" aria-hidden="true">
      {show ? (
        <FuzzyCritterFooter
          wordmark=""
          name=""
          tagline=""
          columns={[]}
          legal={[]}
          copyright=""
          dropLabel=""
          critters={CRITTERS}
          className="fsb-critters"
        />
      ) : null}
    </div>
  );
}
