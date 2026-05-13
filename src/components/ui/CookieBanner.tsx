"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, type Consent } from "@/lib/cookie-consent";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [consent, setConsentState] = useState<Consent>(null);

  // Hydration-safe init: erst nach Mount localStorage lesen, sonst
  // kommt es zu Server-Client-Mismatch.
  useEffect(() => {
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe one-shot init
    setConsentState(getConsent());

    const handler = () => setConsentState(getConsent());
    window.addEventListener("souveraeneki:consent-changed", handler);
    return () =>
      window.removeEventListener("souveraeneki:consent-changed", handler);
  }, []);

  if (!mounted || consent !== null) return null;

  const decide = (choice: Exclude<Consent, null>) => {
    setConsent(choice);
    setConsentState(choice);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      aria-describedby="cookie-banner-description"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md z-[100] rounded-2xl p-5"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 12px 40px oklch(0 0 0 / 0.5)",
      }}
    >
      <h2
        className="text-[var(--text-primary)] font-semibold mb-2"
        style={{ fontSize: "var(--text-body)" }}
      >
        Cookies und Tracking
      </h2>
      <p
        id="cookie-banner-description"
        className="text-[var(--text-secondary)] leading-relaxed mb-4"
        style={{ fontSize: "var(--text-small)" }}
      >
        Wir nutzen ausschließlich technisch notwendige Speicher-Einträge im
        Browser für Komfort-Funktionen. Kein externes Tracking, keine
        Werbe-Cookies. Details in der{" "}
        <Link
          href="/datenschutz"
          className="underline transition-colors duration-200 hover:text-[var(--accent-light)]"
        >
          Datenschutzerklärung
        </Link>
        .
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => decide("essential")}
          className="btn-secondary !py-2 !px-4 flex-1"
          style={{ fontSize: "var(--text-small)" }}
        >
          Nur notwendige
        </button>
        <button
          type="button"
          onClick={() => decide("all")}
          className="btn-primary !py-2 !px-4 flex-1"
          style={{ fontSize: "var(--text-small)" }}
        >
          Alle akzeptieren
        </button>
      </div>
    </div>
  );
}
