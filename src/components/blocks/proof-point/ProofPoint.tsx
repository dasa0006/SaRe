import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import type { ProofPointProps } from "./ProofPoint.types";

/**
 * ProofPoint block — a one-line proof statement with a link to the full
 * story behind it.
 *
 * Renders a short claim (e.g. a case-study pointer) followed by an explicit
 * link to the source. Composes the Link primitive. Designed to be wrapped in
 * a `<Section>` that owns the background surface and spacing.
 */
export function ProofPoint({
  className,
  content,
  linkLabel,
  href,
  surface = "white",
}: ProofPointProps) {
  return (
    <div className={cn("proof-point", className)} data-surface={surface}>
      <p className="proof-point-content">{content}</p>
      <Link href={href} className="proof-point-link">
        {linkLabel}
        <ArrowRight className="proof-point-link-arrow" aria-hidden="true" />
      </Link>
    </div>
  );
}
