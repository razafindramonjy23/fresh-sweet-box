import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  motion, AnimatePresence, MotionConfig, useScroll, useTransform,
  useMotionValueEvent,
} from 'framer-motion';

import logo from './assets/logo-rose.png';
import bowl from './assets/bowl.webp';
import phSalade from './assets/salade.webp';
import phMilk from './assets/milkshake.webp';
import phSac from './assets/sac.webp';
import pBolFruits from './assets/p-bol-fruits.jpg';
import pBolVue from './assets/p-bol-vue.jpg';
import pGobeletFruits from './assets/p-gobelet-fruits.jpg';
import pCakeCafe from './assets/p-cake-cafe.jpg';

/* ==========================================================================
   Contenu
   --------------------------------------------------------------------------
   Les informations de marque (slogan, téléphone, pseudo Instagram, nombre
   d'abonnés) proviennent de la page Facebook officielle. Tout le reste de ce
   qui n'est pas connu est marqué « à compléter » — rien n'est inventé.
   ========================================================================== */

const CONTACT = {
  phoneLabel: '032 63 796 87',
  phoneHref: 'tel:0326379687',
  instagram: 'fresh_sweet_box',
  instagramHref: 'https://www.instagram.com/fresh_sweet_box/',
  slogan: 'Eat more color, more Freshness and Sweetness',
};

const TRUST = [
  { icon: 'leaf', title: 'Fruits et légumes frais', text: 'Coupés et composés à la commande.' },
  { icon: 'cup', title: 'Prêt à emporter', text: 'Gobelets à dôme et sac kraft.' },
  { icon: 'heart', title: 'Gamme healthy', text: 'Cake in jar, cookies, pancakes, truffes.' },
];

const MENU = [
  {
    id: 'salades',
    tag: 'Bar à salade',
    title: 'Salades & bols de fruits',
    photo: pBolFruits,
    alt: 'Bol de salade de fruits : mangue, raisin, grenade, citron vert, avocat et physalis',
    text: 'Légumes croquants ou fruits de saison, composés devant vous.',
    items: ['Salade fresh & sweet box', 'Salade de betterave', 'Salade de fruit'],
  },
  {
    id: 'jus',
    tag: 'Jus',
    title: 'Jus & milkshakes',
    photo: phMilk,
    alt: 'Milkshake garni de chantilly, coulis de fraise et noix de coco',
    text: 'Smoothies 2 fruits et/ou légumes, et milkshakes généreusement garnis.',
    items: ['Smoothie', 'Milkshake fraise', 'Milkshake choco', 'Oreo', 'Ferrero Rocher', 'Kinder Bueno', 'Raffaello', 'Twix'],
  },
  {
    id: 'desserts',
    tag: 'Dessert',
    title: 'Desserts & healthy',
    photo: pCakeCafe,
    alt: 'Tranches de cake marbré, café et fruits frais sur une assiette',
    text: 'Yaourts garnis, bowls et pâtisseries maison en version healthy.',
    items: ['Yaourt au fruit', 'Yaourt garni', 'Smoothie bowl', 'Cake in Jar', 'Cookies healthy', 'Pancake healthy', 'Truffes healthy'],
  },
];

const FAVORITES = [
  { name: 'Bol de fruits frais', note: 'Mangue, grenade, raisin, physalis', img: pBolFruits },
  { name: 'Salade de fruit', note: 'Fruit du dragon, menthe, physalis', img: pGobeletFruits },
  { name: 'Milkshake gourmand', note: 'Chantilly, coulis et noix de coco', img: phMilk },
  { name: 'Salade fresh & sweet box', note: 'La salade de la maison', img: phSalade },
  { name: 'Smoothie bowl', note: 'Fruits, graines et douceur', img: bowl, contain: true },
  { name: 'Cake in jar & café', note: 'La pause sucrée du matin', img: pCakeCafe },
];

const FAQ = [
  {
    q: 'Puis-je composer moi-même ma box ?',
    a: 'Oui. Vous mélangez librement salades, jus et desserts dans une même box, glissée dans notre sac kraft et prête à partager.',
  },
  {
    q: 'Qu’est-ce que contient la gamme healthy ?',
    a: 'Le cake in jar, les cookies, les pancakes et les truffes, tous en version healthy, ainsi que les yaourts garnis et le smoothie bowl.',
  },
  {
    q: 'Les smoothies sont-ils personnalisables ?',
    a: 'Nos smoothies se composent de deux fruits et/ou légumes au choix. Les milkshakes se déclinent en fraise, chocolat, Oreo, Ferrero Rocher, Kinder Bueno, Raffaello et Twix.',
  },
  {
    q: 'Comment passer commande ?',
    a: `Par téléphone ou WhatsApp au ${CONTACT.phoneLabel}, ou en message sur Facebook et Instagram.`,
  },
  {
    q: 'Où vous trouver et à quelles heures ?',
    a: null,
    todo: 'Adresse et horaires à compléter',
  },
];

const RECIPE_COUNT = MENU.reduce((total, universe) => total + universe.items.length, 0);

/* ==========================================================================
   Animation
   --------------------------------------------------------------------------
   Un conteneur `group` cadence ses enfants (staggerChildren) : pas de délai
   calculé à la main, donc rien à renuméroter quand on ajoute un élément.
   Les gestes (survol, appui) sont des objets et non des variantes nommées,
   pour ne pas couper l'héritage d'état depuis le conteneur.
   MotionConfig reducedMotion="user" neutralise tout ça si le système le
   demande — y compris les boucles infinies.
   ========================================================================== */
const EASE = [0.22, 1, 0.36, 1];
const SPRING = { type: 'spring', stiffness: 320, damping: 26 };
const inView = { once: true, amount: 0.2 };

const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.04 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.75, ease: EASE } },
};

/* Gestes réutilisables */
const pressable = { whileHover: { y: -2 }, whileTap: { scale: 0.97 }, transition: SPRING };
const tappable = { whileHover: { scale: 1.07 }, whileTap: { scale: 0.92 }, transition: SPRING };

/* Conteneur révélé au défilement, cadencé */
const revealGroup = {
  variants: group,
  initial: 'hidden',
  whileInView: 'show',
  viewport: inView,
};

/* ==========================================================================
   Icônes — jeu SVG réduit, trait 1.75
   ========================================================================== */
function Icon({ name, size = 22, strokeWidth = 1.75 }) {
  const base = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: 'currentColor', strokeWidth, strokeLinecap: 'round',
    strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false',
  };
  switch (name) {
    case 'leaf':
      return <svg {...base}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" /><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12" /></svg>;
    case 'cup':
      return <svg {...base}><path d="M7 10h10l-1.6 11H8.6z" /><path d="M6 10a6 6 0 0 1 12 0" /><path d="M13 4l2-2" /></svg>;
    case 'heart':
      return <svg {...base}><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z" /></svg>;
    case 'bag':
      return <svg {...base}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
    case 'arrow':
      return <svg {...base} strokeWidth={2}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case 'left':
      return <svg {...base} strokeWidth={2.2}><path d="M15 18l-6-6 6-6" /></svg>;
    case 'right':
      return <svg {...base} strokeWidth={2.2}><path d="M9 18l6-6-6-6" /></svg>;
    case 'menu':
      return <svg {...base} strokeWidth={2}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case 'close':
      return <svg {...base} strokeWidth={2}><path d="M6 6l12 12M18 6 6 18" /></svg>;
    case 'check':
      return <svg {...base} strokeWidth={2.2}><path d="M4 12.5l5 5L20 6.5" /></svg>;
    case 'plus':
      return <svg {...base} strokeWidth={2}><path d="M12 5v14M5 12h14" /></svg>;
    case 'clock':
      return <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M12 7v5.2l3.2 2" /></svg>;
    case 'pin':
      return <svg {...base}><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></svg>;
    case 'phone':
      return <svg {...base}><path d="M5 3h4l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2.2 2A17 17 0 0 1 3 5.2 2 2 0 0 1 5 3Z" /></svg>;
    case 'mail':
      return <svg {...base}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.6 7 8.4 6 8.4-6" /></svg>;
    case 'instagram':
      return <svg {...base}><rect x="3" y="3" width="18" height="18" rx="5.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" /></svg>;
    case 'facebook':
      return <svg {...base}><path d="M14.5 8.5V7a1.8 1.8 0 0 1 1.8-1.8H18V2.5h-2.6A4.6 4.6 0 0 0 10.8 7v1.5H8.5V12h2.3v9.5h3.7V12h2.6l.6-3.5Z" /></svg>;
    case 'star':
      return <svg {...base} strokeWidth={1.4} fill="currentColor"><path d="m12 3.6 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.2-4.1 5.8-.8z" /></svg>;
    default:
      return null;
  }
}

function Stars({ size = 15 }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => <Icon key={i} name="star" size={size} />)}
    </span>
  );
}

function SectionHead({ eyebrow, title, lead, id }) {
  return (
    <motion.header className="section-head" {...revealGroup}>
      <motion.span className="eyebrow" variants={fadeUp}>{eyebrow}</motion.span>
      <motion.h2 className="h2" id={id} variants={fadeUp}>{title}</motion.h2>
      {lead && <motion.p className="lead" variants={fadeUp}>{lead}</motion.p>}
    </motion.header>
  );
}

/* ==========================================================================
   En-tête
   ========================================================================== */
const NAV_LINKS = [
  ['#carte', 'La carte'],
  ['#favoris', 'Favoris'],
  ['#esprit', 'Notre esprit'],
  ['#faq', 'FAQ'],
  ['#contact', 'Contact'],
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const { scrollY } = useScroll();
  const panelId = useId();

  useMotionValueEvent(scrollY, 'change', (v) => setStuck(v > 8));

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <motion.header
      className={`nav${stuck ? ' is-stuck' : ''}`}
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <div className="shell nav-in">
        <a className="brand" href="#top" aria-label="Fresh & Sweet Box — retour en haut de page">
          <motion.img
            className="brand-mark" src={logo} alt="" width="42" height="42"
            whileHover={{ rotate: 12, scale: 1.08 }} transition={SPRING}
          />
          <span className="brand-text">Fresh &amp; Sweet Box</span>
        </a>

        <nav aria-label="Navigation principale">
          <ul className="nav-links">
            {NAV_LINKS.map(([href, label]) => (
              <li key={href}><a className="nav-link" href={href}>{label}</a></li>
            ))}
          </ul>
        </nav>

        <motion.a className="btn btn--primary btn--sm" href="#commander" {...pressable}>
          Commander
        </motion.a>

        <motion.button
          {...tappable}
          type="button"
          className="icon-btn burger"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} size={21} />
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            className="mobile-panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            {NAV_LINKS.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
            ))}
            <motion.a className="btn btn--primary btn--block" href="#commander" onClick={() => setOpen(false)} {...pressable}>
              Commander
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ==========================================================================
   Hero — une seule image, beaucoup d'air, aucun carrousel
   ========================================================================== */
function Hero() {
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 700], [0, 48]);

  return (
    <section className="hero" id="top">
      <div className="shell hero-grid">
        <motion.div className="hero-copy" variants={group} initial="hidden" animate="show">
          <motion.span className="eyebrow" variants={fadeUp}>Bar à salade · Jus · Dessert</motion.span>
          <motion.h1 className="hero-title" variants={fadeUp}>
            Plus de <em className="pop">couleur</em>, plus de fraîcheur, plus de douceur
          </motion.h1>
          <motion.p className="lead" variants={fadeUp}>
            Salades composées, jus et smoothies, bols de fruits et desserts healthy.
            Préparés à la commande, servis prêts à emporter.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp}>
            <motion.a className="btn btn--primary btn--badge" href="#carte" {...pressable}>
              Découvrir la carte
              <span className="badge"><Icon name="arrow" size={17} /></span>
            </motion.a>
            <motion.a className="btn btn--ghost" href="#commander" {...pressable}>Commander</motion.a>
          </motion.div>
          <motion.p className="hero-note" variants={fadeUp}>
            <Icon name="check" size={17} />
            {RECIPE_COUNT} recettes à la carte, en trois univers
          </motion.p>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          <motion.div
            className="hero-disc"
            aria-hidden="true"
            animate={{ scale: [1, 1.035, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Deux couches : le parallaxe de défilement dehors, la lévitation
              dedans — un seul `y` ne peut pas porter les deux. */}
          <motion.div className="hero-product-wrap" style={{ y: drift }}>
            <motion.img
              className="hero-product"
              src={bowl}
              alt="Smoothie bowl Fresh & Sweet Box garni de banane, fraise, myrtille et céréales"
              width="520" height="432"
              fetchPriority="high"
              decoding="async"
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Réassurance — trois points, sans cadre
   ========================================================================== */
function TrustStrip() {
  return (
    <section className="trust-wrap" aria-label="Nos engagements">
      <motion.div className="shell trust" {...revealGroup}>
        {TRUST.map((t) => (
          <motion.div className="trust-item" key={t.title} variants={fadeUp}>
            <Icon name={t.icon} size={22} />
            <span>
              <b>{t.title}</b>
              <span>{t.text}</span>
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ==========================================================================
   La carte
   ========================================================================== */
function MenuSection() {
  return (
    <section className="section" id="carte" aria-labelledby="carte-title">
      <div className="shell">
        <SectionHead
          id="carte-title"
          eyebrow="Trois envies, une box"
          title="La carte"
          lead={`${RECIPE_COUNT} recettes réparties en trois univers, toutes servies prêtes à emporter.`}
        />

        <motion.div className="menu-grid" {...revealGroup}>
          {MENU.map((u, n) => (
            <motion.article
              key={u.id}
              id={u.id}
              className={`menu-card${n === 1 ? ' menu-card--featured' : ''}`}
              variants={fadeUp}
              whileHover="hover"
              transition={SPRING}
            >
              <div className="menu-card__media">
                <motion.img
                  src={u.photo} alt={u.alt} loading="lazy" decoding="async"
                  variants={{ hover: { scale: 1.06 } }}
                  transition={SPRING}
                />
              </div>
              <div className="menu-card__body">
                <span className="tag">{u.tag}</span>
                <h3 className="h3">{u.title}</h3>
                <p>{u.text}</p>
                <ul className="chip-list">
                  {u.items.map((item) => <li className="chip" key={item}>{item}</li>)}
                </ul>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Favoris — rail défilant (doigt, flèches, clavier)
   ========================================================================== */
function Favorites() {
  const viewport = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    sync();
    const el = viewport.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const scrollByCard = (dir) => {
    const el = viewport.current;
    if (!el) return;
    const card = el.querySelector('.fav-card');
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * dir, behavior: 'smooth' });
  };

  return (
    <section className="section section--sunken" id="favoris" aria-labelledby="favoris-title">
      <div className="shell">
        <div className="rail-head">
          <SectionHead id="favoris-title" eyebrow="Les plus demandés" title="Nos favoris" />
          <div className="rail-nav">
            <motion.button {...tappable} type="button" className="icon-btn"
              aria-label="Faire défiler vers la gauche"
              onClick={() => scrollByCard(-1)} disabled={atStart}>
              <Icon name="left" size={19} />
            </motion.button>
            <motion.button {...tappable} type="button" className="icon-btn"
              aria-label="Faire défiler vers la droite"
              onClick={() => scrollByCard(1)} disabled={atEnd}>
              <Icon name="right" size={19} />
            </motion.button>
          </div>
        </div>

        <div
          className="rail-viewport"
          ref={viewport}
          onScroll={sync}
          tabIndex={0}
          role="region"
          aria-label="Nos favoris, liste défilante horizontalement"
        >
          <motion.ul className="rail-track" {...revealGroup}>
            {FAVORITES.map((f) => (
              <motion.li
                key={f.name}
                className="fav-card"
                variants={{ ...fadeUp, hover: { y: -6, transition: SPRING } }}
                whileHover="hover"
              >
                <div className="fav-card__media">
                  <motion.img
                    src={f.img} alt={f.name} className={f.contain ? 'is-contained' : undefined}
                    loading="lazy" decoding="async"
                    variants={{ hover: { scale: f.contain ? 1.05 : 1.07 } }}
                    transition={SPRING}
                  />
                </div>
                <div className="fav-card__body">
                  <b>{f.name}</b>
                  <span>{f.note}</span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Notre esprit
   ========================================================================== */
function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // L'image est agrandie en CSS pour que le déplacement ne découvre pas de bande vide.
  const imgDrift = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section className="section" id="esprit" ref={ref} aria-labelledby="esprit-title">
      <div className="shell story">
        <motion.div
          className="story-media"
          initial="hidden"
          whileInView="show"
          viewport={inView}
          variants={zoomIn}
        >
          <motion.img
            src={pBolVue}
            alt="Bol de fruits frais posé face à la ville : mangue, raisin, grenade, citron vert et physalis"
            loading="lazy" decoding="async"
            style={{ y: imgDrift, scale: 1.14 }}
          />
        </motion.div>

        <motion.div className="story-copy" {...revealGroup}>
          <motion.span className="eyebrow" variants={fadeUp}>Notre esprit</motion.span>
          <motion.h2 className="h2" id="esprit-title" variants={fadeUp}>
            Le frais d’un bar à salade, le plaisir d’un bar à desserts
          </motion.h2>
          <motion.p className="lead" variants={fadeUp}>
            Tout part de fruits et légumes coupés le jour même. On compose devant vous,
            on garnit généreusement, et on referme le gobelet pour que ça voyage bien.
          </motion.p>
          <motion.p className="story-slogan" variants={fadeUp}>
            « {CONTACT.slogan} »
          </motion.p>
          <motion.a className="btn btn--ghost btn--badge" href="#carte" variants={fadeUp} {...pressable}>
            Voir la carte
            <span className="badge"><Icon name="arrow" size={17} /></span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Avis — gabarit vide, à remplir avec de vrais témoignages
   ========================================================================== */
function Proof() {
  return (
    <section className="section section--sunken" aria-labelledby="avis-title">
      <div className="shell">
        <SectionHead
          id="avis-title"
          eyebrow="Ils en parlent"
          title="La box vue par nos clients"
          lead="Trois emplacements prêts à recevoir vos vrais avis Google ou Facebook."
        />
        <motion.div className="review-grid" {...revealGroup}>
          {[0, 1, 2].map((n) => (
            <motion.article className="review-card" key={n} variants={fadeUp}
              whileHover={{ y: -5 }} transition={SPRING}>
              <Stars size={16} />
              <blockquote className="todo">
                « Avis client à compléter — collez ici un témoignage réel récupéré sur Google ou Facebook. »
              </blockquote>
              <footer className="todo">— Prénom et date à compléter</footer>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   FAQ
   ========================================================================== */
function Faq() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="shell faq-wrap">
        <SectionHead
          id="faq-title"
          eyebrow="Bon à savoir"
          title="Questions fréquentes"
        />

        <motion.div
          className="faq-list"
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {FAQ.map((item, n) => {
            const isOpen = open === n;
            return (
              <motion.div className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.q} variants={fadeUp}>
                <h3>
                  <button
                    type="button"
                    className="faq-q"
                    id={`${baseId}-q-${n}`}
                    aria-expanded={isOpen}
                    aria-controls={`${baseId}-a-${n}`}
                    onClick={() => setOpen(isOpen ? -1 : n)}
                  >
                    {item.q}
                    <motion.span
                      className="faq-q__ic"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <Icon name="plus" size={17} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-a"
                      id={`${baseId}-a-${n}`}
                      role="region"
                      aria-labelledby={`${baseId}-q-${n}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: EASE }}
                    >
                      <div>{item.a ?? <span className="todo">{item.todo}</span>}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Bloc de conversion
   ========================================================================== */
function FinalCta() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgDrift = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section className="section" id="commander" ref={ref} aria-labelledby="commander-title">
      <div className="shell">
        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.65, ease: EASE }}
        >
          <motion.div className="cta-copy" {...revealGroup}>
            <motion.span className="eyebrow eyebrow--light" variants={fadeUp}>Composez votre box</motion.span>
            <motion.h2 className="h2" id="commander-title" variants={fadeUp}>
              Une salade, un jus, un dessert — ou les trois
            </motion.h2>
            <motion.p variants={fadeUp}>
              Choisissez, commandez, savourez. On prépare votre box pendant ce temps
              et on la glisse dans le sac kraft de la maison.
            </motion.p>
            <motion.div className="cta-actions" variants={fadeUp}>
              <motion.a className="btn btn--light" href={CONTACT.phoneHref} {...pressable}>
                <Icon name="phone" size={18} /> {CONTACT.phoneLabel}
              </motion.a>
              <motion.a className="btn btn--onDark" href={CONTACT.instagramHref}
                target="_blank" rel="noreferrer" {...pressable}>
                <Icon name="instagram" size={18} /> @{CONTACT.instagram}
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="cta-visual" aria-hidden="true">
            <motion.img src={pGobeletFruits} alt="" loading="lazy" decoding="async"
              style={{ y: imgDrift, scale: 1.12 }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ==========================================================================
   Pied de page
   ========================================================================== */
function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="shell">
        <motion.div
          className="footer-grid"
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div className="footer-brand" variants={fadeUp}>
            <motion.img className="footer-logo" src={logo} alt="Logo Fresh & Sweet Box"
              width="60" height="60" loading="lazy"
              whileHover={{ rotate: -10, scale: 1.06 }} transition={SPRING} />
            <p>Bar à salade, jus et desserts à emporter.</p>
            <p className="footer-slogan">« {CONTACT.slogan} »</p>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>Nous trouver</h4>
            <ul>
              <li><Icon name="pin" size={17} /><span className="todo">Adresse à compléter</span></li>
              <li><Icon name="clock" size={17} /><span className="todo">Horaires à compléter</span></li>
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>Commander</h4>
            <ul>
              <li><Icon name="phone" size={17} /><a href={CONTACT.phoneHref}>{CONTACT.phoneLabel}</a></li>
              <li><Icon name="instagram" size={17} /><a href={CONTACT.instagramHref} target="_blank" rel="noreferrer">@{CONTACT.instagram}</a></li>
              <li><Icon name="facebook" size={17} /><span className="todo">Lien Facebook à compléter</span></li>
              <li><Icon name="mail" size={17} /><span className="todo">E-mail à compléter</span></li>
            </ul>
          </motion.div>

          <motion.div className="footer-col" variants={fadeUp}>
            <h4>La carte</h4>
            <ul>
              <li><a href="#salades">Salades &amp; bols de fruits</a></li>
              <li><a href="#jus">Jus &amp; milkshakes</a></li>
              <li><a href="#desserts">Desserts &amp; healthy</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Fresh &amp; Sweet Box</span>
          <span className="todo">Mentions légales à compléter</span>
        </div>
      </div>
    </footer>
  );
}

/* ==========================================================================
   Page
   ========================================================================== */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#contenu">Aller au contenu principal</a>
      <div className="canvas">
        <div className="announce">
          <div className="shell announce-in">{CONTACT.slogan}</div>
        </div>
        <Nav />
        <main id="contenu">
          <Hero />
          <TrustStrip />
          <MenuSection />
          <Favorites />
          <Story />
          <Proof />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
