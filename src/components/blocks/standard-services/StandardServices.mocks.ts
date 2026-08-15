import type { StandardServicesProps } from "./StandardServices.types";

export const mockStandardServicesProps: StandardServicesProps = {
  priceNote: "Starting from",
  items: [
    {
      id: "modernising",
      eyebrow: "Modernising",
      heading: "A fresh start for a tired website.",
      problem:
        "Your current website is slow, dated and hard to update — and it is quietly costing you visitors.",
      features: [
        "Faster load times on every device",
        "A design that looks current, not tired",
        "An editor you can actually use",
        "No lost SEO, ranking or content",
      ],
      price: "12,000 DKK",
    },
    {
      id: "responsiveness",
      eyebrow: "Responsiveness",
      heading: "Beautiful on a laptop. Perfect on a phone.",
      problem:
        "Your site looks great on a desktop but falls apart the moment a customer opens it on a phone.",
      features: [
        "Flawless on phone, tablet and desktop",
        "Faster pages on mobile connections",
        "Touch targets sized for real thumbs",
        "Tested on real devices, not just emulators",
      ],
      price: "8,000 DKK",
    },
    {
      id: "language",
      eyebrow: "Language copy",
      heading: "Say it in your customer's language.",
      problem:
        "Your Danish website speaks English to your customers — or your English site mangles the Danish. Either way, it costs trust.",
      features: [
        "Native, human translation — never machine text",
        "Consistent tone and voice across the whole site",
        "Correct local formats and conventions",
        "Both languages stay in sync as you edit",
      ],
      price: "5,000 DKK",
    },
    {
      id: "excel",
      eyebrow: "Excel workbooks",
      heading: "Workbooks that do the work for you.",
      problem:
        "Your business runs on Excel — but the workbooks are fragile, error-prone and hard to hand over.",
      features: [
        "Automated, error-free calculations",
        "Clear structure anyone can maintain",
      ],
      price: "6,000 DKK",
    },
  ],
};
