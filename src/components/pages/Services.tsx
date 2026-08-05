"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section/Section";
import WipGraphic from "@/components/project-components/wip-graphic/WipGraphic";
import { WebDevelopmentLead } from "@/components/blocks/web-development-lead/WebDevelopmentLead";
import { CONTACT } from "@/lib/config/routes";

/**
 * Services page composition component.
 *
 * Leads with the web-development service section (issue #69) — the hero-style
 * lead with the largest visual weight of the five service sections — then an
 * interim WipGraphic standing in for the remaining standard service sections
 * (issue #70). All copy is read from the `WebDevelopmentLead` message
 * namespace, so it renders in both DA and EN.
 */
export default function Services() {
  const t = useTranslations("WebDevelopmentLead");

  return (
    <>
      <Section surface="subtle" size="lg">
        <WebDevelopmentLead
          surface="subtle"
          eyebrow={t("eyebrow")}
          heading={t("heading")}
          problem={t("problem")}
          features={t.raw("features") as string[]}
          price={t("price")}
          priceNote={t("priceNote")}
          cta={t("cta")}
          ctaHref={CONTACT}
        />
      </Section>

      <Section surface="white">
        <WipGraphic />
      </Section>
    </>
  );
}
