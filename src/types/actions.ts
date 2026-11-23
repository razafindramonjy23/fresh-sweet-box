import type { ContactIconName } from "./contact";

/** Un bouton de la barre d'action fixe (mobile). */
export type QuickAction = {
  icon: ContactIconName;
  label: string;
  href: string;
  /** Ouvre un nouvel onglet. */
  external?: boolean;
};
