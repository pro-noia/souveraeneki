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

- **App Router**: All routes live in `app/` — pages are `page.tsx`, layouts are `layout.tsx`
- **Styling**: Tailwind CSS 4 with PostCSS; global CSS variables in `app/globals.css` handle dark/light theming via `prefers-color-scheme`
- **Path alias**: `@/*` maps to the project root
- **TypeScript**: Strict mode enabled, bundler module resolution
- **Fonts**: 'Inter', 'SF Pro Display', -apple-system, sans-serif

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
Dark-theme, premium, tech-forward website for a Sovereign AI platform.
Core principle: "Quiet Authority" — institutional strength, not startup energy.

---

### Color Palette

```css
/* Backgrounds */
--bg-primary:        #0A0A0F;       /* Near-black with slight violet tint */
--bg-secondary:      #12101A;       /* Dark violet-black for alternating sections */
--bg-elevated:       #1A1625;       /* Elevated surfaces: cards, nav */
--bg-gradient:       linear-gradient(180deg, #1A1028 0%, #0A0A0F 50%, #0A0A0F 100%);

/* Accent Colors */
--accent-primary:    #E8564A;       /* Warm coral-red — primary CTA */
--accent-secondary:  #F4845F;       /* Warm orange — highlights, hover states */
--accent-glow:       rgba(232, 86, 74, 0.3);
--accent-gradient:   linear-gradient(135deg, #E8564A, #F4845F);

/* Text */
--text-primary:      #F0EBE3;       /* Warm off-white — headlines */
--text-secondary:    #9B95A0;       /* Muted gray-violet — body text */
--text-muted:        #6B6570;       /* Labels, footnotes, captions */

/* Borders & Glass */
--border-subtle:     rgba(255, 255, 255, 0.06);
--border-hover:      rgba(255, 255, 255, 0.12);
--glass-bg:          rgba(26, 22, 37, 0.7);
--glass-blur:        12px;
```

### Background Treatment
- Top area (hero) has a **subtle violet/magenta atmospheric glow** that fades into pure dark below.
- Optional radial gradient behind hero visual using #2D1B3D / #1A1028.
- Never use hard or saturated background colors — keep everything muted and atmospheric.

---

### Typography

#### Font Stack
```css
--font-heading:  'Inter', 'SF Pro Display', -apple-system, sans-serif;
--font-body:     'Inter', 'SF Pro Text', -apple-system, sans-serif;
--font-mono:     'JetBrains Mono', 'Fira Code', monospace;
```
Alternative for headlines: 'Space Grotesk' or 'Satoshi' for a more geometric feel.

#### Type Scale
```css
--text-hero:     clamp(3rem, 6vw, 4.5rem);     /* 48–72px */
--text-h1:       clamp(2.25rem, 4vw, 3.5rem);  /* 36–56px */
--text-h2:       clamp(1.75rem, 3vw, 2.5rem);  /* 28–40px */
--text-h3:       clamp(1.25rem, 2vw, 1.75rem); /* 20–28px */
--text-body:     1rem;                           /* 16px */
--text-body-lg:  1.125rem;                       /* 18px */
--text-small:    0.875rem;                       /* 14px */
--text-caption:  0.75rem;                        /* 12px */
```

#### Typography Rules
- Headlines: font-weight 600–700, letter-spacing: -0.02em
- **Colored keyword highlighting in headlines:** Emphasize 1–2 key words per headline using `--accent-secondary` (#F4845F)
- Body text: font-weight 400, line-height 1.6–1.7, color: `--text-secondary`
- No uppercase except for small labels/badges

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

## Hero Section

#### Layout
- Split layout: text left (~50%), visual right (~50%)
- Text vertically centered, starting at ~20% from left
- Hero visual bleeds slightly past the right edge (overflow: hidden on container)
- Auf Mobilgeräten: Stacking – Text oben, Visual darunter

#### Hero Text (linke Hälfte)
- 3 rotierende Headlines im Ticker-Stil (smooth slide-up Animation)
- Jede Headline 2-3 Zeilen, Wechsel alle 3-4 Sekunden, Endlosschleife
- Darunter: kurzer statischer Subtext + CTA-Button

#### Hero Visual (rechte Hälfte)
- Large, colorful 3D visual (cloud, network, sphere, or abstract data form)
- Color spectrum: blue → violet → magenta → orange → red (top-left to bottom-right)
- Glowing particles / data-rain effect below the visual (vertical luminous lines + dots)
- Visual casts a soft glow into the surrounding background
- Rein CSS/SVG-basiert, performant animiert

#### Hero Content Structure
```
[Large multi-line headline with colored keyword]
[Subheadline — 2–3 lines, --text-secondary]
[Two buttons side by side: Primary CTA + Secondary CTA]
```

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

- **Framework:** Next.js 14+ (App Router) or Astro
- **Styling:** Tailwind CSS 4 with custom theme config
- **Animations:** Framer Motion for scroll animations, CSS for hover/transitions
- **Hero Visual:** High-quality static image (WebP/AVIF) or Three.js for 3D
- **Icons:** Lucide Icons or Phosphor Icons

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
