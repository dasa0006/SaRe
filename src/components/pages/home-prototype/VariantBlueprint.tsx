"use client";

/**
 * PROTOTYPE — Variant B: "Blueprint grid".
 *
 * The technical half of "modern technical with warmth": a visible
 * blueprint grid device in the hero, mono uppercase kickers, tight
 * section rhythm. Services become three columns with accent top-borders.
 * Trust signals sit on a dark band as a mono specimen strip.
 */

import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section/Section";
import { LinkButton } from "@/components/ui/link-button/LinkButton";
import { SERVICES, CONTACT } from "@/lib/config/routes";

export default function VariantBlueprint() {
  const tHero = useTranslations("Hero");
  const tTrust = useTranslations("TrustSignals");
  const tServices = useTranslations("ServicesPreview");
  const tCta = useTranslations("CTA");

  const clients = tTrust.raw("clients") as {
    name: string;
    descriptor: string;
  }[];
  const services = tServices.raw("services") as {
    problem: string;
    solution: string;
  }[];

  return (
    <main>
      {/* Hero — split layout over blueprint grid */}
      <Section surface="white" size="xl" className="proto-grid-bg">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="proto-kicker">{"// SaRe — Copenhagen"}</p>
            <h1 className="proto-display mt-6 text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[1.05] tracking-tight">
              {tHero("heading")}
            </h1>
            <p className="mt-6 max-w-[50ch] opacity-70">{tHero("subtitle")}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton href={SERVICES} size="lg">
                {tHero("primaryCTA")}
              </LinkButton>
              <LinkButton href={CONTACT} variant="secondary" size="lg">
                {tHero("secondaryCTA")}
              </LinkButton>
            </div>
          </div>

          {/* Abstract graphic block: nested grid squares + filled teal cell */}
          <div
            aria-hidden="true"
            className="relative hidden aspect-square lg:block"
          >
            <div
              className="proto-grid-bg proto-grid-dense absolute inset-0 border"
              style={{ borderColor: "var(--border-light)" }}
            />
            <div
              className="absolute left-8 top-8 h-20 w-20 border-2"
              style={{ borderColor: "var(--surface-accent)" }}
            />
            <div
              className="absolute bottom-8 right-8 h-28 w-28"
              style={{ background: "var(--surface-accent)" }}
            />
            <p className="proto-kicker absolute bottom-8 left-8">v.2026</p>
          </div>
        </div>
      </Section>

      {/* Trust — dark mono band */}
      <Section surface="dark" size="sm" className="proto-grain relative">
        <div className="flex flex-wrap items-baseline gap-x-12 gap-y-3">
          <span className="proto-kicker">{tTrust("heading")}</span>
          {clients.map((c) => (
            <span key={c.name}>
              <span className="font-mono text-sm font-medium tracking-wide">
                {c.name}
              </span>{" "}
              <span className="text-sm opacity-60">/ {c.descriptor}</span>
            </span>
          ))}
        </div>
      </Section>

      {/* Services — three columns with accent top-border */}
      <Section surface="subtle" size="lg">
        <h2 className="proto-h2 text-[clamp(2rem,4vw,3rem)] leading-tight">
          {tServices("heading")}
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {services.map((s, i) => (
            <div key={i}>
              <div
                className="mb-6 h-0.5 w-full"
                style={{ background: "var(--surface-accent)" }}
              />
              <p
                className="font-mono text-xs"
                style={{ color: "var(--surface-accent)" }}
              >
                {String(i + 1).padStart(2, "0")} / 03
              </p>
              <h3 className="mt-3 text-xl font-medium leading-snug">
                {s.problem}
              </h3>
              <p className="mt-3 text-sm leading-relaxed opacity-70">
                {s.solution}
              </p>
            </div>
          ))}
        </div>
        <LinkButton href={SERVICES} variant="secondary" className="mt-14">
          {tServices("link")}
        </LinkButton>
      </Section>

      {/* CTA — full-bleed teal */}
      <Section surface="accent" size="lg">
        <h2 className="proto-display max-w-[18ch] text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.08]">
          {tCta("heading")}
        </h2>
        <div className="mt-10 flex flex-wrap gap-4">
          <LinkButton href={SERVICES} surface="accent" size="lg">
            {tCta("primaryCTA")}
          </LinkButton>
          <LinkButton
            href={CONTACT}
            variant="secondary"
            surface="accent"
            size="lg"
          >
            {tCta("secondaryCTA")}
          </LinkButton>
        </div>
      </Section>
    </main>
  );
}
