import { NextResponse } from "next/server";

interface WhitepaperRequest {
  email?: unknown;
  company?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Brevo (Sendinblue) REST API. Doku: https://developers.brevo.com/reference/createcontact
const BREVO_API_URL = "https://api.brevo.com/v3/contacts";

export async function POST(request: Request) {
  let body: WhitepaperRequest;
  try {
    body = (await request.json()) as WhitepaperRequest;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 422 });
  }
  if (company.length < 2) {
    return NextResponse.json({ ok: false, error: "invalid_company" }, { status: 422 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_WHITEPAPER_LIST_ID;
  const listId = listIdRaw ? Number.parseInt(listIdRaw, 10) : NaN;

  // Wenn die ENV-Variablen fehlen (Preview-Deploy, lokale Entwicklung ohne
  // .env.local), fallen wir auf Logging zurück — Form bleibt testbar und
  // bricht das Deploy nicht.
  if (!apiKey || Number.isNaN(listId)) {
    console.warn(
      "[whitepaper] BREVO_API_KEY oder BREVO_WHITEPAPER_LIST_ID fehlt — logging-only",
      { email, company, receivedAt: new Date().toISOString() },
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch(BREVO_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        attributes: { COMPANY: company },
        listIds: [listId],
        // Bei Erst-Submit Kontakt anlegen, bei bestehender Mail nur Listen-
        // Zuordnung und Attribute aktualisieren — sonst antwortet Brevo mit
        // 400 "Contact already exist".
        updateEnabled: true,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("[whitepaper] Brevo API error", {
        status: res.status,
        body: text.slice(0, 500),
      });
      return NextResponse.json(
        { ok: false, error: "network" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[whitepaper] Brevo fetch failed", err);
    return NextResponse.json(
      { ok: false, error: "network" },
      { status: 502 },
    );
  }
}
