import { z } from "zod";

/**
 * Server-only SMTP configuration for the contact form.
 *
 * Reads from `process.env` lazily (per request) so that:
 *   - `next build` never fails when the vars are absent in CI
 *   - unit tests can set/restore `process.env` freely
 *
 * These are server-only env vars — never `NEXT_PUBLIC_` prefixed — and are
 * consumed exclusively by the route handler / mail modules.
 *
 * Required at request time:
 *   - `SMTP_USER` — the Gmail account sending the mail (Gustav's)
 *   - `SMTP_PASS` — the Gmail **app password** for that account (2FA required;
 *                   Gustav must generate it before end-to-end testing)
 *   - `CONTACT_RECIPIENT` — where submissions land (Gustav's personal email)
 *
 * Optional (default to Gmail):
 *   - `SMTP_HOST` — defaults to `smtp.gmail.com`
 *   - `SMTP_PORT` — defaults to `587` (STARTTLS); use `465` for implicit TLS
 */
const mailEnvSchema = z.object({
  SMTP_HOST: z.string().min(1).default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().min(1),
  SMTP_PASS: z.string().min(1),
  CONTACT_RECIPIENT: z.email(),
});

export type MailConfig = z.infer<typeof mailEnvSchema>;

/** Reads and validates the mail env configuration for the current request. */
export function getMailConfig(): MailConfig {
  const result = mailEnvSchema.safeParse(process.env);

  if (!result.success) {
    throw new Error(
      "Missing contact-form mail configuration. Set SMTP_USER, SMTP_PASS and " +
        "CONTACT_RECIPIENT in the server environment (SMTP_HOST and SMTP_PORT " +
        "default to Gmail). See src/lib/mail/config.ts."
    );
  }

  return result.data;
}
