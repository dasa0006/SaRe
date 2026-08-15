import type { Surface } from "@/lib/config/navigation";

/**
 * A single screenshot slot in the case-study section.
 *
 * Screenshots are optional (asset-agnostic design, issue #68): the section
 * renders complete with zero screenshots and only renders these slots when
 * approved screenshots become available. Alt text is supplied by the caller
 * (sourced from messages) so the block never hardcodes copy.
 */
export interface CaseStudyScreenshot {
  /** Image source (locale-relative path under /public or remote URL). */
  src: string;
  /** Accessible description of the screenshot. */
  alt: string;
}

/** One narrative beat of the case study: heading + body copy. */
export interface CaseStudyBeat {
  heading: string;
  body: string;
}

/** The "what we did" beat — adds the concrete receipts list. */
export interface CaseStudyWorkBeat extends CaseStudyBeat {
  /** Concrete receipts, rendered as a bulleted list. */
  items: string[];
}

/**
 * The closing trust section of the Services page (issue #75) — a single hero
 * case (Improve Invest) presented as the 5-beat narrative (Shape A) from the
 * format & inventory decision (#15):
 *
 * 1. The client & the problem
 * 2. What we did (concrete receipts)
 * 3. Working together
 * 4. The result
 * 5. Service-agnostic contact CTA
 *
 * All copy arrives via props from the `CaseStudy` message namespace — no
 * hardcoded strings. Screenshots are optional and gracefully absent when
 * empty. Designed to be wrapped in a `<Section>` that owns the background
 * surface and spacing.
 */
export interface CaseStudyProps {
  /** Additional CSS class names. */
  className?: string;
  /** Small label above the section heading, e.g. "Case study". */
  eyebrow: string;
  /** Section headline. */
  heading: string;
  /** Beat 1 — the client & the problem. */
  client: CaseStudyBeat;
  /** Beat 2 — what we did, with concrete receipts. */
  work: CaseStudyWorkBeat;
  /** Beat 3 — how we worked together. */
  collaboration: CaseStudyBeat;
  /** Beat 4 — the result. */
  result: CaseStudyBeat;
  /** Beat 5 — the closing, service-agnostic contact CTA. */
  contact: CaseStudyBeat & { cta: string };
  /** Contact CTA destination (locale-relative route). */
  ctaHref: string;
  /** Optional approved screenshots — rendered only when non-empty. */
  screenshots?: CaseStudyScreenshot[];
  /** The background surface this block sits on, for text adaptation. */
  surface?: Surface;
}
