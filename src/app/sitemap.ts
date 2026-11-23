import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

/** Une seule route : la page d'accueil. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: config.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
