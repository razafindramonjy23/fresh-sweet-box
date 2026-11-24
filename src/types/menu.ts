/** Habillage coloré de la carte, porté par une classe CSS (table `THEME` dans `MenuCard`). */
export type MenuTheme = "salad" | "juice";

/**
 * Une entrée de la grille « Les envies du jour ».
 *
 * Une carte s'illustre soit par une photo (`image`), soit par un emoji
 * (`icon`) en attendant la sienne : le type garde les deux possibles même
 * quand toutes les cartes en place ont une photo.
 */
export type MenuItem = {
  theme: MenuTheme;
  /** Numéro d'ordre affiché, ex. « 01 / LE FRAIS ». */
  number: string;
  title: string;
  text: string;
  /** Texte lu par les lecteurs d'écran sur la flèche de la carte. */
  linkLabel: string;
  image?: string;
  icon?: string;
};
