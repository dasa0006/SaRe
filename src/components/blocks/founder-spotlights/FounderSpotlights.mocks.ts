import type {
  Founder,
  FounderSpotlightsProps,
} from "./FounderSpotlights.types";

const mockFounders: Founder[] = [
  {
    name: "Daniel Saleh",
    role: "Co-founder — builds and maintains the websites.",
    background:
      "Daniel is the one who does the building. He has built, modernised and maintained websites for businesses for years — and he cares about what happens after launch.",
  },
  {
    name: "Gustav Reumert",
    role: "Co-founder — makes sure the details are right.",
    background:
      "Gustav is the one who makes sure the details are right — the language, the design, the way it all fits together. He has written and translated website copy for Danish and international businesses.",
  },
];

export const mockFounderSpotlightsProps: FounderSpotlightsProps = {
  heading: "The founders",
  founders: mockFounders,
  surface: "subtle",
};

/** Same block rendered across every Section surface. */
export const mockFounderSpotlightsSurfaces: FounderSpotlightsProps[] = [
  { ...mockFounderSpotlightsProps, surface: "white" },
  { ...mockFounderSpotlightsProps, surface: "subtle" },
  { ...mockFounderSpotlightsProps, surface: "dark" },
  { ...mockFounderSpotlightsProps, surface: "accent" },
];
