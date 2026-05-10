# TODO: Glossar Hero-Bilder

Pro Glossar-Eintrag wird ein Hero-Bild unter `/public/images/glossar/<slug>.jpg`
erwartet — 16:9, mindestens 1200×675 px (siehe CLAUDE.md, Glossar-Konventionen).

## Vorhandene Bilder

- (noch keine)

## Fehlende Bilder

| Slug | Begriff | Eintrag-Typ |
|------|---------|-------------|
| `suchmaschinenoptimierung` | Suchmaschinenoptimierung | Bestand |
| `dsgvo` | DSGVO | Bestand |
| `us-cloud-act` | US CLOUD Act | Tranche 1 (2026-05-09) |
| `eu-ai-act` | EU AI Act | Tranche 1 (2026-05-09) |
| `vendor-lock-in` | Vendor Lock-in | Tranche 1 (2026-05-09) |
| `open-source-llm` | Open-Source-LLM | Tranche 1 (2026-05-09) |
| `datenresidenz` | Datenresidenz | Tranche 1 (2026-05-09) |
| `sovereign-cloud` | Sovereign Cloud | Tranche 2 (2026-05-09) |
| `foundation-models` | Foundation Models | Tranche 2 (2026-05-09) |
| `model-weights` | Model Weights | Tranche 2 (2026-05-09) |
| `hyperscaler` | Hyperscaler | Tranche 2 (2026-05-09) |
| `gaia-x` | GAIA-X | Tranche 2 (2026-05-09) |
| `sovereign-ai` | Sovereign AI | Tranche 3 (2026-05-09) |
| `on-premise` | On-Premise | Tranche 3 (2026-05-09) |
| `edge-ai` | Edge AI | Tranche 3 (2026-05-09) |
| `csd-framework` | Cloud Sovereignty Disclosure Framework | Tranche 3 (2026-05-09) |
| `ai-factory` | AI Factory | Tranche 3 (2026-05-09) |
| `gpu` | GPU | Tranche 3 (2026-05-09) |
| `modelops` | ModelOps | Tranche 3 (2026-05-09) |
| `explainable-ai` | Explainable AI | Tranche 3 (2026-05-09) |

Bis Hero-Bilder produziert sind, fängt `GlossarPage.tsx` fehlende JPGs über
einen On-Demand-OG-Render-Fallback ab — falls dieser noch nicht implementiert
ist, zeigt Next/Image ein Broken-Image-Preview ohne Build-Fehler.
