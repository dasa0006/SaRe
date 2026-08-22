"use client";

/**
 * PROTOTYPE — Variant A: "Editorial oversized".
 *
 * Oversized DM Serif display type carries the "modern technical with
 * warmth" character. No cards anywhere: services become a numbered
 * editorial list with hairline rules; trust signals collapse into a
 * mono strip under the hero. Rhythm is generous whitespace + hairlines.
 */

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/section/Section";
import { LinkButton } from "@/components/ui/link-button/LinkButton";
import { Link } from "@/i18n/navigation";
import { SERVICES, CONTACT } from "@/lib/config/routes";

export default function VariantEditorial() {
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
      {/* Hero — oversized editorial type on warm white */}
      <Section surface="white" size="xl">
        <p className="proto-kicker">SaRe · Copenhagen</p>
        <h1 className="proto-display mt-6 max-w-[18ch] text-[clamp(3rem,7.5vw,6.5rem)] leading-[1.02] tracking-tight">
          {tHero("heading")}
        </h1>
        <p className="mt-8 max-w-[55ch] text-lg opacity-70">
          {tHero("subtitle")}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <LinkButton href={SERVICES} size="lg">
            {tHero("primaryCTA")}
          </LinkButton>
          <LinkButton href={CONTACT} variant="secondary" size="lg">
            {tHero("secondaryCTA")}
          </LinkButton>
        </div>
      </Section>

      {/* Trust strip — mono, hairline-bounded, not its own big section */}
      <div className="border-y" style={{ borderColor: "var(--border-light)" }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-baseline gap-x-10 gap-y-2 px-4 py-5 sm:px-6 lg:px-8">
          <span className="proto-kicker">{tTrust("heading")}</span>
          {clients.map((c) => (
            <span key={c.name} className="text-sm">
              <span className="font-medium">{c.name}</span>{" "}
              <span className="opacity-60">— {c.descriptor}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Geometric divider device */}
      <div className="proto-divide" aria-hidden="true">
        <i />
      </div>

      {/* Services — numbered editorial list, no cards */}
      <Section surface="subtle" size="lg">
        <h2 className="proto-h2 text-[clamp(2rem,4vw,3.25rem)] leading-tight">
          {tServices("heading")}
        </h2>
        <ol className="mt-12">
          {services.map((s, i) => (
            <li
              key={i}
              className="grid items-baseline gap-x-10 gap-y-3 border-t py-9 first:border-t-0 md:grid-cols-[auto_1fr_1fr_auto]"
              style={{ borderColor: "var(--border-light)" }}
            >
              <span
                className="font-mono text-sm"
                style={{ color: "var(--surface-accent)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="max-w-[30ch] text-xl font-medium">{s.problem}</p>
              <p className="max-w-[40ch] opacity-70">{s.solution}</p>
              <Link
                href={SERVICES}
                aria-label={tServices("link")}
                className="justify-self-start opacity-60 transition-opacity hover:opacity-100 md:justify-self-end"
              >
                <ArrowRight size={20} />
              </Link>
            </li>
          ))}
        </ol>
        <LinkButton href={SERVICES} variant="secondary" className="mt-10">
          {tServices("link")}
        </LinkButton>
      </Section>

      {/* CTA — dark stone panel, oversized serif, grain */}
      <Section surface="dark" size="xl" className="proto-grain relative">
        <h2 className="proto-h2 max-w-[16ch] text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.05]">
          {tCta("heading")}
        </h2>
        <div className="mt-12 flex flex-wrap gap-4">
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
      </Section>
    </main>
  );
}
