import { config } from "@/lib/config";
import { toSchemaHours } from "@/lib/hours";
import {
  EMAIL,
  FACEBOOK,
  INSTAGRAM,
  OPENING_HOURS,
  PHONE,
  SITE,
} from "@/content";

/**
 * Fiche `FoodEstablishment` pour les moteurs de recherche.
 *
 * Seuls les champs réellement connus sont émis : pas d'adresse tant qu'elle
 * n'est pas fournie, pas d'horaires tant que `OPENING_HOURS` est vide, et
 * aucun `priceRange` (les prix ne sont pas publiés sur cette page).
 */
export function buildStructuredData() {
  const hours = toSchemaHours(OPENING_HOURS);

  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: SITE.name,
    description: SITE.description,
    url: config.siteUrl,
    image: `${config.siteUrl}/opengraph-image.jpg`,
    logo: `${config.siteUrl}${SITE.logo.src}`,
    telephone: PHONE.display,
    email: EMAIL.address,
    servesCuisine: ["Salades", "Jus", "Desserts"],
    sameAs: [INSTAGRAM.url, FACEBOOK.url],
    ...(hours.length > 0 ? { openingHoursSpecification: hours } : {}),
  };
}
