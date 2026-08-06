"use client";

import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section/Section";
import { StandardServices } from "@/components/blocks/standard-services/StandardServices";
import type { StandardService } from "@/components/blocks/standard-services/StandardServices.types";
import { WebDevelopmentLead } from "@/components/blocks/web-development-lead/WebDevelopmentLead";
import { CONTACT } from "@/lib/config/routes";

/**
 * Services page composition component.
 *
 * Leads with the web-development service section (issue #69) — the hero-style
 * lead with the largest visual weight of the five service sections — then the
 * four standard service sections (issue #70): Modernising → Responsiveness →
 * Language copy → Excel. All copy is read from the `WebDevelopmentLead` and
 * `StandardServices` message namespaces, so it renders in both DA and EN.
 */
export default function Services() {
  const t = useTranslations("WebDevelopmentLead");
  const st = useTranslations("StandardServices");

  const services: StandardService[] = [
    {
      id: "modernising",
      eyebrow: st("modernising.eyebrow"),
      heading: st("modernising.heading"),
      problem: st("modernising.problem"),
      features: st.raw("modernising.features") as string[],
      price: st("modernising.price"),
    },
    {
      id: "responsiveness",
      eyebrow: st("responsiveness.eyebrow"),
      heading: st("responsiveness.heading"),
      problem: st("responsiveness.problem"),
      features: st.raw("responsiveness.features") as string[],
      price: st("responsiveness.price"),
    },
    {
      id: "language",
      eyebrow: st("language.eyebrow"),
      heading: st("language.heading"),
      problem: st("language.problem"),
      features: st.raw("language.features") as string[],
      price: st("language.price"),
    },
    {
      id: "excel",
      eyebrow: st("excel.eyebrow"),
      heading: st("excel.heading"),
      problem: st("excel.problem"),
      features: st.raw("excel.features") as string[],
      price: st("excel.price"),
    },
  ];

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
        <StandardServices items={services} priceNote={st("priceNote")} />
      </Section>
    </>
  );
}
