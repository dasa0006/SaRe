import { Check, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/link-button/LinkButton";
import { Heading } from "@/components/ui/heading/Heading";
import { Text } from "@/components/ui/text/Text";
import type { WebDevelopmentLeadProps } from "./WebDevelopmentLead.types";

/**
 * WebDevelopmentLead block — the web-development service shown as the hero-style
 * lead section on the Services page (largest visual weight of the five service
 * sections).
 *
 * Pricing-led rails: an editorial two-column layout. The copy is a left rail
 * (icon tile, eyebrow, heading, problem-first paragraph, CTA); the price is a
 * number-first card on the right (large tabular figure, divider, feature
 * bullets). Composes Heading, Text, and LinkButton primitives. Designed to be
 * wrapped in a `<Section>` that owns the background surface and spacing.
 *
 * Design validated via UI prototype (issue #69, Variant C — pricing-led rails).
 */
export function WebDevelopmentLead({
  className,
  eyebrow,
  heading,
  problem,
  features,
  price,
  priceNote,
  cta,
  ctaHref,
  icon: Icon = Code2,
  surface = "white",
}: WebDevelopmentLeadProps) {
  return (
    <div
      className={cn("web-development-lead", className)}
      data-surface={surface}
    >
      <div className="web-development-lead-copy">
        <span className="web-development-lead-icon">
          <Icon
            className="web-development-lead-icon-glyph"
            aria-hidden="true"
          />
        </span>
        <p className="web-development-lead-eyebrow">{eyebrow}</p>
        <Heading level={2} as="h2">
          {heading}
        </Heading>
        <Text size="lg" className="web-development-lead-problem">
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

      <div className="web-development-lead-card">
        <span className="web-development-lead-card-note">{priceNote}</span>
        <span className="web-development-lead-card-price">{price}</span>
        <ul className="web-development-lead-features">
          {features.map((feature) => (
            <li key={feature} className="web-development-lead-feature">
              <Check
                className="web-development-lead-feature-check"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
