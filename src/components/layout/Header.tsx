"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Produkte", href: "/produkte" },
  { label: "Lösungen", href: "/loesungen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-[var(--container-max)] -translate-x-1/2">
      <nav
        className="flex items-center justify-between rounded-full px-6 py-3 border border-[var(--border-subtle)]"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(var(--glass-blur))",
          WebkitBackdropFilter: "blur(var(--glass-blur))",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-[var(--text-primary)] font-semibold text-lg tracking-tight transition-colors duration-200"
        >
          Souveräne KI
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[var(--text-secondary)] text-[var(--text-small)] font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="btn-secondary !py-2 !px-5 text-[var(--text-small)]">
            Login
          </Link>
          <Link href="/demo" className="btn-primary !py-2 !px-5 text-[var(--text-small)]">
            Demo anfragen
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
          className="md:hidden mt-2 rounded-2xl border border-[var(--border-subtle)] p-6 flex flex-col gap-6"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(var(--glass-blur))",
            WebkitBackdropFilter: "blur(var(--glass-blur))",
          }}
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--text-primary)] text-lg font-medium transition-colors duration-200 hover:text-[var(--accent-secondary)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="btn-secondary text-center"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/demo"
              className="btn-primary text-center"
              onClick={() => setMobileOpen(false)}
            >
              Demo anfragen
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
