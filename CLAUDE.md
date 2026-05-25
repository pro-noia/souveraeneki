# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 16 application using React 19, TypeScript, and Tailwind CSS 4. Uses the App Router pattern with server components as the default.

## Commands

- **Dev server**: `npm run dev` (starts on localhost:3000)
- **Build**: `npm run build`
- **Start production**: `npm start`
- **Lint**: `npm run lint`

No test framework is currently configured.

## Architecture

- **App Router**: All routes live in `src/app/` — pages are `page.tsx`, layouts are `layout.tsx`
- **Styling**: Tailwind CSS 4 with PostCSS; global CSS variables in `src/app/globals.css` handle dark/light theming via `prefers-color-scheme`
- **Path alias**: `@/*` maps to `./src/*` (per `tsconfig.json`)
- **TypeScript**: Strict mode enabled, bundler module resolution
- **Fonts**: `Inter` and `JetBrains_Mono` are loaded via `next/font/google` in `src/app/layout.tsx` and exposed as CSS variables `--font-inter` and `--font-jetbrains` (latin subset, `display: swap`)

### Page composition

- **Root layout** (`src/app/layout.tsx`) mounts global `<Header>` and `<Footer>` from `src/components/layout/` around `{children}`. All routes inherit this chrome.
- **Home page** (`src/app/page.tsx`) composes five self-contained section modules in order: `HeroSection` → `SovereignWizard` → `WordCloud3D` → `SovereigntySpectrum` → `WhitepaperSection`. Each lives under its own folder in `src/components/{Name}/`.
- **API**: `src/app/api/whitepaper/route.ts` ist der Lead-Magnet-Submit-Stub (logging-only, später an Mail-Provider verkabeln).
- **Persona landing pages**: 15 routes follow the pattern `/souveraene-ki-fuer-{audience}-{level}` where audience ∈ {`forschung`, `politik`, `technik`, `unternehmen`} and level ∈ {`einsteiger`, `kenner`, `experten`}, plus three meta routes: `/souveraene-ki-einstieg`, `/souveraene-ki-ueberblick`, `/souveraene-ki-vertiefung`. They currently render via the shared `src/components/PlaceholderLanding.tsx` until each gets bespoke content.
- **Glossar**: dynamic route `src/app/glossar/[slug]/page.tsx` reads from `src/data/glossar.json` and renders through `src/components/glossar/GlossarPage.tsx` (see "Glossar Landingpages" below).
- **Helpers**: `src/lib/` for shared utilities (e.g. `analytics.ts`).

## ESLint

Uses ESLint 9 flat config (`eslint.config.mjs`) with `next/core-web-vitals` and `next/typescript` rulesets.


## Code conventions
- German texts for UI content
- English variable names and comments
- Components in `/src/components/`
- Pages use the app router in `/src/app/`
- Shared layout with header and footer

## Deployment
- Vercel for hosting
- GitHub for version control
- Domain: souveräneKi.de (IDN domain von xn--souverneki-v5a.de)

## Design System 

### Overview
Dark-theme, editorial Brand-Site für eine europäische souveräne KI-Plattform.
Strategie und Anti-References: siehe [PRODUCT.md](PRODUCT.md).
Voice-Triade: **Eichensaal · Mondstein · Tinte** — Lesesaal mit Buchrücken-Stempel,
nicht Tech-Demo. Primärakzent: **Petrol** (Archiv-Blaugrün). Sekundär: **Rost ·
Bernstein · Salbei** (material-archivische R-Y-G-Stationen).
Position: "leise rebellisch", Aleph-Alpha-/Raycast-/Arc-Lane.

---

### Color Palette (OKLCH, Full palette)

Source of truth: [src/app/globals.css](src/app/globals.css).
Live-Vergleich + Sekundärfarben in Aktion: [src/app/vergleich/page.tsx](src/app/vergleich/page.tsx).

```css
/* Eichensaal — warm-dunkles Holz, Lesesaal-Grund */
--eichensaal-deep:   oklch(0.115 0.012 65);   /* page bg */
--eichensaal:        oklch(0.155 0.014 65);   /* alternating sections */
--eichensaal-light:  oklch(0.205 0.016 65);   /* elevated cards, nav */

/* Tinte — kühler Schwarz-Blau, Tiefe */
--tinte-deep:        oklch(0.085 0.022 260);  /* footer, deep wells */
--tinte:             oklch(0.130 0.022 260);  /* alternating section */

/* Mondstein — kühler Pearl-Akzent (Links, Hover, leise Highlights) */
--mondstein:         oklch(0.78 0.055 220);
--mondstein-bright:  oklch(0.86 0.060 220);
--mondstein-deep:    oklch(0.55 0.075 220);

/* Petrol — Archiv-Blaugrün, primary action / Fokus / "Recht"-Highlight */
--petrol:            oklch(0.50 0.090 200);
--petrol-bright:     oklch(0.58 0.095 200);
--petrol-deep:       oklch(0.38 0.080 200);

/* Sekundärfarben — material, archivisch, seriös aber nicht steif */
--rost:              oklch(0.48 0.115 35);    /* Cor-Ten Stahl, warning */
--rost-bright:       oklch(0.55 0.120 35);
--bernstein:         oklch(0.65 0.095 75);    /* Pergament-Siegel, caution */
--bernstein-bright:  oklch(0.72 0.105 75);
--salbei:            oklch(0.62 0.055 145);   /* Bronze-Patina, success */
--salbei-bright:     oklch(0.70 0.060 145);

/* Pergament — warm-cremige Schrift (NIE #fff) */
--pergament:         oklch(0.96 0.010 80);    /* primary text */
--pergament-muted:   oklch(0.74 0.014 80);    /* body */
--pergament-ghost:   oklch(0.55 0.016 80);    /* labels, captions */
```

#### Semantische Aliase
- `--accent-primary` → Petrol (CTA, Form-Submit, Fokusring)
- `--accent-secondary` → Mondstein (Hover, Links, leise Highlights)
- `--warning` → Rost (Form-Errors, Spectrum Lvl 1 "Volle Abhängigkeit")
- `--caution` → Bernstein (Spectrum Lvl 2 "Hybride Kontrolle")
- `--success` → Salbei (Spectrum Lvl 4 "Vollständige Souveränität")

#### Spectrum-Reise
Section nutzt die Sekundärpalette als semantische Stationen, kein RYAG-Ampelschema:
**Rost → Bernstein → Petrol → Salbei** entspricht
*Volle Abhängigkeit → Hybride Kontrolle → Verwaltete Souveränität → Vollständige Souveränität*.

Aliases wie `--bg-primary`, `--text-primary` bleiben aus historischen Gründen
erhalten. Neue Komponenten sollten direkt die benannten Rollen ziehen.

### Anti-References (verbindlich)

- **Keine** AI-Cosmic-Violet-Gradients (#0066FF → #7B2FBE und Verwandte)
- **Kein** Korall / Vermillion (#E8564A — historisch, verworfen)
- **Kein** Lederrot — als Primärakzent versuchsweise eingeführt, durch Petrol ersetzt
- **Kein** Glassmorphism als Default (Header und Modals laufen solid)
- **Kein** Gradient-Slide auf Buttons — Buttons sind Petrol solid
- **Kein** RYAG-Ampelschema im Spectrum — Stationen sind material-archivisch
  (Rost · Bernstein · Petrol · Salbei)
- Detailliertere Anti-Reference-Liste in [PRODUCT.md](PRODUCT.md)

---

### Typography — System UI + Cousine

```css
--font-system-stack: -apple-system, BlinkMacSystemFont, system-ui, 'Helvetica Neue', sans-serif;
--font-heading:      var(--font-system-stack);
--font-body:         var(--font-system-stack);
--font-mono-stack:   var(--font-cousine), ui-monospace, 'SF Mono', Menlo, monospace;
```

Sans-Stack ist der native System-Font des OS — SF Pro auf macOS/iOS,
Segoe UI auf Windows, default auf Linux. Kein Webfont-Loading, null Latency,
perfektes OS-Hinting. Nur Cousine (Mono) wird via `next/font/google` in
[src/app/layout.tsx](src/app/layout.tsx) geladen — die einzige Schrift mit
Webfont-Cost.

Wir hatten vorher Albert Sans, Manrope und Source Sans 3 versucht. Alle
drei rendering-instabil oder ästhetisch nicht im Brand-Korridor. System UI
ist der finale Stand. SF Pro darf nicht als Webfont serviert werden
(Apple-Lizenz), daher der `-apple-system`-Stack.

Inter und JetBrains Mono sind verboten (Reflex-Reject-Liste in
`.agents/skills/impeccable/reference/brand.md`).

#### Type Scale (Modular, ≥1.25 Ratio)

```css
--text-hero:    clamp(3rem, 6.5vw, 5rem);       /* 48–80px */
--text-h1:      clamp(2.25rem, 4vw, 3.25rem);   /* 36–52px */
--text-h2:      clamp(1.625rem, 2.75vw, 2.25rem); /* 26–36px */
--text-h3:      clamp(1.25rem, 1.75vw, 1.5rem); /* 20–24px */
--text-body-lg: 1.125rem;                       /* 18px */
--text-body:    1rem;                           /* 16px */
--text-small:   0.875rem;                       /* 14px */
--text-caption: 0.75rem;                        /* 12px */
```

#### Typography Rules
- Headlines: font-weight 500–600, letter-spacing: -0.02em
- **Colored keyword highlighting:** EIN Wort pro Hero-Headline darf in
  `var(--petrol-bright)` gesetzt werden (z. B. „Recht" in der Hero-Headline).
  Mehr als ein Wort kippt in Marketing-Energie.
- Body: font-weight 400, line-height 1.65, color: `var(--text-secondary)`
- Mono nur für Eyebrows / Caption / Beleg-Labels — nie für Body Copy
- Kein Uppercase außer auf kurzen Labels/Badges

---

### Components

#### Navigation
- Sticky floating navbar with glassmorphism: `backdrop-filter: blur(12px)`, `background: var(--glass-bg)`
- Border-radius: 9999px (pill) or 12px (rounded rect)
- Subtle bottom border: `var(--border-subtle)`
- Layout: logo left, nav links center, CTA buttons right
- Login button: ghost/outlined, pill-shaped
- Primary CTA: filled with `--accent-primary`, pill-shaped

#### Buttons
```css
/* Primary CTA */
.btn-primary {
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 9999px;
  padding: 12px 28px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.btn-primary:hover {
  background: var(--accent-secondary);
  box-shadow: 0 0 24px var(--accent-glow);
}

/* Secondary / Ghost */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-hover);
  border-radius: 9999px;
  padding: 12px 28px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.04);
}
```

#### Cards
- Background: `var(--bg-elevated)` or glassmorphism
- Border: `1px solid var(--border-subtle)`
- Border-radius: 16px
- Hover: brighter border (`--border-hover`), subtle lift (`translateY(-2px)`)
- Optional: gradient border on featured cards via pseudo-element

#### Trust / Logo Bar
- Logos rendered in `--text-muted` color (grayscale, opacity: 0.5)
- Hover: opacity 0.8
- Label above: "Trusted by organizations worldwide" in `--text-muted`, `--text-small`

---

### Hero Section

#### Layout
- Split: Text links (~50%), atmosphärisches Video rechts (~50%)
- Mobil: Stacking – Text oben, Video darunter
- Hintergrund: warmer Eichensaal-Radial-Glow (kein Violett, kein Blau)

#### Hero Text (linke Hälfte)
- **Statische, committed Headline** (kein Typewriter, keine Rotation):
  „Souveränität ist keine Region.<br>Souveränität ist **Recht**."
  Erste Zeile in `--text-secondary`, zweite Zeile in `--text-primary` mit
  „Recht" in `--lederrot-bright`.
- Subhead nennt den Antagonisten (CLOUD Act / EU-Cloud-Marketing-Versprechen)
  ohne Marketing-Floskeln.
- Zwei CTAs: Primary `[Praxisleitfaden laden]` (Anchor `#praxisleitfaden`),
  Secondary `[Mehr erfahren]`.

#### Hero Visual (rechte Hälfte)
- `/public/hero-vault.mp4` (autoPlay, muted, loop, playsInline) mit
  beschreibendem `aria-label`. Keine Partikel, keine konzentrischen Ringe,
  kein cosmic-violet Hintergrund (alle gehörten zur AI-Cosmic-Violet-Lane,
  die [PRODUCT.md](PRODUCT.md) verbietet).

---

### Animation & Motion

#### Core Principles
- Subtle and purposeful — no decorative animations
- Everything should feel smooth and premium
- Always respect `prefers-reduced-motion`

#### Scroll Animations
```css
.animate-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.animate-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```
- Stagger delay for lists/grids: +100ms per element
- Use IntersectionObserver with threshold: 0.1

#### Hover Transitions
- All interactive elements: `transition: all 0.2s ease`
- Buttons: color shift + glow
- Cards: border highlight + subtle lift
- Links: color shift, no underline animation

#### Hero Animation
- Subtle floating/pulsing of hero visual via CSS `@keyframes`
- Particle effect: canvas-based or CSS keyframes for glowing dots
- No parallax scrolling

---

### Layout & Spacing

#### Container
```css
--container-max:     1280px;
--container-padding: clamp(1rem, 4vw, 2rem);
```

#### Spacing Scale
```css
--space-xs:      0.5rem;    /* 8px  */
--space-sm:      1rem;      /* 16px */
--space-md:      1.5rem;    /* 24px */
--space-lg:      2rem;      /* 32px */
--space-xl:      3rem;      /* 48px */
--space-2xl:     4rem;      /* 64px */
--space-3xl:     6rem;      /* 96px */
--space-section: clamp(4rem, 10vw, 8rem);
```

#### Section Structure
- Each section: `padding-block: var(--space-section)`
- Headlines centered or left-aligned depending on section type
- Max-width for text blocks: 680px (readability)

---

### Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Styling:** Tailwind CSS 4 with custom theme config
- **Animations:** CSS keyframes + transitions for hover/scroll (no animation library currently installed; if motion needs grow, evaluate Framer Motion before adding)
- **Hero Visual:** Currently CSS/SVG-based; reserve Three.js/WebGL only if a 2D approach proves insufficient
- **Icons:** `lucide-react` (installed). Phosphor is *not* installed — don't import from it without adding the dep first.

### Performance Rules
- Hero image: `loading="eager"`, `fetchpriority="high"`, optimized formats
- All other images: `loading="lazy"`
- Fonts: `font-display: swap`, latin subset only
- Animations restricted to `transform` and `opacity` (GPU-accelerated)
- Lighthouse target: 90+ on all metrics

### Responsive Breakpoints
```css
--bp-sm:   640px;
--bp-md:   768px;
--bp-lg:   1024px;
--bp-xl:   1280px;
--bp-2xl:  1536px;
```

---

### Do's and Don'ts

#### ✅ Do
- Use generous whitespace — sections should breathe
- Warm accents on cold backgrounds for visual contrast
- Subtle glassmorphism on navbar and cards
- Colored keyword highlights in headlines
- High-quality visuals (3D renders, abstract graphics)
- Smooth transitions on all interactive elements

#### ❌ Don't
- Never use pure black (#000000) as background — always add a color tint
- Never use pure white (#FFFFFF) for text — always warm off-white
- No stock photos of people
- No heavy animations or parallax scrolling
- No uppercase headlines
- No sharp corners (min border-radius: 8px, buttons always pill-shaped)
- No flags or nationalistic symbols
- No garish rainbow gradients


## Glossar Landingpages

Dieser Abschnitt beschreibt programmatische SEO-optimierte Glossar-Landingpages für Next.js.
Jeder Glossar-Begriff bekommt eine eigene Landingpage unter `/glossar/[slug]`.

### Tech Stack
- Framework: Next.js (App Router)
- Sprache: Deutsch
- Styling: Tailwind CSS
- Bilder: `/public/images/glossar/[slug].jpg` (16:9 Querformat)

### Datenstruktur
Alle Glossar-Begriffe liegen in: `src/data/glossar.json`
Schema: siehe `src/data/glossar-schema.md`

### Seitenstruktur jeder Glossar-Landingpage

```
URL:           /glossar/[slug]
Hero-Bild:     /public/images/glossar/[slug].jpg  (16:9, min. 1200x675px)
H1:            Haupt-Keyword (z.B. "Was ist [Begriff]?")
H2:            Subheadline mit sekundärem Keyword
H3-Abschnitte: 4–6 thematische Unterabschnitte
Fliesstext:    SEO-optimiert, Keyword-Dichte 1–2%, natürliche Sprache
Internal Links: "In diesem Kontext auch interessant:" → 3 verwandte Glossar-Artikel
Meta Title:    [Begriff] – Definition & Erklärung | [Sitename]  (max. 60 Zeichen)
Meta Desc:     Kompakte Antwort auf "Was ist [Begriff]?" mit CTA  (max. 160 Zeichen)
Schema:        JSON-LD DefinedTerm + FAQPage
```

### SEO-Regeln (WICHTIG)

#### Keyword-Strategie
- Primäres Keyword: im Slug, H1, ersten 100 Wörtern, Meta Title
- Sekundäre Keywords: in H2, H3-Überschriften, natürlich im Text verteilt
- LSI-Keywords: semantisch verwandte Begriffe einbauen
- Keyword-Dichte: 1–2% — KEIN Keyword-Stuffing
- Antwort-zuerst-Format: Direkte Definition in den ersten 2 Sätzen

#### Content-Qualität (EEAT)
- Jede Seite muss echten Mehrwert bieten — keine dünn befüllten Templates
- Statistiken und konkrete Zahlen einbauen wo möglich
- Autoritative Sprache verwenden
- Mindestlänge: 800 Wörter pro Seite

#### GEO (AI-Suchmaschinen-Optimierung)
- FAQPage Schema auf jeder Seite (erhöht AI-Sichtbarkeit um ~40%)
- Klare H1 > H2 > H3 Hierarchie
- Kurze Absätze (2–3 Sätze)
- Statistiken einbauen (+37% AI-Sichtbarkeit)
- Quellenangaben wo sinnvoll (+40% AI-Sichtbarkeit)

#### Interne Verlinkung
- Jede Seite verlinkt auf 3 verwandte Glossar-Artikel
- Verwandte Artikel kommen aus dem Feld `related_slugs` in glossar.json
- Ankertext = natürlicher Begriff, nicht "hier klicken"
- Hub-Seite: `/glossar` verlinkt auf alle Einträge (Hub & Spoke Modell)

### Datei-Konventionen
- Slug: lowercase, nur Bindestriche, keine Umlaute (ä→ae, ö→oe, ü→ue, ß→ss)
  Beispiel: "Suchmaschinenoptimierung" → `suchmaschinenoptimierung`
- Hero-Bild: `/public/images/glossar/[slug].jpg`
- Komponente: `src/components/glossar/GlossarPage.tsx`
- Daten: `src/data/glossar.json`
- Route: `src/app/glossar/[slug]/page.tsx`

### Workflow für neue Glossar-Einträge

#### Schritt 1: Eintrag in glossar.json hinzufügen
Felder ausfüllen gemäss Schema (siehe glossar-schema.md)

#### Schritt 2: Content generieren
Sage Claude Code: "Generiere den Content für den Glossar-Begriff '[Begriff]' gemäss CLAUDE.md"
Claude liest die Skills und erstellt SEO-optimierten Content.

#### Schritt 3: Hero-Bild
Bild als `[slug].jpg` in `/public/images/glossar/` ablegen (16:9, min. 1200x675px)

#### Schritt 4: Qualitätsprüfung
- Meta Title ≤ 60 Zeichen?
- Meta Description ≤ 160 Zeichen?
- Keyword in H1, ersten 100 Wörtern, Meta Title?
- 3 interne Links vorhanden?
- FAQPage Schema korrekt?

### Installierte Skills
Die folgenden Skills sind in `.claude/skills/` installiert und sollen bei
der Content-Erstellung automatisch berücksichtigt werden:
- `programmatic-seo` → Seitenstruktur, URL-Strategie, interne Verlinkung
- `seo-aeo-best-practices` → EEAT, Structured Data, Meta Tags

### Qualitätsprüfung vor jedem Commit
- [ ] Unique Content (nicht nur Variablen ausgetauscht)
- [ ] Keyword natürlich im Fliesstext vorhanden
- [ ] JSON-LD Schema valide
- [ ] Meta Title und Description vorhanden und korrekte Länge
- [ ] 3 interne Links zu verwandten Begriffen
- [ ] Hero-Bild vorhanden unter `/public/images/glossar/[slug].jpg`

