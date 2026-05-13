"use client";

import { resetConsent } from "@/lib/cookie-consent";

export default function CookieResetLink() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-[var(--text-muted)] text-[var(--text-caption)] transition-colors duration-200 hover:text-[var(--text-secondary)] cursor-pointer"
    >
      Cookie-Einstellungen
    </button>
  );
}
