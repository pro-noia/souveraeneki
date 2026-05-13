#!/usr/bin/env node
/**
 * Generiert Glossar-Hero-Bilder über Replicate (FLUX 1.1 Pro).
 * Output: public/images/glossar/<slug>.jpg im Brand-Stil.
 *
 * Nutzung — siehe scripts/README.md.
 *
 *   REPLICATE_API_TOKEN=… npm run images:glossar
 *   REPLICATE_API_TOKEN=… npm run images:glossar -- dsgvo eu-ai-act
 *
 * Vorhandene Bilder werden übersprungen (resumable). Fehlschläge bei
 * einzelnen Slugs brechen den Lauf nicht ab.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const OUTPUT_DIR = path.join(REPO_ROOT, "public/images/glossar");
const GLOSSAR_JSON = path.join(REPO_ROOT, "src/data/glossar.json");

const TOKEN = process.env.REPLICATE_API_TOKEN;
if (!TOKEN) {
  console.error(
    "✗ Umgebungsvariable REPLICATE_API_TOKEN fehlt.\n" +
      "  Setze sie via `export REPLICATE_API_TOKEN=r8_…` oder\n" +
      "  starte den Lauf mit `REPLICATE_API_TOKEN=r8_… npm run images:glossar`.\n" +
      "  Token erstellen: https://replicate.com/account/api-tokens",
  );
  process.exit(1);
}

// Gemeinsamer Brand-Prompt-Baustein — Editorial Vault-Look.
// Bewusst keine Begriffe wie „technology", „futuristic", „AI" oder
// „cyber" — die kippen FLUX in den US-SaaS-Look, den PRODUCT.md verbietet.
const BRAND_SUFFIX =
  "Editorial photography, deep oak archive vault interior, " +
  "single shaft of cool petrol-blue light cutting through dust, " +
  "warm pergament and tinte color palette, dark walnut surfaces, " +
  "no people, no faces, no text, no logos, no flags, no national symbols, " +
  "soft film grain, shot on 35mm Kodak Portra 400, shallow depth of field, " +
  "16:9 cinematic frame, brooding but precise, library-archive atmosphere";

// Motiv pro Slug. Kurz, konkret, gegenständlich — kein abstrakter
// „Konzept-AI-Look", sondern ein physisches Stillleben oder
// Architektur-Detail, das den Begriff materiell übersetzt.
const SLUG_PROMPTS = {
  suchmaschinenoptimierung:
    "an antique brass magnifying glass resting on a stack of old leather-bound encyclopedia volumes",
  dsgvo:
    "an embossed wax-sealed legal document on dark oak desk, single beam of light catching the seal",
  "us-cloud-act":
    "a heavy steel document case in deep shadow, embossed eagle insignia barely visible, brass padlock engaged",
  "eu-ai-act":
    "a closed thick lawbook bound in dark navy leather, twelve embossed gold stars on the cover, dark oak table",
  "vendor-lock-in":
    "a large patinaed brass padlock and chain wrapped around an antique wooden chest in dim cool light",
  "open-source-llm":
    "an open wooden chest filled with parchment scrolls and a small softly glowing oil lantern inside",
  datenresidenz:
    "a vintage brass globe focused on the European continent, illuminated by a warm desk beam, dark wood library behind",
  "sovereign-cloud":
    "a heavy marble vault door slightly ajar, cool petrol-blue light glowing from inside the chamber",
  "foundation-models":
    "a massive cast-iron vault foundation viewed from low angle, deeply shadowed, single light from above",
  "model-weights":
    "stacked polished brass calibration weights on dark oak counter, single cool overhead beam, mathematical precision",
  hyperscaler:
    "a vast cavernous warehouse silhouette with endless rows of fluorescent-lit industrial shelving disappearing into darkness",
  "gaia-x":
    "interlinked geometric stone arches forming a vault doorway, cool petrol light glowing from beyond the arches",
  "sovereign-ai":
    "a heavy iron crown resting on a closed oak treaty document, dim cool light, ceremonial stillness",
  "on-premise":
    "an old wood-paneled server room from the 1970s with a single warm desk lamp, dim outlines of equipment",
  "edge-ai":
    "a small precision sensor with a single tiny glowing indicator mounted on dark industrial machinery, peripheral darkness",
  "csd-framework":
    "a meticulously organized wooden index-card filing cabinet with one brass-handled drawer slightly pulled open",
  "ai-factory":
    "interior of a vast 19th-century industrial hall with steel beams, single petrol-blue beam cutting through dust motes",
  gpu: "arrays of dark, cooled processing hardware in server racks, single cool LED hint, brooding atmosphere",
  modelops:
    "a railroad switch yard at deep twilight, multiple steel tracks converging under a brooding sky, signal lamps",
  "explainable-ai":
    "an open architectural blueprint on dark oak desk, brass magnifying glass and graphite pencil, single warm lamp",
};

async function loadGlossarSlugs() {
  const raw = await fs.readFile(GLOSSAR_JSON, "utf8");
  return JSON.parse(raw).map((e) => e.slug);
}

async function createPrediction(prompt) {
  // Modell-Endpoint: black-forest-labs/flux-1.1-pro
  // Doku: https://replicate.com/black-forest-labs/flux-1.1-pro/api
  const res = await fetch(
    "https://api.replicate.com/v1/models/black-forest-labs/flux-1.1-pro/predictions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        // "Prefer: wait" lässt Replicate bis zu 60 s warten und liefert das
        // Ergebnis ggf. direkt zurück — spart Polling für schnelle Modelle.
        Prefer: "wait=60",
      },
      body: JSON.stringify({
        input: {
          prompt,
          aspect_ratio: "16:9",
          output_format: "jpg",
          output_quality: 85,
          prompt_upsampling: true,
          safety_tolerance: 5,
        },
      }),
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Replicate API ${res.status}: ${text}`);
  }
  return res.json();
}

async function pollPrediction(predictionId, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, 2000));
    const res = await fetch(
      `https://api.replicate.com/v1/predictions/${predictionId}`,
      { headers: { Authorization: `Bearer ${TOKEN}` } },
    );
    if (!res.ok) {
      throw new Error(`Polling failed: HTTP ${res.status}`);
    }
    const data = await res.json();
    if (data.status === "succeeded") return data;
    if (data.status === "failed" || data.status === "canceled") {
      throw new Error(
        `Prediction ${predictionId} ${data.status}: ${data.error ?? "no error"}`,
      );
    }
  }
  throw new Error(`Prediction ${predictionId} polling timed out`);
}

async function generateForSlug(slug, motif) {
  const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);
  try {
    await fs.access(outPath);
    console.log(`✓  ${slug.padEnd(28)} bereits vorhanden, überspringe`);
    return;
  } catch {
    /* file missing — proceed */
  }

  const prompt = `${motif}. ${BRAND_SUFFIX}`;
  process.stdout.write(`⏳ ${slug.padEnd(28)} generiere… `);

  let prediction = await createPrediction(prompt);
  if (prediction.status !== "succeeded") {
    prediction = await pollPrediction(prediction.id);
  }

  const imageUrl = Array.isArray(prediction.output)
    ? prediction.output[0]
    : prediction.output;
  if (!imageUrl) {
    throw new Error(`No image URL in prediction ${prediction.id}`);
  }

  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) {
    throw new Error(`Image download failed: HTTP ${imgRes.status}`);
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  await fs.writeFile(outPath, buf);
  console.log(`✓ ${(buf.length / 1024).toFixed(1)} KB`);
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const allSlugs = await loadGlossarSlugs();
  const argSlugs = process.argv.slice(2);
  const targets = argSlugs.length > 0 ? argSlugs : allSlugs;

  console.log(
    `\nGeneriere ${targets.length} Glossar-Bild${targets.length === 1 ? "" : "er"} via FLUX 1.1 Pro…\n`,
  );

  let ok = 0;
  let skipped = 0;
  let failed = 0;

  for (const slug of targets) {
    if (!SLUG_PROMPTS[slug]) {
      console.warn(`⚠️  ${slug.padEnd(28)} kein Prompt definiert, überspringe`);
      skipped++;
      continue;
    }
    const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);
    const existedBefore = await fs
      .access(outPath)
      .then(() => true)
      .catch(() => false);

    try {
      await generateForSlug(slug, SLUG_PROMPTS[slug]);
      if (existedBefore) skipped++;
      else ok++;
    } catch (err) {
      console.error(`✗  ${slug.padEnd(28)} ${err.message}`);
      failed++;
    }
  }

  console.log(
    `\nFertig — ${ok} neu generiert, ${skipped} übersprungen, ${failed} fehlgeschlagen.\n`,
  );
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error("\n✗ Unerwarteter Fehler:", err);
  process.exit(1);
});
