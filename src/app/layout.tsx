import type { Metadata, Viewport } from "next";
import { ActionBar } from "@/components/layout/ActionBar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { Topline } from "@/components/layout/Topline";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import { SkipLink } from "@/components/ui/SkipLink";
import { config } from "@/lib/config";
import { SITE } from "@/content";
import { SPLASH_INIT_SCRIPT } from "@/lib/splash";
import "@/styles/globals.css";

export const metadata: Metadata = {
  /* Rend absolues les URL des métadonnées, dont l'image de partage
     (`opengraph-image.jpg`, prise automatiquement dans `src/app/`). */
  metadataBase: new URL(config.siteUrl),
  title: SITE.title,
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.socialDescription,
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  colorScheme: "light",
};

/**
 * Ossature commune : l'habillage (bandeau, en-tête, pied de page) vit ici,
 * `page.tsx` ne contient que les sections de contenu.
 *
 * `suppressHydrationWarning` sur `<html>` : le script d'amorçage pose
 * `data-splash-seen` avant l'hydratation, le client diffère donc
 * **volontairement** du HTML du serveur. C'est le mécanisme prévu par React
 * pour ce cas, et il ne couvre que les attributs de cet élément précis —
 * pas son contenu, où un vrai écart resterait signalé.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={SITE.lang}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body>
        {/* Marque l'écran d'ouverture comme déjà vu AVANT le premier rendu :
            le CSS le masque alors d'emblée, sans clignotement. */}
        <script
          dangerouslySetInnerHTML={{
            __html: SPLASH_INIT_SCRIPT,
          }}
        />
        <StructuredData />
        {/* MotionProvider pose reducedMotion="user" : il neutralise toutes
            les animations de la page si le système le demande. */}
        <MotionProvider>
          <SplashScreen />
          <ScrollProgress />

          <SkipLink />
          <Topline />
          <SiteHeader />

          <main id="contenu" tabIndex={-1}>
            {children}
          </main>

          <SiteFooter />
          <ActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}
