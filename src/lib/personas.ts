import personasData from "@/data/personas.json";
import glossarData from "@/data/glossar.json";
import type { GlossarEintrag } from "@/components/glossar/GlossarPage";

// ============================================================
// Slugs
// ============================================================

export const AUDIENCE_SLUGS = [
  "unternehmen",
  "politik",
  "technik",
  "forschung",
] as const;
export type AudienceSlug = (typeof AUDIENCE_SLUGS)[number];

export const LEVEL_SLUGS = ["einsteiger", "kenner", "experten"] as const;
export type LevelSlug = (typeof LEVEL_SLUGS)[number];

export type ComboKey = `${AudienceSlug}-${LevelSlug}`;

// URL-Slug für die drei Level-Hubs (Meta-Pages).
export const LEVEL_HUB_SLUGS = {
  einsteiger: "souveraene-ki-einstieg",
  kenner: "souveraene-ki-ueberblick",
  experten: "souveraene-ki-vertiefung",
} as const satisfies Record<LevelSlug, string>;

// ============================================================
// Types — spiegeln src/data/personas.json
// ============================================================

export interface Painpoint {
  icon: string;
  headline: string;
  body: string;
}

export interface UseCase {
  titel: string;
  kontext: string;
  was_souveraen: string;
  beispiel: string;
}

export interface Pillar {
  name: string;
  frage: string;
  body: string;
}

export interface FAQ {
  frage: string;
  antwort: string;
}

export interface SourceStat {
  claim: string;
  quelle: string;
  link?: string;
}

export interface Audience {
  slug: AudienceSlug;
  label: string;
  langform: string;
  primary_keyword: string;
  secondary_keywords: string[];
  hero_lead: string;
  einordnung_headline: string;
  einordnung: string[];
  painpoints: Painpoint[];
  use_cases: UseCase[];
  glossar_terms: string[];
}

export interface Level {
  slug: LevelSlug;
  label: string;
  badge: string;
  knowledge_assumption: string;
  tone: string;
  pillars_intro: string;
  pillars: Pillar[];
}

export interface Combo {
  meta_title: string;
  meta_description: string;
  h1: string;
  h2: string;
  faqs: FAQ[];
  stats: SourceStat[];
}

export interface LevelHub {
  meta_title: string;
  meta_description: string;
  h1: string;
  h2: string;
  lead: string;
  intro_headline: string;
  intro_paragraphs: string[];
  faqs: FAQ[];
}

interface PersonasData {
  audiences: Record<AudienceSlug, Audience | null>;
  levels: Record<LevelSlug, Level>;
  combos: Record<ComboKey, Combo | null>;
  level_hubs: Record<LevelSlug, LevelHub | null>;
}

const data = personasData as unknown as PersonasData;
const glossar = glossarData as GlossarEintrag[];

// ============================================================
// URL Helpers
// ============================================================

export const SITE_ORIGIN = "https://xn--souverneki-v5a.de";

export function personaSlug(audience: AudienceSlug, level: LevelSlug): string {
  return `souveraene-ki-fuer-${audience}-${level}`;
}

export function personaUrl(audience: AudienceSlug, level: LevelSlug): string {
  return `${SITE_ORIGIN}/${personaSlug(audience, level)}`;
}

export function levelHubSlug(level: LevelSlug): string {
  return LEVEL_HUB_SLUGS[level];
}

export function levelHubUrl(level: LevelSlug): string {
  return `${SITE_ORIGIN}/${levelHubSlug(level)}`;
}

// ============================================================
// Resolved content shapes
// ============================================================

export interface PersonaCrossLink {
  href: string;
  label: string;
  description: string;
}

export interface ResolvedPersona {
  audience: AudienceSlug;
  level: LevelSlug;
  slug: string;
  url: string;
  // Audience block
  audience_label: string;
  audience_langform: string;
  primary_keyword: string;
  secondary_keywords: string[];
  hero_lead: string;
  einordnung_headline: string;
  einordnung: string[];
  painpoints: Painpoint[];
  use_cases: UseCase[];
  glossar_links: GlossarRef[];
  // Level block
  level_label: string;
  level_badge: string;
  level_tone: string;
  knowledge_assumption: string;
  pillars_intro: string;
  pillars: Pillar[];
  // Combo block
  meta_title: string;
  meta_description: string;
  h1: string;
  h2: string;
  faqs: FAQ[];
  stats: SourceStat[];
  // Cross-links
  cross_levels: PersonaCrossLink[];   // gleiche Branche, andere Level
  cross_audiences: PersonaCrossLink[]; // gleiches Level, andere Branchen
  // Status
  is_filled: boolean;
}

export interface ResolvedLevelHub {
  level: LevelSlug;
  slug: string;
  url: string;
  level_label: string;
  level_badge: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  h2: string;
  lead: string;
  intro_headline: string;
  intro_paragraphs: string[];
  faqs: FAQ[];
  audience_links: PersonaCrossLink[];
  is_filled: boolean;
}

// ============================================================
// Resolvers
// ============================================================

const AUDIENCE_LABELS: Record<AudienceSlug, { label: string; langform: string }> = {
  unternehmen: { label: "Unternehmen", langform: "Unternehmensführung" },
  politik:     { label: "Politik",     langform: "Politik & Verwaltung" },
  technik:     { label: "Tech",        langform: "Tech & Engineering" },
  forschung:   { label: "Forschung",   langform: "Forschung & Akademie" },
};

const LEVEL_LABELS: Record<LevelSlug, { label: string; badge: string }> = {
  einsteiger: { label: "Einstieg",     badge: "Erste Berührung" },
  kenner:     { label: "Vertiefung",   badge: "Grundlagen bekannt" },
  experten:   { label: "Expertenblick", badge: "Tief im Thema" },
};

function buildCrossLevels(
  audience: AudienceSlug,
  current: LevelSlug,
): PersonaCrossLink[] {
  const aMeta = AUDIENCE_LABELS[audience];
  return LEVEL_SLUGS.filter((l) => l !== current).map((l) => ({
    href: `/${personaSlug(audience, l)}`,
    label: `${aMeta.label} · ${LEVEL_LABELS[l].label}`,
    description: LEVEL_LABELS[l].badge,
  }));
}

function buildCrossAudiences(
  current: AudienceSlug,
  level: LevelSlug,
): PersonaCrossLink[] {
  const lMeta = LEVEL_LABELS[level];
  return AUDIENCE_SLUGS.filter((a) => a !== current).map((a) => ({
    href: `/${personaSlug(a, level)}`,
    label: `${AUDIENCE_LABELS[a].label} · ${lMeta.label}`,
    description: AUDIENCE_LABELS[a].langform,
  }));
}

// Lookup für Glossar-Begriffe, die noch nicht in glossar.json existieren.
// Quelle: WordCloud-Config — dort sind die geplanten 19 Schlüsselbegriffe
// gepflegt. So bleibt das Persona-Glossar-Sprungbrett klickbar, auch wenn
// die Ziel-Seite erst in einer späteren Iteration entsteht (404 ist
// akzeptabel, denn die Slugs sind die geplanten Targets).
const PLANNED_GLOSSAR_LABELS: Record<string, string> = {
  "sovereign-ai":      "Sovereign AI",
  "eu-ai-act":         "EU AI Act",
  "sovereign-cloud":   "Sovereign Cloud",
  "gaia-x":            "GAIA-X",
  "vendor-lock-in":    "Vendor Lock-in",
  "open-source-llm":   "Open-Source-LLM",
  "on-premise":        "On-Premise",
  "edge-ai":           "Edge AI",
  "hyperscaler":       "Hyperscaler",
  "csd-framework":     "CSD Framework",
  "ai-factory":        "AI Factory",
  "gpu":               "GPU",
  "datenresidenz":     "Datenresidenz",
  "us-cloud-act":      "US CLOUD Act",
  "modelops":          "ModelOps",
  "foundation-models": "Foundation Models",
  "model-weights":     "Model Weights",
  "explainable-ai":    "Explainable AI",
};

export interface GlossarRef {
  slug: string;
  begriff: string;
  kategorie?: string;
  exists: boolean;
}

function resolveGlossarLinks(slugs: string[]): GlossarRef[] {
  return slugs.map((slug) => {
    const entry = glossar.find((g) => g.slug === slug);
    if (entry) {
      return {
        slug: entry.slug,
        begriff: entry.begriff,
        kategorie: entry.kategorie,
        exists: true,
      };
    }
    const fallbackLabel =
      PLANNED_GLOSSAR_LABELS[slug] ??
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      slug,
      begriff: fallbackLabel,
      kategorie: "Glossar",
      exists: false,
    };
  });
}

export function resolvePersona(
  audience: AudienceSlug,
  level: LevelSlug,
): ResolvedPersona {
  const aData = data.audiences[audience];
  const lData = data.levels[level];
  const combo = data.combos[`${audience}-${level}`];
  const aMeta = AUDIENCE_LABELS[audience];
  const lMeta = LEVEL_LABELS[level];

  const isFilled = aData !== null && combo !== null;

  // Fallback-Inhalte für noch nicht befüllte Combos.
  const fallbackHero = `Diese Seite ist Teil unseres laufenden Aufbaus. Inhalte für ${aMeta.label} · ${lMeta.label} folgen in einer der nächsten Iterationen.`;

  return {
    audience,
    level,
    slug: personaSlug(audience, level),
    url: personaUrl(audience, level),
    audience_label: aMeta.label,
    audience_langform: aMeta.langform,
    primary_keyword: aData?.primary_keyword ?? `souveräne KI ${aMeta.label}`,
    secondary_keywords: aData?.secondary_keywords ?? [],
    hero_lead: aData?.hero_lead ?? fallbackHero,
    einordnung_headline:
      aData?.einordnung_headline ?? `Was ${aMeta.label} jetzt betrifft`,
    einordnung: aData?.einordnung ?? [],
    painpoints: aData?.painpoints ?? [],
    use_cases: aData?.use_cases ?? [],
    glossar_links: aData ? resolveGlossarLinks(aData.glossar_terms) : [],
    level_label: lMeta.label,
    level_badge: lMeta.badge,
    level_tone: lData.tone,
    knowledge_assumption: lData.knowledge_assumption,
    pillars_intro: lData.pillars_intro,
    pillars: lData.pillars,
    meta_title:
      combo?.meta_title ??
      `Souveräne KI für ${aMeta.label} — ${lMeta.label} | Souveräne KI`,
    meta_description:
      combo?.meta_description ??
      `Souveräne KI für ${aMeta.label} — ${lMeta.label}. Inhalte folgen.`,
    h1: combo?.h1 ?? `Souveräne KI für ${aMeta.label} — ${lMeta.label}`,
    h2: combo?.h2 ?? "Inhalte werden in Kürze ergänzt.",
    faqs: combo?.faqs ?? [],
    stats: combo?.stats ?? [],
    cross_levels: buildCrossLevels(audience, level),
    cross_audiences: buildCrossAudiences(audience, level),
    is_filled: isFilled,
  };
}

export function resolveLevelHub(level: LevelSlug): ResolvedLevelHub {
  const hub = data.level_hubs[level];
  const lMeta = LEVEL_LABELS[level];
  const isFilled = hub !== null;

  const audienceLinks: PersonaCrossLink[] = AUDIENCE_SLUGS.map((a) => ({
    href: `/${personaSlug(a, level)}`,
    label: `${AUDIENCE_LABELS[a].label} · ${lMeta.label}`,
    description: AUDIENCE_LABELS[a].langform,
  }));

  return {
    level,
    slug: levelHubSlug(level),
    url: levelHubUrl(level),
    level_label: lMeta.label,
    level_badge: lMeta.badge,
    meta_title:
      hub?.meta_title ?? `Souveräne KI — ${lMeta.label} | Souveräne KI`,
    meta_description:
      hub?.meta_description ??
      `Souveräne KI auf ${lMeta.label}-Ebene. Aufgeteilt nach Branchen-Profilen.`,
    h1: hub?.h1 ?? `Souveräne KI — ${lMeta.label}`,
    h2: hub?.h2 ?? "Wählen Sie Ihre Branche.",
    lead:
      hub?.lead ??
      "Diese Hub-Seite verweist auf branchenspezifische Vertiefungen. Vollständige Inhalte werden im Aufbau ergänzt.",
    intro_headline: hub?.intro_headline ?? "Was Sie auf diesem Level finden",
    intro_paragraphs: hub?.intro_paragraphs ?? [],
    faqs: hub?.faqs ?? [],
    audience_links: audienceLinks,
    is_filled: isFilled,
  };
}

// ============================================================
// Metadata builder (Next.js Metadata API)
// ============================================================

import type { Metadata } from "next";

export function buildPersonaMetadata(p: ResolvedPersona): Metadata {
  // Hinweis: openGraph.images / twitter.images werden bewusst weggelassen.
  // Next.js findet die opengraph-image.tsx-Datei pro Route automatisch und
  // injiziert die generierte URL plus Width/Height. Hardgecodete Pfade
  // würden die Auto-Erkennung überschreiben.
  return {
    title: p.meta_title,
    description: p.meta_description,
    keywords: [p.primary_keyword, ...p.secondary_keywords],
    openGraph: {
      type: "article",
      url: p.url,
      title: p.meta_title,
      description: p.meta_description,
      siteName: "Souveräne KI",
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: p.meta_title,
      description: p.meta_description,
    },
    alternates: {
      canonical: p.url,
    },
  };
}

export function buildLevelHubMetadata(h: ResolvedLevelHub): Metadata {
  return {
    title: h.meta_title,
    description: h.meta_description,
    openGraph: {
      type: "website",
      url: h.url,
      title: h.meta_title,
      description: h.meta_description,
      siteName: "Souveräne KI",
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: h.meta_title,
      description: h.meta_description,
    },
    alternates: {
      canonical: h.url,
    },
  };
}

// ============================================================
// JSON-LD builders
// ============================================================

interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": unknown[];
}

export function buildPersonaJsonLd(p: ResolvedPersona): JsonLdGraph {
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE_ORIGIN },
      {
        "@type": "ListItem",
        position: 2,
        name: p.audience_langform,
        item: levelHubUrl(p.level),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${p.audience_label} · ${p.level_label}`,
        item: p.url,
      },
    ],
  };

  const article = {
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": p.url },
    headline: p.h1,
    description: p.meta_description,
    inLanguage: "de-DE",
    isPartOf: { "@type": "WebSite", name: "Souveräne KI", url: SITE_ORIGIN },
    about: p.primary_keyword,
    keywords: [p.primary_keyword, ...p.secondary_keywords].join(", "),
    image: `${SITE_ORIGIN}/images/persona/${p.slug}.jpg`,
  };

  const faqPage = {
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
    })),
  };

  const graph: unknown[] = [breadcrumb, article];
  if (p.faqs.length > 0) graph.push(faqPage);

  return { "@context": "https://schema.org", "@graph": graph };
}

export function buildLevelHubJsonLd(h: ResolvedLevelHub): JsonLdGraph {
  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: SITE_ORIGIN },
      {
        "@type": "ListItem",
        position: 2,
        name: `Souveräne KI — ${h.level_label}`,
        item: h.url,
      },
    ],
  };

  const collectionPage = {
    "@type": "CollectionPage",
    "@id": h.url,
    name: h.h1,
    description: h.meta_description,
    inLanguage: "de-DE",
    isPartOf: { "@type": "WebSite", name: "Souveräne KI", url: SITE_ORIGIN },
    hasPart: h.audience_links.map((l) => ({
      "@type": "WebPage",
      url: `${SITE_ORIGIN}${l.href}`,
      name: l.label,
    })),
  };

  const graph: unknown[] = [breadcrumb, collectionPage];
  if (h.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: h.faqs.map((f) => ({
        "@type": "Question",
        name: f.frage,
        acceptedAnswer: { "@type": "Answer", text: f.antwort },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

// ============================================================
// Sitemap helpers
// ============================================================

export function getAllPersonaSlugs(): string[] {
  const personaSlugs: string[] = [];
  for (const a of AUDIENCE_SLUGS) {
    for (const l of LEVEL_SLUGS) {
      personaSlugs.push(personaSlug(a, l));
    }
  }
  return personaSlugs;
}

export function getAllLevelHubSlugs(): string[] {
  return LEVEL_SLUGS.map(levelHubSlug);
}

export function isPersonaFilled(
  audience: AudienceSlug,
  level: LevelSlug,
): boolean {
  return (
    data.audiences[audience] !== null &&
    data.combos[`${audience}-${level}`] !== null
  );
}
