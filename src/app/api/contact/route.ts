import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact/schema";
import { sendContactEmail } from "@/lib/mail/contact";

/**
 * POST /api/contact — contact-form submission endpoint.
 *
 * Same-origin only (the site CSP keeps `form-action 'self'`, which does not
 * permit cross-origin form posts). Receives the zod-validated payload from
 * the ContactForm client component and forwards it via Gmail SMTP
 * (nodemailer + app password).
 *
 * Responses:
 *   - 200 `{ ok: true }` — mail handed to the SMTP transport
 *   - 400 `{ error }` — malformed JSON or failed zod validation
 *   - 500 `{ error }` — missing SMTP configuration or transport failure
 *
 * Deliberately stateless (ADR/decision #18): no storage, no auto-reply, no
 * spam protection, no rate limiting.
 */
export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "The submitted form is invalid.", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    await sendContactEmail(parsed.data);
  } catch {
    return NextResponse.json(
      {
        error:
          "Failed to send the message. Please try again or email us directly.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
