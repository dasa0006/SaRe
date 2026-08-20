import { test, expect } from "@playwright/test";

/**
 * Contact page (#94) — intro + form composition, client-side validation, and
 * the mailto fallback. Covers the parts of the page that don't require live
 * SMTP credentials; the send path is covered by unit tests (Gustav's Gmail
 * app password is generated before manual end-to-end testing).
 */
test.describe("Contact page", () => {
  test("renders the intro and form sections with the mailto fallback (EN)", async ({
    page,
  }) => {
    await page.goto("/contact");

    const main = page.getByRole("main");

    // Intro section (surface white) — heading + the three lines
    await expect(
      main.getByRole("heading", { level: 2, name: "Get in touch." })
    ).toBeVisible();
    await expect(
      main.getByText(/We reply within 1–2 business days\./)
    ).toBeVisible();

    // Form section (surface subtle) — the three #6-binding fields
    await expect(main.getByLabel("Name")).toBeVisible();
    await expect(main.getByLabel("Email")).toBeVisible();
    await expect(main.getByLabel("Message")).toBeVisible();

    // "Prefer email?" fallback with the address as link text
    const fallback = main.getByText(/Prefer email\?/);
    await expect(fallback).toBeVisible();
    await expect(fallback.getByRole("link")).toHaveAttribute(
      "href",
      "mailto:gustav@example.com"
    );

    // The WipGraphic full-page takeover is gone (ADR-0005)
    await expect(main.locator("ul.animate-scroll-up")).toHaveCount(0);
  });

  test("validates client-side without submitting when the form is empty", async ({
    page,
  }) => {
    await page.goto("/en/contact");

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Please enter your name.")).toBeVisible();
    await expect(
      page.getByText("Please enter a valid email address.")
    ).toBeVisible();
    await expect(page.getByText("Please enter your message.")).toBeVisible();
  });

  test("renders the page in Danish with the same structure", async ({
    page,
  }) => {
    await page.goto("/da/contact");

    const main = page.getByRole("main");

    await expect(
      main.getByRole("heading", { level: 2, name: "Kom i kontakt." })
    ).toBeVisible();
    await expect(main.getByLabel("Navn")).toBeVisible();
    await expect(main.getByLabel("E-mail")).toBeVisible();
    await expect(main.getByLabel("Besked")).toBeVisible();

    const fallback = main.getByText(/Foretrækker du e-mail\?/);
    await expect(fallback.getByRole("link")).toHaveAttribute(
      "href",
      "mailto:gustav@example.com"
    );
  });
});
