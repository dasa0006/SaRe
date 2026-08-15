import { CONTACT } from "@/lib/config/routes";
import type { CaseStudyProps, CaseStudyScreenshot } from "./CaseStudy.types";

/** Data-URI SVG placeholder used while no approved screenshots exist. */
const placeholderScreenshot = (label: string): CaseStudyScreenshot => ({
  src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500' viewBox='0 0 800 500'><rect fill='%23eee' width='800' height='500'/><text x='400' y='270' font-family='sans-serif' font-size='28' fill='%23666' text-anchor='middle'>${label}</text></svg>`
  )}`,
  alt: `${label} — placeholder screenshot`,
});

/** Mock props mirroring the `CaseStudy` message namespace (EN). */
export const mockCaseStudyProps: CaseStudyProps = {
  eyebrow: "Case study",
  heading:
    "One year. One client. From a tired WordPress site to a site that's still running.",
  client: {
    heading: "The client and the problem",
    body: "Improve Invest is a property fund that transforms older buildings. When they came to us, their website had been built in WordPress years earlier — and it showed. It was slow, hard to update, and it didn't look like the serious investment company they are.",
  },
  work: {
    heading: "What we did",
    body: "We started from scratch and kept going for a year, in close dialogue with the client.",
    items: [
      "A new website built from scratch in Next.js — no templates, no WordPress baggage",
      "The site went from Danish-only to Danish, German and English",
      "Responsiveness fixed on every device, tested on real phones and tablets",
      "A full redesign with animations and clickable prototypes we refined together",
      "Their client-facing Excel workbook made presentable: front page, colour, clickable interface",
    ],
  },
  collaboration: {
    heading: "How we worked together",
    body: "For a year we worked as their team, not just their supplier. We met regularly, showed prototypes, listened and adjusted. No account managers in between — when they wrote, we answered. By the end, we knew their business well enough to suggest the next move ourselves.",
  },
  result: {
    heading: "The result",
    body: "A fast, modern website in three languages that looks the way the company is: professional. Still live, still maintained, still evolving. That's what a year of working together looks like.",
  },
  contact: {
    heading: "Would you like the same for your website?",
    body: "Tell us where your website stands today. We'll give you an honest assessment of what's worth doing — whether that's a new build, a modernisation or a better language.",
    cta: "Tell us about your project",
  },
  ctaHref: CONTACT,
  surface: "white",
};

/** Approved screenshots (mock placeholders) — the asset-agnostic upgrade path. */
export const mockCaseStudyScreenshots: CaseStudyScreenshot[] = [
  placeholderScreenshot("Improve Invest — homepage"),
  placeholderScreenshot("Improve Invest — Excel workbook"),
];

/** Same block rendered across every Section surface. */
export const mockCaseStudySurfaces: CaseStudyProps[] = [
  { ...mockCaseStudyProps, surface: "white" },
  { ...mockCaseStudyProps, surface: "subtle" },
  { ...mockCaseStudyProps, surface: "dark" },
  { ...mockCaseStudyProps, surface: "accent" },
];
