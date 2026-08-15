import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/link-button/LinkButton";
import { Heading } from "@/components/ui/heading/Heading";
import { Text } from "@/components/ui/text/Text";
import type { AfterCareProps } from "./AfterCare.types";

/**
 * AfterCare block — the recurring-subscription tier rendered as the final,
 * visually distinct pricing card on the Services page (issue #73).
 *
 * Same editorial rails as WebDevelopmentLead: copy on the left (icon tile,
 * eyebrow, heading, problem-first paragraph, CTA), price card on the right.
 * Distinctness comes from the "subscription" badge pinned to an accent-bordered
 * card. All copy is read from the `AfterCare` message namespace. Designed to be
 * wrapped in a `<Section>` that owns the background surface and spacing.
 *
 * Design validated via UI prototype (issue #73, Variant A — mirror).
 */
export function AfterCare({
  className,
  eyebrow,
  badge,
  heading,
  problem,
  features,
  price,
  priceNote,
  cta,
  ctaHref,
  icon: Icon = ShieldCheck,
  surface = "white",
}: AfterCareProps) {
  return (
    <div className={cn("after-care", className)} data-surface={surface}>
      <div className="after-care-copy">
        <span className="after-care-icon">
          <Icon className="after-care-icon-glyph" aria-hidden="true" />
        </span>
        <p className="after-care-eyebrow">{eyebrow}</p>
        <Heading level={2} as="h2">
          {heading}
        </Heading>
        <Text size="lg" className="after-care-problem">
          {problem}
        </Text>
        <LinkButton
          href={ctaHref}
          variant="primary"
          size="lg"
          surface={surface}
        >
          {cta}
        </LinkButton>
      </div>

      <div className="after-care-card">
        <span className="after-care-badge">{badge}</span>
        <span className="after-care-card-note">{priceNote}</span>
        <span className="after-care-card-price">{price}</span>
        <ul className="after-care-features">
          {features.map((feature) => (
            <li key={feature} className="after-care-feature">
              <Check className="after-care-feature-check" aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
