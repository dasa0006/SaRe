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
    await expect(page).toHaveURL("/en/about");

    // Verify page content is rendered (WipGraphic interim placeholder shows the brand name)
    await expect(page.getByText("SaRe")).toBeVisible();
  });
});
