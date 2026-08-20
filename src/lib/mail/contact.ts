import nodemailer from "nodemailer";
import type { ContactFormData, ContactLocale } from "@/lib/contact/schema";
import { getMailConfig, type MailConfig } from "./config";

/**
 * Locale-aware subject prefix so the recipient can tell DA from EN at a
 * glance. Functional strings, not marketing copy — but if Daniel wants to
 * own these too, they belong here (server-only, never shown in the UI).
 */
const SUBJECT_PREFIX: Record<ContactLocale, string> = {
  en: "[EN] Website contact",
  da: "[DA] Kontakt via hjemmesiden",
};

/** Plain-text body builder — keeps the mail lightweight and dependency-free. */
function buildMailBody(submission: ContactFormData): string {
  return [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Locale: ${submission.locale}`,
    "",
    "Message:",
    submission.message,
  ].join("\n");
}

/** Builds the nodemailer mail options for a contact submission. */
export function buildContactMail(
  submission: ContactFormData,
  config: MailConfig
): nodemailer.SendMailOptions {
  return {
    // `from` is always the SMTP account (Gustav's Gmail); `Reply-To` is the
    // submitter so a reply in the client lands with the person who wrote.
    from: config.SMTP_USER,
    replyTo: submission.email,
    to: config.CONTACT_RECIPIENT,
    subject: `${SUBJECT_PREFIX[submission.locale]}: ${submission.name}`,
    text: buildMailBody(submission),
  };
}

/**
 * Sends a contact submission via Gmail SMTP (nodemailer + app password).
 *
 * Reads the SMTP configuration per request; throws when the env vars are
 * missing or the transport rejects — the route handler turns that into a 500
 * and the form surfaces the inline error + mailto fallback.
 */
export async function sendContactEmail(
  submission: ContactFormData
): Promise<void> {
  const config = getMailConfig();

  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT,
    secure: config.SMTP_PORT === 465,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });

  await transporter.sendMail(buildContactMail(submission, config));
}
