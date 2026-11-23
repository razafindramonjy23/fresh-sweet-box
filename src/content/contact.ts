import type { ContactLink } from "@/types";

/**
 * Coordonnées réelles, reprises de l'ancienne version Vite.
 *
 * Déclarées une fois ici : le pied de page, la barre d'action et le balisage
 * structuré s'en servent tous, aucun numéro n'est recopié ailleurs.
 */
export const PHONE = {
  display: "032 63 796 87",
  /** Format local : aucun indicatif pays n'a été fourni. */
  href: "tel:0326379687",
} as const;

export const INSTAGRAM = {
  handle: "@fresh_sweet_box",
  url: "https://www.instagram.com/fresh_sweet_box/",
} as const;

export const FACEBOOK = {
  label: "Notre page Facebook",
  url: "https://www.facebook.com/profile.php?id=100069940306804",
} as const;

/**
 * Le pied de page. Ce qui n'est pas connu porte `pending` et reste affiché
 * en italique, jamais inventé — il ne reste que l'e-mail.
 */
export const CONTACT_LINKS: ContactLink[] = [
  { icon: "phone", label: PHONE.display, href: PHONE.href },
  {
    icon: "instagram",
    label: INSTAGRAM.handle,
    href: INSTAGRAM.url,
    external: true,
  },
  {
    icon: "facebook",
    label: FACEBOOK.label,
    href: FACEBOOK.url,
    external: true,
  },
  { icon: "mail", label: "E-mail à compléter", pending: true },
];
