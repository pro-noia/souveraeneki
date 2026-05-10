import { NextResponse } from "next/server";

interface WhitepaperRequest {
  email?: unknown;
  company?: unknown;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  // TODO: Wire to mail provider (Resend / Postmark / SES) and CRM.
  // For now, logging-only so the form is testable end-to-end.
  console.info("[whitepaper] new lead", {
    email,
    company,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
