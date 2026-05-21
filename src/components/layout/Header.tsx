"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[var(--container-max)] -translate-x-1/2">
      <nav
        className="flex items-center justify-between rounded-full px-6 py-3 border border-[var(--border-subtle)]"
        style={{
          background: "var(--bg-elevated)",
          boxShadow: "0 6px 24px oklch(0 0 0 / 0.35)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-[var(--text-primary)] font-semibold text-lg tracking-tight transition-colors duration-200"
        >
          Souveräne KI
        </Link>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/kontakt" className="btn-secondary !py-2 !px-5 text-[var(--text-small)]">
            Kontakt
          </Link>
          <Link href="/#praxisleitfaden" className="btn-primary !py-2 !px-5 text-[var(--text-small)]">
            Praxisleitfaden
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col justify-center items-center w-10 h-10 gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileOpen}
        >
          <span
            className="block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-200 origin-center"
            style={
              mobileOpen
                ? { transform: "translateY(4px) rotate(45deg)" }
                : undefined
            }
          />
          <span
            className="block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-200"
            style={mobileOpen ? { opacity: 0 } : undefined}
          />
          <span
            className="block w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-200 origin-center"
            style={
              mobileOpen
                ? { transform: "translateY(-4px) rotate(-45deg)" }
                : undefined
            }
          />
        </button>
      </nav>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div
          className="md:hidden mt-2 rounded-2xl border border-[var(--border-subtle)] p-6 flex flex-col gap-3"
          style={{
            background: "var(--bg-elevated)",
            boxShadow: "0 12px 40px oklch(0 0 0 / 0.45)",
          }}
        >
          <Link
            href="/kontakt"
            className="btn-secondary text-center"
            onClick={() => setMobileOpen(false)}
          >
            Kontakt
          </Link>
          <Link
            href="/#praxisleitfaden"
            className="btn-primary text-center"
            onClick={() => setMobileOpen(false)}
          >
            Praxisleitfaden
          </Link>
        </div>
      )}
    </header>
  );
}
