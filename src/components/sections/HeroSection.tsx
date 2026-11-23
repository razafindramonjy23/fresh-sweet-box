import Image from "next/image";
import { FloatIn, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ArrowButton } from "@/components/ui/ArrowButton";

/**
 * Première section : le texte d'accroche et les deux clichés.
 *
 * Les deux images sont servies en `priority` : elles forment le plus grand
 * élément visible au chargement.
 */
export function HeroSection() {
  return (
    <section className="shell hero" id="accueil">
      <Stagger className="hero-copy" now delay={0.1} gap={0.09}>
        <StaggerItem as="p" className="kicker">
          Le frais fait maison
        </StaggerItem>
        <StaggerItem as="h1">
          La pause
          <br />
          <em>pleine de vie.</em>
        </StaggerItem>
        <StaggerItem as="p" className="intro">
          Des salades de legumes, des fruits colorés, et des douceurs à
          savourer. Le meilleur du frais, préparé avec soin et prêt à vous
          suivre.
        </StaggerItem>
        <StaggerItem className="hero-actions">
          <ArrowButton href="#carte">Explorer la carte</ArrowButton>
          <ArrowButton href="#esprit" variant="ghost">
            Découvrir notre histoire
          </ArrowButton>
        </StaggerItem>
        <StaggerItem as="p" className="hero-note">
          <span className="avatars" aria-hidden="true">
            <span>🍓</span>
            <span>🍊</span>
            <span>🥭</span>
          </span>
          <span>
            <b>Des ingrédients frais</b>
            <br />
            et de belles couleurs chaque jour
          </span>
        </StaggerItem>
      </Stagger>

      <div className="hero-visual">
        <span className="photo-backdrop" aria-hidden="true" />

        <FloatIn
          className="photo-float"
          delay={0.2}
          amplitude={10}
          duration={7.5}
        >
          <div className="photo-frame">
            <div className="photo-frame__inner">
              <Image
                src="/images/bol-salade-fruits.jpg"
                alt="Bol blanc garni de mangue, raisin noir, grenade, kiwi, rondelles de citron vert et physalis, tenu à la main"
                fill
                sizes="(max-width: 600px) 84vw, (max-width: 850px) 82vw, 510px"
                priority
              />
            </div>
          </div>
        </FloatIn>

        <Reveal className="photo-sticker-wrap" delay={0.75} now>
          <p className="photo-sticker">
            <small>Une pause fraîche</small>
            faite avec amour ♡
          </p>
        </Reveal>

        {/* Second cliché : le versant sucré de la carte. */}
        <FloatIn
          className="hero-polaroid-wrap"
          delay={0.55}
          amplitude={8}
          duration={9}
        >
          <div className="hero-polaroid">
            <Image
              src="/images/milkshake-hero.jpg"
              alt="Milkshake rose Fresh & Sweet Box, chantilly, coulis de fraise, bord chocolaté et billes colorées"
              fill
              sizes="170px"
            />
          </div>
        </FloatIn>

        <FloatIn
          as="span"
          className="fruit-dot dot-berry"
          aria-hidden="true"
          delay={0.45}
          amplitude={7}
          duration={5.5}
        />
        <FloatIn
          as="span"
          className="fruit-dot dot-peach"
          aria-hidden="true"
          delay={0.6}
          amplitude={6}
          duration={6.5}
        />
      </div>
    </section>
  );
}
