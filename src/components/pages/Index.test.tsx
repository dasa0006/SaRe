import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import Index from "./Index";

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

function renderIndex(locale: "en" | "da") {
  const messages = locale === "en" ? enMessages : daMessages;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Index />
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

describe("Index page composition", () => {
  it("composes Hero, Trust, Services, and CTA in order", () => {
    renderIndex("en");

    // Hero (h1), Trust (kicker), Services (h2), CTA (h2)
    // Service teasers have h3 headings; filter for section-level headings (h1, h2)
    const sectionHeadings = screen
      .getAllByRole("heading")
      .filter((h) => h.tagName === "H1" || h.tagName === "H2");
    expect(sectionHeadings.map((h) => h.textContent)).toEqual([
      "Work directly with the owners.",
      "How we can help",
      "Ready to work directly with the owners?",
    ]);

    // Trust kicker is a span, not a heading
    expect(screen.getByText("Trusted by")).toBeInTheDocument();
  });

  it("wraps each block in the confirmed Section surface order", () => {
    renderIndex("en");

    expect(
      surfaceOf(
        screen.getByRole("heading", { name: "Work directly with the owners." })
      )
    ).toBe("section-surface-white");

    // Trust section uses dark surface; kicker is inside it
    expect(surfaceOf(screen.getByText("Trusted by"))).toBe(
      "section-surface-dark"
    );

    expect(
      surfaceOf(screen.getByRole("heading", { name: "How we can help" }))
    ).toBe("section-surface-subtle");

    expect(
      surfaceOf(
        screen.getByRole("heading", {
          name: "Ready to work directly with the owners?",
        })
      )
    ).toBe("section-surface-accent");
  });

  it("points Hero primary CTA to Services and secondary CTA to Contact", () => {
    renderIndex("en");

    const hero = screen
      .getByRole("heading", { name: "Work directly with the owners." })
      .closest("section") as HTMLElement;

    const heroPrimary = within(hero).getByRole("link", {
      name: "Explore our services",
    });
    const heroSecondary = within(hero).getByRole("link", {
      name: "Get in touch",
    });

    expect(heroPrimary).toHaveAttribute("href", "/services");
    expect(heroSecondary).toHaveAttribute("href", "/contact");
  });

  it("points CTA primary action to Services and secondary to Contact", () => {
    renderIndex("en");

    const cta = screen
      .getByRole("heading", { name: "Ready to work directly with the owners?" })
      .closest("section") as HTMLElement;

    const primary = within(cta).getByRole("link", {
      name: "Explore our services",
    });
    const secondary = within(cta).getByRole("link", { name: "Get in touch" });

    expect(primary).toHaveAttribute("href", "/services");
    expect(secondary).toHaveAttribute("href", "/contact");
  });

  it("renders Trust clients with descriptors", () => {
    renderIndex("en");

    expect(screen.getByText("Improve Invest")).toBeInTheDocument();
    // Descriptor text is split across elements; match flexibly
    expect(screen.getByText(/Adaptive Reuse/)).toBeInTheDocument();
    expect(screen.getByText(/Value-Add Property Fund/)).toBeInTheDocument();
    expect(screen.getByText("Tani Mous Studios")).toBeInTheDocument();
    expect(screen.getByText(/Digital Marketing Agency/)).toBeInTheDocument();
  });

  it("renders three Services teasers and a single See how link", () => {
    renderIndex("en");

    expect(screen.getByText("How we can help")).toBeInTheDocument();
    expect(
      screen.getByText("You have a good idea, but no website to show for it.")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Your current website is slow, dated and hard to update."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("A website is never really finished on launch day.")
    ).toBeInTheDocument();

    // Single "See how" link at section bottom
    const seeHowLink = screen.getByRole("link", { name: /See how/ });
    expect(seeHowLink).toHaveAttribute("href", "/services");
  });

  it("renders all four blocks in Danish", () => {
    renderIndex("da");

    expect(
      screen.getByRole("heading", { name: "Du arbejder direkte med ejerne." })
    ).toBeInTheDocument();

    // Trust kicker is a span, not a heading
    expect(screen.getByText("Samarbejdspartnere")).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Sådan kan vi hjælpe" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Klar til at arbejde direkte med ejerne?",
      })
    ).toBeInTheDocument();

    // Single "Se hvordan" link at section bottom
    const seeHowLink = screen.getByRole("link", { name: "Se hvordan" });
    expect(seeHowLink).toHaveAttribute("href", "/services");

    const hero = screen
      .getByRole("heading", {
        name: "Du arbejder direkte med ejerne.",
      })
      .closest("section") as HTMLElement;

    const heroPrimary = within(hero).getByRole("link", {
      name: "Se vores services",
    });
    const heroSecondary = within(hero).getByRole("link", {
      name: "Kontakt os",
    });
    expect(heroPrimary).toHaveAttribute("href", "/services");
    expect(heroSecondary).toHaveAttribute("href", "/contact");
  });
});
