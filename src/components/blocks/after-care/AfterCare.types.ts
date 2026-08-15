import type { LucideIcon } from "lucide-react";
import type { Surface } from "@/lib/config/navigation";

/**
 * The after-care recurring-subscription tier — the final, visually distinct
 * pricing-card tier on the Services page (issue #73).
 *
 * Mirrors the WebDevelopmentLead rails (copy left, price card right) with a
 * "subscription" badge pinned to an accent-bordered card, per decision #7
 * (after-care is the recurring tier, ordered last, visually distinct).
 */
export interface AfterCareProps {
  /** Additional CSS class names. */
  className?: string;
  /** Small label above the heading, e.g. "After-care". */
  eyebrow: string;
  /** Subscription badge label, e.g. "Subscription". */
  badge: string;
  /** Main headline. */
  heading: string;
  /** Problem-first supporting paragraph. */
  problem: string;
  /** Un-priced add-on feature bullets. */
  features: string[];
  /** Base monthly price indicator, e.g. "From 350 DKK". */
  price: string;
  /** Small label above the price, e.g. "per month". */
  priceNote: string;
  /** Primary CTA label. */
  cta: string;
  /** Primary CTA destination (locale-relative route). */
  ctaHref: string;
  /** Lucide icon shown in the copy rail. Defaults to a shield glyph in the block. */
  icon?: LucideIcon;
  /** The background surface this block sits on, for LinkButton adaptation. */
  surface?: Surface;
}
