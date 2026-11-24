import { Stagger, StaggerItem, WordReveal } from "@/components/motion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { PHONE } from "@/content";
import { HeroVisual } from "./hero/HeroVisual";

/*
 * Cadence du bloc de texte, reprise telle quelle par le titre.
 *
 * <Stagger> donne le tempo à ses enfants, mais <WordReveal> joue au montage
 * et n'hérite de rien : il lui faut donc son propre délai, aligné à la main
 * sur le rang du titre dans la liste.
 *
 *   OPEN (0.10) + un intervalle (0.09) = le titre entre à 0.19 s.
 */
const OPEN = 0.1;
const STEP = 0.09;

/** Le titre est le deuxième enfant : son tour vient après un intervalle. */
const TITLE_AT = OPEN + STEP;

/*
 * La seconde ligne enchaîne sur la première sans rupture : deux mots à
 * 0,055 s d'intervalle ont été lancés avant elle.
 */
const SECOND_LINE_AT = TITLE_AT + 2 * 0.055;

/**
 * Première section : le texte d'accroche et la composition fruitée.
 *
 * Le mobile n'est pas le bureau rétréci. Sous 1024 px la section s'empile et
 * resserre son rythme vertical — marges, interlignes, taille des boutons —
 * pour que l'accroche, le premier appel à l'action **et** le haut de la photo
 * tiennent dans le premier écran d'un téléphone. C'est la raison d'être des
 * valeurs distinctes en `max-*` et `lg:` ci-dessous, et non une simple
 * réduction proportionnelle.
 */
export function HeroSection() {
  return (
    <section
      id="accueil"
      className="shell-x grid grid-cols-1 items-center gap-[14px] pt-[43px] pb-[42px] sm:gap-[18px] sm:pt-[58px] sm:pb-[54px] lg:min-h-[clamp(600px,68vw,760px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-[clamp(38px,6.2vw,88px)] lg:py-[clamp(62px,7vw,96px)]"
    >
      <Stagger
        className="relative z-2 max-w-[650px] lg:max-w-[600px]"
        now
        delay={OPEN}
        gap={STEP}
      >
        <StaggerItem
          as="p"
          className="m-0 mb-[17px] flex items-center gap-2.5 text-[12px] font-bold tracking-[0.15em] text-sage uppercase lg:mb-[22px]"
        >
          <span aria-hidden="true" className="h-px w-7 flex-none bg-berry" />
          Le frais fait maison
        </StaggerItem>

        {/* `from="none"` : les mots portent déjà la montée, l'enveloppe ne
            garde que le fondu. Deux `y` sur un même élément s'additionneraient
            — c'est la règle 3 de `motion/variants.ts`. */}
        <StaggerItem
          as="h1"
          from="none"
          className="m-0 mb-[18px] font-display text-[clamp(34px,9.6vw,48px)] leading-[1.1] font-semibold tracking-[-0.03em] text-balance text-deep lg:mb-[23px] lg:text-[clamp(38px,5vw,68px)] lg:leading-[1.08]"
        >
          <WordReveal text="La pause" now delay={TITLE_AT} />
          <br />
          <em className="font-semibold text-berry-ink">
            <WordReveal text="pleine de vie." now delay={SECOND_LINE_AT} />
          </em>
        </StaggerItem>

        <StaggerItem
          as="p"
          className="m-0 mb-[22px] max-w-[37ch] text-[14px] leading-[1.7] text-muted lg:mb-[29px] lg:max-w-[43ch] lg:text-[16px] lg:leading-[1.8]"
        >
          Des salades de légumes, des fruits colorés, et des douceurs à
          savourer. Le meilleur du frais, préparé avec soin et prêt à vous
          suivre.
        </StaggerItem>

        {/* Un seul appel à l'action principal : commander. Le second invite à
            parcourir, il reste en bouton secondaire. */}
        <StaggerItem className="flex flex-wrap items-center gap-2.5 lg:gap-4">
          <ArrowButton href={PHONE.href}>Appeler pour commander</ArrowButton>
          <ArrowButton href="#carte" variant="ghost">
            Voir la carte
          </ArrowButton>
        </StaggerItem>

        <StaggerItem
          as="p"
          className="mt-[22px] mb-0 flex items-center gap-[11px] text-[12px] leading-[1.55] text-muted lg:mt-[42px]"
        >
          <span aria-hidden="true" className="flex flex-none">
            {["🍓", "🍊", "🥭"].map((fruit, index) => (
              <span
                key={fruit}
                className={[
                  "grid size-[29px] place-items-center rounded-full border-2 border-cream text-[13px]",
                  index === 0 ? "bg-peach" : "-ml-[7px] bg-leaf",
                ].join(" ")}
              >
                {fruit}
              </span>
            ))}
          </span>
          <span>
            <b className="text-deep">Des ingrédients frais</b>
            <br />
            et de belles couleurs chaque jour
          </span>
        </StaggerItem>
      </Stagger>

      <HeroVisual />
    </section>
  );
}
