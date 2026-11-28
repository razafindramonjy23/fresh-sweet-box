import {
  FloatingFruits,
  type Floater,
} from "@/components/decor/FloatingFruits";
import { Reveal, Stagger, StaggerItem, WordReveal } from "@/components/motion";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { StarRating } from "@/components/ui/StarRating";
import { FACEBOOK, REVIEWS } from "@/content";

/*
 * Note moyenne des avis affichés, calculée une fois au chargement du module :
 * `REVIEWS` est une constante, la moyenne n'a pas à être refaite à chaque
 * rendu. Le garde-fou sur la liste vide évite la division par zéro ; la
 * section ne s'affiche de toute façon pas dans ce cas.
 */
const AVERAGE =
  REVIEWS.length > 0
    ? REVIEWS.reduce((sum, review) => sum + review.rating, 0) / REVIEWS.length
    : 0;

/** La même moyenne au dixième et à la française : « 4,7 ». */
const AVERAGE_LABEL = AVERAGE.toFixed(1).replace(".", ",");

/* Disposition en miroir de la section menu, pour ne pas répéter le motif. */
const FRUITS: Floater[] = [
  {
    fruit: "cashew",
    top: "4%",
    left: "-14px",
    size: 36,
    depth: 45,
    rotate: -14,
    delay: 0.8,
  },
  {
    fruit: "leaf",
    top: "12%",
    right: "-10px",
    size: 30,
    depth: 30,
    rotate: 40,
    delay: 2,
  },
  {
    fruit: "raisin",
    top: "22%",
    right: "6%",
    size: 20,
    depth: 70,
    rotate: 20,
    delay: 1.4,
  },
  {
    fruit: "berry",
    top: "48%",
    left: "-16px",
    size: 32,
    depth: 50,
    rotate: 6,
    delay: 2.7,
  },
  {
    fruit: "almond",
    top: "72%",
    right: "-14px",
    size: 34,
    depth: 55,
    rotate: -30,
    delay: 3.1,
  },
];

/**
 * Section « Avis clients ». Cible de `#avis`.
 *
 * Placée entre « Notre esprit » et la bande de commande : on raconte la
 * maison, d'autres la confirment, puis on propose d'appeler. La preuve
 * sociale arrive ainsi juste avant la décision, pas après.
 *
 * La note moyenne est CALCULÉE à partir des avis affichés, jamais saisie à la
 * main : impossible d'annoncer « 4,9 sur 120 avis » en n'en montrant que
 * trois. Si `REVIEWS` est vide, la section ne s'affiche pas du tout : mieux
 * vaut pas de section qu'une section d'avis vide.
 */
export function ReviewsSection() {
  if (REVIEWS.length === 0) return null;

  return (
    <section className="shell section relative isolate" id="avis">
      <FloatingFruits items={FRUITS} />
      <Stagger className="section-head">
        <StaggerItem>
          <p className="eyebrow">Avis clients</p>
          <h2>
            <WordReveal text="Ce qu'on nous dit au comptoir" />
          </h2>
        </StaggerItem>

        <StaggerItem
          as="div"
          /* `w-fit` : sous 850 px, `.section-head` passe en grille et un enfant
             y est étiré par défaut — la pastille ferait toute la largeur. */
          className="flex w-fit flex-none items-center gap-3.5 rounded-full border border-deep/5 bg-paper px-5 py-3"
        >
          {/* Tronquée, pas arrondie : 4,7 affiche quatre étoiles. Arrondir
              en montrerait cinq à côté du chiffre « 4,7 », ce qui annonce
              plus que la moyenne réelle. Le chiffre reste à côté pour la
              précision. */}
          <StarRating rating={Math.floor(AVERAGE)} />
          <span className="text-[13px] leading-tight text-muted">
            <strong className="font-display text-[17px] font-semibold text-deep">
              {AVERAGE_LABEL}
            </strong>
            {" / 5 — "}
            {REVIEWS.length} avis
          </span>
        </StaggerItem>
      </Stagger>

      <Stagger
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3"
        gap={0.1}
      >
        {REVIEWS.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </Stagger>

      {/* Les avis affichés viennent de Facebook et d'Instagram : la section se
          termine donc là où le prochain sera écrit. Lien externe, donc
          `target` + `rel` — ce que `ArrowButton` ne gère pas. */}
      <Reveal className="mt-[clamp(28px,4vw,42px)] text-center">
        <a
          href={FACEBOOK.url}
          target="_blank"
          rel="noopener noreferrer"
          data-haptic="tap"
          data-magnetic=""
          data-press=""
          className="btn-sweep group inline-flex items-center gap-2.5 rounded-full border border-deep/20 px-6 py-3.5 text-[15px] font-semibold text-deep hover:border-deep hover:text-cream"
        >
          Laissez-nous un avis sur Facebook
          <span aria-hidden="true" className="hover-arrow">
            →
          </span>
        </a>
      </Reveal>
    </section>
  );
}
