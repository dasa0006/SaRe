"use client";

/**
 * PROTOTYPE — throwaway, do not ship.
 *
 * Three radically different homepage compositions (wayfinder ticket #115),
 * switchable via `?variant=` on the existing `/` route:
 *
 *   A — Editorial oversized   (oversized DM Serif type carries the character)
 *   B — Blueprint grid        (technical grid device + mono labels)
 *   C — Warm panels           (gradient wash, grain, colour-block rhythm)
 *
 * All three carry the ADR-0004 palette locally via `.proto-tokens` (see
 * HomePrototype.css) because the production token layer has not landed yet.
 * Rendered only outside production builds — see src/app/[locale]/page.tsx.
 */

import { Suspense, useCallback, useEffect } from "react";
import { DM_Serif_Display } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import VariantEditorial from "./VariantEditorial";
import VariantBlueprint from "./VariantBlueprint";
import VariantPanels from "./VariantPanels";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-proto-display",
});

const VARIANTS = [
  { key: "A", name: "Editorial oversized", Component: VariantEditorial },
  { key: "B", name: "Blueprint grid", Component: VariantBlueprint },
  { key: "C", name: "Warm panels", Component: VariantPanels },
] as const;

function SwitcherBar({
  index,
  onCycle,
}: {
  index: number;
  onCycle: (_dir: 1 | -1) => void;
}) {
  const current = VARIANTS[index];

  return (
    <div className="proto-switcher">
      <button
        type="button"
        onClick={() => onCycle(-1)}
        aria-label="Previous variant"
      >
        ←
      </button>
      <span>
        {current.key} — {current.name}
      </span>
      <button
        type="button"
        onClick={() => onCycle(1)}
        aria-label="Next variant"
      >
        →
      </button>
    </div>
  );
}

function HomePrototypeInner() {
  const router = useRouter();
  const params = useSearchParams();

  const raw = params.get("variant") ?? "A";
  const index = Math.max(
    0,
    VARIANTS.findIndex((v) => v.key === raw)
  );
  const { Component } = VARIANTS[index];

  const cycle = useCallback(
    (dir: 1 | -1) => {
      const next = VARIANTS[(index + dir + VARIANTS.length) % VARIANTS.length];
      router.replace(`/?variant=${next.key}`, { scroll: false });
    },
    [index, router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.matches?.("input, textarea, [contenteditable]")) return;
      if (e.key === "ArrowLeft") cycle(-1);
      if (e.key === "ArrowRight") cycle(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cycle]);

  return (
    <div className={`${dmSerif.variable} proto-tokens`}>
      <Component />
      <SwitcherBar index={index} onCycle={cycle} />
    </div>
  );
}

/**
 * PROTOTYPE homepage switcher. Needs a Suspense boundary because it reads
 * `useSearchParams()` while the page stays statically rendered.
 */
export default function HomePrototype() {
  return (
    <Suspense fallback={null}>
      <HomePrototypeInner />
    </Suspense>
  );
}
