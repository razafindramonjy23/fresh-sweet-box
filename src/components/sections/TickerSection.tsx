import { Reveal } from "@/components/motion";
import { TICKER_WORDS } from "@/content";

/**
 * Le second exemplaire de la liste ne sert qu'à la boucle : il est masqué aux
 * lecteurs d'écran, et retiré quand l'animation est coupée.
 */
function TickerWords({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul
      aria-hidden={duplicate || undefined}
      className={[
        "m-0 flex w-max shrink-0 list-none items-center p-0",
        "font-display text-[15px] italic whitespace-nowrap sm:text-[17px]",
        // Sans animation, la bande redevient une ligne de mots qui passe à
        // la ligne : le second exemplaire n'aurait alors aucun sens.
        "motion-reduce:w-auto motion-reduce:flex-wrap",
        "motion-reduce:justify-center motion-reduce:gap-x-8 motion-reduce:gap-y-1.5",
        "motion-reduce:whitespace-normal",
        duplicate ? "motion-reduce:hidden" : "",
      ].join(" ")}
    >
      {TICKER_WORDS.map((word) => (
        <li
          key={word}
          /* La puce est posée sur TOUS les éléments, le dernier compris : la
             bande reste ainsi parfaitement périodique et la boucle ne saute
             pas au raccord. */
          className={[
            "after:mx-6 after:text-sage after:content-['•'] sm:after:mx-8",
            "motion-reduce:after:hidden",
          ].join(" ")}
        >
          {word}
        </li>
      ))}
    </ul>
  );
}

/**
 * Bandeau de mots-clés défilant, entre le hero et la carte.
 *
 * La boucle est sans raccord visible parce que la piste contient exactement
 * deux exemplaires identiques de la liste et se décale de `-50 %` : à la fin
 * du cycle, le second exemplaire est pile là où le premier a commencé.
 *
 * Pleine largeur, volontairement : une bande qui défile et qui s'arrête à la
 * gouttière de la page ne se lit pas comme un défilement continu.
 */
export function TickerSection() {
  return (
    <Reveal
      as="section"
      className="group overflow-hidden bg-leaf py-4 text-deep"
      aria-label="Nos spécialités"
    >
      <div
        className={[
          "flex w-max animate-ticker",
          // Le survol met la bande en pause : on peut lire un mot au passage.
          // Réservé aux pointeurs fins — sur tactile, `hover` reste collé
          // après le toucher et figerait la bande.
          "[@media(hover:hover)]:group-hover:[animation-play-state:paused]",
          "motion-reduce:w-full motion-reduce:animate-none",
        ].join(" ")}
      >
        <TickerWords />
        <TickerWords duplicate />
      </div>
    </Reveal>
  );
}
