export interface MerkmalItem {
  icon: "check" | "cross" | "warn";
  text: string;
}

export interface LevelData {
  level: number;
  title: string;
  color: string;
  glowColor: string;
  suitableFor: string[];
  technologies: string[];
  merkmale: MerkmalItem[];
}

export const SECTION_TITLE = "Spektrum der KI-Souveränität";
export const SECTION_SUBTITLE =
  "Von vollständiger Abhängigkeit zu vollständiger Kontrolle – wo steht Ihre Organisation?";

export const AXIS_LEFT = "← Hohe Abhängigkeit";
export const AXIS_RIGHT = "Hohe Souveränität →";

export const INFO_TEXT =
  "Der passende Level hängt von Ihrer Risikotoleranz und den strategischen Anforderungen ab. Die meisten Unternehmen benötigen Level 2–3. Kritische Anwendungen erfordern möglicherweise Level 4.";

export const LEVELS: LevelData[] = [
  {
    level: 1,
    title: "Volle Abhängigkeit",
    color: "var(--spectrum-1)",
    glowColor: "oklch(0.60 0.155 25 / 0.28)",
    suitableFor: [
      "Proof of Concepts",
      "Nicht-kritische Apps",
      "Schnelle Experimente",
    ],
    technologies: [
      "OpenAI ChatGPT API",
      "Google Gemini API",
      "AWS Bedrock APIs",
      "Anthropic Claude API",
    ],
    merkmale: [
      { icon: "cross", text: "Keine Datenkontrolle" },
      { icon: "cross", text: "Kein Modell-Eigentum" },
      { icon: "cross", text: "Externe Infrastruktur" },
      { icon: "cross", text: "Vendor Lock-in" },
    ],
  },
  {
    level: 2,
    title: "Hybride Kontrolle",
    color: "var(--spectrum-2)",
    glowColor: "oklch(0.60 0.090 50 / 0.25)",
    suitableFor: [
      "Regulierte Branchen",
      "Mittelständische Unternehmen",
      "Compliance-Anforderungen",
    ],
    technologies: [
      "Azure AI on VMs",
      "AWS SageMaker",
      "Google Vertex AI",
      "Lokales Modell-Hosting",
    ],
    merkmale: [
      { icon: "check", text: "Teilweise Datenkontrolle" },
      { icon: "warn", text: "Begrenzte Anpassbarkeit" },
      { icon: "check", text: "On-Premises-Option" },
      { icon: "warn", text: "Anbieterabhängigkeit" },
    ],
  },
  {
    level: 3,
    title: "Verwaltete Souveränität",
    color: "var(--spectrum-3)",
    glowColor: "oklch(0.55 0.075 220 / 0.28)",
    suitableFor: [
      "Behörden",
      "Finanzdienstleistungen",
      "Kritische Infrastruktur",
    ],
    technologies: [
      "Oracle Cloud@Customer",
      "Microsoft Cloud for Sovereignty",
      "OVHcloud KI-Dienste",
      "Regionale Cloud-Anbieter",
    ],
    merkmale: [
      { icon: "check", text: "Datensouveränität" },
      { icon: "check", text: "Lokale Jurisdiktion" },
      { icon: "check", text: "Compliance-zertifiziert" },
      { icon: "warn", text: "Geteilte Infrastruktur" },
    ],
  },
  {
    level: 4,
    title: "Vollständige Souveränität",
    color: "var(--spectrum-4)",
    glowColor: "oklch(0.86 0.060 220 / 0.30)",
    suitableFor: [
      "Verteidigung & Geheimdienste",
      "Großkonzerne",
      "Strategische KI-Fähigkeiten",
    ],
    technologies: [
      "On-Premises-Infrastruktur",
      "Open-Source-Modelle (Llama etc.)",
      "Eigene Trainingspipelines",
      "Selbstverwaltete Infrastruktur",
    ],
    merkmale: [
      { icon: "check", text: "Vollständige Kontrolle" },
      { icon: "check", text: "Keine Abhängigkeiten" },
      { icon: "check", text: "Alles anpassbar" },
      { icon: "warn", text: "Hohe Komplexität" },
    ],
  },
];
