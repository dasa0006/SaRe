import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders header, footer, and page content", async ({ page }) => {
    await page.goto("/en");

    // ── Site header ──────────────────────────────────────────────
    const header = page.getByRole("banner");
    await expect(header).toBeVisible();

    const nav = page.getByRole("navigation", { name: "Main navigation" });
    await expect(nav).toBeVisible();

    const homeLink = nav.getByRole("link", { name: "Home" });
    await expect(homeLink).toBeVisible();

    const aboutLink = nav.getByRole("link", { name: "About" });
    await expect(aboutLink).toBeVisible();

    // ── Site footer ──────────────────────────────────────────────
    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
  });

  test("composes Hero, TrustSignals, ServicesPreview, and CTA in order", async ({
    page,
  }) => {
    await page.goto("/en");

    const main = page.getByRole("main");

    // Hero
    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "Work directly with the owners.",
      })
    ).toBeVisible();

    // TrustSignals
    await expect(
      main.getByRole("heading", { level: 2, name: "Trusted by" })
    ).toBeVisible();
    await expect(main.getByText("Improve Invest").first()).toBeVisible();

    // ServicesPreview
    await expect(
      main.getByRole("heading", { level: 2, name: "How we can help" })
    ).toBeVisible();
    await expect(
      main.getByText("You have a good idea, but no website to show for it.")
    ).toBeVisible();

    // CTA
    await expect(
      main.getByRole("heading", {
        level: 2,
        name: "Ready to work directly with the owners?",
      })
    ).toBeVisible();
  });

  test("Hero and CTA drive primary action to Services", async ({ page }) => {
    await page.goto("/en");

    // Primary CTA on the CTA block routes to the Services page.
    const ctaSection = page
      .getByRole("heading", {
        name: "Ready to work directly with the owners?",
      })
      .locator("xpath=ancestor::section[1]");
    await ctaSection
      .getByRole("link", { name: "Explore our services" })
      .first()
      .click();

    await expect(page).toHaveURL(/\/services(?:\/|$)/);
  });

  test("renders the four blocks in Danish", async ({ page }) => {
    await page.goto("/da");

    const main = page.getByRole("main");

    await expect(
      main.getByRole("heading", {
        level: 1,
        name: "Du arbejder direkte med ejerne.",
      })
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 2, name: "Samarbejdspartnere" })
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 2, name: "Sådan kan vi hjælpe" })
    ).toBeVisible();
    await expect(
      main.getByRole("heading", {
        level: 2,
        name: "Klar til at arbejde direkte med ejerne?",
      })
    ).toBeVisible();
  });
});
