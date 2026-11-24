import {
  ContactSection,
  HeroSection,
  MenuSection,
  StorySection,
  TickerSection,
} from "@/components/sections";

/**
 * Page d'accueil : l'ordre des sections, et rien d'autre.
 *
 * L'habillage (bandeau, en-tête, pied de page) est dans `layout.tsx` ;
 * les textes des listes sont dans `src/content/`.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TickerSection />
      <MenuSection />
      <StorySection />
      <ContactSection />
    </>
  );
}
