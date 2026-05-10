import type { MetadataRoute } from "next";
import glossarData from "@/data/glossar.json";
import {
  getAllLevelHubSlugs,
  isPersonaFilled,
  AUDIENCE_SLUGS,
  LEVEL_SLUGS,
} from "@/lib/personas";
import type { GlossarEintrag } from "@/components/glossar/GlossarPage";

const SITE = "https://xn--souverneki-v5a.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const glossar = glossarData as GlossarEintrag[];

  const entries: MetadataRoute.Sitemap = [];

  // Home
  entries.push({
    url: SITE,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1.0,
  });

  // Persona pages — befüllte mit höherer Priorität, leere mit niedrigerer.
  for (const audience of AUDIENCE_SLUGS) {
    for (const level of LEVEL_SLUGS) {
      const filled = isPersonaFilled(audience, level);
      entries.push({
        url: `${SITE}/souveraene-ki-fuer-${audience}-${level}`,
        lastModified: now,
        changeFrequency: filled ? "monthly" : "yearly",
        priority: filled ? 0.85 : 0.3,
      });
    }
  }

  // Level-Hub-Seiten (Meta-Pages).
  for (const hubSlug of getAllLevelHubSlugs()) {
    entries.push({
      url: `${SITE}/${hubSlug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Glossar-Index.
  entries.push({
    url: `${SITE}/glossar`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  });

  // Glossar-Einträge.
  for (const eintrag of glossar) {
    entries.push({
      url: `${SITE}/glossar/${eintrag.slug}`,
      lastModified: eintrag.zuletzt_aktualisiert
        ? new Date(eintrag.zuletzt_aktualisiert)
        : now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Vergleich-Seite (intern, niedrige Priorität).
  entries.push({
    url: `${SITE}/vergleich`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.3,
  });

  return entries;
}
