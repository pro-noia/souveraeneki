import { renderHubOg, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og-image";

export const alt = "Souveräne KI — Vertiefung";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderHubOg("experten");
}
