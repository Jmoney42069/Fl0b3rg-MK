import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import {
  clientConfirmationEmail,
  makelaarNotificationEmail,
} from "@/lib/email-templates";

interface BookingBody {
  name: string;
  email: string;
  phone: string;
  message: string;
  service: string;
  date: string;
  slot: string;
}

export async function POST(request: NextRequest) {
  let body: Partial<BookingBody>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ongeldig verzoek" },
      { status: 400 }
    );
  }

  const { name, email, phone, service, date, slot } = body;

  // Validate required fields
  if (!name || !email || !phone || !service || !date || !slot) {
    return NextResponse.json(
      { error: "Verplichte velden ontbreken" },
      { status: 400 }
    );
  }

  // Basic email format guard
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: "Ongeldig e-mailadres" },
      { status: 400 }
    );
  }

  const makelaarEmail = process.env.MAKELAAR_EMAIL ?? "info@floberg.nl";
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await Promise.all([
      resend.emails.send({
        from: "Floberg Makelaars <noreply@floberg.nl>",
        to: [email],
        subject: "Uw afspraak aanvraag bij Floberg Makelaars",
        html: clientConfirmationEmail({ name, email, service, date, slot }),
      }),
      resend.emails.send({
        from: "Floberg Website <noreply@floberg.nl>",
        to: [makelaarEmail],
        subject: `Nieuwe afspraak: ${service} op ${date} om ${slot}`,
        html: makelaarNotificationEmail({
          name,
          email,
          phone,
          service,
          date,
          slot,
          message: body.message ?? "",
        }),
      }),
    ]);

    return NextResponse.json(
      { success: true, message: "Afspraak ontvangen" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[book-appointment] Resend error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan" },
      { status: 500 }
    );
  }
}
