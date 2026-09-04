import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import Contact from "./Contact";

import baseEn from "@/../messages/base/en.json";
import customEn from "@/../messages/custom/en.json";
import baseDa from "@/../messages/base/da.json";
import customDa from "@/../messages/custom/da.json";

const enMessages = { ...baseEn, ...customEn };
const daMessages = { ...baseDa, ...customDa };

function renderContact(locale: "en" | "da") {
  const messages = locale === "en" ? enMessages : daMessages;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Contact />
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

describe("Contact page composition", () => {
  it("composes intro (white) then form (subtle) — the two #92 sections", () => {
    renderContact("en");

    const introHeading = screen.getByRole("heading", { name: "Get in touch." });
    expect(surfaceOf(introHeading)).toBe("section-surface-white");

    const nameInput = screen.getByLabelText("Name");
    expect(surfaceOf(nameInput)).toBe("section-surface-subtle");
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders the three intro lines (warm, owners echo, response time)", () => {
    renderContact("en");

    expect(
      screen.getByText(/A new build, a modernisation, or just a question/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /There's no middleman: the person who reads your message/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("We reply within 1–2 business days.")
    ).toBeInTheDocument();
  });

  it("renders the 'Prefer email?' fallback with the address as link text", () => {
    renderContact("en");

    const fallback = screen.getByText(/Prefer email\?/);
    const link = fallback.querySelector("a");
    expect(link).toHaveAttribute("href", "mailto:gustav@example.com");
    expect(link).toHaveTextContent("gustav@example.com");
  });

  it("no longer renders the WipGraphic takeover (ADR-0005)", () => {
    renderContact("en");

    // WipGraphic renders the brand name in its scroll items — gone means
    // the page ends at the intro + form composition.
    expect(screen.queryAllByText("SaRe", { exact: true })).toHaveLength(0);
  });

  it("renders both sections in Danish with the same structure", () => {
    renderContact("da");

    expect(
      screen.getByRole("heading", { name: "Kom i kontakt." })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/En ny byg, en modernisering eller bare et spørgsmål/)
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Navn")).toBeInTheDocument();
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByLabelText("Besked")).toBeInTheDocument();

    const fallback = screen.getByText(/Foretrækker du e-mail\?/);
    const link = fallback.querySelector("a");
    expect(link).toHaveAttribute("href", "mailto:gustav@example.com");
  });
});
