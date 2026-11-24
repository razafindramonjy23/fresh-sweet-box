"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import type { Critter } from "@/components/ui/fuzzy-critter-footer";

/**
 * Ruban compact de petites créatures duveteuses (des « fruits ») qui
 * tombent et rebondissent le long du bas du pied de page, sous la ligne du
 * copyright. Purement décoratif (`aria-hidden`) — toute l'information
 * (contacts, horaires, liens, `#contact`) reste dans `SiteFooter`.
 *
 * Pas de mot géant ici : un bandeau fin à hauteur fixe (`.fsb-critters`).
 *
 * `three` pèse lourd : on le charge donc
 *   1. uniquement côté client (`ssr: false`, voir `next/dynamic`), et
 *   2. seulement quand le pied de page approche de l'écran (sentinelle +
 *      IntersectionObserver), pour ne rien ajouter au bundle initial.
 *
 * Mobile : moins de fruits mais plus gros (ils seraient illisibles à ~40 px
 * sur un téléphone), et un rendu allégé (`maxPixelRatio`, pas de sauts
 * automatiques). La densité de fourrure, elle, n'est pas touchée.
 */
const FuzzyCritterFooter = dynamic(
  () => import("@/components/ui/fuzzy-critter-footer"),
  { ssr: false },
);

/**
 * Les fruits à milkshake de la carte, en pelage duveteux.
 *
 * Chacun se reconnaît à trois choses : sa silhouette, sa couleur, et surtout
 * son accessoire (collerette, plumet, queue, feuille) — voir `propsFor` dans
 * `fuzzy-critter-footer`. Six teintes bien distinctes pour qu'aucun doublon
 * ne se lise à 60 px de haut. Chaque paire est [racine, pointe] du pelage.
 */
const CRITTERS_DESKTOP: Critter[] = [
  {
    shape: "strawberry",
    colors: ["#e23046", "#ff95a2"],
    eyes: "short",
    size: 0.62,
  },
  { shape: "banana", colors: ["#e3b61f", "#fff0a0"], eyes: "pills", size: 0.6 },
  { shape: "orange", colors: ["#ef8418", "#ffc271"], eyes: "big", size: 0.56 },
  {
    shape: "pineapple",
    colors: ["#d7a017", "#ffe49a"],
    eyes: "dashes",
    size: 0.62,
  },
  {
    shape: "blueberry",
    colors: ["#3b5aa6", "#9fb6ec"],
    eyes: "short",
    size: 0.46,
  },
  {
    shape: "mango",
    // joue rouge sur l'épaule haute, chair jaune en dessous
    colors: ["#f0a51f", "#ffd77a"],
    capColors: ["#d8452f", "#ff8f6d"],
    eyes: "pills",
    size: 0.58,
  },
];

/** Mobile : 4 fruits plus gros pour rester lisibles sur petit écran. */
const CRITTERS_MOBILE: Critter[] = [
  {
    shape: "strawberry",
    colors: ["#e23046", "#ff95a2"],
    eyes: "short",
    size: 0.88,
  },
  {
    shape: "banana",
    colors: ["#e3b61f", "#fff0a0"],
    eyes: "pills",
    size: 0.84,
  },
  { shape: "orange", colors: ["#ef8418", "#ffc271"], eyes: "big", size: 0.8 },
  {
    shape: "blueberry",
    colors: ["#3b5aa6", "#9fb6ec"],
    eyes: "short",
    size: 0.68,
  },
];

const MOBILE_QUERY = "(max-width: 640px)";

export function FooterCritters() {
  const sentinel = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  // Taille d'écran : choisit le jeu de fruits et le profil de rendu. On
  // n'écoute que le franchissement du seuil, pas chaque pixel, pour ne pas
  // reconstruire la scène à tout bout de champ.
  const isMobile = useMediaQuery(MOBILE_QUERY);

  // Montage différé : on n'instancie `three` que lorsque le pied de page
  // approche de l'écran.
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
          critters={isMobile ? CRITTERS_MOBILE : CRITTERS_DESKTOP}
          idleHops={!isMobile}
          maxPixelRatio={isMobile ? 1.5 : 2}
          className="fsb-critters"
        />
      ) : null}
    </div>
  );
}
