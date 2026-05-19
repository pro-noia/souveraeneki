# Whitepaper pptx generieren

Wandelt [souveraene-ki-whitepaper.docx](../souveraene-ki-whitepaper.docx) in
ein **editierbares** [public/whitepaper.pptx](../public/whitepaper.pptx) im
Site-Brand-Look mit weißem Hintergrund (druckfreundlich).

Resultat: 20 Slides, ~70 KB, 16:9 (13,33″ × 7,5″), editierbar in PowerPoint,
Keynote, LibreOffice Impress.

## Einmal: Dependencies

```bash
python3 -m venv .venv
.venv/bin/pip install python-pptx python-docx
```

`.venv/` ist in `.gitignore`, wird also nicht committed. Wenn das `.venv`
fehlt, wirft `npm run pptx:whitepaper` einen klaren Fehler.

## Generieren

```bash
npm run pptx:whitepaper
# → public/whitepaper.pptx (überschreibt vorhandene Datei ohne Nachfrage)
```

Output:

```
✓ public/whitepaper.pptx geschrieben — 20 Slides, 71.6 KB
```

## Prüfen

```bash
open public/whitepaper.pptx       # öffnet in Keynote
```

Erwartete Reihenfolge:

1. Cover  ·  „Souveräne KI in Europa."
2. Die Kernthese
3. Executive Summary (Narrativ + 3 Stat-Kacheln rechts)
4. Akt I Divider  ·  „Der Weckruf."
5. 6:14 Uhr — Editorial mit Sidebar „Drei Fakten zur Szene"
6. Pull-Quote — Carniaux unter Eid + WAS PASSIERT / WAS ES BEDEUTET
7. Vier Vignetten — Industrie / Finanz / Healthcare / Public
8. Akt II Divider  ·  „Die Landkarte."
9. Agency-Triade (Wahl / Kontrolle / Wechsel)
10. Regulatorische Welle 2025–2028 — sechs Stichtage als Bullet-Listing
11. Intelligence Taker (Rost) vs Intelligence Maker (Salbei) — zweispaltig
12. Sovereign Operating Matrix — vier Modell-Karten horizontal
13. Vier Säulen + europäisches Ökosystem (Mistral, Aleph Alpha, STACKIT, …)
14. Akt III Divider  ·  „Der Spielzug."
15. CSD-Framework — Control (Rost) / Steer (Bernstein) / Depend (Salbei)
16. 90-Tage-Roadmap — drei Phasen mit Schritten
17. 12-Fragen-Souveränitäts-Check — vier Kategorien × drei Fragen
18. Vier Levels (Score-Auswertung)
19. Schlussbild „Auf eigenem Grund bauen." — drei Sätze fürs Board
20. Anhang — 28 Quellen mit URLs in zwei Spalten

## Brand-Theme

Light-Adaption des Site-Looks (siehe [PRODUCT.md](../PRODUCT.md) und
[src/app/globals.css](../src/app/globals.css)):

| Element | Hex |
|---|---|
| Hintergrund | `#FFFFFF` (pures Weiß, druck-clean) |
| Headlines | `#0C1626` (tinte-deep) |
| Body | `#1F2937` (anthrazit) |
| Body-Muted | `#4B5563` |
| Petrol-Akzent (Eyebrows + Lines) | `#3A90AA` |
| Petrol-Deep (Sekundär-Caption) | `#2A6C7E` |
| Mondstein-Deep (Footer) | `#557B95` |
| Rost (Warnung / Pfad A) | `#C45E3A` |
| Salbei (Erfolg / Pfad B) | `#7FA873` |
| Bernstein (Hinweis) | `#C4923A` |

Master-Element auf jeder Slide:

- **Petrol-Top-Bar** (3 pt) ganz oben — Echo zum OG-Image-Layout
- **Logo oben links**: Petrol-Square 12 pt + „Souveräne KI" Wordmark
- **Footer**: „PRAXISLEITFADEN · SOUVERÄNE KI · MAI 2026" links,
  Seitenzahl `xx · 20` rechts (beides Cousine-Mono in Mondstein-Deep)

## Fonts

Das Skript setzt **Manrope** (Display) und **Cousine** (Mono) per `font.name`.
Sind diese Fonts auf dem öffnenden System nicht installiert, fällt
PowerPoint / Keynote stillschweigend auf System-Fallbacks zurück (Helvetica
Neue / Menlo) — der Brand-Look bleibt im Großen erhalten, Letter-Spacing
und Spacing-Feinheiten verschieben sich aber leicht.

Für 100 % brand-identisches Rendering empfohlen: Manrope und Cousine
von Google Fonts kostenlos installieren.

- https://fonts.google.com/specimen/Manrope (alle Schnitte)
- https://fonts.google.com/specimen/Cousine (Regular + Bold reicht)

Nach Download `.ttf`-Dateien doppelklicken → in „Schriftsammlung" als
verfügbar markieren. Dann pptx erneut öffnen.

## Inhalt ändern

Slide-Inhalte sind im Skript [generate-whitepaper-pptx.py](generate-whitepaper-pptx.py)
direkt eingebettet (kein automatisches Re-Parsing des docx pro Slide —
einmaliger semantischer Sync). Wenn das Whitepaper-docx sich inhaltlich
ändert:

1. Im Skript die betreffenden Slide-Builder-Aufrufe in `main()` aktualisieren
2. `npm run pptx:whitepaper` neu laufen lassen
3. Resultat öffnen und prüfen

Alternativ: das fertige pptx selbst in Keynote bearbeiten — Änderungen
bleiben im pptx erhalten, gehen aber beim nächsten `npm run pptx:whitepaper`
verloren (Skript überschreibt). Best Practice: erst Skript ändern, dann
generieren.

## Bekannte Limitationen

- **Diagramm-Platzhalter im docx** (markiert mit `◇` — z. B. „Regulatorische
  Timeline" oder „Wo fließt das Wissen hin?") sind in der pptx **nicht**
  als Bild umgesetzt. Stattdessen wurden die Inhalte als textuelle Listen
  in den Editorial-Slides verarbeitet. Wenn echte Infografiken benötigt
  werden: nachträglich per Keynote einfügen oder per Designer/Replicate
  generieren und in die entsprechende Slide einsetzen.
- **Tabelle „Regulatorische Welle"** (7 × 4 im docx) ist in Slide 10 als
  Bullet-Liste umgesetzt — kompakter und lesbarer in pptx-Format.
- **Letter-Spacing** wird per XML-Override gesetzt (`spc`-Attribut). Im
  Keynote-Editor sichtbar, aber nicht direkt über die UI editierbar.
- **Print-Optimierung**: weißer Hintergrund druckt kein Pixel — also keine
  Tintenverschwendung. Petrol-Akzente und Stat-Zahlen drucken farbig.
  Empfehlung: A4 quer, „Slides per page = 1".

## Im Frontend einbinden (optional)

Die pptx liegt unter `/whitepaper.pptx` und ist nach Deploy unter
`https://souveräneki.de/whitepaper.pptx` erreichbar. Aktuell zeigt
[WhitepaperSection.tsx](../src/components/whitepaper/WhitepaperSection.tsx)
nach Form-Submit nur einen PDF-Download-Button. Optional kann ein zweiter
Button daneben angeboten werden:

```tsx
<a
  href="/whitepaper.pptx"
  download="Souveraene-KI-Whitepaper.pptx"
  className="btn-secondary"
>
  Auch als pptx (editierbar)
</a>
```

Für Empfänger, die das Whitepaper in eigenen Vortragsmaterialien
weiterverwenden wollen.
