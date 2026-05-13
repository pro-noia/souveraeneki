# Platzhalter in Impressum, Datenschutz, Kontakt ersetzen

Diese drei Seiten enthalten Texte mit `[eckigen Klammer-Platzhaltern]`, die
du vor dem öffentlichen Launch durch deine echten Daten ersetzen musst.

| Seite | Datei | Wo erreichbar |
|---|---|---|
| Impressum | [src/app/impressum/page.tsx](src/app/impressum/page.tsx) | https://souveräneki.de/impressum |
| Datenschutz | [src/app/datenschutz/page.tsx](src/app/datenschutz/page.tsx) | https://souveräneki.de/datenschutz |
| Kontakt | [src/app/kontakt/page.tsx](src/app/kontakt/page.tsx) | https://souveräneki.de/kontakt |

Workflow: Datei im Editor öffnen, alle eckigen Klammern überschreiben,
speichern, `git commit`, `git push`. Vercel deployt automatisch.

---

## 1. Impressum — [src/app/impressum/page.tsx](src/app/impressum/page.tsx)

Pflicht nach § 5 TMG sowie § 55 Abs. 2 RStV.

### Was du ersetzen musst

| Platzhalter | Wodurch ersetzen | Quelle / Hinweis |
|---|---|---|
| `[Vor- und Nachname / Firma]` | Vollständiger Name oder Firmenname inkl. Rechtsform | Bei GmbH/UG: „Firma GmbH" oder „Firma UG (haftungsbeschränkt)" |
| `[Straße und Hausnummer]` | Ladungsfähige Anschrift | Postfach reicht **nicht** |
| `[PLZ Ort]` | Postleitzahl + Ort | |
| `[Land]` | „Deutschland", „Schweiz", … | |
| `[Name der vertretungsberechtigten Person]` | Geschäftsführer:in / Inhaber:in | Bei GmbH einzeln namentlich |
| `[+49 …]` | Telefonnummer | optional, aber empfohlen |
| `hallo@souveraeneki.de` | Echte Kontakt-E-Mail | falls abweichend |
| `[Amtsgericht Ort]` | Registergericht | Nur wenn Firma im Handelsregister steht |
| `[HRB …]` | Handelsregisternummer | Nur wenn HR-Eintrag existiert |
| `[DE …]` | USt-IdNr. nach § 27a UStG | Nur wenn vorhanden |

### Wegfall einzelner Abschnitte

Wenn du **keine** Firma führst und kein Handelsregistereintrag/USt-ID
existiert, kannst du diese beiden Sections komplett löschen:

- `<section>` „Registereintrag"
- `<section>` „Umsatzsteuer-Identifikationsnummer"

In dem Fall reicht für eine Einzelperson: Anbieter + Kontakt + Verantwortlich
für den Inhalt + Streitschlichtung + Haftungs- und Urheberrechtsklauseln.

### Beispiel — vor und nach

**Vorher:**
```tsx
<p>
  [Vor- und Nachname / Firma]
  <br />
  [Straße und Hausnummer]
  <br />
  [PLZ Ort]
  <br />
  [Land]
</p>
```

**Nachher:**
```tsx
<p>
  Souveräne KI UG (haftungsbeschränkt)
  <br />
  Hauptstraße 12
  <br />
  10115 Berlin
  <br />
  Deutschland
</p>
```

---

## 2. Datenschutz — [src/app/datenschutz/page.tsx](src/app/datenschutz/page.tsx)

Vorlage orientiert sich an DSGVO Art. 13/14 mit den typischen Sections
einer Website ohne Tracking.

### Was du ersetzen musst

| Platzhalter | Wodurch ersetzen | Hinweis |
|---|---|---|
| `[TT.MM.JJJJ]` im Lead | Heutiges Datum, z. B. `13.05.2026` | Bei jeder inhaltlichen Änderung aktualisieren |
| `[Vor- und Nachname / Firma]` | Identisch zu Impressum | |
| `[Straße und Hausnummer]` | Identisch zu Impressum | |
| `[PLZ Ort]` | Identisch zu Impressum | |
| `datenschutz@souveraeneki.de` | Eigene Datenschutz-E-Mail | Kann identisch zu `hallo@…` sein, sollte aber separat sein |
| `[Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA — Auftragsverarbeitungsvertrag und Standardvertragsklauseln vereinbart]` in Section 3 (Hosting) | Belassen, wenn du auf Vercel hostest | Falls anderer Hoster — Anbieter + Adresse + AV-Vertrag-Hinweis ersetzen. Für Hetzner/Stackit/IONOS reicht: „… gehostet durch Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland. Auftragsverarbeitungsvertrag besteht." |
| `[E-Mail-Dienstleister mit Sitz in der EU]` in Section 6 (Whitepaper) | Echten Dienstleister benennen, sobald angebunden | z. B. „Brevo, 7 rue de Madrid, 75008 Paris, Frankreich" |

### Wann du eine Section löschen oder ergänzen musst

- **Section 6 (Whitepaper-Anmeldung)** — falls du das Whitepaper-Formular
  deaktivierst, kannst du die Section entfernen.
- **Section 7 (Cookies)** — falls du später Analytics integrierst, musst du
  hier zwingend nachziehen: Tool, Rechtsgrundlage, Cookie-Liste, Opt-out.
- **Wenn du Tracking einsetzt** (Plausible, GA, Meta-Pixel, etc.): zusätzlich
  einen **Cookie-Banner** einbauen, **vor** Setzen der Cookies — sonst
  DSGVO-Verstoß. Vorlage hierfür ist nicht Teil dieser Datei.

### Externe Auftragsverarbeiter sichtbar machen

Wenn du weitere Dienste nutzt (z. B. Sentry für Error-Tracking, Resend für
Mail-Versand, einen externen Hoster), ergänze pro Dienst eine kleine
Section nach dem Muster:

```tsx
<section className="mb-[var(--space-2xl)]">
  <h2
    className="text-[var(--text-primary)] font-semibold tracking-[-0.02em] mb-[var(--space-md)]"
    style={{ fontSize: "var(--text-h3)" }}
  >
    10. [Dienst-Name]
  </h2>
  <p>
    Wir nutzen [Dienst-Name] der [Anbieter, Anschrift] für [Zweck].
    Verarbeitet werden [Datenarten]. Rechtsgrundlage ist Art. 6 Abs. 1
    lit. [a/b/f] DSGVO. Mit dem Anbieter besteht ein
    Auftragsverarbeitungsvertrag.
  </p>
</section>
```

---

## 3. Kontakt — [src/app/kontakt/page.tsx](src/app/kontakt/page.tsx)

Diese Seite hat nur sehr wenige Platzhalter — primär Anschrift und
E-Mail-Adressen.

| Platzhalter | Wodurch ersetzen |
|---|---|
| `hallo@souveraeneki.de` | Allgemeine Kontakt-Mail |
| `projekte@souveraeneki.de` | Mail für Pilot-Projekt-Anfragen — kann identisch sein, falls du keine zweite Adresse willst |
| `[Vor- und Nachname / Firma]` + Anschrift | Wie Impressum |

Falls du nur eine E-Mail-Adresse hast: lösche die zweite Karte (`Pilot-
Projekte`), das Layout passt sich automatisch an.

---

## Quick-Check vor dem Commit

```bash
# Alle verbleibenden Platzhalter in einem Schwung anzeigen:
grep -n '\[' src/app/impressum/page.tsx src/app/datenschutz/page.tsx src/app/kontakt/page.tsx
```

Sollte nur noch echte JSX-Brackets ausgeben — keine `[Vor- und Nachname]`,
`[Straße…]`, `[PLZ Ort]`, `[DE …]`, `[HRB …]`, `[TT.MM.JJJJ]`, etc.

## Deployment

```bash
git add src/app/impressum/page.tsx src/app/datenschutz/page.tsx src/app/kontakt/page.tsx
git commit -m "chore: replace impressum/datenschutz/kontakt placeholders with real data"
git push origin main
```

Vercel deployt automatisch. Nach ca. 2 Minuten sind die neuen Texte
unter den drei URLs live.

## Rechtliche Empfehlung

Diese Vorlagen sind ein guter Start, ersetzen aber **keine Rechtsberatung**.
Vor öffentlichem Launch — insbesondere wenn du gewerblich tätig bist —
lass das fertige Impressum und die Datenschutzerklärung kurz durch
eine spezialisierte Anwältin / einen Anwalt oder einen Datenschutz-
Auditor gegenchecken. Für Privatpersonen reichen die Vorlagen meist;
bei Firma, Newsletter, Tracking oder Webshop wird's komplexer.
