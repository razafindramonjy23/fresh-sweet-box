import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type Props = {
  href: string;
  children: ReactNode;
  /**
   * `solid` : pilule pleine framboise, avec la pastille de flèche.
   * `ghost` : contour fin, sans pastille.
   * `nav`   : variante compacte de `solid`, pour la barre de navigation.
   */
  variant?: "solid" | "ghost" | "nav";
  className?: string;
};

const BASE =
  "group inline-flex items-center rounded-full leading-[1.3] font-bold " +
  "transition-[transform,box-shadow,background-color,border-color] duration-200 " +
  "motion-reduce:transition-none";

/* `btn-shine` : un reflet traverse le bouton au survol. */
const LIFT =
  "btn-shine hover:-translate-y-0.5 motion-reduce:hover:translate-y-0 " +
  "hover:shadow-[0_10px_26px_rgba(187,54,105,0.3)]";

/*
 * Note de contraste, qui explique les deux roses.
 *
 * Le blanc sur `--color-berry` (#d94e88) tient 3,89:1. C'est assez pour du
 * « grand texte » (seuil 3:1), donc à partir de 18,66 px en gras — mais pas
 * en dessous. Or le libellé doit descendre à 17 px sur téléphone pour tenir
 * dans 320 px de large, et la barre de navigation l'affiche à 14 px.
 *
 * Dans ces deux cas le fond passe à `--color-berry-ink` (#bb3669), sur lequel
 * le blanc tient 5,46:1 et passe donc à n'importe quelle taille. La framboise
 * de marque reste en place partout où elle est lisible.
 */
const VARIANT = {
  solid: cn(
    BASE,
    LIFT,
    "gap-3 bg-berry-ink py-2 pr-2 pl-[22px] text-[17px] text-white",
    "sm:gap-[14px] sm:bg-berry sm:py-[9px] sm:pr-[9px] sm:pl-7 sm:text-[19px]",
  ),
  ghost: cn(
    BASE,
    /* `btn-sweep` : le fond vert se remplit de bas en haut au survol
       (voir `styles/components/interactions.css`). */
    "btn-sweep border border-deep/30 px-6 py-[13px] text-[17px] text-deep",
    "hover:-translate-y-0.5 hover:border-deep hover:text-cream",
    "motion-reduce:hover:translate-y-0 sm:px-[30px] sm:py-[15px] sm:text-[19px]",
  ),
  nav: cn(
    BASE,
    LIFT,
    "gap-[11px] bg-berry-ink py-[7px] pr-[7px] pl-[22px] text-[14px] text-white",
  ),
} as const;

const ICON = {
  solid: "size-8 text-[15px] sm:size-9 sm:text-base",
  ghost: "",
  nav: "size-[30px] text-[14px]",
} as const;

/**
 * Appel à l'action de la page : toujours un lien, jamais un `<button>`
 * (toutes les cibles sont des ancres).
 */
export function ArrowButton({
  href,
  children,
  variant = "solid",
  className,
}: Props) {
  return (
    <a
      className={cn(VARIANT[variant], className)}
      href={href}
      /* Appeler est l'action qui compte le plus : vibration plus marquée. */
      data-haptic={href.startsWith("tel:") ? "impact" : "tap"}
      data-magnetic=""
      data-press=""
    >
      {children}
      {variant !== "ghost" && (
        <span
          aria-hidden="true"
          className={cn(
            /* `overflow-hidden` : la flèche sort à droite et revient par la
               gauche sans déborder de la pastille. */
            "grid flex-none place-items-center overflow-hidden rounded-full bg-white leading-none text-berry-ink",
            ICON[variant],
          )}
        >
          <span className="hover-arrow">→</span>
        </span>
      )}
    </a>
  );
}
