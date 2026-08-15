import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading/Heading";
import { Text } from "@/components/ui/text/Text";
import { LinkButton } from "@/components/ui/link-button/LinkButton";
import { Image } from "@/components/ui/image/Image";
import type { CaseStudyBeat, CaseStudyProps } from "./CaseStudy.types";

/**
 * CaseStudy block — the closing trust section of the Services page (issue
 * #75), presenting the Improve Invest hero case as the 5-beat narrative
 * (Shape A, decision #15): client & problem → what we did → working together
 * → result → service-agnostic contact CTA.
 *
 * Editorial, typography-driven layout per ADR-0004: numbered narrative beats
 * (01–04) in a two-column grid, an optional screenshot strip that only
 * renders when approved screenshots are supplied (asset-agnostic), and an
 * accent contact panel closing the page on the CTA. All copy is read from the
 * `CaseStudy` message namespace. Designed to be wrapped in a `<Section>` that
 * owns the background surface and spacing.
 */
export function CaseStudy({
  className,
  eyebrow,
  heading,
  client,
  work,
  collaboration,
  result,
  contact,
  ctaHref,
  screenshots,
  surface = "white",
}: CaseStudyProps) {
  return (
    <div className={cn("case-study", className)} data-surface={surface}>
      <header className="case-study-header">
        <p className="case-study-eyebrow">{eyebrow}</p>
        <Heading level={2} as="h2">
          {heading}
        </Heading>
      </header>

      <div className="case-study-beats">
        <CaseStudyBeat
          number="01"
          heading={client.heading}
          body={client.body}
        />
        <CaseStudyBeat number="02" heading={work.heading} body={work.body}>
          <ul className="case-study-work-items">
            {work.items.map((item) => (
              <li key={item} className="case-study-work-item">
                <span
                  className="case-study-work-item-mark"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CaseStudyBeat>
        <CaseStudyBeat
          number="03"
          heading={collaboration.heading}
          body={collaboration.body}
        />
        <CaseStudyBeat
          number="04"
          heading={result.heading}
          body={result.body}
        />
      </div>

      {screenshots && screenshots.length > 0 && (
        <div className="case-study-screenshots">
          {screenshots.map((screenshot) => (
            <Image
              key={screenshot.src}
              src={screenshot.src}
              alt={screenshot.alt}
              width={800}
              height={500}
              className="case-study-screenshot"
            />
          ))}
        </div>
      )}

      <div className="case-study-contact">
        <Heading level={3} as="h3">
          {contact.heading}
        </Heading>
        <Text size="lg" className="case-study-contact-body">
          {contact.body}
        </Text>
        <LinkButton href={ctaHref} variant="primary" size="lg" surface="accent">
          {contact.cta}
        </LinkButton>
      </div>
    </div>
  );
}

/** A numbered narrative beat: marker, heading, body and optional children. */
function CaseStudyBeat({
  number,
  heading,
  body,
  children,
}: CaseStudyBeat & {
  number: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="case-study-beat">
      <span className="case-study-beat-number" aria-hidden="true">
        {number}
      </span>
      <Heading level={3} as="h3">
        {heading}
      </Heading>
      <Text className="case-study-beat-body">{body}</Text>
      {children}
    </article>
  );
}
