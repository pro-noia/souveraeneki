import type { Metadata } from "next";
import HeroSection from "@/components/hero/HeroSection";
import SovereignWizard from "@/components/SovereignWizard/SovereignWizard";
import WordCloud3D from "@/components/WordCloud/WordCloud3D";
import SovereigntySpectrum from "@/components/SovereigntySpectrum/SovereigntySpectrum";
import WhitepaperSection from "@/components/whitepaper/WhitepaperSection";
import { SITE_ORIGIN } from "@/lib/personas";
import { buildHomeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: {
    canonical: SITE_ORIGIN,
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHomeJsonLd()) }}
      />
      <HeroSection />
      <SovereignWizard />
      <WordCloud3D />
      <SovereigntySpectrum />
      <WhitepaperSection />
    </>
  );
}
