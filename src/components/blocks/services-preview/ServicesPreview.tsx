import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading/Heading";
import { Text } from "@/components/ui/text/Text";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ServicesPreviewProps } from "./ServicesPreview.types";

/**
 * ServicesPreview block — home-page teaser for the Services page.
 *
 * Renders a heading followed by service teaser rows: a tinted icon tile on
 * one side, the problem hook as a pull-quote, and the solution one-liner as
 * an answer band with an explicit link to the full service. Alternates the
 * icon tile alignment on desktop; stacks on mobile.
 *
 * Composes Heading, Text, and Link primitives. Designed to be wrapped in a
 * `<Section>` that owns the background surface and spacing.
 *
 * Design validated via UI prototype (issue #25, Variant C — Spotlight rows).
 */
export function ServicesPreview({
  className,
  heading,
  linkLabel,
  services,
  surface = "white",
}: ServicesPreviewProps) {
  return (
    <div className={cn("services-preview", className)} data-surface={surface}>
      <Heading level={2} className="services-preview-heading">
        {heading}
      </Heading>

      <div className="services-preview-list">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <article
              key={service.problem}
              className={cn(
                "services-preview-item",
                index % 2 === 1 && "services-preview-item-flip"
              )}
            >
              <span className="services-preview-icon">
                <Icon
                  className="services-preview-icon-glyph"
                  aria-hidden="true"
                />
              </span>
              <div className="services-preview-copy">
                <Text size="lg" as="p" className="services-preview-problem">
                  {service.problem}
                </Text>
                <div className="services-preview-answer">
                  <p className="services-preview-solution">
                    {service.solution}
                  </p>
                  <Link href={service.link} className="services-preview-link">
                    {linkLabel}
                    <ArrowRight
                      className="services-preview-link-arrow"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
