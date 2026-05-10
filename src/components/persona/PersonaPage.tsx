import Link from "next/link";
import {
  Lock,
  Scale,
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  Database,
  Cpu,
  Gavel,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import SovereigntySpectrum from "@/components/SovereigntySpectrum/SovereigntySpectrum";
import WhitepaperSection from "@/components/whitepaper/WhitepaperSection";
import type { ResolvedPersona } from "@/lib/personas";
import styles from "./PersonaPage.module.css";

const ICON_REGISTRY: Record<string, LucideIcon> = {
  Lock,
  Scale,
  TrendingDown,
  AlertTriangle,
  ShieldCheck,
  Database,
  Cpu,
  Gavel,
};

function PainpointIcon({ name }: { name: string }) {
  const Icon = ICON_REGISTRY[name] ?? AlertTriangle;
  return (
    <span className={styles.painpointIcon} aria-hidden="true">
      <Icon strokeWidth={1.75} />
    </span>
  );
}

interface PersonaPageProps {
  persona: ResolvedPersona;
}

export default function PersonaPage({ persona }: PersonaPageProps) {
  return (
    <article className={styles.page}>
      {/* === Breadcrumb === */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Startseite</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span>{persona.audience_langform}</span>
        <span className={styles.breadcrumbSep}>›</span>
        <span aria-current="page">{persona.level_label}</span>
      </nav>

      {/* === Hero === */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            Für {persona.audience_label}
            <span className={styles.sep}>·</span>
            {persona.level_label}
          </p>
          <h1 className={styles.h1}>{persona.h1}</h1>
          <p className={styles.h2}>{persona.h2}</p>
          <p className={styles.lead}>{persona.hero_lead}</p>

          {!persona.is_filled && (
            <p className={styles.comingSoon}>
              Diese Seite wird in der nächsten Iteration mit
              branchenspezifischen Inhalten befüllt. Heute sehen Sie das
              gemeinsame Architektur-Gerüst aller Persona-Seiten.
            </p>
          )}
        </div>
      </header>

      {/* === Einordnung === */}
      {persona.einordnung.length > 0 && (
        <section className={styles.section} aria-labelledby="einordnung">
          <div className={`${styles.sectionInner} ${styles.narrow}`}>
            <h2 id="einordnung" className={styles.sectionHeadline}>
              {persona.einordnung_headline}
            </h2>
            <div className={styles.prose}>
              {persona.einordnung.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Painpoints === */}
      {persona.painpoints.length > 0 && (
        <section
          className={`${styles.section} ${styles.sectionAlt}`}
          aria-labelledby="painpoints"
        >
          <div className={styles.sectionInner}>
            <h2 id="painpoints" className={styles.sectionHeadline}>
              Drei Spannungsfelder, die Souveränität konkret machen
            </h2>
            <div className={styles.painpointsGrid}>
              {persona.painpoints.map((p, i) => (
                <article key={i} className={styles.painpoint}>
                  <PainpointIcon name={p.icon} />
                  <h3 className={styles.painpointHeadline}>{p.headline}</h3>
                  <p className={styles.painpointBody}>{p.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === 4 Säulen === */}
      {persona.pillars.length > 0 && (
        <section className={styles.section} aria-labelledby="pillars">
          <div className={styles.sectionInner}>
            <h2 id="pillars" className={styles.sectionHeadline}>
              Die vier Säulen souveräner KI
            </h2>
            <p className={styles.sectionLead}>{persona.pillars_intro}</p>
            <div className={styles.pillarsList}>
              {persona.pillars.map((pillar, i) => (
                <article key={i} className={styles.pillar}>
                  <p className={styles.pillarName}>{pillar.name}</p>
                  <h3 className={styles.pillarFrage}>{pillar.frage}</h3>
                  <p className={styles.pillarBody}>{pillar.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === SovereigntySpectrum (recycled) === */}
      <SovereigntySpectrum />

      {/* === Use Cases === */}
      {persona.use_cases.length > 0 && (
        <section className={styles.section} aria-labelledby="use-cases">
          <div className={styles.sectionInner}>
            <h2 id="use-cases" className={styles.sectionHeadline}>
              Praxisbeispiele für {persona.audience_label.toLowerCase()}
            </h2>
            <div className={styles.useCaseList}>
              {persona.use_cases.map((u, i) => (
                <article key={i} className={styles.useCase}>
                  <h3 className={styles.useCaseTitle}>{u.titel}</h3>
                  <p className={styles.useCaseRow}>
                    <span className={styles.useCaseLabel}>Kontext</span>
                    {u.kontext}
                  </p>
                  <p className={styles.useCaseRow}>
                    <span className={styles.useCaseLabel}>Souverän</span>
                    {u.was_souveraen}
                  </p>
                  <p className={styles.useCaseRow}>
                    <span className={styles.useCaseLabel}>Beispiel</span>
                    {u.beispiel}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === FAQ === */}
      {persona.faqs.length > 0 && (
        <section
          className={`${styles.section} ${styles.sectionAlt}`}
          aria-labelledby="faq"
        >
          <div className={`${styles.sectionInner} ${styles.narrow}`}>
            <h2 id="faq" className={styles.sectionHeadline}>
              Häufige Fragen
            </h2>
            <div className={styles.faqList}>
              {persona.faqs.map((f, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    {f.frage}
                    <ChevronDown className={styles.faqChevron} aria-hidden="true" />
                  </summary>
                  <div className={styles.faqAnswer}>{f.antwort}</div>
                </details>
              ))}
            </div>

            {persona.stats.length > 0 && (
              <div className={styles.stats}>
                {persona.stats.map((s, i) => (
                  <p key={i} className={styles.stat}>
                    <span className={styles.statClaim}>{s.claim}</span>
                    <br />
                    <span className={styles.statSource}>
                      Quelle:{" "}
                      {s.link ? (
                        <a href={s.link} target="_blank" rel="noopener noreferrer">
                          {s.quelle}
                        </a>
                      ) : (
                        s.quelle
                      )}
                    </span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* === Glossar Sprungbrett === */}
      {persona.glossar_links.length > 0 && (
        <section className={styles.section} aria-labelledby="glossar">
          <div className={styles.sectionInner}>
            <h2 id="glossar" className={styles.sectionHeadline}>
              Begriffe vertiefen
            </h2>
            <p className={styles.sectionLead}>
              Schlüsselbegriffe aus diesem Text — vertieft im Glossar.
            </p>
            <div className={styles.glossarGrid}>
              {persona.glossar_links.map((g) => (
                <Link
                  key={g.slug}
                  href={`/glossar/${g.slug}`}
                  className={styles.glossarCard}
                >
                  <span className={styles.glossarKategorie}>{g.kategorie}</span>
                  <span className={styles.glossarTerm}>{g.begriff}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Cross-Links === */}
      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        aria-labelledby="cross-links"
      >
        <div className={styles.sectionInner}>
          <h2 id="cross-links" className={styles.sectionHeadline}>
            Weitere Wege durch das Thema
          </h2>
          <div className={styles.crossGrid}>
            <div className={styles.crossBlock}>
              <h3>Mehr für {persona.audience_label}</h3>
              <div className={styles.crossList}>
                {persona.cross_levels.map((l) => (
                  <Link key={l.href} href={l.href} className={styles.crossLink}>
                    <span className={styles.crossLabel}>{l.label}</span>
                    <span className={styles.crossDescription}>{l.description}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className={styles.crossBlock}>
              <h3>Auf gleichem Niveau, andere Branche</h3>
              <div className={styles.crossList}>
                {persona.cross_audiences.map((l) => (
                  <Link key={l.href} href={l.href} className={styles.crossLink}>
                    <span className={styles.crossLabel}>{l.label}</span>
                    <span className={styles.crossDescription}>{l.description}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Whitepaper CTA (recycled) === */}
      <WhitepaperSection />
    </article>
  );
}
