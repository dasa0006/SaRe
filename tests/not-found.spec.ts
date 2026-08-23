import { test, expect } from "@playwright/test";

test.describe("404 Not Found", () => {
  test("shows 404 page with BrandMarquee takeover for invalid routes", async ({
    page,
  }) => {
    const response = await page.goto("/en/some-nonexistent-page");

    // Note: Next.js returns 200 (not 404) because [locale]/loading.tsx makes
    // this a streamed response — see not-found.js docs on status codes.
    // This matches pre-existing behaviour (#136 does not change it).
    expect(response?.status()).toBeLessThan(400);

    // The catch-all route renders the locale-scoped not-found page:
    // BrandMarquee takeover plus a visible 404 numeral (#136)
    await expect(page.locator("ul.animate-scroll-up")).toBeVisible();
    await expect(page.getByText("404")).toBeVisible();
  });

  test("keeps translated title/description in the DOM but visually hidden", async ({
    page,
  }) => {
    await page.goto("/en/some-nonexistent-page");

    const title = page.getByText("Page Not Found", { exact: true });
    await expect(title).toHaveClass(/sr-only/);

    const description = page.getByText(
      "The page you are looking for doesn't exist or has been moved."
    );
    await expect(description).toHaveClass(/sr-only/);
  });

  test("provides a link back to the homepage", async ({ page }) => {
    await page.goto("/en/this-does-not-exist");

    // next-intl Link renders "/" for the default locale (en)
    const backLink = page.getByRole("link", { name: "Back to Home" });
    await expect(backLink).toBeVisible();
    await expect(backLink).toHaveAttribute("href", "/");
  });
});
