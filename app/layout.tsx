import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fresh & Sweet Box — Le frais fait maison",
  description:
    "Fresh & Sweet Box : salades fraîches, jus et douceurs à emporter.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Fresh & Sweet Box",
    title: "Fresh & Sweet Box — Le frais fait maison",
    description:
      "Des fruits colorés, des salades croquantes et des douceurs à savourer.",
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f6ec",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <body>
        {/* reducedMotion="user" : neutralise toutes les animations de la page
            si le système le demande. */}
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
