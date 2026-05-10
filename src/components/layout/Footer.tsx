import Link from "next/link";

// Spalten temporär auskommentiert, bis die verlinkten Unterseiten existieren.
// const footerColumns = [
//   {
//     title: "Produkte",
//     links: [
//       { label: "KI-Plattform", href: "/produkte" },
//       { label: "API-Zugang", href: "/produkte/api" },
//       { label: "On-Premise", href: "/produkte/on-premise" },
//       { label: "Preise", href: "/preise" },
//     ],
//   },
//   {
//     title: "Unternehmen",
//     links: [
//       { label: "Über uns", href: "/ueber-uns" },
//       { label: "Karriere", href: "/karriere" },
//       { label: "Blog", href: "/blog" },
//       { label: "Kontakt", href: "/kontakt" },
//     ],
//   },
//   {
//     title: "Rechtliches",
//     links: [
//       { label: "Impressum", href: "/impressum" },
//       { label: "Datenschutz", href: "/datenschutz" },
//       { label: "AGB", href: "/agb" },
//     ],
//   },
// ];

export default function Footer() {
  return (
    <footer
      className="border-t border-[var(--border-subtle)]"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-[var(--container-padding)] py-[var(--space-xl)]">
        {/* Spalten-Bereich (Brand + 3 Linklisten) — auskommentiert, bis die Unterseiten existieren.
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-[var(--text-primary)] font-semibold text-lg tracking-tight"
            >
              Souveräne KI
            </Link>
            <p className="text-[var(--text-muted)] text-[var(--text-small)] leading-relaxed max-w-xs">
              Die souveräne KI-Plattform für Unternehmen und Institutionen in
              Europa.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="flex flex-col gap-4">
              <h3 className="text-[var(--text-primary)] font-semibold text-[var(--text-small)]">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[var(--text-muted)] text-[var(--text-small)] transition-colors duration-200 hover:text-[var(--text-secondary)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        */}

        {/* Fußzeile */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[var(--text-muted)] text-[var(--text-caption)]">
            &copy; {new Date().getFullYear()} Souveräne KI · Betrieben in Europa,
            ausschließlich unter europäischer Jurisdiktion.
          </p>
          <div className="flex gap-6">
            <Link
              href="/impressum"
              className="text-[var(--text-muted)] text-[var(--text-caption)] transition-colors duration-200 hover:text-[var(--text-secondary)]"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="text-[var(--text-muted)] text-[var(--text-caption)] transition-colors duration-200 hover:text-[var(--text-secondary)]"
            >
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
