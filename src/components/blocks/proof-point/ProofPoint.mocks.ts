import type { ProofPointProps } from "./ProofPoint.types";

export const mockProofPointProps: ProofPointProps = {
  content:
    "We spent a year rebuilding one client's website from scratch — and we still maintain it today.",
  linkLabel: "Read the full story",
  href: "/services#improve-invest",
  surface: "accent",
};

/** Same block rendered across every Section surface. */
export const mockProofPointSurfaces: ProofPointProps[] = [
  { ...mockProofPointProps, surface: "white" },
  { ...mockProofPointProps, surface: "subtle" },
  { ...mockProofPointProps, surface: "dark" },
  { ...mockProofPointProps, surface: "accent" },
];
