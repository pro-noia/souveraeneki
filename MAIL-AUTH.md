# Mail-Authentifizierung (DKIM + SPF + DMARC) für Brevo

> **Aktuell nicht aktiv.** Diese Anleitung beschreibt, wie du E-Mail-Versand
> über Brevo authentifizierst, sobald du das brauchst — z. B. für
> Newsletter oder automatische Whitepaper-Mails. Die Site verschickt zur
> Zeit keine Mails (Whitepaper kommt per Direct-Download), Brevo speichert
> nur Kontakte. Bis du Versand aktivierst, sind die Records hier irrelevant.

## Was du brauchst und warum

Damit Mails, die Brevo in deinem Namen versendet, nicht im Spam landen,
brauchen die empfangenden Mailserver einen Authentifizierungs-Nachweis:

| Mechanismus | Was es macht | Pflicht für |
|---|---|---|
| **SPF** | Sagt: „Brevo darf für meine Domain Mails senden" | Gmail / Yahoo / Outlook erwarten es |
| **DKIM** | Kryptografische Signatur auf jeder Mail | Gmail / Yahoo seit Feb 2024 zwingend |
| **DMARC** | Reporting-Policy + Quarantäne-Regel | Pflicht für Bulk-Sender > 5.000 Mails/Tag |

Ohne die drei landest du 2026 zuverlässig im Spam-Ordner — bei Gmail oft
gar nicht erst zugestellt.

## Brevo-Domain-Authentifizierung bei mittwald-DNS

Die folgenden Records gelten für die Authentifizierung der Domain
**`cordt.net`** (von der aus Brevo Mails verschicken würde). Falls du
stattdessen `souveräneki.de` als Versand-Domain einrichten willst, holst
du dir die Domain-spezifischen Werte aus
**Brevo → Senders & IP → Domains → `souveräneki.de` → Authenticate this
domain** — Selektoren und Targets sind dort anders (Brevo ersetzt Punkte
durch Bindestriche im Subdomain-Namen).

### Step 1 — DKIM-Subdomains in mittwald anlegen

Mittwald-Eigenheit: Subdomains für DNS-Records müssen **erst als eigene
Subdomain** im UI angelegt werden, bevor du DNS-Records darunter setzen
kannst.

1. mStudio → **Domains** → `cordt.net` → **Subdomains** → **Subdomain
   hinzufügen**
2. Subdomain `brevo1._domainkey` anlegen (ohne `.cordt.net`-Suffix, das
   ergänzt mittwald automatisch)
3. Subdomain `brevo2._domainkey` anlegen
4. *(Hinweis: `_dmarc` haben wir bereits angelegt, als wir DMARC gesetzt
   haben.)*

### Step 2 — DKIM-CNAME-Records setzen

In der DNS-Verwaltung von `cordt.net` zwei CNAME-Records eintragen:

| Hostname (Name) | Typ | Wert (Ziel) | TTL |
|---|---|---|---|
| `brevo1._domainkey` | CNAME | `b1.cordt-net.dkim.brevo.com.` | 3600 |
| `brevo2._domainkey` | CNAME | `b2.cordt-net.dkim.brevo.com.` | 3600 |

**Wichtig zum Wert**: Punkt am Ende der Ziel-Adresse muss gesetzt sein,
damit DNS den Wert als absoluten FQDN versteht. Falls mittwald das
„automatisch korrigiert" zu `b1.cordt-net.dkim.brevo.com.cordt.net`,
beim Speichern mit Punkt am Ende erneut versuchen.

### Step 3 — SPF-TXT-Record (Apex `cordt.net`)

In der DNS-Verwaltung von `cordt.net` einen TXT-Record am Apex (`@`) setzen:

| Hostname | Typ | Wert |
|---|---|---|
| `@` (Apex) | TXT | `v=spf1 include:spf.brevo.com ~all` |

**Achtung**: Pro Domain darf nur **ein einziger** SPF-Record existieren.
Falls bereits einer da ist (z. B. weil mittwald oder ein anderer Provider
schon SPF gesetzt hat), nicht parallel anlegen, sondern **kombinieren**.

Beispiele für Kombinationen:

- **Nur Brevo**: `v=spf1 include:spf.brevo.com ~all`
- **Brevo + mittwald-Mail**: `v=spf1 include:spf.brevo.com include:_spf.mittwald.de ~all`
- **Brevo + Google Workspace**: `v=spf1 include:spf.brevo.com include:_spf.google.com ~all`
- **Brevo + mittwald + Microsoft 365**: `v=spf1 include:spf.brevo.com include:_spf.mittwald.de include:spf.protection.outlook.com ~all`

Das `~all` am Ende bedeutet „SoftFail" — Mails von nicht gelisteten Servern
werden als verdächtig markiert, aber nicht direkt abgelehnt. Nach 2–4
Wochen erfolgreicher Tests auf `-all` (HardFail) hochstufen.

### Step 4 — DMARC-TXT-Record

Den haben wir bereits gesetzt — zur Vollständigkeit:

| Hostname | Typ | Wert |
|---|---|---|
| `_dmarc` | TXT | `v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com` |

`p=none` ist **Monitoring-Modus** — Mailserver wenden noch keine Policy an,
melden dir aber per `rua`-Adresse Bericht über Authentifizierungs-Ergebnisse.
Brevo aggregiert die Berichte im Account-UI.

Nach 2–4 Wochen erfolgreichem Monitoring hochstufen:

1. `p=quarantine` → nicht-authentifizierte Mails landen im Spam
2. `p=reject` (Endstand) → nicht-authentifizierte Mails werden direkt
   abgelehnt

Erweiterungsmöglichkeiten:

```
v=DMARC1; p=quarantine; rua=mailto:rua@dmarc.brevo.com; ruf=mailto:ruf@dmarc.brevo.com; fo=1; pct=100; adkim=s; aspf=s
```

Bedeutung der zusätzlichen Tags:
- `ruf=` Forensic-Reports (einzelne fehlgeschlagene Mails)
- `fo=1` Forensic auch bei einzelnen Mechanismen-Fehlern
- `pct=100` Policy auf 100 % der Mails anwenden (zum Stufen-Hochschalten:
  10 → 50 → 100 testen)
- `adkim=s` strikte DKIM-Alignment
- `aspf=s` strikte SPF-Alignment

## Verifikation nach dem Setup

```bash
# DKIM 1
dig +short brevo1._domainkey.cordt.net CNAME
# Erwartet: b1.cordt-net.dkim.brevo.com.

# DKIM 2
dig +short brevo2._domainkey.cordt.net CNAME
# Erwartet: b2.cordt-net.dkim.brevo.com.

# SPF
dig +short cordt.net TXT | grep spf1
# Erwartet: "v=spf1 include:spf.brevo.com ~all"
# (oder die kombinierte Variante, falls mehrere Provider)

# DMARC
dig +short _dmarc.cordt.net TXT
# Erwartet: "v=DMARC1; p=none; rua=mailto:rua@dmarc.brevo.com"
```

Wenn alle vier Records korrekt aufgelöst werden, in Brevo:

- **Senders & IP** → **Domains** → `cordt.net` → Button **„Authenticate
  this domain"** klicken
- Status springt auf **Authenticated** ✓
- Erst danach Senders unter `@cordt.net` (oder `souveraeneki@cordt.net`)
  als verifizierte Sender hinzufügen und über sie versenden

## Was passieren kann

| Symptom | Ursache | Lösung |
|---|---|---|
| Vercel-Status bleibt „Invalid Configuration" | DNS-Propagation noch nicht durch | warten (5–60 Min), `dig` Records prüfen |
| Brevo „cannot verify domain" | Tippfehler im CNAME-Wert | exakt `b1.cordt-net.dkim.brevo.com.` (mit Punkt) |
| SPF wird abgelehnt mit „too many DNS lookups" | mehr als 10 `include:` im SPF-Record | Konsolidieren, evtl. SPF-Flattener-Tool |
| Mails landen trotz DKIM+SPF im Spam | DMARC noch `p=none` und Reputation gering | regelmäßig versenden, Warmup, später `p=quarantine` |
| Forensic-Reports zeigen DKIM-Fail | Selector oder Domain in Brevo nicht aligned | Brevo-Support kontaktieren, oft Brevo-seitiger Fix |

## Wenn du SPF/DKIM für `souveräneki.de` (statt `cordt.net`) willst

Brevo unterstützt mehrere authentifizierte Domains parallel. In Brevo:

1. **Senders & IP** → **Domains** → **Add a new domain** → `souveräneki.de`
2. Brevo zeigt die spezifischen Records (Selector-Namen und Ziele
   unterscheiden sich von `cordt.net` — meist `brevo1._domainkey` →
   `b1.xn--souverneki-v5a-de.dkim.brevo.com` oder ähnlich, mit Bindestrichen
   statt Punkten in der Domain)
3. Diese Records bei mittwald im DNS-Editor für `souveräneki.de`
   anlegen (analog wie hier beschrieben, nur in der anderen Zone)
4. Im Brevo-UI verifizieren

Wichtig: die DKIM-Selektoren `brevo1._domainkey` und `brevo2._domainkey`
sind in **jeder** Brevo-authentifizierten Domain identisch (das sind feste
Selector-Namen), aber die **Ziel-Werte** sind pro Domain unterschiedlich.
