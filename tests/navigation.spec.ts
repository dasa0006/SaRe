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

    // Verify page content — "Our Story" and "Our Mission" sections are rendered
    await expect(
      page.getByRole("heading", { name: "Our Story" })
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Our Mission" })
    ).toBeVisible();
  });
});
