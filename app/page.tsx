import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import {
  FloatIn,
  Parallax,
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion";

const NAV_LINKS = [
  { href: "#carte", label: "Notre carte" },
  { href: "#esprit", label: "Notre esprit" },
  { href: "#contact", label: "Nous trouver" },
];

const TICKER_WORDS = [
  "Fruits choisis avec soin",
  "Salades fraîches",
  "Jus & milkshakes",
  "Petites douceurs",
];

const MENU_CARDS = [
  {
    theme: "salad",
    number: "01 / LE FRAIS",
    icon: "🥗",
    title: "Salades fraîches",
    text: "Des légumes croquants, des fruits de saison et des bols généreux.",
    linkLabel: "Découvrir les salades",
  },
  {
    theme: "juice",
    number: "02 / À SIROTER",
    icon: "🍓",
    title: "Jus & milkshakes",
    text: "Des mélanges fruités et des boissons gourmandes à emporter.",
    linkLabel: "Découvrir les jus",
  },
  {
    theme: "sweet",
    number: "03 / LA DOUCEUR",
    icon: "🍰",
    title: "Desserts & healthy",
    text: "Yaourts garnis, salade de fruits et douceurs pour finir en beauté.",
    linkLabel: "Découvrir les desserts",
  },
];

const STORY_POINTS = [
  "Des fruits et légumes pleins de couleurs",
  "Des recettes généreuses et variées",
  "À savourer où votre journée vous mène",
];

function Logo({ size }: { size: number }) {
  return (
    <>
      <Image
        className="logo-mark"
        src="/images/logo-fsb.png"
        alt=""
        width={320}
        height={298}
        style={{ height: size, width: "auto" }}
        priority
      />
      <span>Fresh &amp; Sweet Box</span>
    </>
  );
}

function TickerWords({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="ticker-group" aria-hidden={duplicate || undefined}>
      {TICKER_WORDS.map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>

      <div className="topline">
        FRAIS, COLORÉ ET PRÉPARÉ AVEC SOIN · À EMPORTER
      </div>

      <Reveal as="header" className="shell nav" now>
        <a className="logo" href="#accueil">
          <Logo size={44} />
        </a>
        <MobileNav
          cta={
            <a className="nav-action" href="#carte">
              Découvrir la carte <span aria-hidden="true">↗</span>
            </a>
          }
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </MobileNav>
      </Reveal>

      <main id="contenu" tabIndex={-1}>
        {/* Hero ------------------------------------------------------- */}
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
              Des fruits colorés, des salades croquantes et des douceurs à
              savourer. Le meilleur du frais, préparé avec soin et prêt à vous
              suivre.
            </StaggerItem>
            <StaggerItem className="hero-actions">
              <a className="button" href="#carte">
                Explorer la carte <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#esprit">
                Découvrir notre histoire
              </a>
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

            <FloatIn className="photo-float" delay={0.2} amplitude={10} duration={7.5}>
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
                  src="/images/cake-cafe.jpg"
                  alt="Tasse de café, tranches de cake marbré, fraises et quartiers de mandarine sur une assiette"
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

        {/* Bandeau de mots-clés --------------------------------------- */}
        <Reveal as="section" className="ticker" aria-label="Nos spécialités">
          <div className="shell">
            <div className="ticker-track">
              <TickerWords />
              <TickerWords duplicate />
            </div>
          </div>
        </Reveal>

        {/* Les envies du jour ----------------------------------------- */}
        <section className="shell section" id="carte">
          <Stagger className="section-head">
            <StaggerItem>
              <p className="eyebrow">À chacun sa pause</p>
              <h2>Les envies du jour</h2>
            </StaggerItem>
            <StaggerItem as="p">
              Du croquant, du fruité ou une touche sucrée : choisissez votre
              moment de fraîcheur.
            </StaggerItem>
          </Stagger>

          <Stagger className="menu-grid" gap={0.1}>
            {MENU_CARDS.map((card) => (
              <StaggerItem
                key={card.title}
                as="article"
                className={`menu-card ${card.theme}`}
                lift
              >
                <span className="card-number">{card.number}</span>
                <span className="card-icon" aria-hidden="true">
                  {card.icon}
                </span>
                <div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                  <a
                    className="arrow-link"
                    href="#contact"
                    aria-label={card.linkLabel}
                  >
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Notre esprit ------------------------------------------------ */}
        <section className="shell section" id="esprit">
          <Reveal className="story">
            <div className="story-art">
              <Parallax className="story-photo-wrap" distance={18}>
                <div className="story-photo">
                  <Image
                    src="/images/bol-salade-fruits-detail.jpg"
                    alt="Gros plan du bol de fruits frais devant les collines, avec l'étiquette Fresh & Sweet Box"
                    fill
                    sizes="(max-width: 850px) 70vw, 36vw"
                  />
                </div>
              </Parallax>
            </div>

            <Stagger className="story-copy">
              <StaggerItem as="p" className="eyebrow">
                Notre esprit
              </StaggerItem>
              <StaggerItem as="h2">
                Le plaisir du frais, tout simplement.
              </StaggerItem>
              <StaggerItem as="p">
                Fresh &amp; Sweet Box réunit les envies salées et sucrées dans
                un format pratique, coloré et facile à emporter. Une pause toute
                simple, préparée avec attention.
              </StaggerItem>
              <StaggerItem as="ul" className="story-points">
                {STORY_POINTS.map((point) => (
                  <li key={point}>
                    <i className="check" aria-hidden="true">
                      ✓
                    </i>
                    {point}
                  </li>
                ))}
              </StaggerItem>
              <StaggerItem>
                <a className="text-link" href="#contact">
                  Venez nous découvrir <span aria-hidden="true">→</span>
                </a>
              </StaggerItem>
            </Stagger>
          </Reveal>
        </section>

        {/* Appel à l'action -------------------------------------------- */}
        <section className="shell closing-wrap" id="contact">
          <Stagger className="closing">
            <StaggerItem as="h2">Une envie de frais ?</StaggerItem>
            <StaggerItem as="p">
              Votre prochaine pause gourmande commence ici.
            </StaggerItem>
            <StaggerItem className="closing-action">
              <a className="button" href="#carte">
                Voir les envies du jour <span aria-hidden="true">→</span>
              </a>
            </StaggerItem>
          </Stagger>
        </section>
      </main>

      <Reveal as="footer" className="shell footer">
        <a className="logo" href="#accueil">
          <Logo size={38} />
        </a>
        <span>Salade · Jus · Dessert</span>
        <nav className="footer-links" aria-label="Liens de pied de page">
          <a href="#carte">La carte</a>
          <a href="#esprit">Notre esprit</a>
          <a href="#contact">Contact</a>
        </nav>
        <span>© 2026 Fresh &amp; Sweet Box</span>
      </Reveal>
    </>
  );
}
