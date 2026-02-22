import Link from "next/link";
import { words } from "@/components/WordCloud/wordCloudConfig";

interface GlossarPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return words.map((w) => ({ slug: w.slug }));
}

export default async function GlossarPage({ params }: GlossarPageProps) {
  const { slug } = await params;
  const word = words.find((w) => w.slug === slug);
  const title = word?.text ?? slug;

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
          Diese Glossar-Seite wird in Kürze mit Inhalten befüllt.
        </p>
        <Link href="/" className="btn-primary">
          Zurück zur Startseite
        </Link>
      </div>
    </section>
  );
}
