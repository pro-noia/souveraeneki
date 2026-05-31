import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { buildContactPageJsonLd } from "@/lib/structured-data";

const SITE = "https://xn--souverneki-v5a.de";

export const metadata: Metadata = {
  title: "Kontakt | Souveräne KI",
  description:
    "Kontakt zu Souveräne KI — für Fragen zu europäischer KI-Souveränität, Praxisleitfaden, Pilot-Projekten und Kooperationen.",
  alternates: {
    canonical: `${SITE}/kontakt`,
  },
};

export default function KontaktPage() {
  return (
    <article
      className="min-h-screen"
      style={{ background: "var(--bg-primary)" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildContactPageJsonLd()),
        }}
      />
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
            Souveräne KI · Kontakt
          </div>
          <h1
            className="text-[var(--text-primary)] font-bold leading-tight tracking-[-0.02em] mb-[var(--space-md)]"
            style={{ fontSize: "var(--text-h1)" }}
          >
            Kontakt
          </h1>
          <p
            className="text-[var(--text-secondary)] leading-relaxed max-w-[680px]"
            style={{ fontSize: "var(--text-body-lg)" }}
          >
            Fragen zu europäischer KI-Souveränität, Praxisleitfaden-Bezug,
            Pilot-Projekten oder Kooperationen? Wir freuen uns über Ihre
            Nachricht.
          </p>
        </div>
      </header>

      <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding)] py-[var(--space-section)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-lg)] max-w-[760px]">
          <div
            className="rounded-2xl p-[var(--space-lg)]"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <Mail
              className="mb-[var(--space-md)]"
              size={28}
              strokeWidth={1.5}
              style={{ color: "var(--accent-light)" }}
            />
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.01em] mb-[var(--space-xs)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              E-Mail
            </h2>
            <p
              className="text-[var(--text-secondary)] leading-relaxed mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-small)" }}
            >
              Für allgemeine Anfragen, Praxisleitfaden-Themen und redaktionelle
              Anliegen.
            </p>
            <a
              href="mailto:souveraeneki@cordt.net"
              className="text-[var(--accent-light)] font-medium underline transition-colors duration-200 hover:text-[var(--text-primary)]"
              style={{ fontSize: "var(--text-body)" }}
            >
              souveraeneki@cordt.net
            </a>
          </div>

          <div
            className="rounded-2xl p-[var(--space-lg)]"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <MessageCircle
              className="mb-[var(--space-md)]"
              size={28}
              strokeWidth={1.5}
              style={{ color: "var(--accent-light)" }}
            />
            <h2
              className="text-[var(--text-primary)] font-semibold tracking-[-0.01em] mb-[var(--space-xs)]"
              style={{ fontSize: "var(--text-h3)" }}
            >
              Pilot-Projekte
            </h2>
            <p
              className="text-[var(--text-secondary)] leading-relaxed mb-[var(--space-md)]"
              style={{ fontSize: "var(--text-small)" }}
            >
              Sie möchten souveräne KI in Ihrer Organisation pilotieren?
              Schreiben Sie mir kurz, in welcher Branche und auf welcher
              Ebene.
            </p>
            <a
              href="mailto:souveraeneki@cordt.net?subject=Pilot-Projekt"
              className="text-[var(--accent-light)] font-medium underline transition-colors duration-200 hover:text-[var(--text-primary)]"
              style={{ fontSize: "var(--text-body)" }}
            >
              souveraeneki@cordt.net
            </a>
          </div>
        </div>

        <div className="mt-[var(--space-2xl)] max-w-[680px]">
          <div
            className="font-medium uppercase mb-[var(--space-sm)]"
            style={{
              fontFamily: "var(--font-mono-stack)",
              fontSize: "var(--text-caption)",
              letterSpacing: "0.18em",
              color: "var(--mondstein-deep)",
            }}
          >
            Anschrift
          </div>
          <div className="flex items-start gap-[var(--space-sm)]">
            <MapPin
              size={20}
              strokeWidth={1.5}
              style={{ color: "var(--mondstein)", marginTop: 4 }}
            />
            <p
              className="text-[var(--text-secondary)] leading-relaxed"
              style={{ fontSize: "var(--text-body)" }}
            >
              O. D. Cordt
              <br />
              Gut Widdauen 1
              <br />
              40764 Langenfeld
              <br />
              Deutschland
            </p>
          </div>
        </div>

        <p
          className="mt-[var(--space-2xl)] text-[var(--text-muted)] max-w-[680px] leading-relaxed"
          style={{ fontSize: "var(--text-small)" }}
        >
          Hinweis zum Datenschutz: Mit Ihrer E-Mail übermitteln Sie
          personenbezogene Daten. Details zur Verarbeitung finden Sie in der{" "}
          <a
            href="/datenschutz"
            className="underline transition-colors duration-200 hover:text-[var(--text-secondary)]"
          >
            Datenschutzerklärung
          </a>
          .
        </p>
      </div>
    </article>
  );
}
