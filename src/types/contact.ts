/** Jeu d'icônes disponibles dans le pied de page (cf. `ui/ContactIcon`). */
export type ContactIconName = "phone" | "instagram" | "facebook" | "mail";

/** Un moyen de contact du pied de page. */
export type ContactLink = {
  icon: ContactIconName;
  label: string;
  /** Absent tant que la coordonnée n'est pas connue. */
  href?: string;
  /** Ouvre un nouvel onglet (réseaux sociaux). */
  external?: boolean;
  /**
   * Information non fournie : affichée en italique et sans lien,
   * jamais inventée.
   */
  pending?: boolean;
};
