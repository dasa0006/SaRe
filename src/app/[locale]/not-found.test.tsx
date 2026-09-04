import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import baseEn from "@/../messages/base/en.json";
import customEn from "@/../messages/custom/en.json";
import baseDa from "@/../messages/base/da.json";
import customDa from "@/../messages/custom/da.json";

const messagesByLocale: Record<string, Record<string, unknown>> = {
  en: { ...baseEn, ...customEn },
  da: { ...baseDa, ...customDa },
};

vi.mock("next-intl/server", () => ({
  getTranslations: async ({
    locale,
    namespace,
  }: {
    locale: string;
    namespace: string;
  }) => {
    const namespaces = messagesByLocale[locale] as unknown as Record<
      string,
      Record<string, string>
    >;
    return (key: string) => namespaces[namespace][key];
  },
}));

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import LocaleNotFound from "./not-found";

const enNotFound = messagesByLocale.en.NotFound as Record<string, string>;
const daNotFound = messagesByLocale.da.NotFound as Record<string, string>;

describe("LocaleNotFound", () => {
  async function renderNotFound(locale = "en") {
    return render(
      await LocaleNotFound({ params: Promise.resolve({ locale }) })
    );
  }

  it("renders the BrandMarquee takeover", async () => {
    await renderNotFound();

    // The marquee repeats the brand name across its scroll items.
    expect(screen.getAllByText("SaRe").length).toBeGreaterThan(0);
  });

  it("shows a visible 404 numeral and back-to-home link", async () => {
    await renderNotFound();

    const numeral = screen.getByText("404");
    expect(numeral).toBeVisible();

    const link = screen.getByRole("link", { name: enNotFound.backToHome });
    expect(link).toBeVisible();
    expect(link).toHaveAttribute("href", "/");
  });

  it("keeps translated title/description in the DOM but visually hidden", async () => {
    const { container } = await renderNotFound();

    const srOnlyTexts = Array.from(container.querySelectorAll(".sr-only")).map(
      (el) => el.textContent
    );

    expect(srOnlyTexts).toContain(enNotFound.title);
    expect(srOnlyTexts).toContain(enNotFound.description);
  });

  it("renders Danish copy for the da locale", async () => {
    await renderNotFound("da");

    expect(
      screen.getByRole("link", { name: daNotFound.backToHome })
    ).toHaveTextContent(daNotFound.backToHome);
  });

  it("falls back to English when params are unavailable", async () => {
    const rendered = render(await LocaleNotFound({}));

    expect(
      rendered.getByRole("link", { name: enNotFound.backToHome })
    ).toHaveAttribute("href", "/");
  });
});
