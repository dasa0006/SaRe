import { Code2, RefreshCw, ShieldCheck } from "lucide-react";
import { SERVICES } from "@/lib/config/routes";
import type {
  ServicesPreviewProps,
  ServiceTeaser,
} from "./ServicesPreview.types";

const mockServices: ServiceTeaser[] = [
  {
    icon: Code2,
    problem: "You have an idea but no website to show for it.",
    solution: "We design and build it from scratch — fast, clean, and yours.",
    link: SERVICES,
  },
  {
    icon: RefreshCw,
    problem: "Your current site is slow, dated, and hard to update.",
    solution: "We modernise it without losing what already works.",
    link: SERVICES,
  },
  {
    icon: ShieldCheck,
    problem: "A website isn't finished on launch day.",
    solution: "A subscription keeps it healthy, secure, and current.",
    link: SERVICES,
  },
];

export const mockServicesPreviewProps: ServicesPreviewProps = {
  heading: "How we can help",
  services: mockServices,
  surface: "white",
};

/** Same block rendered across every Section surface. */
export const mockServicesPreviewSurfaces: ServicesPreviewProps[] = [
  { ...mockServicesPreviewProps, surface: "white" },
  { ...mockServicesPreviewProps, surface: "subtle" },
  { ...mockServicesPreviewProps, surface: "dark" },
  { ...mockServicesPreviewProps, surface: "accent" },
];
