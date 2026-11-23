import { Reveal } from "@/components/motion";
import { TICKER_WORDS } from "@/content";

/**
 * Le second exemplaire de la liste ne sert qu'au défilement sur petit écran :
 * il est masqué aux lecteurs d'écran.
 */
function TickerWords({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="ticker-group" aria-hidden={duplicate || undefined}>
      {TICKER_WORDS.map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  );
}

/** Bandeau de mots-clés, entre le hero et la carte. */
export function TickerSection() {
  return (
    <Reveal as="section" className="ticker" aria-label="Nos spécialités">
      <div className="shell">
        <div className="ticker-track">
          <TickerWords />
          <TickerWords duplicate />
        </div>
      </div>
    </Reveal>
  );
}
