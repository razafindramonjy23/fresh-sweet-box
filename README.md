# Fresh & Sweet Box — Landing page

Page d'accueil « marché frais » en **Next.js (App Router) + TypeScript + CSS
classique**, animée avec **Framer Motion**. Une seule route, rendue en
statique ; seuls le menu mobile et les animations sont côté client.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
npm start        # sert le build
```

## Fichiers

| Chemin | Rôle |
|---|---|
| `app/page.tsx` | Toute la page : contenu, sections, données des cartes. Composant **serveur**. |
| `app/layout.tsx` | `<html lang="fr">`, métadonnées, Open Graph, `theme-color`, `MotionProvider`. |
| `app/globals.css` | Tokens puis composants, dans l'ordre des sections. |
| `components/motion.tsx` | Vocabulaire d'animation (client) : `Reveal`, `Stagger`, `StaggerItem`, `FloatIn`, `Parallax`. |
| `components/MobileNav.tsx` | Menu mobile (client) : ouverture, `Échap`, `AnimatePresence`. |
| `public/images/` | Les quatre visuels de la marque. |
| `AGENTS.md` | Généré et remis à jour automatiquement par `next dev`. À committer tel quel. |
| `legacy-vite/` | Ancienne version Vite + React, conservée pour référence. Supprimable. |

## Images

Les quatre fichiers viennent des originaux fournis par la marque. Rien n'est
généré, rien ne provient d'une URL distante.

| Fichier | Où | Traitement |
|---|---|---|
| `logo-fsb.png` | Barre de navigation et pied de page | Fond blanc **détouré** par remplissage depuis les bords, ce qui préserve les blancs intérieurs du badge. Rogné puis réduit à 320 px. |
| `bol-salade-fruits.jpg` | Visuel principal du hero | Réduit à 1100 px. |
| `cake-cafe.jpg` | Second cliché du hero (polaroid flottant) | **Recadré sur l'assiette** : la nappe rouge et le tissu zébré du cliché d'origine tiraient l'œil hors de la palette. |
| `bol-salade-fruits-detail.jpg` | Section « Notre esprit » | Réduit à 900 px. |
| `salade-fraiche.jpg` | Pastille de la carte « Salades fraîches » | **Recadré carré** et recentré sur le bol, pour tenir dans un masque rond de 100 px. |
| `milkshake.jpg` | Pastille de la carte « Jus & milkshakes » | **Recadré carré** sur le gobelet, ce qui écarte l'arrière-plan de salle. Logo lisible et correct. |

Le polaroid du hero est masqué en dessous de 600 px : à cette largeur il
entrerait en concurrence avec la pastille « faite avec amour ».

**Ajouter une photo aux deux autres cartes** : poser le fichier dans
`public/images/`, puis remplacer `icon: "🍓"` par `image: "/images/<fichier>"`
dans `MENU_CARDS` (`app/page.tsx`). Le reste suit tout seul — la pastille
accepte les deux. Prévoir un recadrage carré, le masque est rond.

La pastille `.card-media` est **dans le flux**, pas en position absolue :
c'est ce qui garantit qu'elle ne recouvre jamais le titre, quelle que soit
la largeur de la carte.

## Animation

Tout passe par `components/motion.tsx`, qui expose un vocabulaire unique.
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

## Grille

Une seule mesure gouverne toute la page, définie en haut de `globals.css` :

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
| `940px` | Le bandeau de mots-clés passe du mode réparti au mode défilant : en dessous, les quatre mots ne tiennent pas sur une ligne sans être rognés. |
| `850px` | Les colonnes s'empilent. Les liens deviennent un menu hamburger. Le visuel du hero prend une largeur propre pour que les éléments flottants restent collés au cadre. |
| `600px` | Marges à 20 px, tailles réduites, polaroid et bouton de nav masqués. |

Vérifié de 320 à 1680 px : `scrollWidth` reste égal à la largeur de la fenêtre
et aucun élément non rogné ne dépasse. Le bandeau défilant dépasse
volontairement, il est rogné par `overflow: hidden` sur `.ticker`.

`overflow-x: clip` est posé sur `<html>`, pas seulement sur `<body>` : les
décors en rotation dépassent de quelques pixels et le dépassement remonte
jusqu'à la racine.

## Typographie

Aucune police distante n'est chargée. Les grands titres utilisent **Georgia**
(serif, présente partout), le texte courant la pile **Inter → system-ui**.
C'est la pile déclarée dans la maquette de référence, et elle évite tout
décalage de mise en page au chargement.

Pour passer à une police hébergée, remplacer le token `--sans` et ajouter dans
`app/layout.tsx` :

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-sans" });
// puis : <html lang="fr" className={inter.variable} data-scroll-behavior="smooth">
```

`next/font` télécharge la police au moment du build : la machine doit pouvoir
joindre `fonts.gstatic.com`.

## Accessibilité

- Menu mobile : `aria-expanded`, `aria-controls`, fermeture à `Échap` et au
  clic sur un lien.
- Lien d'évitement, focus visible (`:focus-visible`), cibles tactiles ≥ 44 px,
  décors en `aria-hidden`, textes alternatifs descriptifs.
- `prefers-reduced-motion` neutralise animations, transitions et parallaxe ;
  le bandeau passe alors à la ligne au lieu de défiler.

Les animations d'entrée posent l'opacité à 0 dans le HTML rendu côté serveur :
le contenu n'apparaît qu'une fois la page hydratée. C'est le compromis
habituel d'une page animée ; si ce délai devient gênant, retirer `initial` des
blocs au-dessus de la ligne de flottaison (`<Stagger now>` du hero).

## Contenu : réel ou déclaré manquant

Les coordonnées affichées dans le pied de page sont **réelles**, reprises de
l'ancienne version (`legacy-vite/src/App.jsx`) :

- Téléphone **032 63 796 87**, en lien `tel:` au format local — aucun indicatif
  pays n'a été ajouté, il n'était pas fourni.
- Instagram **@fresh_sweet_box**. ⚠️ Ce pseudo a été **lu sur le sac kraft**,
  pas copié depuis le profil : à vérifier avant mise en ligne, le lien part
  vers un compte externe.
- Slogan « Eat more color, more Freshness and Sweetness ».

Ce qui n'est pas connu est affiché **en italique et nommé comme manquant**,
jamais inventé : adresse, horaires, lien Facebook, e-mail. Rien à chercher
dans le code : ces quatre entrées sont dans `OU_NOUS_TROUVER` et `COMMANDER`
en tête de `app/page.tsx`.

Il n'y a pas de section de contact dédiée : le bloc vert « Une envie de
frais ? » a été retiré. L'ancre `#contact` vit sur le `<footer>`, sinon les
liens qui la visaient (navigation, flèches des cartes) ne pointeraient plus
nulle part.

La colonne « La carte » du pied de page remplace l'entrée « Questions
fréquentes » du modèle d'origine par « Notre esprit » : il n'y a pas de FAQ
sur cette page, le lien n'aurait mené nulle part.
