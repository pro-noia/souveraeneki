# Glossar Daten-Schema

Jeder Eintrag in `glossar.json` hat folgende Felder:

| Feld | Typ | Beschreibung | Beispiel |
|------|-----|--------------|---------|
| `slug` | string | URL-freundlicher Bezeichner | `"suchmaschinenoptimierung"` |
| `begriff` | string | Anzeigename des Begriffs | `"Suchmaschinenoptimierung"` |
| `abkuerzung` | string? | Optionale Abkürzung | `"SEO"` |
| `meta_title` | string | SEO Title (max. 60 Zeichen) | `"Suchmaschinenoptimierung – Definition & Erklärung"` |
| `meta_description` | string | Meta Description (max. 160 Zeichen) | `"Was ist Suchmaschinenoptimierung? Alles über SEO..."` |
| `h1` | string | Hauptüberschrift | `"Was ist Suchmaschinenoptimierung (SEO)?"` |
| `h2` | string | Subheadline | `"Der vollständige Leitfaden für mehr organische Reichweite"` |
| `primary_keyword` | string | Haupt-Keyword | `"Suchmaschinenoptimierung"` |
| `secondary_keywords` | string[] | Weitere Keywords | `["SEO", "Google Ranking", "organische Suche"]` |
| `abschnitte` | Abschnitt[] | Inhaltliche Abschnitte (4–6 Stück) | siehe unten |
| `faqs` | FAQ[] | FAQs für Schema & Content (min. 3) | siehe unten |
| `related_slugs` | string[] | Verwandte Begriffe (genau 3) | `["on-page-seo", "backlinks", "keyword-recherche"]` |
| `kategorie` | string | Thematische Kategorie | `"Grundlagen"` |
| `schwierigkeitsgrad` | string | `"Einsteiger"` / `"Fortgeschritten"` / `"Experte"` | `"Einsteiger"` |
| `zuletzt_aktualisiert` | string | ISO Datum | `"2026-02-23"` |

### Abschnitt-Objekt
```json
{
  "h3": "Wie funktioniert Suchmaschinenoptimierung?",
  "inhalt": "Fliesstext mit 150–300 Wörtern, SEO-optimiert..."
}
```

### FAQ-Objekt
```json
{
  "frage": "Was kostet Suchmaschinenoptimierung?",
  "antwort": "Die Kosten für SEO variieren stark..."
}
```

## Beispiel-Eintrag (Vollständig)

```json
{
  "slug": "suchmaschinenoptimierung",
  "begriff": "Suchmaschinenoptimierung",
  "abkuerzung": "SEO",
  "meta_title": "Suchmaschinenoptimierung – Definition & Erklärung | Glossar",
  "meta_description": "Was ist Suchmaschinenoptimierung? Einfach erklärt: Definition, Massnahmen und warum SEO für jede Website entscheidend ist.",
  "h1": "Was ist Suchmaschinenoptimierung (SEO)?",
  "h2": "Definition, Grundlagen und Massnahmen für mehr organische Sichtbarkeit",
  "primary_keyword": "Suchmaschinenoptimierung",
  "secondary_keywords": ["SEO", "Google Ranking", "organische Suche", "OnPage SEO", "OffPage SEO"],
  "abschnitte": [
    {
      "h3": "Definition: Was bedeutet Suchmaschinenoptimierung?",
      "inhalt": "Suchmaschinenoptimierung (SEO) umfasst alle Massnahmen..."
    },
    {
      "h3": "Wie funktioniert SEO technisch?",
      "inhalt": "Google und andere Suchmaschinen nutzen Crawler..."
    },
    {
      "h3": "OnPage vs. OffPage SEO",
      "inhalt": "SEO lässt sich in zwei Hauptbereiche unterteilen..."
    },
    {
      "h3": "Die wichtigsten SEO-Rankingfaktoren 2026",
      "inhalt": "Google verwendet über 200 Rankingfaktoren..."
    },
    {
      "h3": "SEO-Massnahmen für Einsteiger",
      "inhalt": "Wer mit Suchmaschinenoptimierung beginnt, sollte..."
    },
    {
      "h3": "Häufige SEO-Fehler vermeiden",
      "inhalt": "Auch erfahrene Website-Betreiber machen typische Fehler..."
    }
  ],
  "faqs": [
    {
      "frage": "Was ist Suchmaschinenoptimierung einfach erklärt?",
      "antwort": "Suchmaschinenoptimierung (SEO) bezeichnet alle Massnahmen, die dazu beitragen, dass eine Website in den organischen Suchergebnissen bei Google und anderen Suchmaschinen höher erscheint."
    },
    {
      "frage": "Wie lange dauert es, bis SEO wirkt?",
      "antwort": "SEO ist eine langfristige Strategie. Erste Ergebnisse sind oft nach 3–6 Monaten sichtbar, signifikante Verbesserungen nach 6–12 Monaten."
    },
    {
      "frage": "Was kostet Suchmaschinenoptimierung?",
      "antwort": "Die Kosten variieren stark: von kostenlosen Eigenmassnahmen bis zu mehreren Tausend Franken monatlich für professionelle SEO-Agenturen."
    }
  ],
  "related_slugs": ["keyword-recherche", "backlinks", "meta-tags"],
  "kategorie": "Grundlagen",
  "schwierigkeitsgrad": "Einsteiger",
  "zuletzt_aktualisiert": "2026-02-23"
}
```
