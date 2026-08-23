export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

/**
 * ContactForm — the SaRe contact-form block.
 *
 * Collects exactly the three #6-binding fields (name, email, message) and
 * submits them to `POST /api/contact`. All copy is passed in as props from
 * the Contact page composition (the block never reads messages itself).
 */
export interface ContactFormProps {
  className?: string;
  /** Label for the name field. */
  nameLabel: string;
  /** Label for the email field. */
  emailLabel: string;
  /** Label for the message field. */
  messageLabel: string;
  /** Submit-button label. */
  submitLabel: string;
  /** Inline success message shown after a confirmed send. */
  successMessage: string;
  /** Inline error message shown when the send fails. */
  errorMessage: string;
  /** Per-field error for an empty/invalid name. */
  nameError: string;
  /** Per-field error for an invalid email. */
  emailError: string;
  /** Per-field error for an empty message. */
  messageError: string;
  /**
   * Mailto address shown as the inline error fallback reminder and as the
   * static fallback link below the form (Gustav's personal email).
   */
  fallbackEmail: string;
  /** Static fallback line below the form ("Prefer email?"). */
  fallbackLabel: string;
  /**
   * Initial status — defaults to "idle". Lets Storybook preview the success
   * and error states; production always starts idle.
   */
  initialStatus?: ContactFormStatus;
}
