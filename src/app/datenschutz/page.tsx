import type { Metadata } from "next";

const SITE = "https://xn--souverneki-v5a.de";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Souveräne KI",
  description:
    "Datenschutzerklärung von Souveräne KI nach DSGVO. Verantwortliche Stelle, Datenverarbeitung, Hosting, Cookies, Rechte der Betroffenen.",
  alternates: {
    canonical: `${SITE}/datenschutz`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function DatenschutzPage() {
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
            Rechtliches · DSGVO
          </div>
          <h1
            className="text-[var(--text-primary)] font-bold leading-tight tracking-[-0.02em] mb-[var(--space-md)]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Datenschutzerklärung
          </h1>
          <p
            className="text-[var(--text-secondary)] leading-relaxed max-w-[680px]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            Informationen zur Verarbeitung personenbezogener Daten nach Art. 13
            und 14 DSGVO. Stand: 13.05.2026.
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
              1. Verantwortliche Stelle
            </h2>
            <p>
              Verantwortlich für die Datenverarbeitung auf dieser Website im
              Sinne der DSGVO ist:
            </p>
            <p className="mt-[var(--space-sm)]">
              O. D. Cordt
              <br />
              Gut Widdauen 1
              <br />
              40764 Langenfeld
              <br />
              E-Mail:{" "}
              <a
                href="mailto:datenschutz@cordt.net"
                className="underline transition-colors duration-200 hover:text-[var(--accent-light)]"
              >
                datenschutz@cordt.net
              </a>
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              2. Allgemeines zur Datenverarbeitung
            </h2>
            <p>
              Ich verarbeite personenbezogene Daten der Nutzerinnen und
              Nutzer grundsätzlich nur, soweit dies zur Bereitstellung einer
              funktionsfähigen Website sowie der Inhalte und Leistungen
              erforderlich ist. Rechtsgrundlage ist in der Regel Art. 6 Abs. 1
              DSGVO — je nach Verarbeitungsvorgang Buchstabe a (Einwilligung),
              b (Vertrag), c (rechtliche Verpflichtung) oder f (berechtigtes
              Interesse).
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              3. Hosting
            </h2>
            <p>
              Diese Website wird gehostet durch Vercel Inc., 340 S Lemon Ave
              #4133, Walnut, CA 91789, USA. Mit Vercel besteht ein
              Auftragsverarbeitungsvertrag (DPA) inklusive
              Standardvertragsklauseln. Beim Aufruf der Seite
              werden technische Daten (IP-Adresse, Browsertyp, Betriebssystem,
              Referrer, Zeitstempel, übertragenes Datenvolumen) für maximal 30
              Tage in Server-Logfiles gespeichert. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. f DSGVO; das berechtigte Interesse liegt in
              einem stabilen, sicheren Betrieb der Website.
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              4. SSL-/TLS-Verschlüsselung
            </h2>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
              Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung.
              Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der
              Adresszeile Ihres Browsers.
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              5. Kontaktaufnahme
            </h2>
            <p>
              Bei Kontakt per E-Mail werden die übermittelten Angaben (Name,
              E-Mail-Adresse, Inhalt der Nachricht) ausschließlich zur
              Bearbeitung der Anfrage verarbeitet. Rechtsgrundlage ist
              Art. 6 Abs. 1 lit. b oder f DSGVO. Die Daten werden gelöscht,
              sobald der jeweilige Vorgang abgeschlossen ist und keine
              gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              6. Praxisleitfaden-Anmeldung
            </h2>
            <p>
              Beim Bezug des Praxisleitfadens verarbeite ich Ihre E-Mail-Adresse
              und Ihren Unternehmensnamen auf Grundlage Ihrer Einwilligung
              (Art. 6 Abs. 1 lit. a DSGVO). Der Praxisleitfaden selbst wird direkt
              im Browser zum Download bereitgestellt — ein automatischer
              E-Mail-Versand des PDFs findet nicht statt. Ihre Kontaktdaten
              werden in der Listenverwaltung der Brevo (Sendinblue) SAS,
              7 rue de Madrid, 75008 Paris, Frankreich gespeichert, um Ihnen
              gelegentlich fachlich relevante Folgeinformationen zukommen zu
              lassen. Mit Brevo besteht ein Auftragsverarbeitungsvertrag nach
              Art. 28 DSGVO; die Verarbeitung findet auf Servern innerhalb der
              EU statt. Sie können Ihre Einwilligung jederzeit mit Wirkung für
              die Zukunft widerrufen — per Abmeldelink in zukünftigen E-Mails
              oder formlos per Nachricht an die unter Ziffer 1 genannte
              E-Mail-Adresse.
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              7. Cookies und lokale Speicherung
            </h2>
            <p>
              Diese Website setzt aktuell nur technisch notwendige Cookies und
              nutzt den Local Storage des Browsers für die Persistenz
              individueller Einstellungen (z. B. Position in interaktiven
              Komponenten). Es findet keine personenbezogene Auswertung statt.
              Tracking- oder Analyse-Cookies werden nicht eingesetzt.
            </p>
          </section>

          <section className="mb-[var(--space-2xl)]">
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              8. Rechte der Betroffenen
            </h2>
            <p>
              Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
              (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung
              (Art. 18), Datenübertragbarkeit (Art. 20) sowie auf Widerspruch
              (Art. 21). Wenden Sie sich hierzu bitte an die unter Ziffer 1
              genannten Kontaktdaten.
            </p>
          </section>

          <section>
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              9. Beschwerderecht
            </h2>
            <p>
              Sie haben das Recht, sich bei einer
              Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer
              personenbezogenen Daten zu beschweren — insbesondere bei der
              zuständigen Aufsichtsbehörde des Bundeslandes Ihres Wohnsitzes.
              Eine Übersicht finden Sie auf der Website der Bundesbeauftragten
              für den Datenschutz und die Informationsfreiheit.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
