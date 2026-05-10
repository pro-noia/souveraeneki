import Link from "next/link";
import Image from "next/image";

// Types matching glossar.json schema
export interface GlossarAbschnitt {
  h3: string;
  inhalt: string;
}

export interface GlossarFAQ {
  frage: string;
  antwort: string;
}

export interface GlossarEintrag {
  slug: string;
  begriff: string;
  abkuerzung?: string;
  meta_title: string;
  meta_description: string;
  h1: string;
  h2: string;
  primary_keyword: string;
  secondary_keywords: string[];
  abschnitte: GlossarAbschnitt[];
  faqs: GlossarFAQ[];
  related_slugs: string[];
  kategorie: string;
  schwierigkeitsgrad: string;
  zuletzt_aktualisiert: string;
}

interface GlossarPageProps {
  eintrag: GlossarEintrag;
  relatedEintraege: GlossarEintrag[];
}

export default function GlossarPage({ eintrag, relatedEintraege }: GlossarPageProps) {
  return (
    <article
      className="min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Hero section with image */}
      <header
        className="relative overflow-hidden"
        style={{ background: "var(--bg-gradient)" }}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding)] pt-[var(--space-3xl)] pb-[var(--space-2xl)]">
          <div className="flex flex-col lg:flex-row gap-[var(--space-xl)] items-center">
            {/* Text */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-[var(--space-md)]">
                <span
                  className="text-[var(--text-caption)] font-medium px-3 py-1 rounded-full"
                  style={{
                    background: "oklch(0.78 0.055 220 / 0.10)",
                    color: "var(--accent-light)",
                    border: "1px solid oklch(0.78 0.055 220 / 0.22)",
                  }}
                >
                  {eintrag.kategorie}
                </span>
                <span
                  className="text-[var(--text-caption)] font-medium px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  {eintrag.schwierigkeitsgrad}
                </span>
              </div>

              <h1
                className="text-[var(--text-primary)] font-bold leading-tight tracking-[-0.02em] mb-[var(--space-md)]"
                style={{ fontSize: "var(--text-h1)" }}
              >
                {eintrag.h1}
              </h1>

              <p
                className="text-[var(--text-secondary)] leading-relaxed max-w-[680px]"
                style={{ fontSize: "var(--text-body-lg)" }}
              >
                {eintrag.h2}
              </p>
            </div>

            {/* Hero image */}
            <div className="flex-1 max-w-xl w-full">
              <div
                className="relative aspect-video rounded-2xl overflow-hidden"
                style={{ border: "1px solid var(--border-subtle)" }}
              >
                <Image
                  src={`/images/glossar/${eintrag.slug}.jpg`}
                  alt={eintrag.begriff}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding)] py-[var(--space-section)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-[var(--space-2xl)]">
          {/* Article body */}
          <div className="max-w-[680px]">
            {eintrag.abschnitte.map((abschnitt, index) => (
              <section key={index} className="mb-[var(--space-2xl)]">
                <h3
                  className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
                  style={{ fontSize: "var(--text-h3)" }}
                >
                  {abschnitt.h3}
                </h3>
                <div
                  className="text-[var(--text-secondary)] leading-[1.7] whitespace-pre-line"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  {abschnitt.inhalt}
                </div>
              </section>
            ))}

            {/* FAQ section */}
            {eintrag.faqs.length > 0 && (
              <section className="mt-[var(--space-3xl)]">
                <h2
                  className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-xl)]"
                  style={{ fontSize: "var(--text-h2)" }}
                >
                  Häufige Fragen zu{" "}
                  <span style={{ color: "var(--accent-light)" }}>
                    {eintrag.begriff}
                  </span>
                </h2>

                <div className="space-y-[var(--space-md)]">
                  {eintrag.faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group rounded-2xl transition-all duration-200"
                      style={{
                        background: "var(--bg-elevated)",
                        border: "1px solid var(--border-subtle)",
                      }}
                    >
                      <summary
                        className="flex items-center justify-between cursor-pointer px-6 py-5 text-[var(--text-primary)] font-medium list-none"
                        style={{ fontSize: "var(--text-body-lg)" }}
                      >
                        {faq.frage}
                        <svg
                          className="w-5 h-5 text-[var(--text-muted)] transition-transform duration-200 group-open:rotate-180 shrink-0 ml-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="px-6 pb-5 text-[var(--text-secondary)] leading-[1.7]">
                        {faq.antwort}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related articles — inline links */}
            {eintrag.related_slugs.length > 0 && (
              <nav className="mt-[var(--space-3xl)] pt-[var(--space-xl)]" style={{ borderTop: "1px solid var(--border-subtle)" }}>
                <p
                  className="text-[var(--text-primary)] font-semibold mb-[var(--space-md)]"
                  style={{ fontSize: "var(--text-body-lg)" }}
                >
                  In diesem Kontext auch interessant:
                </p>
                <ul className="space-y-2">
                  {(relatedEintraege.length > 0 ? relatedEintraege : eintrag.related_slugs.map((s) => ({ slug: s, begriff: s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) }))).map((related) => (
                    <li key={related.slug}>
                      <Link
                        href={`/glossar/${related.slug}`}
                        className="text-[var(--accent-light)] hover:text-[var(--accent-primary)] transition-colors duration-200 underline underline-offset-4 decoration-[var(--border-hover)]"
                      >
                        {related.begriff}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-[var(--space-lg)]">
            {/* Related articles */}
            {relatedEintraege.length > 0 && (
              <div
                className="rounded-2xl p-6"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <h3
                  className="text-[var(--text-primary)] font-semibold mb-[var(--space-md)]"
                  style={{ fontSize: "var(--text-small)" }}
                >
                  In diesem Kontext auch interessant:
                </h3>
                <nav className="space-y-3">
                  {relatedEintraege.map((related) => (
                    <Link
                      key={related.slug}
                      href={`/glossar/${related.slug}`}
                      className="block text-[var(--text-secondary)] hover:text-[var(--accent-light)] transition-colors duration-200"
                      style={{ fontSize: "var(--text-body)" }}
                    >
                      {related.begriff}
                      {related.abkuerzung && (
                        <span className="text-[var(--text-muted)] ml-1">
                          ({related.abkuerzung})
                        </span>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            )}

            {/* Meta info */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <dl className="space-y-3 text-[var(--text-small)]">
                <div>
                  <dt className="text-[var(--text-muted)]">Kategorie</dt>
                  <dd className="text-[var(--text-secondary)]">{eintrag.kategorie}</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-muted)]">Schwierigkeitsgrad</dt>
                  <dd className="text-[var(--text-secondary)]">{eintrag.schwierigkeitsgrad}</dd>
                </div>
                <div>
                  <dt className="text-[var(--text-muted)]">Aktualisiert</dt>
                  <dd className="text-[var(--text-secondary)]">
                    {new Date(eintrag.zuletzt_aktualisiert).toLocaleDateString("de-DE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Back to glossar */}
            <Link
              href="/glossar"
              className="btn-secondary w-full text-center"
              style={{ fontSize: "var(--text-small)" }}
            >
              Alle Glossar-Begriffe
            </Link>
          </aside>
        </div>
      </div>
    </article>
  );
}
