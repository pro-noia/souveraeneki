import type { Metadata } from "next";
import Link from "next/link";
import glossarData from "@/data/glossar.json";
import type { GlossarEintrag } from "@/components/glossar/GlossarPage";
import WhitepaperSection from "@/components/whitepaper/WhitepaperSection";

const SITE = "https://xn--souverneki-v5a.de";

export const metadata: Metadata = {
  title: "Glossar Souveräne KI – 20 Begriffe definiert | Souveräne KI",
  description:
    "Souveräne-KI-Glossar mit 20 Definitionen: DSGVO, CLOUD Act, EU AI Act, Sovereign Cloud, Foundation Models, ModelOps und mehr — kompakt erklärt.",
  alternates: {
    canonical: `${SITE}/glossar`,
  },
  openGraph: {
    type: "website",
    url: `${SITE}/glossar`,
    title: "Glossar Souveräne KI – 20 Begriffe definiert",
    description:
      "20 Begriffe rund um souveräne KI in Europa — von DSGVO und CLOUD Act bis Foundation Models, Sovereign Cloud und ModelOps.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossar Souveräne KI – 20 Begriffe definiert",
    description:
      "20 Begriffe rund um souveräne KI in Europa — kompakt erklärt mit Quellen und Querverweisen.",
  },
};

const eintraege = glossarData as GlossarEintrag[];

const KATEGORIE_REIHENFOLGE = [
  "Grundlagen",
  "Datenschutz & Regulierung",
  "Recht & Compliance",
  "Architektur & Souveränität",
  "Strategie & Architektur",
  "Strategie & Risiko",
  "Modelle & Architektur",
  "Technologie",
];

function kategorieAnchor(kategorie: string): string {
  return (
    "kategorie-" +
    kategorie
      .toLowerCase()
      .replace(/&/g, "und")
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
  );
}

function gruppiereNachKategorie(
  liste: GlossarEintrag[],
): { kategorie: string; eintraege: GlossarEintrag[] }[] {
  const map = new Map<string, GlossarEintrag[]>();
  for (const e of liste) {
    const arr = map.get(e.kategorie) ?? [];
    arr.push(e);
    map.set(e.kategorie, arr);
  }
  for (const arr of map.values()) {
    arr.sort((a, b) => a.begriff.localeCompare(b.begriff, "de"));
  }
  const ordered: { kategorie: string; eintraege: GlossarEintrag[] }[] = [];
  for (const k of KATEGORIE_REIHENFOLGE) {
    const arr = map.get(k);
    if (arr && arr.length) {
      ordered.push({ kategorie: k, eintraege: arr });
      map.delete(k);
    }
  }
  // restliche Kategorien (falls neue dazukommen) hinten anhängen
  for (const [kategorie, arr] of map) {
    ordered.push({ kategorie, eintraege: arr });
  }
  return ordered;
}

function buildJsonLd(liste: GlossarEintrag[]) {
  const collectionPage = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE}/glossar`,
    name: "Souveräne KI Glossar",
    description:
      "20 Begriffe rund um souveräne KI in Europa, klar definiert mit Quellen und Querverweisen.",
    url: `${SITE}/glossar`,
  };

  const definedTermSet = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Souveräne KI Glossar",
    url: `${SITE}/glossar`,
    hasDefinedTerm: liste.map((e) => ({
      "@type": "DefinedTerm",
      name: e.begriff,
      description: e.meta_description,
      url: `${SITE}/glossar/${e.slug}`,
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Souveräne KI",
        item: SITE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Glossar",
        item: `${SITE}/glossar`,
      },
    ],
  };

  return [collectionPage, definedTermSet, breadcrumb];
}

export default function GlossarIndexPage() {
  const gruppen = gruppiereNachKategorie(eintraege);
  const jsonLd = buildJsonLd(eintraege);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <article
        className="min-h-screen"
        style={{ background: "var(--bg-primary)" }}
      >
        {/* Hero */}
        <header
          className="relative overflow-hidden"
          style={{ background: "var(--bg-gradient)" }}
        >
          <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding)] pt-[var(--space-3xl)] pb-[var(--space-2xl)]">
            <div
              className="font-medium uppercase mb-[var(--space-md)]"
              style={{
                fontFamily: "var(--font-mono-stack)",
                fontSize: "var(--text-caption)",
                letterSpacing: "0.18em",
                color: "var(--mondstein)",
              }}
            >
              Souveräne KI · Glossar
            </div>

            <h1
              className="text-[var(--text-primary)] font-bold leading-tight tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h1)" }}
            >
              Glossar
            </h1>

            <p
              className="text-[var(--text-secondary)] leading-relaxed max-w-[680px] mb-[var(--space-lg)]"
              style={{ fontSize: "var(--text-body-lg)" }}
            >
              {eintraege.length} Begriffe rund um souveräne KI in Europa — von
              DSGVO und CLOUD Act bis Foundation Models, Sovereign Cloud und
              ModelOps. Klar definiert, mit Quellen und Querverweisen.
            </p>

            <dl
              className="flex flex-wrap gap-[var(--space-lg)] text-[var(--text-muted)]"
              style={{ fontSize: "var(--text-small)" }}
            >
              <div className="flex items-baseline gap-2">
                <dt>Begriffe</dt>
                <dd className="text-[var(--text-secondary)] font-medium">
                  {eintraege.length}
                </dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt>Kategorien</dt>
                <dd className="text-[var(--text-secondary)] font-medium">
                  {gruppen.length}
                </dd>
              </div>
              <div className="flex items-baseline gap-2">
                <dt>Stand</dt>
                <dd className="text-[var(--text-secondary)] font-medium">
                  {new Date().toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        {/* Kategorie-Anker-Nav */}
        <nav
          aria-label="Kategorien"
          className="sticky top-[88px] z-30 backdrop-blur-md"
          style={{
            background: "oklch(0.115 0.012 65 / 0.85)",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding)] py-[var(--space-sm)] flex flex-wrap gap-2">
            {gruppen.map(({ kategorie, eintraege: kEintraege }) => (
              <a
                key={kategorie}
                href={`#${kategorieAnchor(kategorie)}`}
                className="text-[var(--text-caption)] font-medium px-3 py-1.5 rounded-full transition-colors duration-200"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  color: "var(--text-secondary)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {kategorie}
                <span
                  className="ml-1.5 opacity-60"
                  style={{ color: "var(--text-muted)" }}
                >
                  {kEintraege.length}
                </span>
              </a>
            ))}
          </div>
        </nav>

        {/* Kategorie-Sections */}
        <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding)] py-[var(--space-section)]">
          {gruppen.map(({ kategorie, eintraege: kEintraege }) => (
            <section
              key={kategorie}
              id={kategorieAnchor(kategorie)}
              className="mb-[var(--space-3xl)] scroll-mt-[160px]"
            >
              <div className="mb-[var(--space-lg)]">
                <div
                  className="font-medium uppercase mb-[var(--space-xs)]"
                  style={{
                    fontFamily: "var(--font-mono-stack)",
                    fontSize: "var(--text-caption)",
                    letterSpacing: "0.18em",
                    color: "var(--mondstein-deep)",
                  }}
                >
                  Kategorie · {kEintraege.length}{" "}
                  {kEintraege.length === 1 ? "Begriff" : "Begriffe"}
                </div>
                <h2
                  className="text-[var(--text-primary)] font-semibold tracking-[-0.02em]"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  {kategorie}
                </h2>
              </div>

              <ul
                className="grid gap-[var(--space-md)] list-none p-0"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(280px, 1fr))",
                }}
              >
                {kEintraege.map((eintrag) => (
                  <li key={eintrag.slug}>
                    <Link
                      href={`/glossar/${eintrag.slug}`}
                      className="group block h-full p-[var(--space-md)] rounded-[16px] transition-all duration-200"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <div className="flex flex-col h-full gap-[var(--space-sm)]">
                        <div>
                          <h3
                            className="text-[var(--text-primary)] font-semibold tracking-[-0.01em] mb-1 group-hover:text-[var(--accent-light)] transition-colors duration-200"
                            style={{ fontSize: "var(--text-h3)" }}
                          >
                            {eintrag.begriff}
                          </h3>
                          {eintrag.abkuerzung &&
                            eintrag.abkuerzung !== eintrag.begriff && (
                              <div
                                className="font-medium"
                                style={{
                                  fontFamily: "var(--font-mono-stack)",
                                  fontSize: "var(--text-caption)",
                                  letterSpacing: "0.08em",
                                  color: "var(--mondstein-deep)",
                                }}
                              >
                                {eintrag.abkuerzung}
                              </div>
                            )}
                        </div>

                        <p
                          className="text-[var(--text-secondary)] leading-relaxed flex-1"
                          style={{ fontSize: "var(--text-small)" }}
                        >
                          {eintrag.meta_description}
                        </p>

                        <div className="flex items-center justify-between pt-[var(--space-xs)]">
                          <span
                            className="text-[var(--text-caption)] font-medium px-2.5 py-1 rounded-full"
                            style={{
                              background: "rgba(255, 255, 255, 0.04)",
                              color: "var(--text-muted)",
                              border: "1px solid var(--border-subtle)",
                            }}
                          >
                            {eintrag.schwierigkeitsgrad}
                          </span>
                          <span
                            className="text-[var(--text-caption)] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ color: "var(--accent-light)" }}
                            aria-hidden="true"
                          >
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Whitepaper-CTA */}
        <WhitepaperSection />
      </article>
    </>
  );
}
