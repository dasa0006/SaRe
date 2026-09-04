import { z } from "zod";

/**
 * Locales the contact form can be submitted in. Drives the language of the
 * email subject/body and is validated server-side so the route handler can
 * never be fed an arbitrary locale.
 */
export const CONTACT_LOCALES = ["en", "da"] as const;

export type ContactLocale = (typeof CONTACT_LOCALES)[number];

/** Shared length limits — applied by the client form and the route handler. */
export const CONTACT_LIMITS = {
  nameMax: 200,
  emailMax: 254,
  messageMax: 5000,
} as const;

/**
 * Contact form payload shared between the client form (client-side zod
 * validation) and the route handler (`POST /api/contact`). Keeping a single
 * schema guarantees the two sides can never drift apart.
 *
 * `locale` is optional on input and defaults to `"en"` — the form always
 * sends the current `useLocale()` value, so the default only guards direct
 * API calls.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1).max(CONTACT_LIMITS.nameMax),
  email: z.string().trim().email().max(CONTACT_LIMITS.emailMax),
  message: z.string().trim().min(1).max(CONTACT_LIMITS.messageMax),
  locale: z.enum(CONTACT_LOCALES).default("en"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
