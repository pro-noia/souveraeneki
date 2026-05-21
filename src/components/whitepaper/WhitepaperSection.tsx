"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import styles from "./WhitepaperSection.module.css";

type Status = "idle" | "submitting" | "success" | "error";

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
  invalid_company: "Bitte tragen Sie den Namen Ihres Unternehmens ein.",
  network: "Wir konnten Ihre Anfrage nicht verarbeiten. Bitte versuchen Sie es in einem Moment erneut.",
};

export default function WhitepaperSection() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorKey(null);

    try {
      const response = await fetch("/api/whitepaper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const data = (await response.json().catch(() => ({}))) as { error?: string };
      setErrorKey(data.error ?? "network");
      setStatus("error");
    } catch {
      setErrorKey("network");
      setStatus("error");
    }
  }

  const errorMessage = errorKey ? ERROR_MESSAGES[errorKey] ?? ERROR_MESSAGES.network : null;
  const emailInvalid = errorKey === "invalid_email";
  const companyInvalid = errorKey === "invalid_company";

  return (
    <section id="praxisleitfaden" className={styles.section} aria-labelledby="praxisleitfaden-headline">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Praxisleitfaden · 22 Seiten · PDF</p>

        <h2 id="praxisleitfaden-headline" className={styles.headline}>
          Souveräne KI in der Praxis.
        </h2>

        <p className={styles.subhead}>
          Eine Ausarbeitung für Entscheider: EU AI Act, CLOUD Act, Architektur-Optionen
          und Vertragsbausteine für die nächsten 18 Monate. Direkt im Postfach,
          ohne Sales-Anruf.
        </p>

        {status === "success" ? (
          <div className={styles.success} role="status" aria-live="polite">
            <h3 className={styles.successHeadline}>Vielen Dank.</h3>
            <p className={styles.successBody}>
              Ihr Praxisleitfaden liegt zum Download bereit.
            </p>
            <a
              href="/Souveraene-KI_Praxisleitfaden_Mai2026.pdf"
              download="Souveraene-KI_Praxisleitfaden_Mai2026.pdf"
              className="btn-primary"
              style={{
                alignSelf: "flex-start",
                marginTop: "var(--space-xs)",
              }}
            >
              Praxisleitfaden herunterladen (PDF)
            </a>
            <p className={styles.privacy}>
              Falls der Download nicht startet, schreiben Sie kurz an{" "}
              <a href="mailto:souveraeneki@cordt.net">
                souveraeneki@cordt.net
              </a>{" "}
              — ich schicke das PDF dann manuell.
            </p>
          </div>
        ) : (
          <>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles.field}>
                <label htmlFor="praxisleitfaden-email" className={styles.label}>
                  E-Mail-Adresse
                </label>
                <input
                  id="praxisleitfaden-email"
                  type="email"
                  required
                  autoComplete="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={emailInvalid || undefined}
                  aria-describedby={errorMessage ? "praxisleitfaden-error" : undefined}
                  disabled={status === "submitting"}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="praxisleitfaden-company" className={styles.label}>
                  Unternehmen
                </label>
                <input
                  id="praxisleitfaden-company"
                  type="text"
                  required
                  autoComplete="organization"
                  className={styles.input}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  aria-invalid={companyInvalid || undefined}
                  aria-describedby={errorMessage ? "praxisleitfaden-error" : undefined}
                  disabled={status === "submitting"}
                />
              </div>

              <button
                type="submit"
                className={`btn-primary ${styles.submit}`}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Senden …" : "Praxisleitfaden anfordern"}
              </button>

              {errorMessage && (
                <p id="praxisleitfaden-error" className={styles.error} role="alert">
                  {errorMessage}
                </p>
              )}
            </form>

            <p className={styles.privacy}>
              Ihre E-Mail-Adresse nutzen wir ausschließlich für die Zustellung des
              Praxisleitfadens und gelegentliche Updates zu souveräner KI. Abmeldung
              jederzeit per Link in jeder E-Mail. Mehr in unserer{" "}
              <Link href="/datenschutz">Datenschutzerklärung</Link>.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
