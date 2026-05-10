import HeroSection from "@/components/hero/HeroSection";
import SovereignWizard from "@/components/SovereignWizard/SovereignWizard";
import WordCloud3D from "@/components/WordCloud/WordCloud3D";
import SovereigntySpectrum from "@/components/SovereigntySpectrum/SovereigntySpectrum";
import WhitepaperSection from "@/components/whitepaper/WhitepaperSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SovereignWizard />
      <WordCloud3D />
      <SovereigntySpectrum />
      <WhitepaperSection />
    </>
  );
}
