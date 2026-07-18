## Question

How do we replace the SaRe project with a fresh clone of marketing-starter so the directory contains a clean, running template instance?

**Type:** task
**Status:** resolved
**Blocked by:**

## Answer

Rsync'd marketing-starter template over the SaRe directory (excluding .git to retain git history). Set package.json name to "SaRe", created .env.local with NEXT_PUBLIC_SITE_URL=http://localhost:3000. Ran `pnpm install` (666 packages). Build verified: all 14 static pages (en + da for Home, About, Privacy, Cookie Policy) compile cleanly with TypeScript strict. Committed as 5e458d5.

### What was done

1. Cloned `git@github.com:dasa0006/marketing-starter.git` to /tmp
2. `rsync -av --delete --exclude=.git` template → SaRe (replaced all source, config, tests, docs)
3. Set package name to `SaRe` in package.json
4. Created .env.local with default localhost URL
5. `pnpm install` — 666 packages, husky prepare ran
6. `pnpm build` — 14 routes, all static, TS clean
7. Committed: `feat: migrate SaRe to marketing-starter template`

### Key changes from old SaRe

- **Source**: moved into `src/` directory
- **Components**: restructured to `ui/` → `blocks/` → `layout/` → `pages/` tiers
- **Dark mode**: added via next-themes (ToggleMode component)
- **Security headers**: now applied via `next.config.ts headers()`, not proxy.ts
- **Package manager**: switched to pnpm
- **Fonts**: now via @fontsource-variable/geist (not next/font/google)
- **i18n**: messages split into `base/` (template-author translations) and `custom/` (project translations)
- **Tests**: unit (Vitest) + E2E (Playwright) + Storybook (visual/a11y)
- **Pages**: Home, About, Privacy Policy, Cookie Policy (all in en + da)
- **Docs**: architecture.md, implementation.md, contributing.md, ADRs, agent context files\*\*
