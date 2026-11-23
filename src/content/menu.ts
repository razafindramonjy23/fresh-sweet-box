import type { MenuItem } from "@/types";

/** Mots du bandeau défilant, sous le hero. */
export const TICKER_WORDS: string[] = [
  "Fruits choisis avec soin",
  "Salades fraîches",
  "Jus & milkshakes",
];

/** Cartes de la section « Les envies du jour ». */
export const MENU_ITEMS: MenuItem[] = [
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
