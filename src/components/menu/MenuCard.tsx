import Image from "next/image";
import { ScrollZoom, StaggerItem } from "@/components/motion";
import { cn } from "@/lib/utils/cn";
import type { MenuItem, MenuTheme } from "@/types";

/**
 * Fond pastel de la carte.
 *
 * Table explicite plutôt que `bg-card-${item.theme}` : Tailwind lit les
 * classes dans le source, une classe composée à l'exécution ne serait jamais
 * générée.
 */
const THEME: Record<MenuTheme, string> = {
  salad: "bg-card-salad",
  juice: "bg-card-juice",
};

/**
 * Une carte de la grille « Les envies du jour ».
 *
 * La photo occupe le haut de la carte sur toute sa largeur : c'est elle qui
 * vend le produit, pas la pastille ronde de 100 px qu'elle remplace.
 *
 * S'attend à être rendue dans un <Stagger> : c'est le conteneur qui donne la
 * cadence d'apparition. Deux survols cohabitent sans se gêner parce qu'ils
 * portent sur des nœuds différents — Framer soulève la carte (`lift`, donc un
 * `transform` sur l'article), le CSS zoome l'image à l'intérieur du masque.
 */
export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <StaggerItem
      as="article"
      lift
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[28px] p-3",
        "border border-deep/5 transition-shadow duration-300",
        "hover:shadow-[0_22px_48px_rgba(51,75,55,0.13)]",
        THEME[item.theme],
      )}
    >
      <div className="relative aspect-16/11 overflow-hidden rounded-[20px] bg-paper/60">
        {item.image ? (
          /* Zoom au défilement : sur mobile, c'est lui qui anime la photo,
             le zoom au survol n'y existant pas. */
          <ScrollZoom className="absolute inset-0">
            <Image
              src={item.image}
              alt=""
              fill
              /* Deux colonnes au-delà de 760 px, une seule en dessous. */
              sizes="(max-width: 760px) 92vw, (max-width: 1320px) 46vw, 580px"
              className="object-cover transition-transform duration-700 ease-brand group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          </ScrollZoom>
        ) : (
          <span
            aria-hidden="true"
            className="grid h-full place-items-center text-6xl"
          >
            {item.icon}
          </span>
        )}

        <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.1em] text-deep backdrop-blur-sm">
          {item.number}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-2 pt-6 pb-2 sm:px-4 sm:pb-3">
        <h3 className="m-0 font-display text-[22px] font-semibold tracking-[-0.015em] text-deep sm:text-[26px]">
          {item.title}
        </h3>
        {/* 85 % d'opacité : le vert de marque tient alors 5,3:1 sur les deux
            fonds pastel, au-dessus du seuil de 4,5:1 pour du texte courant. */}
        <p className="mt-2.5 mb-0 max-w-[36ch] text-[14px] leading-[1.75] text-deep/85">
          {item.text}
        </p>

        {/* Appel à l'action avec son libellé en clair : l'ancienne flèche
            seule n'annonçait pas sa destination hors lecteur d'écran. */}
        <a
          href="#contact"
          data-haptic="tap"
          data-press=""
          className="group/cta mt-6 inline-flex w-fit items-center gap-2.5 rounded-full bg-paper px-5 py-3 text-[13px] font-semibold text-deep transition-colors duration-200 hover:bg-white"
        >
          {item.linkLabel}
          <span aria-hidden="true" className="hover-arrow">
            →
          </span>
        </a>
      </div>
    </StaggerItem>
  );
}
