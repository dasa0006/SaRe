# ADR-0005: WipGraphic Disposition

**Status:** Accepted — **Amended 2026-08-23:** the route-wide "under development" takeover described below was abandoned route-by-route as routes gained real content. The component survives, renamed **BrandMarquee** and living at `src/components/blocks/brand-marquee/`, serving exclusively as the not-found experience (see Decision §6). The disposition change is recorded by this amendment, not by a separate superseding ADR; ADR-0006 covers only the identity change behind the rename and move.
**Deciders:** Project owner (via issue #21; amendment via issues #135–#137)
**Date:** 2026-07-29 (amended 2026-08-23)
**Tags:** design, brand-marquee, not-found, animation

---

## Context

The WipGraphic component — since renamed **BrandMarquee** and living at `src/components/blocks/brand-marquee/BrandMarquee.tsx` — was created during early development as a placeholder for the Home page — a full-screen, infinitely scrolling display of the brand name "SaRe" in various typographic treatments.

Issue #16 (Home Page Content Structure) later defined the Home page sections as Hero → TrustSignals → ServicesPreview → CTA. The code-review remediation map (#20) flagged WipGraphic for disposition: keep, modify, or remove. The question was whether this component serves a continued purpose beyond its origin as a throwaway placeholder.

At the same time, the site has multiple routes (Services, About, Contact) whose content is planned but not yet fully implemented. Visitors to these routes currently see either sparse pages or the default Next.js template content. The site needs an interim state that is transparent about being under development without looking abandoned.

---

## Decision

### 1. Keep WipGraphic

Keep the component as an intentional **"under development" indicator**. It is not a placeholder to be discarded — it is a deliberate design choice that signals the active, evolving state of both the website and the company.

### 2. ~~Full-page takeover across all routes~~ → superseded: not-found only

**Original decision:** on any route that is not yet content-complete, WipGraphic appears as a **full-page takeover**.

**Amended 2026-08-23:** this was abandoned route-by-route. As each route gained real content (Home composition #26/#132, Contact, …) it dropped the takeover instead of adopting it, so the rollout never happened. The full-page takeover now lives in exactly one place: the locale-scoped not-found page (#136), where BrandMarquee runs as the 404 experience beneath a visible "404" numeral and translated back-to-home link.

### 3. Intentionally rough visual

The current visual — brand name "SaRe" in varied Tailwind font treatments scrolling vertically — is kept as-is. No refinement to match ADR-0004's palette or typography system at this time. The roughness is part of the message: this is a site under active construction by a small team.

### 4. CSS approach unchanged

The component's existing CSS approach (external `.css` file with `@keyframes scroll-up` + Tailwind utility classes via `twMerge`, imported centrally from `globals.css`) is retained. No migration to `<style jsx>` or any other CSS solution.

### 5. ~~Future: split-hero integration (Home page)~~ → not pursued

**Original decision:** once the Home page composition (#26) was implemented, WipGraphic might move from full-page takeover to the **left side of a split hero** on the Home page, with CTAs on the right.

**Amended 2026-08-23:** not pursued. The Home page composition landed without a marquee element, and the component's sole remaining role is the not-found experience (§2).

### 6. Renamed BrandMarquee; Blocks-category home (amendment)

As of 2026-08-23 the component is named **BrandMarquee** — its role is no longer "WIP placeholder" but the brand-identity marquee behind the 404 takeover. It lives in the Blocks category at `src/components/blocks/brand-marquee/` (component TSX, CSS file, and story), following the dissolution of the template/project distinction recorded in ADR-0006.

---

## Rationale

> The arguments below justify the original 2026-07-29 decision; the Decision section's amendments record where reality diverged from them.

- **Full-page takeover** transparently signals to visitors that pages are being actively built. This is preferable to showing sparse default content or a 404, which would imply the site is neglected.
- **Cross-site consistency** reinforces the brand's core message: a small, personal team building their presence. Every route in the same "under development" state reads as intentional rather than broken.
- **Intentionally rough aesthetic** avoids misleading visitors. A polished placeholder would imply the content is final; a rough one is honest about the site's maturity.
- **Typography-driven approach** aligns with ADR-0004's imagery direction (typography-driven with abstract geometric patterns, no photography, no custom illustration). WipGraphic is a pure typographic treatment that fits without requiring new assets.
- **Retaining the current CSS** avoids churn. The external-CSS + Tailwind pattern works, and the component is not performance-critical. Changing it would add work with no user-facing benefit.

---

## Consequences

### Positive

- All routes have intentional, branded content during development — no blank pages or template defaults
- The "under development" message is transparent and consistent, building trust rather than causing confusion
- No additional design or illustration work required for the interim state
- The component's Blocks-category home (`src/components/blocks/brand-marquee/`, per the 2026-08-23 amendment) keeps its CSS and story co-located alongside it

### Negative

- The rough visual may be perceived as unprofessional by some visitors — this is a conscious trade-off
- The component's `listElementStyles` array still opens with an empty entry (`{ styles: [] }`) that renders a bare, unstyled brand name — a minor code-quality issue documented in #22 but not blocking
- The `text-shadow-lg` utility class used by some entries is not a standard Tailwind utility — it is either custom or undefined, and should be addressed in the standards cleanup (#22)

### Open Questions

- When a route transitions from "under development" to content-complete, the transition mechanism (WipGraphic removal, fade, or replacement) should be decided per-route as part of implementation

---

## Related

- Issue #21 (source — disposition decision via grilling)
- Issue #137 (amendment — record the decisions)
- Issue #135 (implementation — WipGraphic renamed BrandMarquee, moved to Blocks)
- Issue #136 (implementation — BrandMarquee wired into the locale not-found page)
- ADR-0006 (Remove Template/Project Component Distinction — the identity change behind the rename and move)
- Issue #16 (Home Page Content Structure — defined the content that replaced the takeover on Home)
- Issue #22 (Spec-drift & Standards Cleanup Plan — downstream cleanup of code findings)
- Issue #26 (Home page composition — implemented without a split-hero marquee role)
- ADR-0004 (Visual Design Direction — typography-driven imagery direction)
