import type { NavLink } from "@/types";

/** Liens de la barre de navigation (et du panneau mobile). */
export const NAV_LINKS: NavLink[] = [
  { href: "#carte", label: "Notre carte" },
  { href: "#esprit", label: "Notre esprit" },
  { href: "#contact", label: "Nous trouver" },
];

/** Colonne « La carte » du pied de page. */
export const FOOTER_LINKS: NavLink[] = [
  { href: "#carte", label: "Salades & bols de fruits" },
  { href: "#carte", label: "Jus & milkshakes" },
  { href: "#carte", label: "Dessert" },
  { href: "#esprit", label: "Notre esprit" },
];
