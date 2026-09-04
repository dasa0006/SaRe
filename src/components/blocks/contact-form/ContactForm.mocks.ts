import type { ContactFormProps } from "./ContactForm.types";

/** Copy mirroring the committed `ContactPage.form` namespace (en). */
export const mockContactFormProps: ContactFormProps = {
  nameLabel: "Name",
  emailLabel: "Email",
  messageLabel: "Message",
  submitLabel: "Send message",
  successMessage:
    "Message sent — thanks for writing. We'll get back to you within 1–2 business days.",
  errorMessage:
    "Something went wrong sending your message. Please try again, or email us directly:",
  nameError: "Please enter your name.",
  emailError: "Please enter a valid email address.",
  messageError: "Please enter your message.",
  fallbackEmail: "gustav@example.com",
  fallbackLabel: "Prefer email?",
};
