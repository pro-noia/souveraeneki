import { OG_SIZE, OG_CONTENT_TYPE, renderHomeOg } from "@/lib/og-image";

export const alt = "Souveräne KI — Sie nutzen KI. Aber besitzen Sie sie auch?";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return renderHomeOg();
}
