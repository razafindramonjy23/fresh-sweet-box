/**
 * Réglages d'environnement.
 *
 * L'URL publique sert aux métadonnées absolues (image de partage), au
 * `sitemap.xml`, au `robots.txt` et au balisage structuré. Elle a une valeur
 * par défaut pour que le build n'échoue jamais ; la définir dans
 * l'environnement de déploiement reste préférable.
 */
const DEFAULT_SITE_URL = "https://fresh-sweet-box.zaika.mg";

export const config = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
} as const;
