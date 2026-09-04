"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section/Section";
import { TextBlock } from "@/components/blocks/text-block/TextBlock";
import { ContactForm } from "@/components/blocks/contact-form/ContactForm";

/**
 * Contact page composition component.
 *
 * Composes the two confirmed sections (#92) in order:
 *
 * 1. Intro — TextBlock — surface `white` — "Get in touch" heading, the
 *    warm/direct line, the owners echo and the response-time line
 * 2. Form — ContactForm — surface `subtle` — the name/email/message form
 *    (#6) with inline success/error states, plus the "Prefer email?" mailto
 *    fallback line below it
 *
 * The page ends at the form — no closing CTA, no founders' contact info, no
 * socials (out of scope per #92). The WipGraphic full-page takeover is gone
 * (ADR-0005). All copy is read from the `ContactPage` namespace.
 */
export default function Contact() {
  const t = useTranslations("ContactPage");

  const introContent = [
    t("intro.warmLine"),
    t("intro.ownersEcho"),
    t("intro.responseTime"),
  ].join("\n\n");

  return (
    <>
      <Section surface="white">
        <TextBlock heading={t("intro.heading")} content={introContent} />
      </Section>

      <Section surface="subtle">
        <ContactForm
          nameLabel={t("form.nameLabel")}
          emailLabel={t("form.emailLabel")}
          messageLabel={t("form.messageLabel")}
          submitLabel={t("form.submit")}
          successMessage={t("form.success")}
          errorMessage={t("form.error")}
          nameError={t("form.nameError")}
          emailError={t("form.emailError")}
          messageError={t("form.messageError")}
          fallbackEmail={t("form.email")}
          fallbackLabel={t("form.fallback")}
        />
      </Section>
    </>
  );
}
