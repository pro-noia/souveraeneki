import type { Metadata } from "next";
import PersonaPage from "@/components/persona/PersonaPage";
import {
  resolvePersona,
  buildPersonaMetadata,
  buildPersonaJsonLd,
} from "@/lib/personas";

const persona = resolvePersona("politik", "einsteiger");

export const metadata: Metadata = buildPersonaMetadata(persona);

export default function Page() {
  const jsonLd = buildPersonaJsonLd(persona);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PersonaPage persona={persona} />
    </>
  );
}
