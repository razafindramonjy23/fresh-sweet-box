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
];

/* Une carte s'illustre soit par une photo, soit par un emoji en attendant
   la sienne. Le type garde les deux possibles même quand toutes les cartes
   en place ont une photo. */
type CarteMenu = {
  theme: string;
  number: string;
  title: string;
  text: string;
  linkLabel: string;
  image?: string;
  icon?: string;
};

const MENU_CARDS: CarteMenu[] = [
  {
    theme: "salad",
    number: "01 / LE FRAIS",
    image: "/images/salade-fraiche.jpg",
    title: "Salades fraîches",
    text: "Des légumes croquants, des fruits de saison et des bols généreux.",
    linkLabel: "Découvrir les salades",
  },
  {
    theme: "juice",
    number: "02 / À SIROTER",
    image: "/images/milkshake.jpg",
    title: "Jus & milkshakes",
    text: "Des mélanges fruités et des boissons gourmandes à emporter.",
    linkLabel: "Découvrir les jus",
  },
];

/* Coordonnées réelles, reprises de l'ancienne version (`legacy-vite/`).
   Ce qui n'est pas connu reste affiché en italique, jamais inventé. */
const COMMANDER = [
  { icon: "phone", texte: "032 63 796 87", href: "tel:0326379687" },
  {
    icon: "instagram",
    texte: "@fresh_sweet_box",
    href: "https://www.instagram.com/fresh_sweet_box/",
    externe: true,
  },
  {
    icon: "facebook",
    texte: "Notre page Facebook",
    href: "https://www.facebook.com/profile.php?id=100069940306804",
    externe: true,
  },
  { icon: "mail", texte: "E-mail à compléter", aFournir: true },
];

const FOOTER_CARTE = [
  { href: "#carte", label: "Salades & bols de fruits" },
  { href: "#carte", label: "Jus & milkshakes" },
  { href: "#carte", label: "Dessert" },
  { href: "#esprit", label: "Notre esprit" },
];

/* Icônes en SVG tracé, aucune dépendance. Décoratives : le texte à côté
   porte déjà l'information. */
const ICONES: Record<string, React.ReactNode> = {
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

function Icone({ nom }: { nom: string }) {
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
      {ICONES[nom]}
    </svg>
  );
}

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
              Découvrir la carte
              <span className="button__icon" aria-hidden="true">
                →
              </span>
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
              Des salades de legumes, des fruits colorés,  et des douceurs à
              savourer. Le meilleur du frais, préparé avec soin et prêt à vous
              suivre.
            </StaggerItem>
            <StaggerItem className="hero-actions">
              <a className="button" href="#carte">
                Explorer la carte
                <span className="button__icon" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="button-ghost" href="#esprit">
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
                <div className="card-top">
                  <span className="card-number">{card.number}</span>
                  <span className="card-media" aria-hidden="true">
                    {card.image ? (
                      <Image src={card.image} alt="" width={200} height={200} />
                    ) : (
                      card.icon
                    )}
                  </span>
                </div>
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
            <div className="story-photo">
              <Parallax className="story-photo-shift" distance={22}>
                <Image
                  src="/images/bol-salade-fruits-detail.jpg"
                  alt="Gros plan du bol de fruits frais devant les collines, avec l'étiquette Fresh & Sweet Box"
                  fill
                  sizes="(max-width: 850px) 92vw, 45vw"
                />
              </Parallax>
            </div>

            <Stagger className="story-copy">
              <StaggerItem as="p" className="eyebrow">
                Notre esprit
              </StaggerItem>
              <StaggerItem as="h2">
                Le frais d’un bar à salade, le plaisir d’un bar à desserts
              </StaggerItem>
              <StaggerItem as="p" className="story-body">
                Tout part de fruits et légumes coupés le jour même. On compose
                devant vous, on garnit généreusement, et on referme le gobelet
                pour que ça voyage bien.
              </StaggerItem>
              <StaggerItem as="p" className="story-quote">
                « Eat more color, more Freshness and Sweetness »
              </StaggerItem>
              <StaggerItem>
                <a className="button" href="#carte">
                  Voir la carte
                  <span className="button__icon" aria-hidden="true">
                    →
                  </span>
                </a>
              </StaggerItem>
            </Stagger>
          </Reveal>
        </section>
      </main>

      <Reveal as="footer" className="shell footer" id="contact">
        <div className="footer-grid">
          <div className="footer-brand">
            <a
              className="footer-logo"
              href="#accueil"
              aria-label="Fresh & Sweet Box, retour en haut de page"
            >
              <Image
                src="/images/logo-fsb.png"
                alt=""
                width={320}
                height={298}
                style={{ height: 74, width: "auto" }}
              />
            </a>
            <p className="footer-tagline">
              Bar à salade, jus et desserts à emporter.
            </p>
            <p className="footer-quote">
              « Eat more color, more Freshness and Sweetness »
            </p>
          </div>

          <div>
            <h2 className="eyebrow">Contacter</h2>
            <ul className="footer-list">
              {COMMANDER.map((item) => (
                <li key={item.texte}>
                  <Icone nom={item.icon} />
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.externe
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.texte}
                    </a>
                  ) : (
                    <span className="footer-todo">{item.texte}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow">La carte</h2>
            <ul className="footer-list">
              {FOOTER_CARTE.map((item) => (
                <li key={item.label}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer-legal">© 2026 Fresh &amp; Sweet Box</p>
      </Reveal>
    </>
  );
}
