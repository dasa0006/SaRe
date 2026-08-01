import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navigates from homepage to About page via nav link", async ({
    page,
  }) => {
    await page.goto("/en");

    // Click the "About" link in the main navigation
    const aboutLink = page
      .getByRole("navigation", {
        name: "Main navigation",
      })
      .getByRole("link", { name: "About" });
    await aboutLink.click();

    // Verify navigation succeeded — URL shows the About page
    // (default locale "en" uses as-needed prefix, so URL is /about not /en/about)
    await expect(page).toHaveURL(/\/about(?:\/|$)/);

    // Verify page content is rendered (WipGraphic interim placeholder shows the brand name).
    // The placeholder renders the brand name many times, so scope to the main region and
    // assert on a single element to avoid a strict-mode violation.
    await expect(
      page.getByRole("main").getByText("SaRe").first()
    ).toBeVisible();
  });
});
