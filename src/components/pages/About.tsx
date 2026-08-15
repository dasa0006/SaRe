"use client";

import {
  ClipboardList,
  Gauge,
  HeartHandshake,
  MessageCircle,
  MessageSquareText,
  Scale,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section/Section";
import { TextBlock } from "@/components/blocks/text-block/TextBlock";
import { FounderSpotlights } from "@/components/blocks/founder-spotlights/FounderSpotlights";
import { FeatureGrid } from "@/components/blocks/feature-grid/FeatureGrid";
import { ProofPoint } from "@/components/blocks/proof-point/ProofPoint";
import { CTA } from "@/components/blocks/cta/CTA";
import { CONTACT, IMPROVE_INVEST_STORY, SERVICES } from "@/lib/config/routes";
import type { Founder } from "@/components/blocks/founder-spotlights/FounderSpotlights.types";
import type { FeatureItem } from "@/components/blocks/feature-grid/FeatureGrid.types";

/** Icons paired (by index) with the translated "How we work" features. */
const HOW_WE_WORK_ICONS = [
  MessageSquareText,
  Scale,
  Users,
  ClipboardList,
] as const;

/** Icons paired (by index) with the translated "What we value" features. */
const VALUES_ICONS = [MessageCircle, HeartHandshake, Gauge] as const;

interface FeatureMessage {
  heading: string;
  description: string;
}

/** Maps translated feature messages to FeatureGrid items, pairing icons by index. */
function toFeatureItems(
  icons: readonly LucideIcon[],
  messages: readonly FeatureMessage[]
): FeatureItem[] {
  return messages.map((feature, index) => ({
    icon: icons[index],
    heading: feature.heading,
    description: feature.description,
  }));
}

/**
 * About page composition component.
 *
 * Composes the five About sections in the confirmed order (#17), each wrapped
 * in a `<Section>` that owns the vertical spacing and background surface:
 *
 * 1. Intro / manifesto — TextBlock — surface `white`
 * 2. The founders — FounderSpotlights — surface `subtle`
 * 3. How we work — FeatureGrid (4 features) — surface `white`
 * 4. What we value — FeatureGrid (3 features) — surface `dark`
 * 5. Proof + CTA — proof line linking to the Improve Invest case study, then
 *    CTA — surface `accent`
 *
 * All copy is read from the About message namespaces (AboutIntro, Founders,
 * HowWeWork, Values, AboutProof, AboutCta). CTA destinations come from the
 * shared route constants, inverted from Home: primary → Contact, secondary →
 * Services.
 */
export default function About() {
  const tIntro = useTranslations("AboutIntro");
  const tFounders = useTranslations("Founders");
  const tHowWeWork = useTranslations("HowWeWork");
  const tValues = useTranslations("Values");
  const tProof = useTranslations("AboutProof");
  const tCta = useTranslations("AboutCta");

  const founders = tFounders.raw("founders") as Founder[];

  const howWeWorkFeatures = toFeatureItems(
    HOW_WE_WORK_ICONS,
    tHowWeWork.raw("features") as FeatureMessage[]
  );

  const valueFeatures = toFeatureItems(
    VALUES_ICONS,
    tValues.raw("features") as FeatureMessage[]
  );

  return (
    <>
      <Section surface="white">
        <TextBlock heading={tIntro("heading")} content={tIntro("content")} />
      </Section>

      <Section surface="subtle">
        <FounderSpotlights
          surface="subtle"
          heading={tFounders("heading")}
          founders={founders}
        />
      </Section>

      <Section surface="white">
        <FeatureGrid
          heading={tHowWeWork("heading")}
          description={tHowWeWork("description")}
          features={howWeWorkFeatures}
          columns={2}
        />
      </Section>

      <Section surface="dark">
        <FeatureGrid
          heading={tValues("heading")}
          features={valueFeatures}
          columns={3}
        />
      </Section>

      <Section surface="accent">
        <ProofPoint
          surface="accent"
          content={tProof("content")}
          linkLabel={tProof("linkLabel")}
          href={IMPROVE_INVEST_STORY}
        />

        <CTA
          surface="accent"
          heading={tCta("heading")}
          primaryCTA={{ label: tCta("primaryCTA"), href: CONTACT }}
          secondaryCTA={{ label: tCta("secondaryCTA"), href: SERVICES }}
        />
      </Section>
    </>
  );
}
