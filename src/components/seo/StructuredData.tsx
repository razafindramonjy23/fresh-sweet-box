import { buildStructuredData } from "@/lib/seo/structured-data";

/**
 * Balisage JSON-LD. Rendu côté serveur, invisible à l'écran ; c'est lui qui
 * permet à Google d'afficher téléphone et horaires dans ses résultats.
 */
export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(buildStructuredData()),
      }}
    />
  );
}
