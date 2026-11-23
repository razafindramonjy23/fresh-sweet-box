import { SITE } from "@/content";

type Props = {
  /** Mot animé. Par défaut le nom de la marque. */
  word?: string;
};

/**
 * Le nom de la marque qui s'allume lettre par lettre, balayé par un halo
 * coloré. Purement décoratif : l'élément parent porte `aria-hidden`.
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
  );
}
