/** HTML email templates for the Floberg booking system. */

const HEADER = `
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F1B2D;padding:20px 0;margin-bottom:32px">
    <tr>
      <td align="center">
        <span style="font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#C9A84C;letter-spacing:2px">
          FLOBERG MAKELAARS
        </span>
      </td>
    </tr>
  </table>
`;

const FOOTER = `
  <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;border-top:1px solid #e5e5e5;padding-top:24px">
    <tr>
      <td align="center">
        <p style="font-family:Arial,sans-serif;font-size:12px;color:#999;line-height:1.6;margin:0">
          <strong style="color:#0F1B2D">Floberg Makelaars</strong><br>
          Leeuwenlaan 12, 1404 BL Bussum<br>
          T: 035 694 40 40 &nbsp;|&nbsp; E: info@floberg.nl<br>
          <span style="color:#C9A84C">NVM-lid</span> &nbsp;&middot;&nbsp; KvK 32123456
        </p>
      </td>
    </tr>
  </table>
`;

interface ClientEmailParams {
  name: string;
  service: string;
  date: string;
  slot: string;
  email: string;
}

/** Confirmation email sent to the client. */
export function clientConfirmationEmail(params: ClientEmailParams): string {
  const { name, service, date, slot } = params;
  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;width:100%;border-radius:4px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">
          <tr><td>${HEADER}</td></tr>
          <tr>
            <td style="padding:0 40px 40px">
              <p style="font-size:16px;color:#0F1B2D;margin:0 0 16px">Beste ${name},</p>
              <p style="font-size:15px;color:#444;line-height:1.7;margin:0 0 28px">
                Uw afspraak is ontvangen en wordt zo spoedig mogelijk bevestigd door ons team.
                Wij nemen binnen <strong>1 werkdag</strong> contact met u op.
              </p>

              <!-- Summary box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9f7f2;border-left:3px solid #C9A84C;border-radius:2px;margin-bottom:28px">
                <tr><td style="padding:20px 24px">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-size:13px;color:#666;padding-bottom:8px;width:40%">Dienst</td>
                      <td style="font-size:13px;color:#0F1B2D;font-weight:bold;padding-bottom:8px">${service}</td>
                    </tr>
                    <tr>
                      <td style="font-size:13px;color:#666;padding-bottom:8px">Datum</td>
                      <td style="font-size:13px;color:#0F1B2D;font-weight:bold;padding-bottom:8px">${date}</td>
                    </tr>
                    <tr>
                      <td style="font-size:13px;color:#666">Tijdstip</td>
                      <td style="font-size:13px;color:#0F1B2D;font-weight:bold">${slot}</td>
                    </tr>
                  </table>
                </td></tr>
              </table>

              <p style="font-size:14px;color:#555;line-height:1.7;margin:0 0 8px">
                Heeft u vragen of wilt u de afspraak wijzigen?
              </p>
              <p style="font-size:14px;color:#555;line-height:1.7;margin:0">
                Bel ons op <strong>035 694 40 40</strong> of mail naar 
                <a href="mailto:info@floberg.nl" style="color:#C9A84C">info@floberg.nl</a>
              </p>

              ${FOOTER}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

interface MakelaarEmailParams {
  name: string;
  service: string;
  date: string;
  slot: string;
  phone: string;
  email: string;
  message: string;
}

/** Internal notification email sent to the makelaar. */
export function makelaarNotificationEmail(params: MakelaarEmailParams): string {
  const { name, service, date, slot, phone, email, message } = params;

  const row = (label: string, value: string) => `
    <tr>
      <td style="font-size:13px;font-weight:bold;color:#0F1B2D;padding:10px 16px 10px 0;width:40%;vertical-align:top;border-bottom:1px solid #eee">${label}</td>
      <td style="font-size:13px;color:#333;padding:10px 0;border-bottom:1px solid #eee">${value || '—'}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:40px 0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;max-width:600px;width:100%;border-radius:4px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">
          <tr><td>${HEADER}</td></tr>
          <tr>
            <td style="padding:0 40px 40px">
              <h2 style="font-family:Georgia,serif;font-size:22px;color:#0F1B2D;margin:0 0 24px">
                Nieuwe afspraak aanvraag
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px">
                ${row("Naam", name)}
                ${row("Dienst", service)}
                ${row("Datum", date)}
                ${row("Tijdstip", slot)}
                ${row("Telefoon", phone)}
                ${row("E-mail", `<a href="mailto:${email}" style="color:#C9A84C">${email}</a>`)}
                ${row("Bericht", message || "—")}
              </table>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px">
                <tr>
                  <td style="background:#C9A84C;border-radius:2px;padding:12px 28px">
                    <a href="#" style="font-family:Arial,sans-serif;font-size:14px;font-weight:bold;color:#0F1B2D;text-decoration:none">
                      Open agenda
                    </a>
                  </td>
                </tr>
              </table>

              ${FOOTER}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
