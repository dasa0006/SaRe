import type { Surface } from "@/lib/config/navigation";

export interface ProofPointProps {
  /** Additional CSS class names. */
  className?: string;
  /** Proof statement — a short claim pointing at real work. */
  content: string;
  /** Label of the link to the full proof, e.g. a case-study story. */
  linkLabel: string;
  /** Destination of the link. */
  href: string;
  /** The background surface this block sits on, for Section context. */
  surface?: Surface;
}
