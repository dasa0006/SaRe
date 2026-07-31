import { cn } from "@/lib/utils";
import { Heading } from "@/components/ui/heading/Heading";
import { Text } from "@/components/ui/text/Text";
import { Image } from "@/components/ui/image/Image";
import type { TrustSignalsProps } from "./TrustSignals.types";

/**
 * TrustSignals block — a "Trusted by" heading followed by client
 * name/descriptor pairs in a compact, side-by-side logo wall.
 *
 * Renders each client's logo when `logoUrl` is provided and falls back to a
 * wordmark name plus one-line descriptor otherwise. Composes Heading, Text,
 * and Image primitives. Designed to be wrapped in a `<Section>` that owns
 * the background surface and spacing.
 */
export function TrustSignals({
  className,
  heading,
  clients,
  surface = "white",
}: TrustSignalsProps) {
  return (
    <div className={cn("trust-signals", className)} data-surface={surface}>
      <Heading level={2} className="trust-signals-heading">
        {heading}
      </Heading>

      <ul className="trust-signals-list">
        {clients.map((client) => (
          <li key={client.name} className="trust-signals-item">
            {client.logoUrl ? (
              <Image
                src={client.logoUrl}
                alt={client.name}
                width={96}
                height={32}
                className="trust-signals-logo"
              />
            ) : (
              <span className="trust-signals-name">{client.name}</span>
            )}
            <Text size="sm" className="trust-signals-descriptor">
              {client.descriptor}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
}
