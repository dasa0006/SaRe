import type { ComponentType } from "react";
import {
  Check,
  FileSpreadsheet,
  Languages,
  RefreshCcw,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  StandardServicesProps,
  StandardService,
} from "./StandardServices.types";

/**
 * StandardServices block — the four uniform service sections below the
 * WebDevelopmentLead hero on the Services page (issue #70).
 *
 * Editorial-bands treatment (validated via UI prototype, issue #70,
 * Variant A): each service is a full-width horizontal band, copy on the left
 * (icon tile, eyebrow, heading, problem-first paragraph), price and feature
 * bullets on the right. Bands alternate subtle / white surfaces so the page
 * reads as one long editorial rhythm; the Excel section carries the shorter
 * treatment (fewer bullets). Designed to be wrapped in a `<Section>` that
 * owns the outer spacing.
 */
export function StandardServices({
  className,
  items,
  priceNote,
}: StandardServicesProps) {
  return (
    <div className={cn("standard-services", className)}>
      {items.map((service, index) => (
        <StandardServicesBand
          key={service.id}
          service={service}
          priceNote={priceNote}
          band={index % 2 === 0 ? "subtle" : "white"}
        />
      ))}
    </div>
  );
}

const SERVICE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  modernising: RefreshCcw,
  responsiveness: Smartphone,
  language: Languages,
  excel: FileSpreadsheet,
};

function StandardServicesBand({
  service,
  priceNote,
  band,
}: {
  service: StandardService;
  priceNote: string;
  band: "subtle" | "white";
}) {
  const Icon = SERVICE_ICONS[service.id];

  return (
    <div
      className={cn(
        "standard-services-band",
        band === "subtle"
          ? "standard-services-band-subtle"
          : "standard-services-band-white"
      )}
    >
      <div className="standard-services-copy">
        {Icon && (
          <span className="standard-services-icon">
            <Icon className="standard-services-icon-glyph" aria-hidden="true" />
          </span>
        )}
        <p className="standard-services-eyebrow">{service.eyebrow}</p>
        <h3 className="standard-services-heading">{service.heading}</h3>
        <p className="standard-services-problem">{service.problem}</p>
      </div>

      <div className="standard-services-card">
        <span className="standard-services-price-note">{priceNote}</span>
        <span className="standard-services-price">{service.price}</span>
        <ul className="standard-services-features">
          {service.features.map((feature) => (
            <li key={feature} className="standard-services-feature">
              <Check
                className="standard-services-feature-check"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
