import { cn } from "@/lib/utils/cn";

/** Étoiles de la note, en SVG tracé — aucune dépendance, comme `ContactIcon`. */
const STAR_PATH =
  "M12 2.9l2.7 5.8 6.3.7-4.7 4.3 1.3 6.2L12 16.7l-5.6 3.2 1.3-6.2L3 9.4l6.3-.7z";

const MAX = 5;

type Props = {
  /** Note sur 5. Arrondie à l'entier : pas de demi-étoile. */
  rating: number;
  /** Taille d'une étoile en pixels. */
  size?: number;
  className?: string;
};

/**
 * Une note en étoiles, lisible aussi sans les voir.
 *
 * Le groupe porte `role="img"` et son libellé : un lecteur d'écran annonce
 * « 5 étoiles sur 5 » d'un bloc, au lieu d'énumérer cinq images muettes.
 * Les étoiles vides sont dessinées (et non omises) pour que la note se lise
 * d'un coup d'œil — quatre pleines sur cinq, pas quatre dans le vide.
 */
export function StarRating({ rating, size = 16, className }: Props) {
  const filled = Math.max(0, Math.min(MAX, Math.round(rating)));

  return (
    <span
      role="img"
      aria-label={`${filled} étoiles sur ${MAX}`}
      className={cn("inline-flex items-center gap-1", className)}
    >
      {Array.from({ length: MAX }, (_, index) => (
        <svg
          key={index}
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill="currentColor"
          aria-hidden="true"
          /* La framboise sert d'aplat, pas de texte : le seuil applicable est
             celui des éléments graphiques (3:1), que #d94e88 tient sur crème
             comme sur papier. Les étoiles vides restent du vert de marque très
             dilué, assez pour se deviner sans concurrencer les pleines. */
          className={cn(
            "flex-none",
            index < filled ? "text-berry" : "text-deep/15",
          )}
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}
