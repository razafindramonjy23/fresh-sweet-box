import { ArrowButton } from "@/components/ui/ArrowButton";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { NAV_LINKS } from "@/content";
import { HeaderShell } from "./HeaderShell";
import { MobileNav } from "./MobileNav";

/**
 * En-tête de la page.
 *
 * Les liens sont rendus ici, côté serveur, puis passés en `children` à
 * <MobileNav> : les îlots clients de l'en-tête ne reconstruisent aucun
 * contenu. <HeaderShell> porte le comportement collant.
 */
export function SiteHeader() {
  return (
    <HeaderShell>
      <a className="logo" href="#accueil">
        <BrandLogo size={44} priority />
      </a>

      <MobileNav
        cta={
          <ArrowButton href="#carte" variant="nav">
            Découvrir la carte
          </ArrowButton>
        }
      >
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </MobileNav>
    </HeaderShell>
  );
}
