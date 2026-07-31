import type { Surface } from "@/lib/config/navigation";

/** A single client displayed in the trust-signals block. */
export interface TrustSignalClient {
  /** Client name — used as the text-only wordmark fallback when no logo exists. */
  name: string;
  /** One-line descriptor shown alongside the name in text-only mode. */
  descriptor: string;
  /** Optional logo image. When present it replaces the wordmark name. */
  logoUrl?: string;
}

export interface TrustSignalsProps {
  /** Additional CSS class names. */
  className?: string;
  /** Heading shown above the client list, e.g. "Trusted by". */
  heading: string;
  /** Client name/descriptor pairs. */
  clients: TrustSignalClient[];
  /** The background surface this block sits on, for Section context. */
  surface?: Surface;
}
