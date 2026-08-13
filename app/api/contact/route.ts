import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  // Must be an address on a domain verified in Resend. Use
  // "onboarding@resend.dev" for testing before a domain is verified.
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !toEmail) {
    console.error(
      "Contact form submitted but RESEND_API_KEY / CONTACT_TO_EMAIL are not configured.",
    );
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please try again later." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: `Pro Caliber Services Website <${fromEmail}>`,
    to: toEmail,
    replyTo: email,
    subject: `New website inquiry from ${name}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}
