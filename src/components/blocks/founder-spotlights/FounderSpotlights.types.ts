import type { Surface } from "@/lib/config/navigation";

/** A single founder rendered as an individual text spotlight. */
export interface Founder {
  /** Founder name, e.g. "Daniel Saleh". */
  name: string;
  /** One-liner describing the founder's role. */
  role: string;
  /** 2–3 sentence background story. */
  background: string;
}

export interface FounderSpotlightsProps {
  /** Additional CSS class names. */
  className?: string;
  /** Heading above the founder spotlights, e.g. "The founders". */
  heading: string;
  /** The founders, each rendered as an individual text spotlight. */
  founders: Founder[];
  /** The background surface this block sits on, for Section context. */
  surface?: Surface;
}
