import type { ContactLink } from "@/types";

/**
 * Coordonnées réelles, reprises de l'ancienne version Vite.
 * Ce qui n'est pas connu porte `pending` et reste affiché en italique,
 * jamais inventé.
 */
export const CONTACT_LINKS: ContactLink[] = [
  { icon: "phone", label: "032 63 796 87", href: "tel:0326379687" },
  {
    icon: "instagram",
    label: "@fresh_sweet_box",
    href: "https://www.instagram.com/fresh_sweet_box/",
    external: true,
  },
  {
    icon: "facebook",
    label: "Notre page Facebook",
    href: "https://www.facebook.com/profile.php?id=100069940306804",
    external: true,
  },
  { icon: "mail", label: "E-mail à compléter", pending: true },
];
