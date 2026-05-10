import glossarData from "@/data/glossar.json";
import { renderGlossarIndexOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "Souveräne KI — Glossar";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderGlossarIndexOg(glossarData.length);
}
