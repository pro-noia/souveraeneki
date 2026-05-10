import Link from "next/link";
import { ChevronDown } from "lucide-react";
import SovereigntySpectrum from "@/components/SovereigntySpectrum/SovereigntySpectrum";
import WhitepaperSection from "@/components/whitepaper/WhitepaperSection";
import type { ResolvedLevelHub } from "@/lib/personas";
import styles from "./PersonaPage.module.css";

interface LevelHubPageProps {
  hub: ResolvedLevelHub;
}

export default function LevelHubPage({ hub }: LevelHubPageProps) {
  return (
    <article className={styles.page}>
      {/* === Breadcrumb === */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">Startseite</Link>
        <span className={styles.breadcrumbSep}>›</span>
        <span aria-current="page">{hub.level_label}</span>
      </nav>

      {/* === Hero === */}
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>Souveräne KI · {hub.level_label}</p>
          <h1 className={styles.h1}>{hub.h1}</h1>
          <p className={styles.h2}>{hub.h2}</p>
          <p className={styles.lead}>{hub.lead}</p>

          {!hub.is_filled && (
            <p className={styles.comingSoon}>
              Diese Hub-Seite verweist auf vier branchenspezifische
              Vertiefungen. Vollständige Hub-Inhalte werden in einer der
              nächsten Iterationen ergänzt.
            </p>
          )}
        </div>
      </header>

      {/* === Intro / Einordnung === */}
      {hub.intro_paragraphs.length > 0 && (
        <section className={styles.section} aria-labelledby="intro">
          <div className={`${styles.sectionInner} ${styles.narrow}`}>
            <h2 id="intro" className={styles.sectionHeadline}>
              {hub.intro_headline}
            </h2>
            <div className={styles.prose}>
              {hub.intro_paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === 4 Audience Cards === */}
      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        aria-labelledby="audiences"
      >
        <div className={styles.sectionInner}>
          <h2 id="audiences" className={styles.sectionHeadline}>
            Wählen Sie Ihre Branche
          </h2>
          <div className={styles.crossGrid}>
            <div className={styles.crossBlock}>
              <div className={styles.crossList}>
                {hub.audience_links.slice(0, 2).map((l) => (
                  <Link key={l.href} href={l.href} className={styles.crossLink}>
                    <span className={styles.crossLabel}>{l.label}</span>
                    <span className={styles.crossDescription}>{l.description}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className={styles.crossBlock}>
              <div className={styles.crossList}>
                {hub.audience_links.slice(2).map((l) => (
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

      {/* === SovereigntySpectrum (recycled) === */}
      <SovereigntySpectrum />

      {/* === FAQ === */}
      {hub.faqs.length > 0 && (
        <section
          className={`${styles.section} ${styles.sectionAlt}`}
          aria-labelledby="faq"
        >
          <div className={`${styles.sectionInner} ${styles.narrow}`}>
            <h2 id="faq" className={styles.sectionHeadline}>
              Häufige Fragen
            </h2>
            <div className={styles.faqList}>
              {hub.faqs.map((f, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    {f.frage}
                    <ChevronDown className={styles.faqChevron} aria-hidden="true" />
                  </summary>
                  <div className={styles.faqAnswer}>{f.antwort}</div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* === Whitepaper CTA === */}
      <WhitepaperSection />
    </article>
  );
}
