# Fresh & Sweet Box — Landing page

Page unique React + Framer Motion (Vite), construite en **un seul fichier HTML**
(images incluses) pour être déposée telle quelle chez n'importe quel hébergeur.

```bash
npm install
npm run dev      # aperçu local
npm run build    # génère dist/index.html — un seul fichier, images inlinées
```

| Fichier | Rôle |
|---|---|
| `src/App.jsx` | Contenu, sections, animations |
| `src/styles.css` | Design system (tokens) puis composants |
| `src/assets/` | Logo et photos |
| `index.html` | `<head>`, métadonnées SEO et Open Graph, polices |

## Parti pris : épuré

La page tient en **8 sections**, une idée par section, beaucoup de blanc.
Les décors ont été retirés volontairement — pas de carrousel automatique, pas
de fruits flottants, pas de bandeau défilant, pas de cartes multicolores.
Ce qui porte la page, ce sont les photos et le rose.

Avant d'ajouter un élément, vérifier qu'il remplace quelque chose.

## Design system

Tokens CSS en deux couches en haut de `src/styles.css` : primitives
(`--pink-600`, `--g-600`…) puis sémantiques (`--primary`, `--text-muted`,
`--border`…). Les composants n'utilisent que la couche sémantique — changer la
marque se fait en haut du fichier, pas dans les composants.

- **Rose framboise** directeur : `--pink-600` pour les actions et les aplats
  pleins (barre d'annonce, bloc de conversion), `--pink-50` pour les fonds
  doux et le pied de page.
  **Pas de grenat / bordeaux en aplat** : `--pink-800` et `--pink-900` ne
  servent qu'à teinter les ombres.
- **Volume** : `--sh-3d` empile trois ombres portées, et le disque du hero pose
  une ombre de contact au sol. C'est l'ombre de contact qui donne l'effet
  « contenant posé », pas l'ombre portée seule.
- **Typographie** : Poppins (titres, géométrique arrondie) et DM Sans (texte).
  Poppins est nettement plus large que l'ancien Fraunces : en touchant à la
  taille des titres, repasser par `clamp()` plutôt que par une valeur fixe.

## Animation

Tout passe par Framer Motion, avec un vocabulaire unique défini en haut de
`src/App.jsx` : `group` (conteneur), `fadeUp`, `zoomIn`, `pressable`,
`tappable`, `revealGroup`.

Trois règles qui expliquent la structure du code :

- **La cadence vient du conteneur** (`staggerChildren`), jamais d'un délai
  calculé par enfant. Ajouter un élément dans une liste ne demande donc aucune
  renumérotation.
- **Les gestes sont des objets** (`whileHover={{ y: -2 }}`), pas des variantes
  nommées avec `initial`. Un `initial` sur un enfant couperait l'héritage
  d'état depuis le conteneur et l'élément n'apparaîtrait jamais.
- **Un `y` ne porte qu'une animation.** Le bol du hero a deux couches : le
  parallaxe de défilement sur l'enveloppe, la lévitation sur l'image. Même
  principe pour les images en parallaxe, agrandies en CSS (`scale: 1.12`)
  pour que le déplacement ne découvre pas de bande vide.

`MotionConfig reducedMotion="user"` neutralise l'ensemble — boucles infinies
comprises — si le système le demande.
- **Ratios d'images** : les conteneurs `__media` sont en `aspect-ratio` avec
  l'image en `position: absolute`. Sans l'absolu, une image en flux impose son
  ratio naturel et les cartes se désalignent.

## Informations réelles intégrées

Reprises de la page Facebook officielle (capture de novembre 2026) :

- Slogan : « Eat more color, more Freshness and Sweetness »
- Téléphone : **032 63 796 87**
- Instagram : **@fresh_sweet_box** (pseudo lu sur le sac kraft)
- Logo rose + vert (`src/assets/logo-rose.png`), extrait de la photo de profil

Elles sont regroupées dans l'objet `CONTACT` en haut de `src/App.jsx`.

## Accessibilité

Points tenus, à ne pas casser :

- Cibles tactiles ≥ 44 × 44 px.
- Contraste ≥ 4,5:1 partout, y compris les mentions « à compléter »
  (`--text-muted`, pas `--text-subtle`) et le texte blanc sur framboise.
- Rail des favoris utilisable au clavier (région focusable) et aux boutons,
  pas seulement au glisser.
- FAQ en accordéon `aria-expanded` / `aria-controls`.
- Lien d'évitement, focus visible, `prefers-reduced-motion` respecté.

## À compléter avant mise en ligne

Ce qui est inconnu est affiché en italique dans la page, jamais inventé :

- **Adresse et horaires** (pied de page + dernière question de la FAQ).
- **E-mail** et **lien Facebook** (le pseudo Instagram, lui, est renseigné).
- **Avis clients** : trois emplacements vides dans la section « Ils en parlent ».
- **`og:image`** dans `index.html` pour le partage social.
- **Vérifier le lien Instagram** : il est déduit du pseudo imprimé sur le sac,
  pas copié depuis le profil.

## Note sur les photos

`src/assets/p-*.jpg` sont de vraies photos de la marque, redimensionnées à
900 px et recompressées.

Parmi les images fournies, **quatre semblaient générées par IA** (compositions
sur fond crème, trio salade/smoothie/bol) : le texte du logo y est illisible et
déformé. Elles n'ont pas été utilisées — afficher un logo déformé sur son
propre site est un risque de marque. Si vous y tenez, elles conviendraient en
petit format, ou mieux : refaites ces prises de vue avec le vrai logo.
