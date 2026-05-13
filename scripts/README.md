# scripts/

Lokale Hilfsskripte. Werden **nicht** im Build oder auf Vercel ausgeführt —
nur manuell vom Entwicklungsrechner aus.

## `generate-glossar-images.mjs` — Glossar-Hero-Bilder via FLUX 1.1 Pro

Erzeugt mit der Replicate API für alle 20 Glossar-Slugs Hero-Bilder im
Brand-Stil (Editorial Vault-Look, 16:9, JPG). Bilder landen unter
`public/images/glossar/<slug>.jpg`.

### Voraussetzung — Replicate API Token

1. Account anlegen / einloggen: https://replicate.com
2. Token erstellen: https://replicate.com/account/api-tokens →
   „Create token" → kopieren (beginnt mit `r8_…`)
3. Token in deiner Shell setzen — temporär oder dauerhaft:

   **Temporär (nur aktuelle Shell-Session):**
   ```bash
   export REPLICATE_API_TOKEN=r8_…
   ```

   **Dauerhaft (zsh, persistent):**
   ```bash
   echo 'export REPLICATE_API_TOKEN=r8_…' >> ~/.zshrc
   source ~/.zshrc
   ```

   **Inline für einen Lauf:**
   ```bash
   REPLICATE_API_TOKEN=r8_… npm run images:glossar
   ```

   **Aus einer lokalen `.env.local`** (Node 20+):
   ```bash
   node --env-file=.env.local scripts/generate-glossar-images.mjs
   ```
   Trage in `.env.local` (nicht committed — steht in `.gitignore`) ein:
   ```
   REPLICATE_API_TOKEN=r8_…
   ```

### Aufruf

**Alle fehlenden Bilder generieren** (bestehende werden übersprungen):
```bash
npm run images:glossar
```

**Nur einzelne Slugs** (z. B. nach Prompt-Anpassung neu generieren —
vorher die alte Datei löschen!):
```bash
rm public/images/glossar/dsgvo.jpg
npm run images:glossar -- dsgvo
```

**Mehrere auf einmal:**
```bash
npm run images:glossar -- dsgvo eu-ai-act gaia-x
```

### Was das Skript macht

1. Liest die Slug-Liste aus `src/data/glossar.json` (Single Source of Truth)
2. Pro Slug:
   - Prüft, ob `public/images/glossar/<slug>.jpg` schon existiert →
     überspringen (resumable)
   - Schickt einen Prompt-POST an Replicate FLUX 1.1 Pro mit
     `aspect_ratio: "16:9"`, `output_format: "jpg"`, `output_quality: 85`,
     `prompt_upsampling: true`
   - Wartet bis zu 60 s synchron (`Prefer: wait`), dann polled alle 2 s
   - Lädt das fertige Bild herunter und speichert es als JPG
3. Fasst am Ende zusammen: `X neu generiert, Y übersprungen, Z fehlgeschlagen`

### Kosten

FLUX 1.1 Pro auf Replicate kostet zum Stand 2026-05 **~$0.04 pro Bild**.
Alle 20 Slugs ≈ 80 ¢. Der Token wird über deinen Replicate-Account
abgerechnet — Replicate verlangt eine vorab hinterlegte Zahlungsmethode.

### Prompts und Brand-Stil

- Gemeinsamer Brand-Suffix in [generate-glossar-images.mjs](generate-glossar-images.mjs)
  setzt Editorial-Vault-Atmosphäre (Eichensaal + Petrol + Pergament).
- Pro Slug ein konkretes, gegenständliches Motiv — keine abstrakten
  „AI-Konzept-Visuals", die in den US-SaaS-Look kippen.
- Anpassen: Konstanten `BRAND_SUFFIX` und `SLUG_PROMPTS` im Skript editieren,
  alte Datei löschen, Skript für den Slug neu starten.

### Nach dem Lauf

```bash
# Bilder ansehen
open public/images/glossar/dsgvo.jpg

# Committen
git add public/images/glossar/*.jpg
git commit -m "chore: generate glossar hero images via FLUX 1.1 Pro"
git push origin main
```

Vercel deployt automatisch — nach ~2 Min sind die Bilder live.

### Troubleshooting

| Symptom | Ursache | Lösung |
|---|---|---|
| `REPLICATE_API_TOKEN fehlt` | Env-Variable nicht gesetzt | siehe Voraussetzung-Block oben |
| `Replicate API 401` | Token ungültig oder abgelaufen | neuen Token erstellen |
| `Replicate API 402` | Replicate-Account ohne Zahlungsmittel | Zahlung hinterlegen |
| `Image download failed: HTTP 404` | Output-URL ist abgelaufen (selten) | Slug erneut laufen lassen |
| Bild gefällt nicht | Motiv-Prompt zu schwach | im Skript `SLUG_PROMPTS[<slug>]` anpassen, Datei löschen, neu generieren |
| Stil zu hell / zu marketing-y | Brand-Suffix zu schwach | `BRAND_SUFFIX` anpassen — siehe [PRODUCT.md](../PRODUCT.md) für Brand-Regeln |
