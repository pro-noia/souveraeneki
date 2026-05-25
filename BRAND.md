# Souveräne KI — CI Kurz-Style-Guide

> Quickref für Web + Marketing-Material. Vollständige Tokens:
> [src/app/globals.css](src/app/globals.css) · Voice + Anti-Refs: [PRODUCT.md](PRODUCT.md)

## Fonts

| Rolle | Family | Quelle |
|---|---|---|
| Display + Body | **System UI** — SF Pro (Apple), Segoe UI (Windows), nativ (Linux) | OS-nativ, kein Webfont |
| Mono / Eyebrows | **Cousine** (Weight 400 / 700) | Google Fonts |

CSS-Stack: `-apple-system, BlinkMacSystemFont, system-ui, 'Helvetica Neue', sans-serif`.
SF Pro darf nicht als Webfont serviert werden (Apple-Lizenz) — daher der
`-apple-system`-Stack. Headlines: `font-weight: 500–600`, `letter-spacing: -0.02em`,
kein Uppercase außer auf kurzen Labels. Body: `font-weight: 400`, `line-height: 1.65`.

OG-Image-Renderings (Share-Previews für LinkedIn/Twitter) nutzen aus Necessity
einen Webfont (Source Sans 3 via `next/og`), da Satori keine System-Fonts
laden kann. Visueller Unterschied nur außerhalb der eigenen Website sichtbar.

## Farben

| Rolle | Name | Hex |
|---|---|---|
| Page-BG (dark) | Eichensaal-Deep | `#1B1612` (oklch 0.115 0.012 65) |
| Footer / Wells | Tinte-Deep | `#0C1626` (oklch 0.085 0.022 260) |
| **Primary Accent** | **Petrol-Bright** | `#3A90AA` (oklch 0.58 0.095 200) |
| Secondary Accent | Mondstein | `#A4C8D6` (oklch 0.78 0.055 220) |
| Warning / Spectrum 1 | Rost | `#C45E3A` (oklch 0.48 0.115 35) |
| Caution / Spectrum 2 | Bernstein | `#C4923A` (oklch 0.65 0.095 75) |
| Success / Spectrum 4 | Salbei | `#7FA873` (oklch 0.62 0.055 145) |
| Text (primary) | Pergament | `#F4ECE1` (NIE pures `#FFFFFF`) |
| Text (body) | Pergament-Muted | `#D4C8B4` |

**Spektrum-Reise** (vier Souveränitäts-Stufen):
Rost → Bernstein → Petrol → Salbei.
Material-archivisch — **kein RYAG-Ampelschema**.

## Buttons

Beide pill-shaped (`border-radius: 9999px`), `padding: 12px 28px`, Source Sans 3 500.

```css
/* Primary — Petrol solid */
background: var(--petrol-bright);
color: #FFFFFF;
border: none;

/* Secondary — Outline auf dunklem Grund */
background: transparent;
color: var(--pergament);
border: 1px solid rgba(255, 255, 255, 0.15);
```

Hover Primary: Mondstein-Shift + leichter Petrol-Glow.
Hover Secondary: Border wird heller (`rgba(255,255,255,0.25)`).

## Spacing & Container

| Token | Wert |
|---|---|
| `--container-max` | `1280px` |
| `--container-padding` | `clamp(1rem, 4vw, 2rem)` |
| `--space-section` | `clamp(4rem, 10vw, 8rem)` (Padding pro Section) |
| Card-Border-Radius | `16px` (nie sharp corners) |

## Anti-References (verbindlich)

- **Keine** AI-Cosmic-Violet-Gradients (`#0066FF → #7B2FBE`)
- **Kein** Glassmorphism als Default (Header + Modals laufen solid)
- **Kein** RYAG-Ampelschema im Spectrum
- **Keine** Flaggen / Nationalsymbolik trotz „Souveränität"
- **Kein** Inter, kein JetBrains Mono (Reflex-Reject)

## Tonalität

Selbstbewusst, präzise, leise rebellisch. Editorial vor Marketing.
Deutsche UI-Sprache, englische Variablen. Keine Floskeln
(„revolutionary", „seamless", „empowering"). Eine kurze
Aussage pro Section.
