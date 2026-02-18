import HeroHeadlines from "./HeroHeadlines";
import HeroVisual from "./HeroVisual";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(45, 27, 61, 0.6) 0%, rgba(26, 16, 40, 0.3) 40%, var(--bg-primary) 80%)",
      }}
    >
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-padding)] pt-32 pb-16 lg:pt-24 lg:pb-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Text side */}
          <div className="flex-1 flex flex-col gap-8 text-center lg:text-left">
            <HeroHeadlines />

            <p
              className="max-w-xl mx-auto lg:mx-0 leading-relaxed"
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--text-body-lg)",
              }}
            >
              Behalten Sie die volle Kontrolle über Ihre KI-Infrastruktur — mit
              einer Plattform, die europäische Datensouveränität und modernste
              Technologie vereint.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/demo" className="btn-primary">
                Kostenlos testen
              </Link>
              <Link href="/produkte" className="btn-secondary">
                Mehr erfahren
              </Link>
            </div>
          </div>

          {/* Visual side */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
