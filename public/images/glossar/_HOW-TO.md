# So legst du Glossar-Hero-Bilder an

Pro Glossar-Eintrag rendert [GlossarPage.tsx](../../../src/components/glossar/GlossarPage.tsx)
ein Hero-Bild über das `<Image>`-Component von Next.js. Pfad-Konvention:

```
public/images/glossar/<slug>.jpg
```

Der `<slug>` ist genau der Wert aus [glossar.json](../../../src/data/glossar.json) —
keine Umlaute, keine Großbuchstaben, Bindestriche statt Unterstriche.

## Aktueller Soll-Stand (20 Slugs)

| Slug | Erwarteter Pfad |
|---|---|
| `suchmaschinenoptimierung` | `public/images/glossar/suchmaschinenoptimierung.jpg` |
| `dsgvo` | `public/images/glossar/dsgvo.jpg` |
| `us-cloud-act` | `public/images/glossar/us-cloud-act.jpg` |
| `eu-ai-act` | `public/images/glossar/eu-ai-act.jpg` |
| `vendor-lock-in` | `public/images/glossar/vendor-lock-in.jpg` |
| `open-source-llm` | `public/images/glossar/open-source-llm.jpg` |
| `datenresidenz` | `public/images/glossar/datenresidenz.jpg` |
| `sovereign-cloud` | `public/images/glossar/sovereign-cloud.jpg` |
| `foundation-models` | `public/images/glossar/foundation-models.jpg` |
| `model-weights` | `public/images/glossar/model-weights.jpg` |
| `hyperscaler` | `public/images/glossar/hyperscaler.jpg` |
| `gaia-x` | `public/images/glossar/gaia-x.jpg` |
| `sovereign-ai` | `public/images/glossar/sovereign-ai.jpg` |
| `on-premise` | `public/images/glossar/on-premise.jpg` |
| `edge-ai` | `public/images/glossar/edge-ai.jpg` |
| `csd-framework` | `public/images/glossar/csd-framework.jpg` |
| `ai-factory` | `public/images/glossar/ai-factory.jpg` |
| `gpu` | `public/images/glossar/gpu.jpg` |
| `modelops` | `public/images/glossar/modelops.jpg` |
| `explainable-ai` | `public/images/glossar/explainable-ai.jpg` |

## Bild-Anforderungen

| Parameter | Wert |
|---|---|
| Format | JPG (Endung `.jpg`, kein `.jpeg`, kein `.png`) |
| Seitenverhältnis | 16:9 |
| Mindestauflösung | 1200 × 675 px |
| Empfohlen | 1600 × 900 px (Retina-Qualität ohne unnötiges Gewicht) |
| Dateigröße | unter 250 KB pro Bild (komprimiert) |
| Farbprofil | sRGB |

## Bilder erzeugen — drei Wege

### A) AI-Generierung (schnellster, brand-konsistentester Weg)

Empfehlung: **FLUX.1 [pro] auf Replicate** (~5 Cent pro Bild) oder
**Midjourney v6** (~10 €/Monat) oder **Imagen 3 in Google AI Studio**
(aktuell kostenlos im Limit).

Brand-konformer Prompt-Baustein, vor jedes Begriff-Stichwort setzen:

```
Editorial photography, deep oak archive vault, single beam of cool
petrol-blue light, warm tinte-and-pergament palette, no people, no text,
no logos, soft film grain, shot on 35mm, depth of field, 16:9 ratio,
brooding but precise — visualizing: <BEGRIFF>
```

Beispiele für `<BEGRIFF>`:

- `dsgvo` → "a stamped legal document on dark wood, deep shadow"
- `gpu` → "an array of cooled server hardware in a darkened rack"
- `edge-ai` → "a small sensor with a glowing dot in an industrial environment"
- `gaia-x` → "interlinked geometric shapes forming a vault doorway"
- `eu-ai-act` → "a closed law book with EU stars in cool light"

### B) Foto-Stock (kostenlos, weniger brand-perfekt)

- [unsplash.com](https://unsplash.com) — kostenlos, kommerziell nutzbar
- [pexels.com](https://www.pexels.com) — ähnliches Modell

Suchstrategie: Möglichst keine Personen, keine Produkt-Shots. Stichwörter
„archive", „server rack", „law book", „dark vault" liefern brauchbare
Ergebnisse. Vorher prüfen, ob das Bild farblich zur Eichensaal-/Petrol-
Palette passt — sonst per Photoshop oder
[squoosh.app](https://squoosh.app) leicht warm-tunen.

### C) Eigene Fotografie

Wenn du selbst fotografierst: f/4–f/8, ISO 200–800, warmweißes Licht
(2700–3200K), dunkler Hintergrund. Hochformat-Crops vermeiden — Glossar-
Layout ist 16:9.

## Bilder optimieren

Vor dem Commit unbedingt komprimieren:

```bash
# Browser-basiert: squoosh.app
# CLI: imagemagick
magick input.jpg -resize 1600x900^ -gravity center -extent 1600x900 \
  -quality 82 -strip -interlace Plane public/images/glossar/<slug>.jpg
```

Oder mit [sharp-cli](https://www.npmjs.com/package/sharp-cli):

```bash
npx sharp-cli -i input.jpg -o public/images/glossar/<slug>.jpg \
  --resize 1600 900 --resize-fit cover --quality 82
```

## Im Repo ablegen + ausliefern

1. Datei nach `public/images/glossar/<slug>.jpg` legen
2. `git add public/images/glossar/<slug>.jpg`
3. `git commit -m "chore: add hero image for glossar/<slug>"`
4. `git push origin main`
5. Vercel deployt automatisch — nach ~2 Min ist das Bild live unter
   `https://souveraeneki.de/images/glossar/<slug>.jpg`

## Aktuell vorhandene Dateien (Stand 2026-05-13)

Korrekt benannt:
- `open-source-llm.jpg` ✓

Falsch benannt (rendern derzeit nicht — bitte umbenennen):
- `dsvgo.jpg` → `dsgvo.jpg`
- `edge_ai.jpg` → `edge-ai.jpg`
- `eu_ai_act.png` → `eu-ai-act.jpg` (zusätzlich von PNG zu JPG konvertieren)
- `gaia-x.png` → `gaia-x.jpg` (PNG zu JPG)
- `on_premise.jpg` → `on-premise.jpg`
- `sovereign_ai.png` → `sovereign-ai.jpg` (PNG zu JPG)

Umbenennen im Terminal:

```bash
cd public/images/glossar
git mv dsvgo.jpg dsgvo.jpg
git mv edge_ai.jpg edge-ai.jpg
git mv on_premise.jpg on-premise.jpg
# PNG zu JPG konvertieren (mit ImageMagick):
magick eu_ai_act.png -quality 82 eu-ai-act.jpg && git rm eu_ai_act.png && git add eu-ai-act.jpg
magick gaia-x.png    -quality 82 gaia-x.jpg    && git rm gaia-x.png    && git add gaia-x.jpg
magick sovereign_ai.png -quality 82 sovereign-ai.jpg && git rm sovereign_ai.png && git add sovereign-ai.jpg
git commit -m "chore: normalize glossar hero image filenames"
git push origin main
```

## Fallback ohne Bild

Solange ein Bild fehlt, zeigt Next/Image im Hero der Glossar-Detail-Seite
einen leeren Container. Layout bleibt stabil, kein 404, kein Build-Fehler.
Du kannst Bilder also einzeln und in beliebiger Reihenfolge nachliefern.
