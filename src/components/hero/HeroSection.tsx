import HeroHeadlines from "./HeroHeadlines";
import HeroWave from "@/components/ui/dynamic-wave-canvas-background";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animierter Wave-Background, brandadaptiert (Petrol + Mondstein) */}
      <HeroWave />

      {/* Scrim für Textlesbarkeit. Zur Mitte hin transparent (Wave bleibt sichtbar),
          oben/unten leicht abgedunkelt für Header- und Section-Übergang. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.115 0.005 250 / 0.55) 0%, oklch(0.115 0.005 250 / 0.20) 35%, oklch(0.115 0.005 250 / 0.20) 65%, oklch(0.115 0.005 250 / 0.70) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)] pt-32 pb-16">
        <div className="flex flex-col items-center gap-8 text-center max-w-3xl mx-auto">
          <HeroHeadlines />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#whitepaper" className="btn-primary">
              Whitepaper laden
            </Link>
            <Link href="#wizard" className="btn-secondary">
              Mehr erfahren
            </Link>
          </div>

          {/* Scroll-Indicator — dezenter v-förmiger Chevron, deutet weiteres
              Scrollen an. Klick scrollt sanft zum Wizard. */}
          <Link
            href="#wizard"
            aria-label="Zum Wizard scrollen"
            className="group mt-4 inline-flex items-center justify-center w-10 h-10 rounded-full transition-opacity duration-300 motion-reduce:animate-none"
            style={{
              color: "var(--text-muted)",
              animation: "heroScrollBounce 2.4s ease-in-out infinite",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-colors duration-200 group-hover:text-[var(--accent-light)]"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
