import type { Review } from "@/types";

/**
 * Avis affichés dans la section « Avis clients ».
 *
 * ⚠️ À REMPLACER PAR DE VRAIS AVIS.
 *
 * Les trois entrées ci-dessous sont des exemples de mise en page, pas des
 * avis reçus : aucun avis n'a été fourni avec le contenu du site. Le reste
 * du projet ne publie rien d'inventé (voir `FooterHours`, où les horaires
 * manquants restent « à compléter » plutôt que comblés) ; cette liste est la
 * seule exception, et elle est temporaire.
 *
 * Deux façons de la mettre en conformité :
 *
 * 1. recopier ici de vrais commentaires Facebook ou Instagram, en gardant le
 *    prénom seul (ou prénom + initiale) ;
 * 2. vider le tableau : la section se retire alors d'elle-même de la page,
 *    sans autre modification (voir `ReviewsSection`).
 *
 * Tant que de faux avis sont publiés, ne PAS les déclarer en `Review` dans
 * le balisage structuré (`src/lib/seo/structured-data.ts`) : des avis ou une
 * note moyenne inventés dans schema.org exposent le site à une sanction
 * manuelle de Google.
 */
export const REVIEWS: Review[] = [
  {
    name: "Mirana",
    rating: 5,
    text: "Tout est coupé devant moi, c'est frais et vraiment généreux. Je prends un bol de fruits presque chaque midi en sortant du bureau.",
    source: "facebook",
  },
  {
    name: "Tokiniaina",
    rating: 5,
    text: "Les milkshakes sont la raison pour laquelle je reviens. Bien gourmands, pas trop sucrés, et prêts en deux minutes.",
    source: "instagram",
  },
  {
    name: "Sarah R.",
    rating: 4,
    text: "Accueil adorable et salades croquantes. Le gobelet referme bien, ça tient sans problème jusqu'à la maison.",
    source: "place",
  },
];
