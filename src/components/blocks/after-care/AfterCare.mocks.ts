import { CONTACT } from "@/lib/config/routes";
import type { AfterCareProps } from "./AfterCare.types";

/** Mock props mirroring the `AfterCare` message namespace (EN). */
export const mockAfterCareProps: AfterCareProps = {
  eyebrow: "After-care",
  badge: "Subscription",
  heading: "Your website is never really finished.",
  problem:
    "Launch day isn't the end. Things change — new text, new pages, new ideas. After-care is a running plan that keeps your site healthy, secure and fast — from 350 DKK a month, with services you add as your needs grow.",
  features: [
    "Security — vulnerability scanning, patches and dependency updates (from 350 DKK/month)",
    "Support — troubleshooting, urgent fixes and deployment help",
    "Active optimisation — performance, structure, design and UX",
    "Content changes within your existing structure",
    "Monthly reporting — performance, security status and uptime",
    "Uptime monitoring with automatic downtime alerts",
  ],
  price: "From 350 DKK",
  priceNote: "per month",
  cta: "Build your own plan",
  ctaHref: CONTACT,
  surface: "subtle",
};

/** Same block rendered across every Section surface. */
export const mockAfterCareSurfaces: AfterCareProps[] = [
  { ...mockAfterCareProps, surface: "white" },
  { ...mockAfterCareProps, surface: "subtle" },
  { ...mockAfterCareProps, surface: "dark" },
  { ...mockAfterCareProps, surface: "accent" },
];
