import Image from "next/image";
import { SITE } from "@/content";

type Props = {
  /** Mot animé. Par défaut le nom de la marque. */
  word?: string;
};

/**
 * Le logo qui se pose, puis le nom de la marque qui s'allume lettre par
 * lettre, balayé par un halo coloré. Purement décoratif : l'élément parent
 * porte `aria-hidden`.
 *
 * Le logo est chargé en `priority` : c'est la toute première image visible
 * du site, la différer la ferait apparaître après l'écran qui la porte.
 *
 * **Deux faces, pas une.** Le logo porte du texte ; une image plate qui
 * tourne au-delà de 90° montre son miroir, et « FRESH & SWEET BOX »
 * s'afficherait à l'envers sur la moitié du tour. La face arrière est donc
 * une seconde copie pré-pivotée de 180° : chacune se cache quand elle
 * présente son dos (`backface-visibility`), et le logo reste lisible d'un
 * bout à l'autre de la rotation. Le fichier étant identique, le navigateur
 * ne le télécharge qu'une fois.
 *
 * Leur taille est laissée au CSS (`.brand-loader__face`) plutôt que posée en
 * ligne : elle suit la largeur de l'écran, comme celle du nom.
 *
 * Le délai de chaque lettre est calculé à partir de son rang et exprimé en
 * fraction de la fenêtre d'étalement : c'est `--loader-letter-window` (dans
 * `styles/components/brand-loader.css`) qui reste la seule source de vérité
 * pour la durée. Le mot entier est donc posé au bout de
 * `--loader-letter-window + --loader-letter-duration`.
 */
export function BrandLoader({ word = SITE.name }: Props) {
  const letters = Array.from(word);

  return (
    <div className="brand-loader__stack">
      <span className="brand-loader__coin">
        <Image
          className="brand-loader__face"
          src={SITE.logo.src}
          alt=""
          width={SITE.logo.width}
          height={SITE.logo.height}
          priority
        />
        <Image
          className="brand-loader__face brand-loader__face--back"
          src={SITE.logo.src}
          alt=""
          width={SITE.logo.width}
          height={SITE.logo.height}
          priority
        />
      </span>

      <p className="brand-loader__word">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="brand-loader__letter"
            style={{
              animationDelay: `calc(var(--loader-letter-window) * ${(
                index / letters.length
              ).toFixed(4)})`,
            }}
          >
            {letter}
          </span>
        ))}
        <span className="brand-loader__sweep" />
      </p>
    </div>
  );
}
