import type { Metadata } from "next";
import {
  Albert_Sans,
  Bricolage_Grotesque,
  Manrope,
  Cousine,
} from "next/font/google";

const albert = Albert_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--cmp-albert",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--cmp-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--cmp-manrope",
  display: "swap",
});

const cousine = Cousine({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--cmp-cousine",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vergleich · Akzentfarben und Typografie",
  robots: { index: false, follow: false },
};

interface AccentSpec {
  id: string;
  name: string;
  description: string;
  oklch: string;
  brightOklch: string;
  isCurrent: boolean;
}

const ACCENTS: AccentSpec[] = [
  {
    id: "petrol",
    name: "Petrol",
    description:
      "Aktuell · Tiefes Teal-Petroleum, kühl und entschieden — Buchrücken in Blau. Klare Distanz zu AI-Cosmic-Violet.",
    oklch: "oklch(0.50 0.090 200)",
    brightOklch: "oklch(0.58 0.095 200)",
    isCurrent: true,
  },
  {
    id: "lederrot",
    name: "Lederrot",
    description: "Vorherige Variante — Buchbinder-Oxblut, autoritativ ohne Marketing-Energie.",
    oklch: "oklch(0.52 0.150 25)",
    brightOklch: "oklch(0.60 0.155 25)",
    isCurrent: false,
  },
  {
    id: "messing",
    name: "Messing",
    description: "Warm-gold-metallisch, Lesesaal-Lampenschein. Edler, weniger CTA-Druck.",
    oklch: "oklch(0.68 0.100 80)",
    brightOklch: "oklch(0.74 0.105 80)",
    isCurrent: false,
  },
];

interface FontSpec {
  id: string;
  name: string;
  description: string;
  variable: string;
  isCurrent: boolean;
}

const FONTS: FontSpec[] = [
  {
    id: "manrope",
    name: "Manrope",
    description:
      "Aktuell · Geometrische Präzision, dezenter Charakter ohne Cool-Corporate-Reflex. Sehr ruhig, klare Buchstabenkanten.",
    variable: "var(--cmp-manrope)",
    isCurrent: true,
  },
  {
    id: "albert",
    name: "Albert Sans",
    description:
      "Vorherige Variante — Inter-Ersatz mit etwas mehr Charakter, Inter selbst ist Reflex-rejected.",
    variable: "var(--cmp-albert)",
    isCurrent: false,
  },
  {
    id: "bricolage",
    name: "Bricolage Grotesque",
    description:
      "Variable optical sizing, distinkter Charakter — Aleph-Alpha-Lane. Mutiger.",
    variable: "var(--cmp-bricolage)",
    isCurrent: false,
  },
];

interface DemoCardProps {
  fontFamily: string;
  monoFamily: string;
  accentOklch: string;
  accentBrightOklch: string;
  accentName: string;
  fontName: string;
  description: string;
  isCurrent: boolean;
  variantLabel: string;
}

function DemoCard({
  fontFamily,
  monoFamily,
  accentOklch,
  accentBrightOklch,
  accentName,
  fontName,
  description,
  isCurrent,
  variantLabel,
}: DemoCardProps) {
  return (
    <article
      style={{
        background: "oklch(0.165 0.005 250)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "16px",
        padding: "var(--space-lg)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-md)",
        fontFamily,
        position: "relative",
      }}
    >
      {isCurrent && (
        <span
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            fontFamily: monoFamily,
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--mondstein)",
            background: "oklch(0.78 0.055 220 / 0.10)",
            border: "1px solid oklch(0.78 0.055 220 / 0.22)",
            borderRadius: "9999px",
            padding: "3px 10px",
          }}
        >
          Aktuell
        </span>
      )}

      <div
        style={{
          fontFamily: monoFamily,
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: accentOklch,
        }}
      >
        {variantLabel}
      </div>

      <h2
        style={{
          fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          color: "var(--text-primary)",
          margin: 0,
        }}
      >
        <span
          style={{
            display: "block",
            fontWeight: 400,
            color: "var(--text-secondary)",
          }}
        >
          Souveränität ist keine Region.
        </span>
        <span style={{ display: "block" }}>
          Souveränität ist <span style={{ color: accentBrightOklch }}>Recht</span>.
        </span>
      </h2>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "0.95rem",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        Eine &bdquo;EU-Cloud&ldquo; bedeutet wenig, wenn das betreibende
        Unternehmen US-amerikanischem Recht unterliegt. Souveräne KI baut auf
        Recht, nicht auf Geographie.
      </p>

      <button
        type="button"
        style={{
          alignSelf: "flex-start",
          background: accentOklch,
          color: "var(--pergament)",
          border: `1px solid ${accentBrightOklch}`,
          borderRadius: "9999px",
          padding: "10px 22px",
          fontWeight: 500,
          fontFamily: "inherit",
          fontSize: "0.95rem",
          cursor: "pointer",
        }}
      >
        Whitepaper laden
      </button>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "var(--space-sm)",
          borderTop: "1px solid var(--border-subtle)",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <strong
          style={{
            color: "var(--text-primary)",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          {accentName} · {fontName}
        </strong>
        <span style={{ color: "var(--text-muted)", fontSize: "0.8rem", lineHeight: 1.5 }}>
          {description}
        </span>
      </div>
    </article>
  );
}

export default function VergleichPage() {
  const monoFamily = `${cousine.style.fontFamily}, ui-monospace, monospace`;
  const currentFont = `${manrope.style.fontFamily}, system-ui, sans-serif`;

  return (
    <main
      className={`${albert.variable} ${bricolage.variable} ${manrope.variable} ${cousine.variable}`}
      style={{ paddingTop: "calc(var(--space-section) + 4rem)" }}
    >
      <div
        style={{
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          padding: "0 var(--container-padding)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-section)",
        }}
      >
        {/* Intro */}
        <header style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
          <p
            style={{
              fontFamily: monoFamily,
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mondstein)",
              margin: 0,
            }}
          >
            Vergleich · Variantenseite
          </p>
          <h1
            style={{
              fontSize: "var(--text-h1)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Akzentfarbe und Typografie<br />nebeneinander.
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "var(--text-body-lg)",
              lineHeight: 1.6,
              maxWidth: "60ch",
              margin: 0,
            }}
          >
            Drei Karten pro Akzent- und Schrift-Achse — derselbe Hero-Ausschnitt
            in jeder Variante. Aktuell live: <em>Petrol</em> (Akzent) und{" "}
            <em>Manrope</em> (Schrift). Darunter: drei vorgeschlagene Sekundärfarben
            für die Komplettpalette, gerendert in Token-Karten plus einem
            UI-Beispielblock.
          </p>
        </header>

        {/* Section A: Akzentfarben (gleiche Schrift: Albert Sans) */}
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <h2
              style={{
                fontSize: "var(--text-h2)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Akzentfarbe
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-small)", margin: 0 }}>
              Schriftart konstant: Manrope · Mono: Cousine
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-md)",
            }}
          >
            {ACCENTS.map((accent) => (
              <DemoCard
                key={accent.id}
                fontFamily={currentFont}
                monoFamily={monoFamily}
                accentOklch={accent.oklch}
                accentBrightOklch={accent.brightOklch}
                accentName={accent.name}
                fontName="Manrope"
                description={accent.description}
                isCurrent={accent.isCurrent}
                variantLabel={`Akzent · ${accent.name}`}
              />
            ))}
          </div>
        </section>

        {/* Section B: Schriften (gleiche Akzentfarbe: Petrol) */}
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <h2
              style={{
                fontSize: "var(--text-h2)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Typografie
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "var(--text-small)", margin: 0 }}>
              Akzentfarbe konstant: Petrol · Mono in allen Karten: Cousine
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "var(--space-md)",
            }}
          >
            {FONTS.map((font) => (
              <DemoCard
                key={font.id}
                fontFamily={`${font.variable}, system-ui, sans-serif`}
                monoFamily={monoFamily}
                accentOklch="oklch(0.50 0.090 200)"
                accentBrightOklch="oklch(0.58 0.095 200)"
                accentName="Petrol"
                fontName={font.name}
                description={font.description}
                isCurrent={font.isCurrent}
                variantLabel={`Schrift · ${font.name}`}
              />
            ))}
          </div>
        </section>

        {/* Section C: Sekundärfarben — Vorschlag für die Komplettpalette */}
        <section style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <h2
              style={{
                fontSize: "var(--text-h2)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              Sekundärfarben — Vorschlag
            </h2>
            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "var(--text-small)",
                margin: 0,
                maxWidth: "70ch",
                lineHeight: 1.6,
              }}
            >
              Drei material-archivische Sekundärfarben, die mit Petrol eine
              vollständige R-Y-G-B-Palette bilden — ohne in Marketing-Primärfarben
              zu kippen. Ist bereits in <code>globals.css</code> definiert (als{" "}
              <code>--rost</code>, <code>--bernstein</code>, <code>--salbei</code>),
              aber noch nicht in der Spectrum-Section sichtbar verwendet.
              Nach deiner Bestätigung migriere ich das Spektrum auf diese
              Reise: Rost → Bernstein → Petrol → Salbei.
            </p>
          </div>

          {/* Token-Swatches */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "var(--space-md)",
            }}
          >
            {[
              {
                name: "Rost",
                token: "--rost",
                base: "oklch(0.48 0.115 35)",
                bright: "oklch(0.55 0.120 35)",
                role: "Warning · Spectrum Lvl 1 (Volle Abhängigkeit)",
                physical:
                  "Cor-Ten Stahl, Eisen-Patina. Anti-Marketing-Rot, materiell.",
              },
              {
                name: "Bernstein",
                token: "--bernstein",
                base: "oklch(0.65 0.095 75)",
                bright: "oklch(0.72 0.105 75)",
                role: "Caution · Spectrum Lvl 2 (Hybride Kontrolle)",
                physical:
                  "Pergament-Siegel, vintage Paperback-Marke. Warmer Counter zur Petrol-Achse.",
              },
              {
                name: "Salbei",
                token: "--salbei",
                base: "oklch(0.62 0.055 145)",
                bright: "oklch(0.70 0.060 145)",
                role: "Success · Spectrum Lvl 4 (Vollständige Souveränität)",
                physical:
                  "Patina auf Bronze, getrocknetes Salbei-Blatt. Dezent, nicht Tech-Demo-grün.",
              },
            ].map((color) => (
              <article
                key={color.name}
                style={{
                  background: "oklch(0.165 0.005 250)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "16px",
                  padding: "var(--space-md)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "var(--space-sm)",
                }}
              >
                {/* Two-stop swatch (base + bright) */}
                <div
                  style={{
                    display: "flex",
                    height: "84px",
                    borderRadius: "10px",
                    overflow: "hidden",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div style={{ flex: 1, background: color.base }} />
                  <div style={{ flex: 1, background: color.bright }} />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <strong
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-body)",
                      fontWeight: 600,
                    }}
                  >
                    {color.name}
                  </strong>
                  <code
                    style={{
                      fontFamily: monoFamily,
                      fontSize: "0.7rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.5,
                    }}
                  >
                    {color.token} · {color.base}
                  </code>
                </div>

                <div
                  style={{
                    fontFamily: monoFamily,
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: color.bright,
                  }}
                >
                  {color.role}
                </div>

                <p
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "var(--text-small)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {color.physical}
                </p>
              </article>
            ))}
          </div>

          {/* Komplett-Palette in einem UI-Beispiel */}
          <div
            style={{
              background: "oklch(0.165 0.005 250)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "16px",
              padding: "var(--space-lg)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-md)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <strong
                style={{
                  color: "var(--text-primary)",
                  fontSize: "var(--text-body)",
                  fontWeight: 600,
                }}
              >
                Komplettpalette in einem UI-Block
              </strong>
              <span style={{ color: "var(--text-muted)", fontSize: "var(--text-small)" }}>
                Petrol als Aktion, Mondstein als Highlight, Rost · Bernstein · Salbei als
                semantische Stationen. Pergament als Schrift.
              </span>
            </div>

            {/* Mini-Spectrum-Reise */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "var(--space-sm)",
              }}
            >
              {[
                { label: "Volle Abhängigkeit", color: "var(--rost-bright)" },
                { label: "Hybride Kontrolle", color: "var(--bernstein-bright)" },
                { label: "Verwaltete Souveränität", color: "var(--petrol-bright)" },
                { label: "Vollständige Souveränität", color: "var(--salbei-bright)" },
              ].map((step, i) => (
                <div
                  key={step.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    padding: "var(--space-sm)",
                    background: "var(--eichensaal)",
                    borderRadius: "10px",
                    borderTop: `2px solid ${step.color}`,
                  }}
                >
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "8px",
                      background: step.color,
                      color: "var(--pergament)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.8rem",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-small)",
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Form-States in Aktion */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--space-sm)" }}>
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  background: "oklch(0.48 0.115 35 / 0.12)",
                  border: "1px solid oklch(0.55 0.120 35 / 0.30)",
                  color: "var(--rost-bright)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 500,
                }}
              >
                Warning · CLOUD-Act-Risiko
              </span>
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  background: "oklch(0.65 0.095 75 / 0.10)",
                  border: "1px solid oklch(0.72 0.105 75 / 0.28)",
                  color: "var(--bernstein-bright)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 500,
                }}
              >
                Hinweis · Hybride Konfiguration
              </span>
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  background: "oklch(0.50 0.090 200 / 0.12)",
                  border: "1px solid oklch(0.58 0.095 200 / 0.30)",
                  color: "var(--petrol-bright)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 500,
                }}
              >
                Aktion · Whitepaper laden
              </span>
              <span
                style={{
                  padding: "6px 14px",
                  borderRadius: "9999px",
                  background: "oklch(0.62 0.055 145 / 0.10)",
                  border: "1px solid oklch(0.70 0.060 145 / 0.28)",
                  color: "var(--salbei-bright)",
                  fontSize: "var(--text-caption)",
                  fontWeight: 500,
                }}
              >
                Bestätigt · EU-Jurisdiktion
              </span>
            </div>
          </div>
        </section>

        {/* Footer note */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-sm)",
            padding: "var(--space-lg)",
            background: "var(--tinte-deep)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "16px",
          }}
        >
          <strong
            style={{ color: "var(--text-primary)", fontSize: "var(--text-body)" }}
          >
            Status
          </strong>
          <p style={{ color: "var(--text-secondary)", fontSize: "var(--text-small)", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "var(--petrol-bright)" }}>Petrol</strong>{" "}
            (Akzent) und <strong style={{ color: "var(--text-primary)" }}>Manrope</strong>{" "}
            (Schrift) sind global aktiv. Die drei vorgeschlagenen Sekundärfarben
            (Rost · Bernstein · Salbei) sind als Tokens definiert, aber das
            <code> SovereigntySpectrum</code> rendert sie noch nicht semantisch
            durch. Sag &bdquo;Spektrum migrieren&ldquo; — dann verbinde ich die
            Stationen Volle Abhängigkeit → Hybride Kontrolle → Verwaltete
            Souveränität → Vollständige Souveränität mit Rost → Bernstein →
            Petrol → Salbei. Diese Vergleichsseite kann nach Abschluss bleiben
            (für Re-Checks) oder gelöscht werden.
          </p>
        </section>
      </div>
    </main>
  );
}
