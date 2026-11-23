import type { ContactIconName } from "@/types";

/**
 * Icônes en SVG tracé, aucune dépendance.
 *
 * Décoratives : le texte à côté porte déjà l'information.
 */
const ICON_PATHS: Record<ContactIconName, React.ReactNode> = {
  phone: (
    <path d="M6.2 3.6h2.9l1.5 3.6-1.8 1.4a12.4 12.4 0 0 0 5.4 5.4l1.4-1.8 3.6 1.5v2.9a1.8 1.8 0 0 1-1.9 1.8A15.5 15.5 0 0 1 4.4 5.5a1.8 1.8 0 0 1 1.8-1.9Z" />
  ),
  instagram: (
    <>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="4.6" />
      <circle cx="12" cy="12" r="3.9" />
      <path d="M16.9 7.1h.01" />
    </>
  ),
  facebook: (
    <path d="M13.6 20.4v-7.5h2.5l.4-2.9h-2.9V8.2c0-.84.23-1.4 1.44-1.4h1.54V4.2a20 20 0 0 0-2.25-.11c-2.22 0-3.74 1.35-3.74 3.84v2.14H8.05v2.9h2.54v7.5Z" />
  ),
  mail: (
    <>
      <rect x="3.3" y="5.6" width="17.4" height="12.8" rx="2.4" />
      <path d="m3.9 7.1 8.1 5.8 8.1-5.8" />
    </>
  ),
};

export function ContactIcon({ name }: { name: ContactIconName }) {
  return (
    <svg
      className="footer-icon"
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_PATHS[name]}
    </svg>
  );
}
