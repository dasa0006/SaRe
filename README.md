# SaRe

The production Next.js marketing site for SaRe ApS, built with a composable architecture of Primitives, Blocks, Layouts, and Pages.

## Reading Guide

This project ships with several documentation files. Which one you need depends on what you're doing:

| If you want to...                                       | Read this                    |
| ------------------------------------------------------- | ---------------------------- |
| Get a quick overview of the project (you're here)       | **README.md** ← you are here |
| Understand the project's glossary and domain language   | `CONTEXT.md`                 |
| Learn the architecture (providers, consent, i18n, ADRs) | `docs/architecture.md`       |
| Contribute — conventions, how-tos, decision trees       | `docs/contributing.md`       |
| Review architectural decisions and their rationale      | `docs/adr/`                  |
| Understand the quality-gate pipeline and tooling layers | `docs/quality-gates.md`      |

> **Note:** `CONTEXT.md` is a reference file designed to aid AI agents with the project's glossary. It is not a human-facing onboarding doc — if you are setting up the project for the first time, this README is where you should start.

## Philosophy

Every decision in this project serves three goals:

1. **Consistency over cleverness.** Conventions are strict and enforced by config (ESLint, Husky, TypeScript strict). There should be one obvious way to do something, not three.
2. **AI-friendly by design.** The manifest + context files, explicit file conventions, and data-driven page composition mean an AI can understand the project in one read — without re-deriving architecture from scratch each time.
3. **Nature-based placement.** Components live where they belong by what they _are_ — a business-meaning-free primitive in `ui/`, a composed marketing pattern in `blocks/`, page chrome in `layout/`, complete routes in `pages/`. See [contributing.md](./docs/contributing.md) for the placement tree.

### Scope

A marketing website for SaRe ApS. No heavy backend, no e-commerce, no authentication, no database.

### Non-goals

- Over-engineering (auto-CSP-hash generators, custom image loaders)
- Premature abstraction (generating features before seeing the pattern twice)
- Framework coupling beyond Next.js + React (no CMS, no analytics provider by default)
- Barrel exports and index.js files (imports are explicit so tools can trace dependencies)

## Stack

| Layer           | Choice                                                       |
| --------------- | ------------------------------------------------------------ |
| Framework       | Next.js 16 (App Router, Turbopack)                           |
| Language        | TypeScript strict                                            |
| Styling         | Tailwind CSS v4                                              |
| i18n            | next-intl (en + da, as-needed prefix)                        |
| Dark mode       | next-themes (system + user toggle)                           |
| Testing         | Vitest (unit) + Playwright (E2E) + Storybook (visual + a11y) |
| Package manager | pnpm                                                         |
| Git hooks       | Husky + commitlint (conventional commits)                    |

## TL;DR Conventions

- All source in `src/`
- Components split into: `ui/` (primitives) → `blocks/` (patterns) → `layout/` (chrome) → `pages/` (assemblies)
- Pages compose blocks directly: each block is wrapped in a `Section` that owns its surface, size, and full-bleed behaviour
- Components follow tier-based file conventions: Tier 0 (flat file, no story), Tier 1 (story + mock), Tier 2 (+ unit test)

## Getting Started

```bash
# 1. Install dependencies
pnpm install

# 2. Configure the environment
cp .env.example .env.local    # edit NEXT_PUBLIC_SITE_URL
edit src/lib/config/site.ts   # name, description, social links

# 3. Start developing
pnpm dev
```

## What's Included?

| Category   | Components                                                                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **UI**     | Button, LinkButton, Heading, Text, Image, Brand, LocaleSwitcher, ToggleMode                                                                                                            |
| **Blocks** | Hero, FeatureGrid, CTA, TextBlock, ContactForm, BrandMarquee, ServicesPreview, StandardServices, FounderSpotlights, ProofPoint, TrustSignals, CaseStudy, WebDevelopmentLead, AfterCare |
| **Layout** | SiteHeader, SiteFooter, Section, MobileDrawer, CookieBanner                                                                                                                            |
| **Pages**  | Index (home), About, Services, Contact, Privacy Policy, Cookie Policy                                                                                                                  |
| **Hooks**  | useButtonTracking, useScrollLock, useFocusTrap                                                                                                                                         |
| **SEO**    | JSON-LD (Organization, WebSite, BreadcrumbList), dynamic OG image, sitemap, robots.txt                                                                                                 |
