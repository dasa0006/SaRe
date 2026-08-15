import type { LucideIcon } from "lucide-react";
import type { Surface } from "@/lib/config/navigation";

/** The web-development service section — hero-style lead on the Services page. */
export interface WebDevelopmentLeadProps {
  /** Additional CSS class names. */
  className?: string;
  /** Small label above the heading, e.g. "Web development". */
  eyebrow: string;
  /** Main headline. */
  heading: string;
  /** Problem-first supporting paragraph. */
  problem: string;
  /** Feature bullets. */
  features: string[];
  /** Starting-price indicator, e.g. "From 20,000 DKK". */
  price: string;
  /** Small label above the price, e.g. "Starting from". */
  priceNote: string;
  /** Primary CTA label. */
  cta: string;
  /** Primary CTA destination (locale-relative route). */
  ctaHref: string;
  /** Lucide icon shown in the lead rail. Defaults to a code glyph in the block. */
  icon?: LucideIcon;
  /** The background surface this block sits on, for LinkButton adaptation. */
  surface?: Surface;
}
