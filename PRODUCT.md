# Product

## Register

brand

## Users

**Primär:** B2B-Entscheider in deutschen und europäischen Unternehmen — CIOs, CTOs, Head of AI, Head of Data, Compliance- und Datenschutzverantwortliche im Mittelstand und Konzern. Sie evaluieren KI-Plattformen unter Druck aus drei Richtungen: regulatorisch (EU AI Act, DSGVO, NIS2), strategisch (Abhängigkeit von US-Hyperscalern), wirtschaftlich (ROI, Lock-in-Risiken). Sie kommen über Suche, Fachpresse oder Empfehlung — meist im Recherche-Modus, selten kaufbereit.

**Sekundär:** Drei weitere Persona-Lanes mit eigenen Landingpages — Politik (Behörden, Verwaltung, öffentlicher Sektor), Forschung (Universitäten, F&E), Technik (DevOps, ML-Engineers). Jeweils in drei Wissensstufen (Einsteiger, Kenner, Experten). Diese werden über den Wizard und das Glossar bedient, nicht über den Hero.

**Job to be done:** Verstehen, was „souveräne KI" konkret heißt, ob die Plattform die eigene Compliance- und Architektur-Anforderung trifft, und das Thema intern argumentieren können.

## Product Purpose

Souveräne KI ist eine europäische KI-Plattform, die Datensouveränität, Sicherheit und volle Kontrolle über die KI-Infrastruktur zur Kernzusage macht. Die Site existiert, um diese Position zu erklären, glaubwürdig zu belegen und qualifizierte Leads zu sammeln.

**Primäre Conversion:** Newsletter- / Whitepaper-Anmeldung. Die Site optimiert auf Aufklärung, nicht auf Demo-Anfragen. Erfolg heißt: ein Entscheider lädt das Whitepaper, leitet es intern weiter, kommt drei Wochen später wieder.

**Sekundäre Funktion:** SEO-Hub. Glossar und 15 Persona-Landingpages tragen organischen Traffic für die deutschsprachige KI-Souveränitäts-Konversation.

## Brand Personality

Selbstbewusst, modern, leise rebellisch.

Die Marke nimmt eine erkennbare Gegenposition zu Hyperscaler-Dominanz ein, ohne in Nationalismus oder Anti-US-Rhetorik zu verfallen. Tonalität: ruhig, präzise, faktenbasiert, mit Haltung. Näher an Aleph Alpha / Raycast / Arc als an Stripe oder ECB — markant, eigenständig, mit Ecken statt Hochglanz. Nie startup-euphorisch, nie behördlich-trocken.

## Anti-references

**Kein US-SaaS-Look.** Kein hellblauer Gradient mit abgerundeter 3D-Illustration und „Trusted by"-Logo-Wand. Keine Hero-Metric-Templates (große Zahl + kleines Label + Stat-Reihe). Keine Stockfotos von Menschen. Konkret zu vermeiden: HubSpot, Salesforce, generische B2B-SaaS-Marketingsites.

**Keine AI-Lab-Ästhetik.** Kein dunkles Lila plus Neon-Gradient plus Grid-on-Grid plus „cosmic" Hero. Das ist die zweite Reflex-Falle der Kategorie — wer „AI-Plattform" sagt, landet automatisch dort. Konkret zu vermeiden: OpenAI, Anthropic, Mistral, Stability — die etablierte Lookalike-Lane.

**Keine Behörden-Optik.** Trotz „Souveränität" und öffentlich-sektor-affiner Themen darf die Site nicht institutionell-trocken wirken. Keine Paragrafen-Strenge, keine ECB-/Bundesbank-Dokumentenhaftigkeit, keine geserifte Gravitas-Typografie als Hauptbild.

**Patriotismus-Falle.** „Souverän" wird nie als Nationalsymbolik inszeniert. Souveränität meint hier Kontrolle und Unabhängigkeit, nicht Identität. Dezente EU-Kontextsignale sind erlaubt; Flaggen-Gradients, Adler oder schwarz-rot-gold sind es nicht.

## Design Principles

**Haltung statt Hochglanz.** Die Site nimmt Position ein. Jede Section soll erkennbar machen, *wofür* und *wogegen* die Plattform steht — sonst wird sie austauschbar mit der nächsten AI-Marketingsite.

**Aufklärung ist die Conversion.** Da der Hauptlead Whitepaper / Newsletter ist, gewinnt Substanz vor Verkaufsdruck. Jede Section trägt eine erkennbare Aussage; Marketing-Floskeln („revolutionary", „seamless", „empowering") sind verboten.

**Editorial vor Marketing.** Wizard und Glossar sind die Hauptware. Layout dient dem Lesen, nicht dem Scrollen. Lange Lesestrecken sind willkommen, wenn sie etwas erklären, das B2B-Entscheider intern weitergeben können.

**Eigenständig statt zeitgemäß.** Pro Seite gibt es ein markantes, nicht-generisches Element (Hero-Visual, Wizard-Mechanik, Spectrum, Word Cloud). Die Site darf nicht aussehen wie der nächste AI-Wrapper-Launch.

**Präzision in der Sprache.** Aussagen über Souveränität, Datenkontrolle und EU-Konformität müssen technisch und vertraglich haltbar sein. Keine Marketingsuperlative ohne Beleg. Deutsche UI-Sprache, englische Variablen — wie in CLAUDE.md festgehalten.

## Accessibility & Inclusion

WCAG 2.2 AA als verbindliche Grundlage.

- Kontrastverhältnisse mindestens 4.5:1 für Body-Text, 3:1 für Headlines und nicht-textuelle UI-Elemente.
- Vollständige Tastaturbedienung, sichtbare Fokus-Zustände auf allen interaktiven Elementen.
- Semantisches HTML; ARIA nur, wo native Semantik nicht ausreicht.
- `prefers-reduced-motion` respektieren — Hero-Ticker, Word Cloud, Spectrum-Animationen müssen reduzierbar sein.
- Sprache: `lang="de"` korrekt gesetzt, eindeutige `alt`-Texte auf allen Bildern, sprechende Linktexte (kein „hier klicken").
- Für die Persona-Landingpages und das Glossar: H1 → H2 → H3 Hierarchie nicht überspringen; eine `h1` pro Seite.

BITV 2.0 (Pflicht im deutschen Public Sector) ist nicht Pflicht, aber ein gewünschter Stretch-Standard, sobald öffentlicher Sektor als Zweitzielgruppe ernst genommen wird.
