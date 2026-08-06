import { CONTACT } from "@/lib/config/routes";
import type { WebDevelopmentLeadProps } from "./WebDevelopmentLead.types";

export const mockWebDevelopmentLeadProps: WebDevelopmentLeadProps = {
  eyebrow: "Web development",
  heading: "A website your business can be proud of.",
  problem:
    "You have a good idea — but no website to show it off, or the one you have doesn't do you justice.",
  features: [
    "Built from scratch, no templates",
    "Fast, secure and search-ready",
    "Easy for you to update",
    "Clear deliverables and timelines",
  ],
  price: "From 20,000 DKK",
  priceNote: "Starting from",
  cta: "Start a project",
  ctaHref: CONTACT,
  surface: "white",
};

/** Same block rendered across every Section surface. */
export const mockWebDevelopmentLeadSurfaces: WebDevelopmentLeadProps[] = [
  { ...mockWebDevelopmentLeadProps, surface: "white" },
  { ...mockWebDevelopmentLeadProps, surface: "subtle" },
  { ...mockWebDevelopmentLeadProps, surface: "dark" },
  { ...mockWebDevelopmentLeadProps, surface: "accent" },
];
