import { getTranslations } from "next-intl/server";

import { BrandMarquee } from "@/components/blocks/brand-marquee/BrandMarquee";
import { Link } from "@/i18n/navigation";

/**
 * Locale-scoped 404 page.
 *
 * Renders when `notFound()` is called within the `[locale]` segment.
 *
 * BrandMarquee acts as the full-page identity takeover (#136); a visible
 * "404" numeral and back-to-home link sit on top so visitors instantly know
 * the link is dead rather than the site being broken. The translated title
 * and description stay in the DOM but visually hidden (sr-only) so screen-
 * reader users still get the full context.
 */
export default async function LocaleNotFound({
  params,
}: {
  params?: Promise<{ locale: string }>;
}) {
  const resolved = await params?.catch(() => undefined);
  const locale = resolved?.locale ?? "en";
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <BrandMarquee />
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-8 px-4 text-center">
        <div>
          <h1 className="sr-only">{t("title")}</h1>
          <p className="sr-only">{t("description")}</p>
          <p className="text-8xl font-bold tracking-tight sm:text-9xl">404</p>
        </div>
        <Link
          href="/"
          className="pointer-events-auto rounded-md bg-foreground px-6 py-3 text-background transition-opacity hover:opacity-90"
        >
          {t("backToHome")}
        </Link>
      </div>
    </section>
  );
}
