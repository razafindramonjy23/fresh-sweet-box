/** Jour de la semaine, en clé stable (l'affichage est traduit à part). */
export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

/**
 * Une plage d'ouverture : les jours concernés et l'horaire, en 24 h.
 *
 * C'est la **seule** source : l'affichage (« Lundi – Vendredi, 08h00 –
 * 18h00 »), les jours de fermeture et le balisage Google en sont tous
 * dérivés. Un jour absent de toutes les plages est considéré fermé.
 */
export type OpeningRange = {
  days: Weekday[];
  /** Heure d'ouverture, format `HH:MM`. */
  opens: string;
  /** Heure de fermeture, format `HH:MM`. */
  closes: string;
};
