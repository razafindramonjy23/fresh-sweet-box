import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { Topline } from "@/components/layout/Topline";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SkipLink } from "@/components/ui/SkipLink";
import { SITE } from "@/content";
import "@/styles/globals.css";

export const metadata: Metadata = {
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
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={SITE.lang} data-scroll-behavior="smooth">
      <body>
        {/* MotionProvider pose reducedMotion="user" : il neutralise toutes
            les animations de la page si le système le demande. */}
        <MotionProvider>
          <SplashScreen />

          <SkipLink />
          <Topline />
          <SiteHeader />

          <main id="contenu" tabIndex={-1}>
            {children}
          </main>

          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
