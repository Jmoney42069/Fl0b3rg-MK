import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const HEADER = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F1B2D;padding:20px 0;margin-bottom:32px">
    <tr><td align="center">
      <span style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#C9A84C;letter-spacing:2px">
        FLOBERG MAKELAARS
      </span>
    </td></tr>
  </table>`;

const FOOTER = `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;border-top:1px solid #e5e5e5;padding-top:24px">
    <tr><td align="center">
      <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;line-height:1.6;margin:0">
        <strong style="color:#0F1B2D">Floberg Makelaars</strong><br>
        Leeuwenlaan 12, 1404 BL Bussum · T: 035 694 40 40 · E: info@floberg.nl<br>
        <span style="color:#C9A84C">NVM-lid</span> · KvK 32123456
      </p>
    </td></tr>
  </table>`;

const dataRow = (label: string, value: string) => `
  <tr>
    <td style="font-size:13px;font-weight:bold;color:#0F1B2D;padding:8px 16px 8px 0;width:40%;border-bottom:1px solid #eee;vertical-align:top">${label}</td>
    <td style="font-size:13px;color:#333;padding:8px 0;border-bottom:1px solid #eee">${value || "—"}</td>
  </tr>`;

interface ZoekopdrachtBody {
  voornaam: string;
  achternaam: string;
  email: string;
  telefoon: string;
  minBudget: string;
  maxBudget: string;
  regio: string[];
  woningtype: string;
  minOppervlak: string;
  minSlaapkamers: string;
  wensen: string;
}

export async function POST(request: NextRequest) {
  let body: Partial<ZoekopdrachtBody>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek" }, { status: 400 });
  }

  const { voornaam, achternaam, email, telefoon } = body;

  if (!voornaam || !achternaam || !email || !telefoon) {
    return NextResponse.json(
      { error: "Verplichte velden ontbreken" },
      { status: 400 }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Ongeldig e-mailadres" }, { status: 400 });
  }

  const fullName = `${voornaam} ${achternaam}`;
  const regioStr = (body.regio ?? []).join(", ") || "—";
  const makelaarEmail = process.env.MAKELAAR_EMAIL ?? "info@floberg.nl";

  const makelaarHtml = `<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;border-radius:4px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">
        <tr><td>${HEADER}</td></tr>
        <tr><td style="padding:0 40px 40px">
          <h2 style="font-family:Georgia,serif;font-size:22px;color:#0F1B2D;margin:0 0 24px">Nieuwe Zoekopdracht Ontvangen</h2>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
            ${dataRow("Naam", fullName)}
            ${dataRow("E-mail", `<a href="mailto:${email}" style="color:#C9A84C">${email}</a>`)}
            ${dataRow("Telefoon", telefoon)}
            ${dataRow("Budget", `${body.minBudget ?? "—"} – ${body.maxBudget ?? "—"}`)}
            ${dataRow("Regio", regioStr)}
            ${dataRow("Type woning", body.woningtype ?? "—")}
            ${dataRow("Min. oppervlak", body.minOppervlak ?? "—")}
            ${dataRow("Min. slaapkamers", body.minSlaapkamers ?? "—")}
            ${dataRow("Bijzondere wensen", body.wensen ?? "—")}
          </table>
          <table cellpadding="0" cellspacing="0" style="margin-bottom:32px">
            <tr><td style="background:#C9A84C;border-radius:2px;padding:12px 28px">
              <a href="tel:${telefoon.replace(/\s/g, "")}" style="font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#0F1B2D;text-decoration:none">
                Bel klant nu
              </a>
            </td></tr>
          </table>
          ${FOOTER}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const summaryBox = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f2;border-left:3px solid #C9A84C;border-radius:2px;margin-bottom:28px">
      <tr><td style="padding:20px 24px">
        ${dataRow("Budget", `${body.minBudget ?? "—"} – ${body.maxBudget ?? "—"}`)}
        ${dataRow("Regio", regioStr)}
        ${dataRow("Type woning", body.woningtype ?? "Geen voorkeur")}
        ${body.wensen ? dataRow("Wensen", body.wensen) : ""}
      </td></tr>
    </table>`;

  const clientHtml = `<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;max-width:600px;width:100%;border-radius:4px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,.08)">
        <tr><td>${HEADER}</td></tr>
        <tr><td style="padding:0 40px 40px">
          <p style="font-size:16px;color:#0F1B2D;margin:0 0 16px">Beste ${voornaam},</p>
          <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 28px">
            Wij hebben uw zoekopdracht ontvangen en gaan actief voor u op zoek naar woningen 
            die voldoen aan uw criteria — ook voor woningen die nog niet op Funda staan.
          </p>
          ${summaryBox}
          <p style="font-size:14px;color:#555;line-height:1.7;margin:0">
            Heeft u vragen? Bel ons op <strong>035 694 40 40</strong> of mail naar 
            <a href="mailto:info@floberg.nl" style="color:#C9A84C">info@floberg.nl</a>
          </p>
          ${FOOTER}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Floberg Website <noreply@floberg.nl>",
        to: [makelaarEmail],
        subject: `Nieuwe zoekopdracht: ${fullName} — ${body.minBudget ?? "?"} tot ${body.maxBudget ?? "?"}`,
        html: makelaarHtml,
      }),
      resend.emails.send({
        from: "Floberg Makelaars <noreply@floberg.nl>",
        to: [email],
        subject: "Uw zoekopdracht bij Floberg Makelaars is ontvangen",
        html: clientHtml,
      }),
    ]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[submit-zoekopdracht] Resend error:", error);
    return NextResponse.json({ error: "Er is iets misgegaan" }, { status: 500 });
  }
}
