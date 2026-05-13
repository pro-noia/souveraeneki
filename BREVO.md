# Brevo-Setup für den Whitepaper-Lead-Magnet

Diese Anleitung verknüpft das Whitepaper-Formular auf der Site mit deinem
Brevo-Account. Nach dem Setup wird jede Anmeldung automatisch zur Liste
„Whitepaper" in Brevo hinzugefügt — und (optional) eine Automation
verschickt dann das Whitepaper-PDF.

Ablauf:

1. Brevo: Liste anlegen → ID notieren
2. Brevo: API-Key erzeugen → kopieren
3. Vercel: zwei ENV-Variablen hinzufügen
4. Brevo: Automation Workflow „Welcome → Whitepaper senden"
5. Whitepaper-PDF hochladen
6. End-to-End-Test

---

## 1. Liste in Brevo anlegen

1. https://app.brevo.com → Sidebar **Contacts** → **Lists**
2. Button **„Create a new list"** oben rechts
3. Name z. B. **„Whitepaper Souveräne KI"**, Ordner egal
4. **Create** klicken
5. In der Listen-Übersicht steht jetzt diese Liste mit einer **ID** (kleine
   Zahl, z. B. `3`, `7`, oder ähnlich) — diese ID notieren

---

## 2. API-Key in Brevo erzeugen

1. Rechts oben auf dein Profilbild → **SMTP & API**
2. Tab **„API Keys"**
3. **„Generate a new API key"**
4. Name z. B. **„souveraeneki-website"**, **Generate** klicken
5. Der Key wird **einmalig** angezeigt (Format `xkeysib-…`) — sofort
   irgendwo sicher kopieren, danach ist er nur noch maskiert sichtbar

---

## 3. ENV-Variablen in Vercel hinterlegen

1. https://vercel.com/dashboard → Projekt **souveraeneki**
2. **Settings** (oben) → **Environment Variables** (linke Sidebar)
3. Zwei Variablen anlegen — für jede:
   - **Name** und **Value** eintragen
   - **Environments**: ✓ Production, ✓ Preview (optional Development)
   - **Save**

| Name | Value | Quelle |
|---|---|---|
| `BREVO_API_KEY` | `xkeysib-…` (aus Schritt 2) | Brevo SMTP & API |
| `BREVO_WHITEPAPER_LIST_ID` | Listen-ID als Zahl, z. B. `3` (aus Schritt 1) | Brevo Contacts → Lists |

4. Nach dem Anlegen: in den **Deployments** rechts oben auf den letzten
   Deploy → **Redeploy** klicken, damit die neuen Variablen aktiv werden.
   (Variablen wirken nur für Builds **nach** dem Anlegen — bestehende Builds
   müssen einmal neu deployt werden.)

**Lokal entwickeln** (optional): in `.env.local` (gitignored) die gleichen
Variablen eintragen. Siehe `.env.example`.

---

## 4. Automation Workflow „Whitepaper senden"

Ohne Automation landen die Leads zwar in Brevo, bekommen aber nichts in
ihr Postfach. Setup so:

1. Brevo → Sidebar **Automation** → **Create a new automation**
2. Vorlage **„Welcome message"** wählen (oder **„From scratch"**)
3. **Trigger** konfigurieren:
   - Typ: **„Contact added to a list"**
   - Liste: **„Whitepaper Souveräne KI"** (aus Schritt 1)
4. **Action**: **„Send an email"**
   - **From** Absender-Adresse: deine verifizierte Brevo-Absender-Adresse,
     idealerweise `souveraeneki@cordt.net`
     (Verifizierung unter Brevo → **Senders & IP** → **Add a sender**)
   - **Subject**: z. B. „Ihr Whitepaper: Souveräne KI in der Praxis"
   - **Email content**: Mail-Editor öffnen — Layout-Editor oder HTML
   - Mail-Text-Vorschlag:

     > Vielen Dank für Ihr Interesse an souveräner KI in Europa.
     >
     > Das Whitepaper liegt hier als PDF zum Download bereit:
     > **[Whitepaper herunterladen](https://souveräneki.de/whitepaper.pdf)**
     >
     > In den kommenden Wochen schicke ich Ihnen gelegentlich kurze fachliche
     > Updates zum Thema souveräne KI — EU AI Act, neue Foundation Models,
     > praktische Architektur-Beispiele. Abmelden jederzeit per Link unten in
     > jeder Mail.
     >
     > Falls Sie konkrete Fragen oder ein Pilot-Projekt im Kopf haben:
     > einfach auf diese Mail antworten.
     >
     > Herzlich,
     > O. D. Cordt

5. **Save & Activate** das Workflow

---

## 5. Whitepaper-PDF hochladen

Zwei Optionen:

**A — Direkt im Repo (einfach, kostenlos):**
1. PDF lokal vorbereiten, z. B. `whitepaper-souveraene-ki.pdf`
2. In `public/whitepaper.pdf` ablegen
3. `git add public/whitepaper.pdf && git commit -m "feat: whitepaper pdf" && git push`
4. Nach Vercel-Deploy unter `https://souveräneki.de/whitepaper.pdf` erreichbar
5. Im Brevo-Automation-Email-Editor diesen Link verwenden

**B — In Brevo hochladen** (besseres Tracking, Brevo zählt Downloads):
1. Brevo → **Library** (Sidebar) → **Files** → **Upload**
2. PDF auswählen, hochladen
3. Im Mail-Editor: Button einfügen → Aktion „Datei aus Bibliothek" → Datei
   wählen
4. Brevo generiert eine getrackte URL

Empfehlung: Variante A wenn du das PDF eh schon hast und kein zusätzliches
Tracking willst. B wenn du wissen willst, wie viele tatsächlich auf den
Download klicken.

---

## 6. End-to-End-Test

1. Lokal: `npm run dev`, http://localhost:3000/#whitepaper
2. Formular mit Testmail (z. B. einer privaten Adresse) absenden
3. In Brevo → Contacts → Lists → „Whitepaper Souveräne KI" — der Eintrag
   sollte innerhalb von 5 Sek. auftauchen
4. Wenn Automation aktiv ist: Mail kommt innerhalb von 1–5 Min an
5. Klick auf den Whitepaper-Link → PDF lädt

Falls auf `localhost` getestet wird und ENV-Variablen lokal **nicht** gesetzt
sind, fällt der Endpoint auf Logging zurück (Terminal-Output:
`[whitepaper] BREVO_API_KEY oder BREVO_WHITEPAPER_LIST_ID fehlt …`).
Form-Success-Screen erscheint trotzdem — so kannst du das UI testen, ohne
Brevo zu touchieren.

---

## Doppel-Opt-In (DOI)

Aktuell läuft das Setup als **Single-Opt-In**: ein Kontakt wird sofort zur
Liste hinzugefügt, sobald das Formular abgeschickt wird. Rechtlich ist das
in Deutschland für **fachlich relevante Folge-E-Mails an Geschäftskunden**
typischerweise zulässig, sofern die Einwilligung dokumentiert ist (wir
loggen IP + Timestamp implizit via Brevo).

Wenn du juristisch besonders konservativ sein willst (empfohlen bei
breitem Konsumenten-Newsletter): in Brevo Double-Opt-In aktivieren:

1. Brevo → **Contacts** → **Forms** → **Create a new form**
2. **Confirmation Email** aktivieren (Double Opt-In)
3. In `src/app/api/whitepaper/route.ts` den `createContact`-Call durch einen
   Aufruf des DOI-Endpoints `/v3/contacts/doubleOptinConfirmation` ersetzen
   (siehe https://developers.brevo.com/reference/createdoicontact)

Für den Anfang reicht das aktuelle Single-Opt-In-Setup.

---

## Troubleshooting

| Symptom | Ursache | Lösung |
|---|---|---|
| 502-Fehler im Form | `BREVO_API_KEY` falsch oder nicht in Vercel hinterlegt | Vercel → Settings → Env Variables prüfen, danach **Redeploy** |
| 502-Fehler, Brevo-Log zeigt 401 | API-Key abgelaufen oder revoked | Neuen Key in Brevo erzeugen, in Vercel ersetzen, Redeploy |
| Kontakt landet nicht in der Liste | Falsche `BREVO_WHITEPAPER_LIST_ID` | In Brevo Liste öffnen, ID prüfen, in Vercel korrigieren, Redeploy |
| Mail kommt nicht | Automation nicht aktiviert oder Absender nicht verifiziert | Brevo → Automation → Workflow-Status prüfen; Brevo → Senders → Absender verifizieren |
| Mail landet im Spam | DKIM/SPF nicht für `cordt.net` konfiguriert | Brevo → Senders & IP → Domain hinzufügen, DNS-Records bei Provider setzen |
| Form funktioniert lokal, nicht in Production | ENV-Variablen lokal in `.env.local`, aber nicht in Vercel | siehe oben |

---

## Was später kommt

- **Double-Opt-In** sobald viele Anmeldungen reinkommen
- **Newsletter-Folge-Workflow** (Drip): nach Whitepaper-Download in
  X Tagen Mail mit weiterführendem Content
- **Domain-Authentifizierung** (DKIM/SPF/DMARC) für `cordt.net` damit Mails
  nicht im Spam landen — Anleitung im Brevo-Account unter
  „Senders & IP" → „Domains"
- **Segment-Tracking** in Brevo (Berufsfeld, Branche) sobald das Formular
  zusätzliche Felder enthält
