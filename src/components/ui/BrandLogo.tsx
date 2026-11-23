import Image from "next/image";
import { SITE } from "@/content";

type Props = {
  /** Hauteur affichée, en pixels. La largeur suit le ratio du fichier. */
  size: number;
  /** Affiche le nom à côté du pictogramme. */
  withWordmark?: boolean;
  /** Charge l'image en priorité (hero / en-tête). */
  priority?: boolean;
};

/**
 * Pictogramme Fresh & Sweet Box, avec ou sans le nom.
 *
 * L'image est décorative (`alt=""`) : le nom est porté par le texte à côté,
 * ou par l'`aria-label` du lien qui l'enveloppe.
 */
export function BrandLogo({
  size,
  withWordmark = true,
  priority = false,
}: Props) {
  return (
    <>
      <Image
        className="logo-mark"
        src={SITE.logo.src}
        alt=""
        width={SITE.logo.width}
        height={SITE.logo.height}
        style={{ height: size, width: "auto" }}
        priority={priority}
      />
      {withWordmark && <span>{SITE.name}</span>}
    </>
  );
}
