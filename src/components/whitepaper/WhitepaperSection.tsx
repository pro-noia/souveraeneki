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
    <section id="whitepaper" className={styles.section} aria-labelledby="whitepaper-headline">
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Whitepaper · 22 Seiten · PDF</p>

        <h2 id="whitepaper-headline" className={styles.headline}>
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
              Das Whitepaper liegt in den nächsten Minuten in Ihrem Postfach.
              Falls die E-Mail nicht ankommt, prüfen Sie bitte den Spam-Ordner —
              oder schreiben Sie uns kurz an{" "}
              <a href="mailto:hallo@souveraeneki.de" style={{ color: "var(--mondstein)", textDecoration: "underline" }}>
                hallo@souveraeneki.de
              </a>
              .
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
                <label htmlFor="whitepaper-email" className={styles.label}>
                  E-Mail-Adresse
                </label>
                <input
                  id="whitepaper-email"
                  type="email"
                  required
                  autoComplete="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={emailInvalid || undefined}
                  aria-describedby={errorMessage ? "whitepaper-error" : undefined}
                  disabled={status === "submitting"}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="whitepaper-company" className={styles.label}>
                  Unternehmen
                </label>
                <input
                  id="whitepaper-company"
                  type="text"
                  required
                  autoComplete="organization"
                  className={styles.input}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  aria-invalid={companyInvalid || undefined}
                  aria-describedby={errorMessage ? "whitepaper-error" : undefined}
                  disabled={status === "submitting"}
                />
              </div>

              <button
                type="submit"
                className={`btn-primary ${styles.submit}`}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Senden …" : "Whitepaper anfordern"}
              </button>

              {errorMessage && (
                <p id="whitepaper-error" className={styles.error} role="alert">
                  {errorMessage}
                </p>
              )}
            </form>

            <p className={styles.privacy}>
              Ihre E-Mail-Adresse nutzen wir ausschließlich für die Zustellung des
              Whitepapers und gelegentliche Updates zu souveräner KI. Abmeldung
              jederzeit per Link in jeder E-Mail. Mehr in unserer{" "}
              <Link href="/datenschutz">Datenschutzerklärung</Link>.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
