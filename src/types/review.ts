/** Où l'avis a été laissé. Détermine le libellé affiché sous le nom. */
export type ReviewSource = "facebook" | "instagram" | "place";

/**
 * Un avis client affiché dans la section « Avis clients ».
 *
 * Volontairement minimal : pas de date, pas de photo, pas d'identifiant
 * externe. Un avis repris d'un commentaire Facebook ou Instagram n'apporte
 * rien de plus, et une date rendrait la section visiblement périmée dès que
 * les avis cessent d'être mis à jour.
 */
export type Review = {
  /** Prénom, ou prénom et initiale. Jamais le nom complet. */
  name: string;
  /** Note sur 5. Entier entre 1 et 5 : la section n'affiche pas de demi-étoile. */
  rating: number;
  /** L'avis lui-même, sans guillemets : le composant les ajoute. */
  text: string;
  source: ReviewSource;
};
