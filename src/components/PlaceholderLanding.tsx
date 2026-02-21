import Link from "next/link";

interface PlaceholderLandingProps {
  title: string;
}

export default function PlaceholderLanding({ title }: PlaceholderLandingProps) {
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1
          className="text-[var(--text-primary)] font-bold leading-tight tracking-[-0.02em] mb-6"
          style={{ fontSize: "var(--text-h1)" }}
        >
          {title}
        </h1>
        <p className="text-[var(--text-secondary)] text-lg mb-8">
          Diese Seite wird in Kürze mit Inhalten befüllt.
        </p>
        <Link href="/" className="btn-primary">
          Zurück zur Startseite
        </Link>
      </div>
    </section>
  );
}
