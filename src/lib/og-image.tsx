import { ImageResponse } from "next/og";
import {
  resolvePersona,
  resolveLevelHub,
  type AudienceSlug,
  type LevelSlug,
} from "@/lib/personas";

// 1200×630 ist der OG/Twitter-Card-Standard (Facebook, LinkedIn, X, Slack).
export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;

// Brand-Farben in sRGB-Approximation der OKLCH-Tokens aus globals.css.
// Satori versteht OKLCH nicht zuverlässig — daher hex.
const COLORS = {
  bg:        "#0c1626", // tinte-deep
  petrol:    "#3a90aa", // petrol-bright
  pergament: "#f4ece1", // pergament
  mondstein: "#a4c8d6", // mondstein-bright
} as const;

async function loadGoogleFont(
  family: string,
  weight: number,
): Promise<ArrayBuffer> {
  // Wichtig: KEIN `&text=`-Parameter verwenden. Damit landet man auf dem
  // Dynamic-Subset-Endpoint von Google Fonts, der je nach User-Agent
  // wechselnde Formate (WOFF2/EOT) ohne format()-Deklaration ausliefert —
  // Satori versteht davon nichts. Ohne `&text=` bekommen wir den statischen
  // Latin-Subset als TTF mit sauberer format('truetype')-Angabe.
  const url =
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}` +
    `:wght@${weight}`;
  const cssRes = await fetch(url);
  if (!cssRes.ok) {
    throw new Error(`Google Fonts CSS fetch failed: ${cssRes.status}`);
  }
  const css = await cssRes.text();
  const match = css.match(
    /src:\s*url\((https:\/\/[^)]+)\)\s*format\(['"](?:truetype|opentype)['"]\)/,
  );
  if (!match) {
    throw new Error(
      `Cannot extract TTF URL for ${family}@${weight} — Google Fonts returned non-TTF format.`,
    );
  }
  const fontRes = await fetch(match[1]);
  if (!fontRes.ok) {
    throw new Error(`Font binary fetch failed: ${fontRes.status}`);
  }
  return fontRes.arrayBuffer();
}

interface LayoutProps {
  eyebrow: string;
  headline: string;
}

function Layout({ eyebrow, headline }: LayoutProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: COLORS.bg,
        position: "relative",
      }}
    >
      {/* Petrol-Akzent oben — schmales Brand-Band */}
      <div
        style={{
          height: 6,
          width: "100%",
          background: COLORS.petrol,
          display: "flex",
        }}
      />

      {/* Inhalt */}
      <div
        style={{
          flex: 1,
          padding: "72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Logo top-left */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 18,
              height: 18,
              background: COLORS.petrol,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontFamily: "Manrope",
              fontWeight: 600,
              color: COLORS.pergament,
              letterSpacing: "-0.01em",
            }}
          >
            Souveräne KI
          </div>
        </div>

        {/* Eyebrow + Headline bottom-left */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 22,
              fontFamily: "Cousine",
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: COLORS.mondstein,
              marginBottom: 28,
              display: "flex",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: 64,
              fontFamily: "Manrope",
              fontWeight: 600,
              color: COLORS.pergament,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1056,
              display: "flex",
            }}
          >
            {headline}
          </div>
        </div>
      </div>

      {/* Diagonal-Akzent unten rechts — radial petrol gradient, sehr dezent */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 540,
          height: 540,
          background:
            "radial-gradient(circle at bottom right, rgba(58,144,170,0.22) 0%, rgba(58,144,170,0) 65%)",
        }}
      />
    </div>
  );
}

async function loadFonts() {
  const [manrope, cousine] = await Promise.all([
    loadGoogleFont("Manrope", 600),
    loadGoogleFont("Cousine", 700),
  ]);
  return [
    {
      name: "Manrope",
      data: manrope,
      weight: 600 as const,
      style: "normal" as const,
    },
    {
      name: "Cousine",
      data: cousine,
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
}

export async function renderPersonaOg(
  audience: AudienceSlug,
  level: LevelSlug,
): Promise<ImageResponse> {
  const persona = resolvePersona(audience, level);
  const eyebrow = `Für ${persona.audience_label} · ${persona.level_label}`;
  const headline = persona.h1;
  const fonts = await loadFonts();

  return new ImageResponse(<Layout eyebrow={eyebrow} headline={headline} />, {
    ...OG_SIZE,
    fonts,
  });
}

export async function renderHubOg(level: LevelSlug): Promise<ImageResponse> {
  const hub = resolveLevelHub(level);
  const eyebrow = `Souveräne KI · ${hub.level_label}`;
  const headline = hub.h1;
  const fonts = await loadFonts();

  return new ImageResponse(<Layout eyebrow={eyebrow} headline={headline} />, {
    ...OG_SIZE,
    fonts,
  });
}

export async function renderGlossarIndexOg(
  termCount: number,
): Promise<ImageResponse> {
  const eyebrow = "Souveräne KI · Glossar";
  const headline = `${termCount} Begriffe rund um souveräne KI in Europa`;
  const fonts = await loadFonts();

  return new ImageResponse(<Layout eyebrow={eyebrow} headline={headline} />, {
    ...OG_SIZE,
    fonts,
  });
}
