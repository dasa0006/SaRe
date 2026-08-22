"use client";

/**
 * PROTOTYPE — dev-only homepage preview (wayfinder #115).
 *
 * Renders the approved composition, Variant B "Blueprint grid": split
 * hero over a blueprint-grid device with mono kickers, dark grain trust
 * band, three accent-border service columns, full-bleed teal CTA.
 * Variants A/C and the switcher were pruned after the review.
 *
 * Still carries ADR-0004's palette locally via `.proto-tokens` (see
 * HomePrototype.css) — landing the real token layer + DM Serif Display
 * is prerequisite work inside #116. Rendered only outside production
 * builds; production keeps the shipped Index. See src/app/[locale]/page.tsx.
 */

import { DM_Serif_Display } from "next/font/google";
import VariantBlueprint from "./VariantBlueprint";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-proto-display",
});

export default function HomePrototype() {
  return (
    <div className={`${dmSerif.variable} proto-tokens`}>
      <VariantBlueprint />
    </div>
  );
}
