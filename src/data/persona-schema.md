# Persona-Landingpage Daten-Schema

Jede Persona-Landingpage wird aus einer JSON-Datei in `src/data/persona/{audience}-{level}.json` gespeist. Es gibt 12 Dateien (4 Audiences × 3 Level), jede repräsentiert eine Wizard-Endposition.

Die 3 Meta-Hub-Pages (`/souveraene-ki-einstieg|ueberblick|vertiefung`) liegen in `src/data/level-hub/{level}.json` und folgen einem reduzierten Schema (siehe ganz unten).

## Audience-Page Schema

| Feld | Typ | Pflicht | Beschreibung |
|------|-----|---------|--------------|
| `slug` | string | ja | URL-Slug (vollständig, z.B. `"souveraene-ki-fuer-unternehmen-einsteiger"`) |
| `audience` | `"unternehmen" \| "politik" \| "technik" \| "forschung"` | ja | Persona-ID. Treibt Cross-Persona-Links und Eyebrow. |
| `level` | `"einsteiger" \| "kenner" \| "experten"` | ja | Wissensstufe |
| `audience_label` | string | ja | User-facing Label (z.B. `"Unternehmensführung"`) |
| `level_label` | string | ja | User-facing Label (z.B. `"Einstieg"`, `"Vertiefung"`, `"Expertenblick"`) |
| `meta_title` | string | ja | SEO-Title, ≤60 Zeichen, Format `"Souveräne KI für {Audience} ({Level}) | Souveräne KI"` |
| `meta_description` | string | ja | Meta-Description, ≤160 Zeichen, Antwort-zuerst-Format |
| `eyebrow` | string | ja | Kicker über H1, z.B. `"Für Unternehmensführung · Einstieg"` |
| `h1` | string | ja | Page-Headline (genau eine pro Seite) |
| `h2` | string | ja | Subheadline (Job-to-be-done in einem Satz) |
| `intro` | string | ja | ~50–80 Wörter Kontext-Paragraph |
| `tldr` | string[] | ja | 3–5 Bullets ("Was Sie hier mitnehmen") für AEO/Featured-Snippets |
| `abschnitte` | Abschnitt[] | ja | 4–6 H2-Hauptabschnitte à 200–400 Wörter |
| `glossar_links` | GlossarLink[] | ja | 3–5 Glossar-Brücken-Einträge. Linken auf bestehende Glossar-Pages oder rendern als inline Definition |
| `faqs` | FAQ[] | ja | 5–8 Persona-spezifische Fragen. Werden als JSON-LD `FAQPage` exposed |
| `primary_keyword` | string | ja | SEO-Hauptkeyword |
| `secondary_keywords` | string[] | ja | LSI- / Secondary-Keywords |
| `zuletzt_aktualisiert` | string | ja | ISO-Datum (`"2026-05-03"`) |

### Abschnitt-Objekt

```json
{
  "h2": "Was 'souveräne KI' konkret heißt",
  "inhalt": "Fließtext, 200–400 Wörter, kann \\n\\n für Absätze enthalten."
}
```

Sections rendern als `<h2>` (nicht `<h3>` wie im Glossar). Begründung: Glossar-Page hat eine FAQ als H2 und Definition-Sections als H3 — bei Personaseiten sind die Hauptsections selbst H2-würdig (Hierarchie H1 → H2 für Sections + FAQ-Block → keine H3 nötig).

### GlossarLink-Objekt

```json
{
  "slug": "us-cloud-act",
  "begriff": "US CLOUD Act",
  "kontext": "Kurzer Satz, warum dieser Begriff für diese Persona relevant ist (1 Zeile, max. 120 Zeichen)."
}
```

**Wichtig — graceful degradation**: Die Komponente prüft, ob `slug` in `glossar.json` existiert. Wenn ja, wird der Begriff zur Glossar-Page verlinkt. Wenn nein, wird er als nicht-verlinkte Definitionskarte mit `kontext` als Inline-Erklärung gerendert. **Niemals 404-Risiko.** Du kannst also auch auf noch nicht existierende Glossar-Begriffe referenzieren — sie erscheinen als "Begriffe, die hier vorkommen", werden zu Links, sobald die Glossar-Page existiert.

### FAQ-Objekt

```json
{
  "frage": "Was ist der Unterschied zwischen Datenresidenz und Datensouveränität?",
  "antwort": "Antwort, 1–4 Sätze, sachlich, mit konkretem Beleg wenn möglich."
}
```

## Beispiel: Minimal-Eintrag (gekürzt)

```json
{
  "slug": "souveraene-ki-fuer-unternehmen-einsteiger",
  "audience": "unternehmen",
  "level": "einsteiger",
  "audience_label": "Unternehmensführung",
  "level_label": "Einstieg",
  "meta_title": "Souveräne KI für Unternehmen (Einstieg) | Souveräne KI",
  "meta_description": "Was souveräne KI für Ihr Unternehmen heißt — und warum 'EU-Cloud' allein nicht reicht. Einstieg für Vorstand und Geschäftsführung.",
  "eyebrow": "Für Unternehmensführung · Einstieg",
  "h1": "…",
  "h2": "…",
  "intro": "…",
  "tldr": ["…", "…", "…"],
  "abschnitte": [{ "h2": "…", "inhalt": "…" }],
  "glossar_links": [{ "slug": "us-cloud-act", "begriff": "US CLOUD Act", "kontext": "…" }],
  "faqs": [{ "frage": "…", "antwort": "…" }],
  "primary_keyword": "souveräne KI Unternehmen",
  "secondary_keywords": ["souveräne KI", "Datensouveränität", "EU-Cloud"],
  "zuletzt_aktualisiert": "2026-05-03"
}
```

## SEO / AEO-Regeln (verbindlich)

- **Mindestlänge:** 800 sichtbare Wörter Body-Text (Summe `intro` + alle `abschnitte` + `faqs` + `tldr`).
- **Antwort-zuerst:** Erste TL;DR-Bullet beantwortet die Hauptfrage der Persona auf einen Satz.
- **Keyword-Dichte:** `primary_keyword` 1–2 % des Body-Texts. Im H1, in den ersten 100 Wörtern und im Meta-Title vorhanden.
- **H1 nur einmal pro Seite.** Sections sind H2. Abschnitt-Inhalte enthalten keine eigenen Headings.
- **Verlinkung:** Mindestens 3 Glossar-Links. Mindestens 3 Cross-Persona-Links (automatisch über `audience` + `level` aus der `PersonaCrossLinks`-Komponente erzeugt — nicht im JSON pflegen).
- **Tonalität:** Siehe PRODUCT.md. Keine Marketing-Floskeln. Keine Superlative ohne Beleg. Direktansprache "Sie", konsistent.

## Level-Hub Schema (Meta-Routes)

`src/data/level-hub/{level}.json` — vereinfachtes Schema für die 3 Hub-Pages:

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `slug` | string | URL-Slug (z.B. `"souveraene-ki-einstieg"`) |
| `level` | `"einsteiger" \| "kenner" \| "experten"` | bestimmt, welche 4 Persona-Pages verlinkt werden |
| `meta_title` | string | ≤60 Zeichen |
| `meta_description` | string | ≤160 Zeichen |
| `eyebrow` | string | z.B. `"Einstieg"` |
| `h1` | string | Page-Headline |
| `h2` | string | Subheadline |
| `intro` | string | ~150 Wörter Editorial-Intro, persona-übergreifend |
| `card_intro` | string | Kurzer Satz über dem Card-Grid, z.B. `"Wählen Sie Ihre Perspektive:"` |
| `faqs` | FAQ[] | Optional — 0–4 hub-spezifische Fragen |
| `zuletzt_aktualisiert` | string | ISO-Datum |

Die 4 verlinkten Persona-Cards werden zur Render-Zeit aus den entsprechenden `persona/{audience}-{level}.json` Files gezogen (Headline + Subline aus `h1` + `h2`).
