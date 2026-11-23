# Fresh & Sweet Box — Landing page

Page d'accueil « marché frais » en **Next.js (App Router) + TypeScript + CSS
classique**, animée avec **Framer Motion**. Une seule route, rendue en
statique ; seuls l'écran d'ouverture, le menu mobile et les animations sont
côté client.

```bash
npm install
npm run dev         # http://localhost:3000
npm run build       # build de production
npm start           # sert le build
npm run type-check  # tsc --noEmit
npm run lint        # ESLint (next/core-web-vitals + TypeScript + Prettier)
npm run format      # Prettier
```

## Arborescence

Le code applicatif vit sous `src/` ; la racine ne garde que la configuration.
L'alias `@/*` pointe sur `src/*`.

```
src/
├── app/                    routage uniquement (App Router)
│   ├── layout.tsx          <html>, métadonnées, providers, habillage
│   ├── page.tsx            l'ordre des sections, et rien d'autre
│   ├── opengraph-image.jpg image de partage 1200×630 (+ .alt.txt)
│   ├── icon.svg            favicon (dérivé du logo SVG)
│   ├── apple-icon.png      icône iOS 180×180, opaque
│   ├── robots.ts  sitemap.ts
├── components/
│   ├── layout/             habillage présent sur toute la page
│   │   ├── SiteHeader.tsx  en-tête (serveur) + MobileNav
│   │   ├── SiteFooter.tsx  pied de page, ancre #contact
│   │   ├── FooterHours.tsx horaires, dérivés de content/hours.ts
│   │   ├── HeaderShell.tsx en-tête collant, s'efface à la descente (client)
│   │   ├── ScrollProgress.tsx fil d'avancement (client)
│   │   ├── ActionBar.tsx   barre d'action fixe mobile (client)
│   │   ├── MobileNav.tsx   menu hamburger (client)
│   │   ├── SplashScreen.tsx écran d'ouverture (client)
│   │   └── Topline.tsx     bandeau du haut
│   ├── sections/           une section de la page par fichier
│   │   ├── HeroSection.tsx
│   │   ├── TickerSection.tsx
│   │   ├── MenuSection.tsx
│   │   ├── StorySection.tsx
│   │   └── index.ts        barrel, consommé par app/page.tsx
│   ├── menu/MenuCard.tsx   carte de la grille « Les envies du jour »
│   ├── motion/             vocabulaire d'animation (client)
│   │   ├── variants.ts     EASE, DURATION, VIEWPORT, fadeUp
│   │   ├── tags.ts         table des balises animables
│   │   ├── Reveal.tsx  Stagger.tsx  StaggerItem.tsx
│   │   ├── FloatIn.tsx  Parallax.tsx
│   │   ├── WordReveal.tsx  montée des mots d'un titre
│   │   ├── MaskReveal.tsx  voile qui glisse sur une image
│   │   └── index.ts
│   ├── providers/MotionProvider.tsx   reducedMotion="user"
│   ├── seo/StructuredData.tsx         JSON-LD FoodEstablishment
│   └── ui/                 briques réutilisables, sans logique métier
│       ├── ArrowButton.tsx  BrandLogo.tsx
│       ├── BrandLoader.tsx  ContactIcon.tsx  SkipLink.tsx
├── content/                tous les textes en liste, un fichier par domaine
│   ├── site.ts             identité, métadonnées, slogan
│   ├── navigation.ts       NAV_LINKS, FOOTER_LINKS
│   ├── menu.ts             MENU_ITEMS, TICKER_WORDS
│   ├── contact.ts          PHONE, INSTAGRAM, FACEBOOK, CONTACT_LINKS
│   ├── hours.ts            OPENING_HOURS — à compléter
│   ├── actions.ts          QUICK_ACTIONS (barre mobile)
│   └── index.ts
├── lib/
│   ├── config.ts           siteUrl (NEXT_PUBLIC_SITE_URL)
│   ├── hours.ts            mise en forme + conversion schema.org
│   ├── splash.ts           clé de session + script anti-clignotement
│   ├── seo/structured-data.ts
│   └── utils/cn.ts
├── types/                  un fichier par domaine + index.ts
│   ├── navigation.ts  menu.ts  contact.ts  hours.ts  actions.ts
└── styles/
    ├── globals.css         uniquement des @import — l'ordre EST la cascade
    ├── base/               tokens, reset, responsive, reduced-motion
    ├── layout/             shell, section, header, footer
    ├── components/         button, menu-card, brand-loader, action-bar,
    │                       scroll-progress, word-reveal
    └── sections/           hero, ticker, menu, story
```

Quatre règles tenues par cette découpe :

- **`app/` ne contient que du routage.** Aucun composant d'interface n'y est
  défini ; l'habillage est dans `layout.tsx`, le contenu dans les sections.
- **Un texte en liste n'est jamais dans un composant.** Tout ce qui s'énumère
  (navigation, cartes, contacts) vit dans `src/content/` ; seule la prose
  d'une section reste dans sa section, avec son balisage (`<em>`, `<br />`).
- **Un type par domaine**, réexporté par `src/types/index.ts` : les composants
  importent depuis `@/types`, jamais depuis un fichier précis.
- **`styles/globals.css` ne contient aucune règle.** Déplacer une ligne
  d'`@import` change le rendu : les surcharges (`base/responsive.css`,
  `base/reduced-motion.css`) doivent rester en dernier.

Hors `src/` : `public/images/` (les visuels de la marque), `AGENTS.md`
(généré et remis à jour par `next dev`, à committer tel quel),
`eslint.config.mjs`, `prettier.config.mjs`, `next.config.ts`, `tsconfig.json`.

## Images

Les quatre fichiers viennent des originaux fournis par la marque. Rien n'est
généré, rien ne provient d'une URL distante.

| Fichier | Où | Traitement |
|---|---|---|
| `logo-fsb.png` | Barre de navigation et pied de page | Fond blanc **détouré** par remplissage depuis les bords, ce qui préserve les blancs intérieurs du badge. Rogné puis réduit à 320 px. |
| `bol-salade-fruits.jpg` | Visuel principal du hero | Réduit à 1100 px. |
| `milkshake-hero.jpg` | Second cliché du hero (polaroid flottant) | Cadre natif 3:4, aucun recadrage — le polaroid attend exactement ce ratio. Réduit à 480 px. |
| `bol-salade-fruits-detail.jpg` | Section « Notre esprit » | Réduit à 900 px. |
| `salade-fraiche.jpg` | Pastille de la carte « Salades fraîches » | **Recadré carré** et recentré sur le bol, pour tenir dans un masque rond de 100 px. |
| `milkshake.jpg` | Pastille de la carte « Jus & milkshakes » | **Recadré carré** sur le gobelet, ce qui écarte l'arrière-plan de salle. Logo lisible et correct. |

`cake-cafe.jpg` n'est plus référencé depuis que le polaroid du hero est passé au milkshake. Il reste dans `public/images/` ; son original n'existe plus ailleurs, d'où sa conservation.

Le polaroid du hero est masqué en dessous de 600 px : à cette largeur il
entrerait en concurrence avec la pastille « faite avec amour ».

**Ajouter une photo aux deux autres cartes** : poser le fichier dans
`public/images/`, puis remplacer `icon: "🍓"` par `image: "/images/<fichier>"`
dans `MENU_ITEMS` (`src/content/menu.ts`). Le reste suit tout seul — la pastille
accepte les deux. Prévoir un recadrage carré, le masque est rond.

La pastille `.card-media` est **dans le flux**, pas en position absolue :
c'est ce qui garantit qu'elle ne recouvre jamais le titre, quelle que soit
la largeur de la carte.

## Animation

Tout passe par `src/components/motion/`, qui expose un vocabulaire unique.
Trois règles expliquent la forme du code :

- **La cadence vient du conteneur** (`staggerChildren`), jamais d'un délai
  calculé par enfant. Ajouter un élément dans une liste ne demande aucune
  renumérotation.
- **Un enfant de `<Stagger>` ne porte pas d'`initial`** : cela couperait
  l'héritage d'état depuis le conteneur et l'élément resterait invisible.
- **Un élément n'anime qu'un seul `transform`.** Le cadre du hero a deux
  couches : `.photo-float` porte l'entrée et la lévitation, `.photo-frame`
  garde sa rotation en CSS. Même découpage pour la pastille, le polaroid et
  la photo de « Notre esprit ».

### Le répertoire

| Effet | Où | Déclencheur |
|---|---|---|
| `Reveal` | blocs isolés, pied de page | entrée dans le champ |
| `Stagger` / `StaggerItem` | hero, en-têtes de section, cartes, colonnes du pied de page | cadence du conteneur |
| `FloatIn` | photos du hero, pastilles de fruits | entrée puis lévitation continue |
| `Parallax` | photo de « Notre esprit » | défilement |
| `WordReveal` | les deux `<h2>` | entrée dans le champ |
| `MaskReveal` | photo de « Notre esprit » | entrée dans le champ |
| `HeaderShell` | en-tête | sens du défilement |
| `ScrollProgress` | fil en haut de l'écran | progression dans la page |
| Zoom au survol (CSS) | pastilles des cartes, photo de « Notre esprit » | pointeur |

Deux choix de retenue, volontaires :

- **Le `<h1>` du hero n'a pas de montée de mots.** C'est le message principal,
  au-dessus de la ligne de flottaison : il doit arriver d'un bloc. L'effet est
  réservé aux titres que l'on découvre en défilant, où l'attente fait partie
  de l'effet.
- **Aucun effet suivant le pointeur** (inclinaison 3D, halo de curseur) : sans
  équivalent au toucher, il n'existerait que pour une partie des visiteurs, et
  il entrerait en concurrence avec les `transform` déjà posés sur le hero.

L'en-tête collant n'est pas un ornement : c'est le seul endroit, sur grand
écran, où l'appel à l'action reste atteignable sans remonter — l'équivalent de
la barre d'action mobile. Il ne s'efface qu'au-delà de 180 px de défilement, et
ignore les variations de moins de 6 px pour ne pas clignoter.

`position: sticky` fonctionne ici **parce que** `html` et `body` portent
`overflow-x: clip` et non `hidden` : `clip` ne crée pas de conteneur de
défilement. Remplacer l'un par l'autre casserait l'en-tête collant.

Les composants animent **l'élément lui-même** (`as="p"`, `as="article"`…)
plutôt que d'ajouter une enveloppe, pour ne pas casser les sélecteurs enfants
du CSS (`.section-head > p`, `.story-copy > p:not(.eyebrow)`).

Un élément déjà animé par Framer Motion porte un `transform` en style inline,
qui l'emporte sur le CSS : **ne pas donner de survol en `transform` à un
élément animé**. Les boutons restent donc des enfants simples d'un
`StaggerItem`, et le survol des cartes est passé à Framer (`lift`).

`MotionProvider` pose `reducedMotion="user"` : tout est neutralisé si le
système le demande. Le `Parallax`, piloté par le défilement, ne passe pas par
là et se désactive à la main via `useReducedMotion()`.

## Écran d'ouverture

`SplashScreen` (client) couvre la page avec le nom de la marque pendant
**1 s**, puis s'efface en fondu de 0,65 s. L'animation est entièrement en CSS
(`src/styles/components/brand-loader.css`) ; `BrandLoader` ne fait que poser
le délai de chaque lettre, en fraction de `--loader-letter-window`.

| Token | Valeur | Rôle |
|---|---|---|
| `--loader-letter-window` | `0.36s` | Étalement des lettres (délai de la dernière) |
| `--loader-letter-duration` | `0.5s` | Montée d'une lettre |
| `--loader-sweep` | `2.4s` | Un passage du halo coloré |

Les lettres **montent une fois et restent posées** (`forwards`) : le nom est
entièrement lisible au bout de ~0,86 s, donc avant le début du fondu. Le halo
fait un passage lent et continu, dont l'opacité s'allume et s'éteint dans la
même règle — pas d'aller-retour sec. Les couleurs sont celles de la charte
(`--peach`, `--berry`, `--leaf`, `--sage`, `--deep`), découpées en lamelles
verticales de 1 px par un `mask` répété.

L'écran ne s'affiche **qu'une fois par session** : un script d'amorçage
(`src/lib/splash.ts`, posé par le layout) lit `sessionStorage` et place
`data-splash-seen` sur `<html>` **avant la première peinture**, ce que le CSS
utilise pour masquer l'écran d'emblée. Au retour sur la page, rien ne
clignote et rien n'est retardé.

⚠️ Poser cet attribut avant l'hydratation fait **volontairement** diverger le
client du HTML rendu par le serveur. D'où `suppressHydrationWarning` sur
`<html>` : c'est le mécanisme prévu par React pour ce cas, et il ne couvre
que les attributs de cet élément précis — un vrai écart dans le contenu
resterait signalé. Sans lui, la console affiche une erreur d'hydratation à
chaque rechargement. Même raison, même remède, que les scripts de thème
sombre.

Pour changer la durée d'affichage : `VISIBLE_MS` dans `SplashScreen.tsx`.
Pour supprimer l'écran : retirer `<SplashScreen />` de `src/app/layout.tsx`.

Le contenu de la page est **déjà dans le DOM** sous l'écran : rien n'est
différé pour les moteurs de recherche. Sous `prefers-reduced-motion`, l'écran
est retiré immédiatement et les lettres ne clignotent pas.

## Conversion : horaires, barre d'action, partage

**Les horaires** se décrivent dans `src/content/hours.ts`, et **uniquement
là** :

```ts
export const OPENING_HOURS: OpeningRange[] = [
  { days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    opens: "08:00", closes: "18:00" },
  { days: ["saturday"], opens: "09:00", closes: "17:00" },
];
```

De cette seule liste découlent l'étiquette des jours (« Lundi – Vendredi »,
abrégée dès trois jours consécutifs), l'horaire affiché, la ligne
« Fermé : Dimanche » pour les jours non couverts, et le balisage
`openingHoursSpecification` que Google lit. Tant que la liste est **vide**,
le pied de page affiche « Horaires à compléter » en italique et le balisage
n'annonce aucun horaire : rien n'est inventé.

**La barre d'action** (`ActionBar`) est fixée en bas de l'écran sur mobile,
masquée au-delà de 850 px, et n'apparaît qu'après 420 px de défilement —
tant que les boutons du hero sont visibles, elle ferait doublon. Son contenu
vient de `QUICK_ACTIONS` (`src/content/actions.ts`) : **Appeler** et
**Instagram**. Pour ajouter WhatsApp, une ligne suffit, le gabarit est en
commentaire dans le fichier.

**L'image de partage** est `src/app/opengraph-image.jpg` (1200 × 630), prise
automatiquement par Next pour `og:image` et `twitter:image`. Elle a été
composée avec `sharp` : panneau crème avec le badge — qui porte déjà le nom
et la baseline, donc **aucun texte n'y est rendu avec une police** — et la
photo du hero à droite. Pour la régénérer après un changement de visuel, il
faut recomposer les deux calques ; le texte alternatif vit dans
`opengraph-image.alt.txt`.

**Les icônes.** `src/app/icon.svg` est dérivé de
`public/images/fresh_sweet_box_logo.svg` : badge et gobelet repris **tels
quels**, fond blanc et textes retirés (illisibles à 16 px), gobelet recentré
et agrandi (×2,4) pour occuper le disque. `apple-icon.png` en est la version
rastérisée 180 × 180, aplatie sur blanc — iOS n'accepte pas la transparence.
Next câble les deux automatiquement depuis `src/app/`.

Le favicon **change de couleur avec le thème du navigateur**, via une règle
`@media (prefers-color-scheme: dark)` portée par le SVG lui-même. La raison
est mesurée, pas esthétique :

| | crème `#f8f6ec` | blanc | onglet sombre `#202124` |
|---|---|---|---|
| vert `#008037` | 4,68:1 ✓ | 5,07:1 ✓ | 3,18:1 ✓ |
| rose `#FF66C4` | 2,44:1 ✗ | 2,64:1 ✗ | 6,09:1 ✓ |

Le rose de la variante fournie passe sous le seuil de **3:1** exigé pour un
élément graphique porteur de sens (WCAG 1.4.11) sur fond clair, mais il est
nettement meilleur que le vert sur fond sombre. D'où le vert par défaut et le
rose en thème sombre. La règle utilise des sélecteurs d'attribut
(`[fill="#008037"]`), qui l'emportent sur les attributs de présentation ; un
navigateur qui l'ignore garde le vert, qui passe partout.

Les deux SVG fournis (`fresh_sweet_box_logo.svg` et
`..._rose_sur_blanc.svg`) sont **le même dessin**, seule la couleur diffère.

⚠️ Aucun des deux **ne remplace** `logo-fsb.png` dans l'en-tête et le
pied de page : son nom et sa baseline sont du **texte vivant**
(`font-family: Oswald, Bebas Neue, Arial Narrow, Impact`), aucune de ces
polices n'étant chargée par la page. Les lettres changeraient donc de dessin
d'un appareil à l'autre — inacceptable pour un logo. Il porte aussi un fond
blanc opaque de 850 × 850, qui ferait un carré blanc sur le crème. Pour
l'utiliser à la place du PNG : réexporter en **vectorisant les textes**
(« convertir en contours ») et supprimer le `<rect>` de fond. Son manifeste
C2PA pèse par ailleurs 40 % du fichier.

**Le balisage structuré** (`src/lib/seo/structured-data.ts`) n'émet que les
champs réellement connus : pas d'adresse tant qu'elle n'est pas fournie, pas
d'horaires tant que la liste est vide, et **aucun `priceRange`** — les prix
ne sont pas publiés sur cette page.

**L'URL publique** vient de `NEXT_PUBLIC_SITE_URL` (voir `.env.example`), avec
`https://fresh-sweet-box.zaika.mg` par défaut. Elle sert aux métadonnées
absolues, au `sitemap.xml`, au `robots.txt` et au JSON-LD.

## Grille

Une seule mesure gouverne toute la page, définie dans
`src/styles/base/tokens.css` :

```css
--measure: 1200px;                      /* largeur du contenu */
--gutter: clamp(20px, 5.4vw, 78px);     /* marges latérales, 20px sur mobile */
```

`.shell` applique les deux. Barre de navigation, hero, sections et pied de
page sont tous des `.shell` ou des enfants directs de `.shell` : ils
s'alignent donc exactement sur les mêmes bords. **Ne pas donner de `max-width`
propre à un bloc interne** — c'est ce qui crée les décalages.

Deux pièges rencontrés, tous deux liés aux éléments de grille :

- `margin-inline: auto` sur un élément de grille **annule l'étirement** et le
  dimensionne sur son contenu. Il faut lui joindre `width: 100%`.
- La taille minimale automatique d'un élément de grille vaut sa taille
  min-content : un enfant plus large que la colonne pousse le conteneur et le
  décentre. D'où `width: min(100%, 410px)` sur `.photo-frame`.

## Points de rupture

| Seuil | Ce qui change |
|---|---|
| `940px` | Le bandeau de mots-clés passe du mode réparti au mode défilant : en dessous, les quatre mots ne tiennent pas sur une ligne sans être rognés. Le séparateur ayant été retiré, c'est un `padding-inline-end` posé sur **tous** les éléments, dernier compris, qui porte l'espacement — c'est lui qui garde la boucle périodique. |
| `850px` | Les colonnes s'empilent. Les liens deviennent un menu hamburger. Le visuel du hero prend une largeur propre pour que les éléments flottants restent collés au cadre. |
| `600px` | Marges à 20 px, tailles réduites, polaroid et bouton de nav masqués. |

Vérifié de 320 à 1680 px : `scrollWidth` reste égal à la largeur de la fenêtre
et aucun élément non rogné ne dépasse. Le bandeau défilant dépasse
volontairement, il est rogné par `overflow: hidden` sur `.ticker`.

`overflow-x: clip` est posé sur `<html>`, pas seulement sur `<body>` : les
décors en rotation dépassent de quelques pixels et le dépassement remonte
jusqu'à la racine.

## Typographie

Les piles sont **celles du site en ligne** (`fresh-sweet-box.zaika.mg`) :
Poppins pour les titres, DM Sans pour le texte.

Les deux sont **chargées par `next/font/google`** depuis
`src/app/layout.tsx` : Next les télécharge **au moment du build** et les sert
depuis notre propre domaine. Aucune requête vers Google chez le visiteur —
donc rien à déclarer côté vie privée, et un aller-retour réseau en moins.
`adjustFontFallback` calibre la police de repli sur les métriques de la
vraie, ce qui évite le saut de texte au remplacement.

Seules les variantes réellement utilisées sont demandées, relevées dans le
CSS :

| Police | Variantes | Pourquoi |
|---|---|---|
| Poppins | 600 normal | titres `h1`/`h2`/`h3`, logo, écran d'ouverture |
| Poppins | 400 normal | pastille « faite avec amour » du hero |
| Poppins | 400 + 500 italique | bandeau de mots-clés, citations |
| DM Sans | variable, normal | tout le texte courant (une seule police couvre 400 à 700) |

**Pas d'italique pour DM Sans** : son fichier variable pèse 36 Ko et ne
servirait qu'aux mentions « à compléter », qui ont vocation à disparaître.
Le navigateur en synthétise une oblique, suffisante pour un texte d'attente.
Total préchargé : **84 Ko**, contre 123 Ko si l'on prenait tout.

Réglages des titres repris tels quels du site : **graisse 600**, approche
`-0.02em`, interlignage `1.14`, `text-wrap: balance`. Les citations sont en
display **italique 500**. Pas de serif sur la page.

### Deux roses, pas un

Comme sur le site en ligne (`pink-600` pour les aplats, `pink-700` pour le
texte), la page distingue :

| Token | Valeur | Usage | Contraste sur crème |
|---|---|---|---|
| `--berry` | `#d94e88` | Aplats : boutons, pastilles, points | 3,59:1 — **jamais en texte courant** |
| `--berry-text` | `#bb3669` | Surtitres, citations, accent du titre | 5,04:1 ✓ |

C'est ce qui règle le défaut signalé plus tôt : la framboise d'origine
plafonnait sous le seuil de 4,5:1 dès qu'elle portait du texte.

Le blanc sur `--berry` des boutons tient parce que le texte y est à **19 px /
700**, donc « grand texte » (seuil 3:1). Le bouton de la barre de navigation,
à 14 px, reste en dessous.

## Poids de la page

Mesuré sur le build de production, en transfert réel (gzip) :

| | gzip |
|---|---|
| JavaScript | 219 Ko |
| Polices | 84 Ko |
| HTML | 8 Ko |
| CSS | 4 Ko |

Répartition du JavaScript : **168 Ko sont React et le socle Next**
(react-dom, routeur, ordonnanceur) — le plancher d'une application App
Router. Framer Motion **et** tout le code de la page ne pèsent ensemble que
47 Ko.

`LazyMotion` (dans `MotionProvider`) ne charge que le jeu `domAnimation` au
lieu du moteur complet : 234 → 219 Ko, sans rien changer à l'écran. C'est
pour cette raison que les composants s'écrivent `m.div` et non `motion.div`,
et que `strict` est activé — un oubli rechargerait le moteur entier en
silence.

Aller plus bas supposerait de retirer Framer Motion et de réécrire les
animations en CSS (défilement natif + `IntersectionObserver`), pour environ
35 à 40 Ko de moins. Le plancher Next, lui, ne bouge pas.

## Accessibilité

- Menu mobile : `aria-expanded`, `aria-controls`, fermeture à `Échap` et au
  clic sur un lien.
- Lien d'évitement, focus visible (`:focus-visible`), cibles tactiles ≥ 44 px,
  décors en `aria-hidden`, textes alternatifs descriptifs.
- `prefers-reduced-motion` neutralise animations, transitions et parallaxe ;
  le bandeau passe alors à la ligne au lieu de défiler.

`WordReveal` découpe le titre en mots, chacun derrière un masque
`overflow: hidden`. Ce masque couperait les jambages des lettres descendantes
(j, p, g) : une réserve de `0.22em` en bas, reprise par une marge négative,
les laisse passer sans changer l'interligne.

`MaskReveal` fait glisser un **voile** — un élément réel animé en
`transform` — et non un `clip-path` : **Framer Motion n'anime pas
`clip-path: inset(...)`**, il laisse la valeur initiale en place et l'image
ne réapparaît jamais. Vérifié dans le navigateur, pas supposé.

Conséquence à ne pas perdre de vue : sous `prefers-reduced-motion`, le voile
**n'est pas rendu du tout**. S'il l'était, Framer neutraliserait sa
translation et il resterait en place, masquant l'image pour de bon.

Les animations d'entrée posent l'opacité à 0 dans le HTML rendu côté serveur :
le contenu n'apparaît qu'une fois la page hydratée. C'est le compromis
habituel d'une page animée ; si ce délai devient gênant, retirer `initial` des
blocs au-dessus de la ligne de flottaison (`<Stagger now>` du hero).

## Contenu : réel ou déclaré manquant

Les coordonnées affichées dans le pied de page sont **réelles**, reprises de
l'ancienne version Vite (supprimée lors de la restructuration ; elle reste
dans l'historique git, commit `b185401`) :

- Téléphone **032 63 796 87**, en lien `tel:` au format local — aucun indicatif
  pays n'a été ajouté, il n'était pas fourni.
- Instagram **@fresh_sweet_box**. ⚠️ Ce pseudo a été **lu sur le sac kraft**,
  pas copié depuis le profil : à vérifier avant mise en ligne, le lien part
  vers un compte externe.
- Facebook : lien **fourni directement par le client**, donc fiable,
  contrairement au pseudo Instagram.
- Slogan « Eat Healthy, Eat more Freshness and Sweetness ».

Ce qui n'est pas connu est affiché **en italique et nommé comme manquant**,
jamais inventé (champ `pending`) : il ne reste que l'e-mail. Rien à chercher
dans le code : ces quatre entrées sont dans `CONTACT_LINKS`
(`src/content/contact.ts`).

Il n'y a pas de section de contact dédiée : le bloc vert « Une envie de
frais ? » a été retiré. L'ancre `#contact` vit sur le `<footer>`, sinon les
liens qui la visaient (navigation, flèches des cartes) ne pointeraient plus
nulle part.

La colonne « La carte » du pied de page remplace l'entrée « Questions
fréquentes » du modèle d'origine par « Notre esprit » : il n'y a pas de FAQ
sur cette page, le lien n'aurait mené nulle part.
