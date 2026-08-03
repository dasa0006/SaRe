"use client";

import { Code2, RefreshCw, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section/Section";
import { Hero } from "@/components/blocks/hero/Hero";
import { TrustSignals } from "@/components/blocks/trust-signals/TrustSignals";
import { ServicesPreview } from "@/components/blocks/services-preview/ServicesPreview";
import { CTA } from "@/components/blocks/cta/CTA";
import { SERVICES, CONTACT } from "@/lib/config/routes";
import type { ServiceTeaser } from "@/components/blocks/services-preview/ServicesPreview.types";

/** Icons paired (by index) with the translated service teasers. */
const SERVICE_ICONS = [Code2, RefreshCw, ShieldCheck] as const;

interface ServiceTeaserMessage {
  problem: string;
  solution: string;
}

interface TrustSignalClientMessage {
  name: string;
  descriptor: string;
}

/**
 * Index page composition component.
 *
 * Composes the four Home blocks in their confirmed order, each wrapped in
 * a `<Section>` that owns the vertical spacing and background surface:
 *
 * 1. Hero — surface `white`, left-aligned
 * 2. TrustSignals — surface `subtle`
 * 3. ServicesPreview — surface `white`
 * 4. CTA — surface `accent`
 *
 * All copy is read from the Home message namespaces (Hero, TrustSignals,
 * ServicesPreview, CTA). CTA destinations come from the shared route
 * constants: primary → Services, secondary → Contact.
 */
export default function Index() {
  const tHero = useTranslations("Hero");
  const tTrust = useTranslations("TrustSignals");
  const tServices = useTranslations("ServicesPreview");
  const tCta = useTranslations("CTA");

  const clients = tTrust.raw("clients") as TrustSignalClientMessage[];

  const teasers = (
    tServices.raw("services") as ServiceTeaserMessage[]
  ).map<ServiceTeaser>((service, index) => ({
    icon: SERVICE_ICONS[index],
    problem: service.problem,
    solution: service.solution,
    link: SERVICES,
  }));

  return (
    <>
      <Section surface="white">
        <Hero
          layout="left"
          surface="white"
          heading={tHero("heading")}
          subtitle={tHero("subtitle")}
          primaryCTA={{ label: tHero("primaryCTA"), href: SERVICES }}
          secondaryCTA={{ label: tHero("secondaryCTA"), href: CONTACT }}
        />
      </Section>

      <Section surface="subtle">
        <TrustSignals
          surface="subtle"
          heading={tTrust("heading")}
          clients={clients}
        />
      </Section>

      <Section surface="white">
        <ServicesPreview
          surface="white"
          heading={tServices("heading")}
          linkLabel={tServices("link")}
          services={teasers}
        />
      </Section>

      <Section surface="accent">
        <CTA
          surface="accent"
          heading={tCta("heading")}
          primaryCTA={{ label: tCta("primaryCTA"), href: SERVICES }}
          secondaryCTA={{ label: tCta("secondaryCTA"), href: CONTACT }}
        />
      </Section>
    </>
  );
}
