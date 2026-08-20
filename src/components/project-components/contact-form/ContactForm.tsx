"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { contactSchema } from "@/lib/contact/schema";
import { Button } from "@/components/ui/button/Button";
import type { ContactFormProps } from "./ContactForm.types";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

type FieldName = "name" | "email" | "message";

type FieldErrors = Partial<Record<FieldName, string>>;

/**
 * Maps zod issues to localized per-field error messages (first issue wins per
 * field). The zod schema validates the shape; the visible wording is copy.
 */
function toFieldErrors(
  issues: { path: (string | number | symbol)[] }[],
  messages: Record<FieldName, string>
): FieldErrors {
  const errors: FieldErrors = {};

  for (const issue of issues) {
    const field = issue.path[0];
    if (typeof field === "string" && field in messages) {
      const name = field as FieldName;
      if (errors[name] === undefined) {
        errors[name] = messages[name];
      }
    }
  }

  return errors;
}

/**
 * Contact form component (#94) — name/email/message only (#6), client-side
 * zod validation, inline success on send, inline error + mailto fallback
 * reminder on failure. Deliberately fires no analytics events (ADR-0002).
 */
export function ContactForm({
  className,
  nameLabel,
  emailLabel,
  messageLabel,
  submitLabel,
  successMessage,
  errorMessage,
  nameError,
  emailError,
  messageError,
  fallbackEmail,
  fallbackLabel,
  initialStatus = "idle",
}: ContactFormProps) {
  const locale = useLocale();
  const [status, setStatus] = useState<SubmitStatus>(initialStatus);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const fieldErrorMessages: Record<FieldName, string> = {
    name: nameError,
    email: emailError,
    message: messageError,
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const parsed = contactSchema.safeParse({
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      locale,
    });

    if (!parsed.success) {
      setFieldErrors(toFieldErrors(parsed.error.issues, fieldErrorMessages));
      return;
    }

    setFieldErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        throw new Error(`Unexpected response: ${response.status}`);
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={cn("contact-form", className)}
      >
        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-name">
            {nameLabel}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            className={cn(
              "contact-form-input",
              fieldErrors.name && "contact-form-input-invalid"
            )}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={
              fieldErrors.name ? "contact-name-error" : undefined
            }
          />
          {fieldErrors.name && (
            <p id="contact-name-error" className="contact-form-error">
              {fieldErrors.name}
            </p>
          )}
        </div>

        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-email">
            {emailLabel}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className={cn(
              "contact-form-input",
              fieldErrors.email && "contact-form-input-invalid"
            )}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={
              fieldErrors.email ? "contact-email-error" : undefined
            }
          />
          {fieldErrors.email && (
            <p id="contact-email-error" className="contact-form-error">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-message">
            {messageLabel}
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            className={cn(
              "contact-form-input",
              fieldErrors.message && "contact-form-input-invalid"
            )}
            aria-invalid={fieldErrors.message ? true : undefined}
            aria-describedby={
              fieldErrors.message ? "contact-message-error" : undefined
            }
          />
          {fieldErrors.message && (
            <p id="contact-message-error" className="contact-form-error">
              {fieldErrors.message}
            </p>
          )}
        </div>

        <div>
          <Button type="submit" size="lg" loading={isSubmitting}>
            {submitLabel}
          </Button>
        </div>

        {status === "success" && (
          <p role="status" className="contact-form-success">
            {successMessage}
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="contact-form-error">
            {errorMessage}{" "}
            <a className="contact-form-mailto" href={`mailto:${fallbackEmail}`}>
              {fallbackEmail}
            </a>
          </p>
        )}
      </form>

      <p className="contact-fallback">
        {fallbackLabel}{" "}
        <a className="contact-form-mailto" href={`mailto:${fallbackEmail}`}>
          {fallbackEmail}
        </a>
      </p>
    </>
  );
}
