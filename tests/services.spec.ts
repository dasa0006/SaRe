import { test, expect } from "@playwright/test";

/**
 * Services page — case study section (#68, #75).
 *
 * Verifies the closing trust section: positioned after the after-care tier,
 * the five-beat narrative (client → work → collaboration → result → contact
 * CTA) in both locales, and the asset-agnostic behavior — no screenshots are
 * rendered while none are provided.
 */
test.describe("Services page — case study section", () => {
  test("renders the five-beat case study after the after-care tier (EN)", async ({
    page,
  }) => {
    await page.goto("/services");

    const main = page.getByRole("main");

    // ── Section order: after-care first, case study after ─────────
    const afterCareHeading = main.getByRole("heading", {
      level: 2,
      name: "Your website is never really finished.",
    });
    await expect(afterCareHeading).toBeVisible();

    const caseStudyHeading = main.getByRole("heading", {
      level: 2,
      name: "One year. One client. From a tired WordPress site to a site that's still running.",
    });
    await expect(caseStudyHeading).toBeVisible();

    const afterCareSection = afterCareHeading.locator(
      "xpath=ancestor::section[1]"
    );
    const caseStudySection = caseStudyHeading.locator(
      "xpath=ancestor::section[1]"
    );
    const afterCareBox = await afterCareSection.boundingBox();
    const caseStudyBox = await caseStudySection.boundingBox();
    expect(caseStudyBox).not.toBeNull();
    expect(afterCareBox).not.toBeNull();
    expect(caseStudyBox!.y).toBeGreaterThan(afterCareBox!.y);

    // ── Five beats of the narrative (Shape A) ─────────────────────
    await expect(
      main.getByRole("heading", {
        level: 3,
        name: "The client and the problem",
      })
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 3, name: "What we did" })
    ).toBeVisible();
    await expect(
      main.getByText(
        "A new website built from scratch in Next.js — no templates, no WordPress baggage"
      )
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 3, name: "How we worked together" })
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 3, name: "The result" })
    ).toBeVisible();

    // ── Closing, service-agnostic contact CTA ─────────────────────
    await expect(
      main.getByRole("heading", {
        level: 3,
        name: "Would you like the same for your website?",
      })
    ).toBeVisible();

    const contactLink = caseStudySection.getByRole("link", {
      name: "Tell us about your project",
    });
    await expect(contactLink).toBeVisible();
    await expect(contactLink).toHaveAttribute("href", "/contact");

    // ── Asset-agnostic: no screenshots provided, none rendered ────
    await expect(caseStudySection.locator("img")).toHaveCount(0);
  });

  test("renders the five-beat case study in Danish", async ({ page }) => {
    await page.goto("/da/services");

    const main = page.getByRole("main");

    await expect(
      main.getByRole("heading", {
        level: 2,
        name: "Ét år. Én kunde. Fra træt WordPress til en hjemmeside, der stadig kører.",
      })
    ).toBeVisible();

    await expect(
      main.getByRole("heading", { level: 3, name: "Kunden og problemet" })
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 3, name: "Hvad vi lavede" })
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 3, name: "Sådan arbejdede vi sammen" })
    ).toBeVisible();
    await expect(
      main.getByRole("heading", { level: 3, name: "Resultatet" })
    ).toBeVisible();

    const contactLink = main.getByRole("link", {
      name: "Fortæl os om dit projekt",
    });
    await expect(contactLink).toBeVisible();
    // Non-default locale gets the /da prefix via the i18n navigation Link.
    await expect(contactLink).toHaveAttribute("href", "/da/contact");
  });
});
