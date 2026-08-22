"use client";

/**
 * PROTOTYPE — Variant C: "Warm panels".
 *
 * The warmth half of "modern technical with warmth": centered hero over
 * a soft teal gradient wash with grain, then full-width sections that
 * hold inset rounded colour-block panels (subtle / dark alternating) —
 * a strong block rhythm distinct from A's hairlines and B's grids.
 */

import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section/Section";
import { LinkButton } from "@/components/ui/link-button/LinkButton";
import { SERVICES, CONTACT } from "@/lib/config/routes";

export default function VariantPanels() {
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
      {/* Hero — centered over gradient wash + grain */}
      <section
        className="proto-grain relative overflow-hidden"
        style={{
          background: "var(--surface-white)",
          color: "var(--text-on-white)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% -5%, color-mix(in oklab, var(--surface-accent) 22%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 py-32 text-center sm:py-44">
          <p className="proto-kicker justify-center">SaRe · Copenhagen</p>
          <h1 className="proto-display mt-6 text-[clamp(3rem,7vw,5.75rem)] leading-[1.03] tracking-tight">
            {tHero("heading")}
          </h1>
          <p className="mx-auto mt-8 max-w-[52ch] text-lg opacity-70">
            {tHero("subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkButton href={SERVICES} size="lg">
              {tHero("primaryCTA")}
            </LinkButton>
            <LinkButton href={CONTACT} variant="secondary" size="lg">
              {tHero("secondaryCTA")}
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Trust — inset subtle panel */}
      <Section surface="white" size="md">
        <div
          className="rounded-xl px-8 py-10 sm:px-12"
          style={{
            background: "var(--surface-subtle)",
            color: "var(--text-on-subtle)",
          }}
        >
          <p className="proto-kicker">{tTrust("heading")}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {clients.map((c) => (
              <div key={c.name}>
                <p className="text-xl font-medium">{c.name}</p>
                <p className="mt-1 text-sm opacity-60">{c.descriptor}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Services — stacked alternating colour-block panels */}
      <Section surface="white" size="sm">
        <h2
          className="px-2 text-center text-[clamp(2rem,4vw,3rem)] leading-tight"
          style={{ color: "var(--text-on-white)" }}
        >
          <span className="proto-h2">{tServices("heading")}</span>
        </h2>
        <div className="mt-10 space-y-4">
          {services.map((s, i) => {
            const dark = i % 2 === 1;
            return (
              <div
                key={i}
                className={`rounded-xl p-8 sm:p-10 ${dark ? "proto-grain relative overflow-hidden" : ""}`}
                style={{
                  background: dark
                    ? "var(--surface-dark)"
                    : "var(--surface-subtle)",
                  color: dark ? "var(--text-on-dark)" : "var(--text-on-subtle)",
                }}
              >
                <span
                  className="font-mono text-sm"
                  style={{ color: "var(--surface-accent)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 max-w-[34ch] text-2xl font-medium leading-snug">
                  {s.problem}
                </p>
                <p className="mt-3 max-w-[52ch] opacity-70">{s.solution}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* CTA — final dark panel, oversized serif + teal rule */}
      <Section surface="white" size="lg">
        <div
          className="proto-grain relative overflow-hidden rounded-xl px-8 py-16 text-center sm:px-16"
          style={{
            background: "var(--surface-dark)",
            color: "var(--text-on-dark)",
          }}
        >
          <h2 className="proto-display mx-auto max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] leading-[1.06]">
            {tCta("heading")}
          </h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-8 h-0.5 w-24"
            style={{ background: "var(--surface-accent)" }}
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <LinkButton href={SERVICES} surface="dark" size="lg">
              {tCta("primaryCTA")}
            </LinkButton>
            <LinkButton
              href={CONTACT}
              variant="secondary"
              surface="dark"
              size="lg"
            >
              {tCta("secondaryCTA")}
            </LinkButton>
          </div>
        </div>
      </Section>
    </main>
  );
}
