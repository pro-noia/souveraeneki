import {
  Briefcase,
  Landmark,
  Cog,
  FlaskConical,
  Sprout,
  BookOpen,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";

// ---- Tile data types ----

export interface TileData {
  id: string;
  icon: LucideIcon;
  title: string;
}

// ---- Step 1: Role selection ----

export const STEP1_HEADLINE = "In welcher Rolle besuchen Sie diese Seite?";

// Reihenfolge spiegelt PRODUCT.md: Unternehmen primaer, Politik sekundaer.
// "Einfach neugierig" entfernt (verwaesserte den B2B-Fokus).
export const ROLE_TILES: TileData[] = [
  { id: "wirtschaft", icon: Briefcase, title: "Unternehmensführung" },
  { id: "politik", icon: Landmark, title: "Politik & Verwaltung" },
  { id: "technik", icon: Cog, title: "Tech & Engineering" },
  { id: "forschung", icon: FlaskConical, title: "Forschung & Akademie" },
];

// ---- Step 2: Knowledge level ----

export const STEP2_HEADLINE = "Wie vertraut sind Sie mit dem Thema?";

export const LEVEL_TILES: TileData[] = [
  { id: "einsteiger", icon: Sprout, title: "Erste Berührung" },
  { id: "kenner", icon: BookOpen, title: "Grundlagen bekannt" },
  { id: "experte", icon: GraduationCap, title: "Tief im Thema" },
];

// ---- Routing ----

export const WIZARD_ROUTES: Record<string, Record<string, string>> = {
  wirtschaft: {
    einsteiger: "/souveraene-ki-fuer-unternehmen-einsteiger",
    kenner: "/souveraene-ki-fuer-unternehmen-kenner",
    experte: "/souveraene-ki-fuer-unternehmen-experten",
  },
  politik: {
    einsteiger: "/souveraene-ki-fuer-politik-einsteiger",
    kenner: "/souveraene-ki-fuer-politik-kenner",
    experte: "/souveraene-ki-fuer-politik-experten",
  },
  technik: {
    einsteiger: "/souveraene-ki-fuer-technik-einsteiger",
    kenner: "/souveraene-ki-fuer-technik-kenner",
    experte: "/souveraene-ki-fuer-technik-experten",
  },
  forschung: {
    einsteiger: "/souveraene-ki-fuer-forschung-einsteiger",
    kenner: "/souveraene-ki-fuer-forschung-kenner",
    experte: "/souveraene-ki-fuer-forschung-experten",
  },
};

// ---- Placeholder page titles ----

export const PAGE_TITLES: Record<string, string> = {
  "souveraene-ki-fuer-politik-einsteiger":
    "Souveräne KI für Politik & Verwaltung – Einstieg",
  "souveraene-ki-fuer-politik-kenner":
    "Souveräne KI für Politik & Verwaltung – Vertiefung",
  "souveraene-ki-fuer-politik-experten":
    "Souveräne KI für Politik & Verwaltung – Expertenblick",
  "souveraene-ki-fuer-unternehmen-einsteiger":
    "Souveräne KI für Unternehmen – Einstieg",
  "souveraene-ki-fuer-unternehmen-kenner":
    "Souveräne KI für Unternehmen – Vertiefung",
  "souveraene-ki-fuer-unternehmen-experten":
    "Souveräne KI für Unternehmen – Expertenblick",
  "souveraene-ki-fuer-technik-einsteiger":
    "Souveräne KI für Tech & Engineering – Einstieg",
  "souveraene-ki-fuer-technik-kenner":
    "Souveräne KI für Tech & Engineering – Vertiefung",
  "souveraene-ki-fuer-technik-experten":
    "Souveräne KI für Tech & Engineering – Expertenblick",
  "souveraene-ki-fuer-forschung-einsteiger":
    "Souveräne KI für Forschung & Akademie – Einstieg",
  "souveraene-ki-fuer-forschung-kenner":
    "Souveräne KI für Forschung & Akademie – Vertiefung",
  "souveraene-ki-fuer-forschung-experten":
    "Souveräne KI für Forschung & Akademie – Expertenblick",
  "souveraene-ki-einstieg": "Souveräne KI – Dein Einstieg",
  "souveraene-ki-ueberblick": "Souveräne KI – Der Überblick",
  "souveraene-ki-vertiefung": "Souveräne KI – Vertiefung für Wissende",
};
