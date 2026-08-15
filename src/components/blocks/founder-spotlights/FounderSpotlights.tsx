import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading/Heading";
import { Text } from "@/components/ui/text/Text";
import type { FounderSpotlightsProps } from "./FounderSpotlights.types";

/**
 * FounderSpotlights block — individual text spotlights for the founders.
 *
 * Renders a heading followed by one spotlight per founder: name, role
 * one-liner, and a 2–3 sentence background. Text-only — deliberately no
 * photos (ADR-0004, photo exception parked as a post-launch upgrade).
 *
 * Composes Heading and Text primitives. Designed to be wrapped in a
 * `<Section>` that owns the background surface and spacing.
 */
export function FounderSpotlights({
  className,
  heading,
  founders,
  surface = "white",
}: FounderSpotlightsProps) {
  return (
    <div className={cn("founder-spotlights", className)} data-surface={surface}>
      <Heading level={2} className="founder-spotlights-heading">
        {heading}
      </Heading>

      <div className="founder-spotlights-grid">
        {founders.map((founder) => (
          <article key={founder.name} className="founder-spotlight">
            <Heading level={3} as="h3">
              {founder.name}
            </Heading>
            <Text size="lg" className="founder-spotlight-role">
              {founder.role}
            </Text>
            <Text className="founder-spotlight-background">
              {founder.background}
            </Text>
          </article>
        ))}
      </div>
    </div>
  );
}
