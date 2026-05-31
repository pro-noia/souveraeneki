import { Metadata } from "next";
import { notFound } from "next/navigation";
import glossarData from "@/data/glossar.json";
import GlossarPage from "@/components/glossar/GlossarPage";
import type { GlossarEintrag } from "@/components/glossar/GlossarPage";

const eintraege = glossarData as GlossarEintrag[];

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return eintraege.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const eintrag = eintraege.find((e) => e.slug === slug);

  if (!eintrag) {
    return { title: "Nicht gefunden" };
  }

  const ogImage = {
    url: `/images/glossar/${eintrag.slug}.jpg`,
    width: 1344,
    height: 768,
    alt: `${eintrag.begriff} — Souveräne KI Glossar`,
    type: "image/jpeg",
  };

  return {
    title: eintrag.meta_title,
    description: eintrag.meta_description,
    openGraph: {
      title: eintrag.meta_title,
      description: eintrag.meta_description,
      type: "article",
      url: `https://xn--souverneki-v5a.de/glossar/${eintrag.slug}`,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: eintrag.meta_title,
      description: eintrag.meta_description,
      images: [ogImage.url],
    },
    alternates: {
      canonical: `https://xn--souverneki-v5a.de/glossar/${eintrag.slug}`,
    },
  };
}

// JSON-LD: DefinedTerm + FAQPage schemas
function generateJsonLd(eintrag: GlossarEintrag) {
  const definedTerm = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: eintrag.begriff,
    description: eintrag.meta_description,
    url: `https://xn--souverneki-v5a.de/glossar/${eintrag.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Souveräne KI Glossar",
      url: "https://xn--souverneki-v5a.de/glossar",
    },
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: eintrag.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.frage,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.antwort,
      },
    })),
  };

  return [definedTerm, faqPage];
}

export default async function GlossarSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const eintrag = eintraege.find((e) => e.slug === slug);

  if (!eintrag) {
    notFound();
  }

  const relatedEintraege = eintrag.related_slugs
    .map((rs) => eintraege.find((e) => e.slug === rs))
    .filter((e): e is GlossarEintrag => e !== undefined);

  const jsonLdSchemas = generateJsonLd(eintrag);

  return (
    <>
      {jsonLdSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <GlossarPage eintrag={eintrag} relatedEintraege={relatedEintraege} />
    </>
  );
}
