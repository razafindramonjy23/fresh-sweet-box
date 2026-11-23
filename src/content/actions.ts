import type { QuickAction } from "@/types";
import { INSTAGRAM, PHONE } from "./contact";

/**
 * Barre d'action fixe sur mobile : le chemin le plus court vers une
 * commande. Deux entrées seulement — au-delà, le choix dilue le clic.
 *
 * Pour ajouter WhatsApp une fois le numéro confirmé :
 * `{ icon: "phone", label: "WhatsApp", href: "https://wa.me/261XXXXXXXXX",
 *    external: true }`
 */
export const QUICK_ACTIONS: QuickAction[] = [
  { icon: "phone", label: "Appeler", href: PHONE.href },
  {
    icon: "instagram",
    label: "Instagram",
    href: INSTAGRAM.url,
    external: true,
  },
];
