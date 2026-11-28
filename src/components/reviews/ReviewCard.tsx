import { StaggerItem } from "@/components/motion";
import { StarRating } from "@/components/ui/StarRating";
import type { Review, ReviewSource } from "@/types";

/**
 * Provenance affichée sous le nom.
 *
 * Table explicite : le libellé dit d'où vient l'avis, ce qui vaut mieux
 * qu'un logo de réseau social à cette taille.
 */
const SOURCE_LABEL: Record<ReviewSource, string> = {
  facebook: "Avis Facebook",
  instagram: "Commentaire Instagram",
  place: "Client sur place",
};

/** Les deux premières initiales du nom, à défaut de photo. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

/**
 * Un avis de la grille « Avis clients ».
 *
 * `<figure>` + `<blockquote>` + `<figcaption>` plutôt qu'un simple bloc de
 * texte : la citation et son auteur restent liés hors de toute mise en page,
 * et `cite` n'est pas employé — il attend une source, pas une personne.
 *
 * S'attend à être rendue dans un <Stagger>, comme `MenuCard` : la cadence
 * d'apparition vient du conteneur.
 */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <StaggerItem
      as="article"
      lift
      className={[
        "flex rounded-[28px] border border-deep/5 bg-paper p-6 sm:p-7",
        "transition-shadow duration-300 hover:shadow-[0_22px_48px_rgba(51,75,55,0.13)]",
      ].join(" ")}
    >
      <figure className="m-0 flex flex-1 flex-col">
        <StarRating rating={review.rating} />

        {/* Guillemets français avec espaces insécables : la typographie du
            site les emploie déjà (voir `SITE.quote`). */}
        <blockquote className="m-0 mt-5 flex-1 text-[15px] leading-[1.8] text-deep/85">
          {`« ${review.text} »`}
        </blockquote>

        <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-5">
          <span
            aria-hidden="true"
            className="grid size-11 flex-none place-items-center rounded-full bg-leaf font-display text-[15px] font-semibold text-deep"
          >
            {initials(review.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold text-deep">
              {review.name}
            </span>
            <span className="block truncate text-[12.5px] text-muted">
              {SOURCE_LABEL[review.source]}
            </span>
          </span>
        </figcaption>
      </figure>
    </StaggerItem>
  );
}
