"use client";

import { useEffect, useState } from "react";

// Versionierter Storage-Key — bei Änderungen am Consent-Modell den Suffix
// hochzählen, damit alte Auswahlen ungültig werden und Nutzer neu wählen.
const STORAGE_KEY = "souveraeneki:cookie-consent:v1";
const CHANGE_EVENT = "souveraeneki:consent-changed";

export type Consent = "all" | "essential" | null;

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<Consent, null>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    // Storage geblockt (Safari Private Mode etc.) — wir akzeptieren das,
    // der Banner kommt dann beim nächsten Besuch wieder. Funktionell kein Bug.
  }
}

export function resetConsent() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch {
    /* siehe setConsent */
  }
}

export function useConsent(): Consent {
  const [consent, setConsentState] = useState<Consent>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-safe one-shot init
    setConsentState(getConsent());
    const handler = () => setConsentState(getConsent());
    window.addEventListener(CHANGE_EVENT, handler);
    return () => window.removeEventListener(CHANGE_EVENT, handler);
  }, []);

  return consent;
}
