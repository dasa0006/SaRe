# ADR-0004: Visual Design Direction

**Status:** Accepted
**Deciders:** Project owner (via issue #14)
**Date:** 2026-07-28
**Tags:** design, visual-identity, branding, colour, typography

---

## Context

Issue #14 raised the question of what the SaRe ApS site should _look like_ — colour palette, typography system, visual feel, and imagery approach. The site is a bilingual (DA/EN) pitch site for a Copenhagen dev duo. Core message: "Small, personal — you work with the owners." Audience is Scandinavian B2B founders. Tone is confident-but-warm, plain-spoken, precise, direct (ADR-0003).

Research into Copenhagen/Scandinavian B2B dev shop websites (#9) found:

- No shop owns "B2B SaaS product development" in Copenhagen
- Design-forward shops are weak at communicating technical depth; technical shops look dated
- The recommended positioning is **modern/technical with personality** — pairing genuine engineering credibility with a modern, premium website
- Top patterns to adapt: Framna's product-studio positioning + Frankly's personality + Morningtrain's B2B specificity

The site currently uses template defaults (slate neutrals + blue-600 accent, Geist fonts) that are unvalidated for SaRe's brand.

---

## Decision

### 1. Mood / Direction Statement

> **"Modern technical with warmth"** — A sharp, warm Copenhagen studio. Clean, premium, understated. Confident enough to let the work speak. No hype, no stock photos, no generic agency feel.

### 2. Colour Palette

Replace the template's slate-neutral + blue-600 scheme with **warm stone neutrals + deep teal accent**. Teal is warmer than blue, less generic than every template's default blue-600, and naturally suits Scandinavian minimalist design.

| Token              | Light                  | Dark                   |
| ------------------ | ---------------------- | ---------------------- |
| `--surface-white`  | `#fafaf9` (warm-white) | `#0c0a09` (warm-black) |
| `--surface-subtle` | `#f5f5f4` (stone-50)   | `#1c1917` (stone-900)  |
| `--surface-dark`   | `#1c1917` (stone-900)  | `#0c0a09` (warm-black) |
| `--surface-accent` | `#0d7a6e` (teal-700)   | `#2dd4bf` (teal-400)   |
| `--text-on-white`  | `#1c1917`              | `#fafaf9`              |
| `--text-on-subtle` | `#1c1917`              | `#fafaf9`              |
| `--text-on-dark`   | `#fafaf9`              | (inherits)             |
| `--text-on-accent` | `#ffffff`              | `#1c1917`              |
| `--border-light`   | `#e7e5e4` (stone-200)  | `#292524` (stone-800)  |

Dark-mode accent moves to teal-400 for adequate contrast on dark surfaces.

### 3. Typography

| Role               | Font                  | Source                                     |
| ------------------ | --------------------- | ------------------------------------------ |
| Body / UI          | Geist Sans (variable) | Existing — retained via `next/font/google` |
| Monospace          | Geist Mono (variable) | Existing — retained                        |
| Headings / Display | DM Serif Display      | New — added via `next/font/google`         |

**Rationale:** Geist is a quality neutral sans that handles body copy and UI well. DM Serif Display adds editorial warmth and distinction to headings — it pairs naturally with Geist and gives the site a non-generic visual voice without adding load complexity (~30KB, one HTTP request). The serif-for-headings / sans-for-body pattern is classic, readable, and signals a design-conscious shop.

### 4. Imagery Direction

**Typography-driven with abstract geometric patterns.**

- No photography (sourcing photos is overhead; candid shots risk looking unprofessional or dated)
- No custom illustrations (production cost; scope constraint)
- Visual interest comes from:
  - Teal accent panels and colour blocks (e.g. coloured underline on `<h2>`, accent sidebars)
  - Subtle geometric divider patterns between sections
  - Generous whitespace and typographic hierarchy
- This direction is intentionally **low-asset, high-impact** — visually distinctive without requiring photography, illustration, or icon sets

### 5. Logo Direction (for #19)

Wordmark-only. A custom type treatment or specific typeface for the "SaRe" wordmark. No icon, no abstract mark, no monogram for V1. The logo should be clean, typographic, and work at favicon size as a cropped letterform if needed.

This sets direction only; execution is tracked in #19.

### 6. Distinctive Element

**Teal accent signature on headings.** Every `<h2>` gets a subtle teal underline or left-side accent bar (`--surface-accent`). Combined with geometric section dividers, this gives the site a recognisable visual voice without custom illustration work.

---

## Consequences

### Positive

- A coherent visual identity grounded in the brand's tone and market positioning
- Replaces a generic template palette (slate + blue-600) with something distinctive yet understated
- Low-asset imagery direction (no photos, no illustrations) keeps scope tight for V1
- Teal + warm stone palette is accessible (meets WCAG AA contrast ratios)
- Logo ticket (#19) now has a clear direction to execute against

### Negative

- Teal is slightly unconventional for a dev shop — may not signal "software" as immediately as blue
- DM Serif Display adds a page weight trade-off (~30KB) and one additional font request
- No photography or illustrations may feel sparse on the About page, where warmth is a conversion goal — may need revisiting if the text-heavy layout feels cold
- Current tokens.css and component CSS need updating to reflect the new palette

### Open Questions

- About page warmth: if the typography-driven approach feels too sparse for the About page, consider adding a single candid team photo there as an exception

---

## Related

- Issue #14 (source — design brief deliverable)
- Issue #19 (follow-up — logo/brand mark execution)
- ADR-0003 (brand tone and voice)
- Issue #9 (B2B dev shop research)
- Issue #5 (parent epic)
