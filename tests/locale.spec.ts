import { test, expect } from "@playwright/test";

test.describe("Locale switching", () => {
  test("switches from English to Danish via locale switcher", async ({
    page,
  }) => {
    await page.goto("/en");

    // Verify initial English footer tagline
    await expect(page.getByText("Build better marketing sites.")).toBeVisible();

    // Switch locale to Danish using the select element.
    // Scope to the banner (header) to avoid the duplicate in the mobile drawer.
    const localeSelect = page
      .getByRole("banner")
      .getByRole("combobox", { name: "Select language" });
    await localeSelect.selectOption("da");

    // Wait for navigation to complete — URL should now contain /da
    await expect(page).toHaveURL(/\/da(?:\/|$)/);

    // Verify page now shows Danish footer tagline
    await expect(page.getByText("Byg bedre marketingssider.")).toBeVisible();
  });

  test("switches from Danish to English via locale switcher", async ({
    page,
  }) => {
    await page.goto("/da");

    // Verify initial Danish footer tagline
    await expect(page.getByText("Byg bedre marketingssider.")).toBeVisible();

    // Switch locale to English.
    // Scope to the banner (header) to avoid the duplicate in the mobile drawer.
    const localeSelect = page
      .getByRole("banner")
      .getByRole("combobox", { name: "Select language" });
    await localeSelect.selectOption("en");

    // Wait for navigation to complete — URL should now be / or /en.
    // With "as-needed" prefix the default locale ("en") has no prefix,
    // so switching from Danish to English produces just "/".
    await expect(page).toHaveURL(/\/(?:en)?\/?$/);

    // Verify page now shows English footer tagline
    await expect(page.getByText("Build better marketing sites.")).toBeVisible();
  });
});
