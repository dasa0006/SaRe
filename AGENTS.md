<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Agent skills

### Issue tracker

Work items are tracked as GitHub issues via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical triage roles use default label strings (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Branch model & promotion

Code flows feature → `dev` → `staging` → `main`. Feature branches target `dev` only; the only PRs allowed against `staging`/`main` are dedicated promotions (`chore/<n>-promote-dev-to-staging` → `staging`, `chore/<n>-promote-staging-to-main` → `main`), executed from tracking issues titled `ci: promote …`. Read `docs/branch-model.md` before opening any PR.

### Domain docs

Single-context layout: `CONTEXT.md` at repo root + `docs/adr/` for architectural decisions. See `docs/agents/domain.md`.
