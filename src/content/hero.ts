/**
 * Calques décoratifs de la composition 3D du hero.
 *
 * Deux des trois calques sont en place (`splash-juice`, `leaf-mint`), détourés
 * à partir des rendus Gemini. **Les gouttelettes manquent toujours** : le
 * générateur avait peint le damier de transparence *à l'intérieur* de chaque
 * goutte, qui la réfractait — aucun détourage ne rattrape cela.
 *
 * La composition « publicité fruitée »
 * demandée (éclaboussure de jus derrière les fruits, gouttelettes en
 * suspension, feuilles fraîches) suppose des visuels détourés sur fond
 * transparent, que l'on ne peut ni inventer ni imiter correctement en CSS :
 * un dégradé arrondi ne ressemble pas à une éclaboussure, il ressemble à un
 * dégradé arrondi.
 *
 * Le composant <HeroVisual> est prêt à les recevoir : dès qu'un fichier est
 * déposé dans `public/images/decor/` et déclaré ici, son calque apparaît à la
 * bonne profondeur, avec sa parallaxe et sa lévitation. Tant que la liste est
 * vide, le hero affiche la composition actuelle, sans trou ni cadre fantôme.
 *
 * Fichiers attendus (PNG ou WebP, fond transparent, 2× la taille affichée) :
 *
 * | fichier                      | rôle                         | ~taille  |
 * | ---------------------------- | ---------------------------- | -------- |
 * | decor/splash-juice.webp      | éclaboussure derrière le bol | 1200×900 |
 * | decor/droplets.webp          | gouttelettes en suspension   | 900×900  |
 * | decor/leaf-mint.webp         | feuille de menthe            | 400×400  |
 *
 * `depth` est la profondeur du calque en pixels dans la scène : négatif =
 * derrière le cadre photo, positif = devant. `float` est l'amplitude de la
 * lévitation.
 */
export type HeroDecor = {
  src: string;
  /** Décoratif : toujours `alt=""`, d'où l'absence du champ. */
  width: number;
  height: number;
  /** Profondeur dans la scène, en pixels. Négatif = derrière la photo. */
  depth: number;
  /** Position, en pourcentage du conteneur. */
  top: string;
  left: string;
  /** Amplitude de la lévitation, en pixels. */
  float: number;
  /** Durée d'un aller-retour, en secondes. */
  duration: number;
};

export const HERO_DECOR: HeroDecor[] = [
  {
    // Éclaboussure de mangue, derrière le bol : elle déborde du cadre photo
    // par le bas et la gauche, ce qui fait lire la profondeur.
    src: "/images/decor/splash-juice.webp",
    // Nettement plus large que le cadre photo (481 px) : c'est la seule
    // façon dont les bras de la couronne ressortent de part et d'autre du
    // bol. Calée pour que sa base affleure le bas du cadre, sinon elle
    // déborderait sur le bandeau vert en dessous.
    width: 660,
    height: 425,
    depth: -40,
    top: "23%",
    left: "-28%",
    float: 6,
    duration: 11,
  },
  {
    // Feuille posée devant, en haut à gauche du cadre.
    src: "/images/decor/leaf-mint.webp",
    width: 132,
    height: 107,
    depth: 95,
    top: "8%",
    left: "6%",
    float: 9,
    duration: 8,
  },
];
