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

    // ── WipGraphic — brand name rendered on page ─────────────────
    await expect(page.getByText("SaRe").first()).toBeVisible();

    // ── Site footer ──────────────────────────────────────────────
    const footer = page.getByRole("contentinfo");
    await expect(footer).toBeVisible();
  });
});
