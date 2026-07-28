import { test, expect } from "@playwright/test";

test("homepage renders successfully", async ({ page }) => {
  await page.goto("/");

  // Verify the page loaded without error — site header is visible
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" })
  ).toBeVisible();
});
