/**
 * Identité et textes transverses du site.
 *
 * Tout ce qui est réutilisé par plusieurs composants (ou par les métadonnées)
 * vit ici ; la prose propre à une section reste dans la section.
 */
export const SITE = {
  name: "Fresh & Sweet Box",
  lang: "fr",
  locale: "fr_FR",
  title: "Fresh & Sweet Box — Le frais fait maison",
  description:
    "Fresh & Sweet Box : salades fraîches, jus et douceurs à emporter.",
  socialDescription:
    "Des fruits colorés, des salades croquantes et des douceurs à savourer.",
  /** Bandeau fin tout en haut de la page. */
  topline: "FRAIS, COLORÉ ET PRÉPARÉ AVEC SOIN · À EMPORTER",
  tagline: "Bar à salade, jus et desserts à emporter.",
  quote: "« Eat Healthy, Eat more Freshness and Sweetness »",
  themeColor: "#f8f6ec",
  copyrightYear: 2026,
  logo: {
    src: "/images/logo-fsb.png",
    /** Dimensions réelles du fichier : `next/image` en a besoin. */
    width: 320,
    height: 298,
  },
} as const;
