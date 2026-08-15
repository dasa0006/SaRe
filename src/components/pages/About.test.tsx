import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import About from "./About";

// next-intl's createNavigation Link pulls in next/navigation, which is not
// available in the jsdom unit environment. Replace it with a plain anchor so
// composition (order, surfaces, hrefs) is exercised at the page seam.
vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import baseEn from "@/../messages/base/en.json";
import customEn from "@/../messages/custom/en.json";
import baseDa from "@/../messages/base/da.json";
import customDa from "@/../messages/custom/da.json";

const enMessages = { ...baseEn, ...customEn };
const daMessages = { ...baseDa, ...customDa };

function renderAbout(locale: "en" | "da") {
  const messages = locale === "en" ? enMessages : daMessages;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <About />
    </NextIntlClientProvider>
  );
}

/** The `<section>` surface class that wraps the given element. */
function surfaceOf(el: HTMLElement): string | null {
  const section = el.closest("section");
  return section
    ? (Array.from(section.classList).find((c) =>
        c.startsWith("section-surface-")
      ) ?? null)
    : null;
}

describe("About page composition", () => {
  it("composes the five sections in the confirmed order (#17)", () => {
    renderAbout("en");

    const headings = screen.getAllByRole("heading");
    // Intro (h2), Founders (h2), founder names (h3 × 2), HowWeWork (h2),
    // how-we-work features (h3 × 4), Values (h2), values (h3 × 3), CTA (h2)
    expect(headings.map((h) => h.textContent)).toEqual([
      "We are SaRe.",
      "The founders",
      "Daniel Saleh",
      "Gustav Reumert",
      "How we work",
      "Direct lines",
      "Honest assessments",
      "Small team, short lines",
      "Clear scope",
      "What we value",
      "Plain-spoken",
      "Long-term relationships",
      "Substance over hype",
      "Let's talk about your website.",
    ]);
  });

  it("wraps each block in the confirmed Section surface order", () => {
    renderAbout("en");

    expect(
      surfaceOf(screen.getByRole("heading", { name: "We are SaRe." }))
    ).toBe("section-surface-white");

    expect(
      surfaceOf(screen.getByRole("heading", { name: "The founders" }))
    ).toBe("section-surface-subtle");

    expect(
      surfaceOf(screen.getByRole("heading", { name: "How we work" }))
    ).toBe("section-surface-white");

    expect(
      surfaceOf(screen.getByRole("heading", { name: "What we value" }))
    ).toBe("section-surface-dark");

    expect(
      surfaceOf(
        screen.getByRole("heading", { name: "Let's talk about your website." })
      )
    ).toBe("section-surface-accent");
  });

  it("renders both founders with role and background", () => {
    renderAbout("en");

    expect(screen.getByText("Daniel Saleh")).toBeInTheDocument();
    expect(
      screen.getByText(/Co-founder — builds and maintains the websites\./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/He has built, modernised and maintained websites/)
    ).toBeInTheDocument();

    expect(screen.getByText("Gustav Reumert")).toBeInTheDocument();
    expect(
      screen.getByText(/Co-founder — makes sure the details are right\./)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/He has written and translated website copy/)
    ).toBeInTheDocument();
  });

  it("renders the four how-we-work features", () => {
    renderAbout("en");

    expect(screen.getByText("Direct lines")).toBeInTheDocument();
    expect(screen.getByText("Honest assessments")).toBeInTheDocument();
    expect(screen.getByText("Small team, short lines")).toBeInTheDocument();
    expect(screen.getByText("Clear scope")).toBeInTheDocument();
  });

  it("renders the three values", () => {
    renderAbout("en");

    expect(screen.getByText("Plain-spoken")).toBeInTheDocument();
    expect(screen.getByText("Long-term relationships")).toBeInTheDocument();
    expect(screen.getByText("Substance over hype")).toBeInTheDocument();
  });

  it("renders the proof line and links it to the Improve Invest story on Services", () => {
    renderAbout("en");

    const proofLink = screen.getByRole("link", {
      name: "Read the full story on our Services page",
    });
    expect(proofLink).toHaveAttribute("href", "/services#improve-invest");

    expect(
      screen.getByText(/We spent a year rebuilding one client's website/)
    ).toBeInTheDocument();
  });

  it("points CTA primary action to Contact and secondary to Services (inverted from Home)", () => {
    renderAbout("en");

    const cta = screen
      .getByRole("heading", { name: "Let's talk about your website." })
      .closest("section") as HTMLElement;

    const primary = within(cta).getByRole("link", { name: "Get in touch" });
    const secondary = within(cta).getByRole("link", {
      name: "Explore our services",
    });

    expect(primary).toHaveAttribute("href", "/contact");
    expect(secondary).toHaveAttribute("href", "/services");
  });

  it("renders all five sections in Danish", () => {
    renderAbout("da");

    expect(
      screen.getByRole("heading", { name: "Vi er SaRe." })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Grundlæggerne" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Sådan arbejder vi" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Det, vi vægter" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Lad os tale om din hjemmeside." })
    ).toBeInTheDocument();

    expect(screen.getByText("Daniel Saleh")).toBeInTheDocument();
    expect(screen.getByText("Gustav Reumert")).toBeInTheDocument();

    const proofLink = screen.getByRole("link", {
      name: "Læs hele historien på vores Services-side",
    });
    expect(proofLink).toHaveAttribute("href", "/services#improve-invest");

    const cta = screen
      .getByRole("heading", { name: "Lad os tale om din hjemmeside." })
      .closest("section") as HTMLElement;

    const primary = within(cta).getByRole("link", { name: "Kontakt os" });
    const secondary = within(cta).getByRole("link", {
      name: "Se vores services",
    });
    expect(primary).toHaveAttribute("href", "/contact");
    expect(secondary).toHaveAttribute("href", "/services");
  });
});
