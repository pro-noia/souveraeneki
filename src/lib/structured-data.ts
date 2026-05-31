import { SITE_ORIGIN } from "@/lib/personas";

interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": unknown[];
}

const SITE_NAME = "Souveräne KI";
const SITE_DESCRIPTION =
  "Souveräne KI baut auf europäischem Recht — Architektur, Recht und Praxis für KI-Souveränität in Europa.";
const CONTACT_EMAIL = "souveraeneki@cordt.net";

const ORGANIZATION_NODE = {
  "@type": "Organization",
  "@id": `${SITE_ORIGIN}/#organization`,
  name: SITE_NAME,
  url: SITE_ORIGIN,
  logo: `${SITE_ORIGIN}/icon.png`,
  description: SITE_DESCRIPTION,
  foundingDate: "2026",
  inLanguage: "de-DE",
  areaServed: { "@type": "Place", name: "Europa" },
  contactPoint: {
    "@type": "ContactPoint",
    email: CONTACT_EMAIL,
    contactType: "Information",
    availableLanguage: ["de", "en"],
    areaServed: "EU",
  },
  knowsAbout: [
    "Sovereign AI",
    "EU AI Act",
    "Sovereign Cloud",
    "European Data Residency",
    "Open-Source LLMs",
    "CLOUD Act",
    "GDPR",
  ],
};

export function buildHomeJsonLd(): JsonLdGraph {
  const website = {
    "@type": "WebSite",
    "@id": `${SITE_ORIGIN}/#website`,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: SITE_DESCRIPTION,
    inLanguage: "de-DE",
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_ORIGIN}/glossar?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [website, ORGANIZATION_NODE],
  };
}

export function buildContactPageJsonLd(): JsonLdGraph {
  const contactPage = {
    "@type": "ContactPage",
    "@id": `${SITE_ORIGIN}/kontakt#contactpage`,
    url: `${SITE_ORIGIN}/kontakt`,
    name: `Kontakt | ${SITE_NAME}`,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${SITE_ORIGIN}/#website` },
    about: { "@id": `${SITE_ORIGIN}/#organization` },
  };

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Startseite",
        item: SITE_ORIGIN,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kontakt",
        item: `${SITE_ORIGIN}/kontakt`,
      },
    ],
  };

  return {
    "@context": "https://schema.org",
    "@graph": [contactPage, ORGANIZATION_NODE, breadcrumb],
  };
}
