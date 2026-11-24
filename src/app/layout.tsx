import type { Metadata, Viewport } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import { ActionBar } from "@/components/layout/ActionBar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SplashScreen } from "@/components/layout/SplashScreen";
import { Topline } from "@/components/layout/Topline";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { StructuredData } from "@/components/seo/StructuredData";
import { SkipLink } from "@/components/ui/SkipLink";
import { config } from "@/lib/config";
import { SITE } from "@/content";
import { SPLASH_INIT_SCRIPT } from "@/lib/splash";
import "@/styles/globals.css";

/*
 * Les polices de la charte, téléchargées **au moment du build** et servies
 * depuis notre propre domaine : aucune requête vers Google chez le visiteur,
 * donc rien à déclarer côté vie privée et un aller-retour réseau en moins.
 *
 * Seules les variantes réellement utilisées sont demandées (relevé dans le
 * CSS) : Poppins en 600 pour les titres et le logo, 400 pour la pastille du
 * hero, et en italique 400 (bandeau) et 500 (citations). DM Sans est une
 * police variable : un seul fichier par style couvre toutes les graisses.
 *
 * `adjustFontFallback` (actif par défaut) calibre la police de repli sur les
 * métriques de la vraie : le texte ne saute pas au moment du remplacement.
 */
const display = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

/* Pas d'italique pour DM Sans : son fichier variable pèse 36 Ko et ne
   servirait qu'aux mentions « à compléter » du pied de page, qui ont
   vocation à disparaître. Le navigateur en synthétise une oblique, ce qui
   suffit largement pour un texte d'attente. */
const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

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
      className={`${display.variable} ${sans.variable}`}
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
          <SmoothScroll />
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
