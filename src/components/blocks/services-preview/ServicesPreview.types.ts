import type { LucideIcon } from "lucide-react";
import type { Surface } from "@/lib/config/navigation";

/** A single service teaser rendered in the ServicesPreview block. */
export interface ServiceTeaser {
  /** Lucide icon component for the service. */
  icon: LucideIcon;
  /** Problem hook — the pain point the service solves. */
  problem: string;
  /** Solution one-liner — what the service delivers. */
  solution: string;
  /** Link to the full service description on the Services page. */
  link: string;
}

export interface ServicesPreviewProps {
  /** Additional CSS class names. */
  className?: string;
  /** Heading above the service teasers, e.g. "How we can help". */
  heading: string;
  /** The link label shown on each teaser, e.g. "See how". */
  linkLabel: string;
  /** The featured services (intended to be 3). */
  services: ServiceTeaser[];
  /** The background surface this block sits on, for Section context. */
  surface?: Surface;
}
