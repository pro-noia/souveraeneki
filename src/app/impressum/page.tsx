import type { Metadata } from "next";

const SITE = "https://xn--souverneki-v5a.de";

export const metadata: Metadata = {
  title: "Impressum | Souveräne KI",
  description:
    "Impressum und Pflichtangaben nach § 5 TMG für Souveräne KI.",
  alternates: {
    canonical: `${SITE}/impressum`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function ImpressumPage() {
  return (
    <article
      className="min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
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
            Rechtliches · Pflichtangaben
          </div>
          <h1
            className="text-[var(--text-primary)] font-bold leading-tight tracking-[-0.02em] mb-[var(--space-md)]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Impressum
          </h1>
          <p
            className="text-[var(--text-secondary)] leading-relaxed max-w-[680px]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            Angaben gemäß § 5 TMG sowie verantwortlich für den Inhalt nach
            § 55 Abs. 2 RStV.
          </p>
        </div>
      </header>

      <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding)] py-[var(--space-section)]">
        <div
          className="max-w-[680px] text-[var(--text-secondary)] leading-[1.7]"
          style={{ fontSize: "var(--text-body)" }}
        >
          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Anbieter
            </h2>
            <p>
              [Vor- und Nachname / Firma]
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ Ort]
              <br />
              [Land]
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Vertreten durch
            </h2>
            <p>[Name der vertretungsberechtigten Person]</p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Kontakt
            </h2>
            <p>
              Telefon: [+49 …]
              <br />
              E-Mail:{" "}
              <a
                href="mailto:hallo@souveraeneki.de"
                className="underline transition-colors duration-200 hover:text-[var(--accent-light)]"
              >
                hallo@souveraeneki.de
              </a>
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Registereintrag
            </h2>
            <p>
              Eintragung im Handelsregister
              <br />
              Registergericht: [Amtsgericht Ort]
              <br />
              Registernummer: [HRB …]
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p>USt-IdNr. nach § 27a UStG: [DE …]</p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
            </h2>
            <p>
              [Vor- und Nachname]
              <br />
              [Straße und Hausnummer]
              <br />
              [PLZ Ort]
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                className="underline transition-colors duration-200 hover:text-[var(--accent-light)]"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              . Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle
              teilzunehmen.
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Haftung für Inhalte
            </h2>
            <p>
              Die Inhalte dieser Seiten wurden mit größtmöglicher Sorgfalt
              erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
              wird keine Gewähr übernommen. Als Diensteanbieter sind wir gemäß
              § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den
              allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind
              wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte
              oder gespeicherte fremde Informationen zu überwachen oder nach
              Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
              hinweisen.
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Haftung für Links
            </h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich.
            </p>
          </section>

          <section>
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Urheberrecht
            </h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht.
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
