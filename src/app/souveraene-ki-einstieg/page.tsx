import type { Metadata } from "next";
import LevelHubPage from "@/components/persona/LevelHubPage";
import {
  resolveLevelHub,
  buildLevelHubMetadata,
  buildLevelHubJsonLd,
} from "@/lib/personas";

const hub = resolveLevelHub("einsteiger");

export const metadata: Metadata = buildLevelHubMetadata(hub);

export default function Page() {
  const jsonLd = buildLevelHubJsonLd(hub);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LevelHubPage hub={hub} />
    </>
  );
}
