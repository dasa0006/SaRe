# Marketing Starter Migration

## Destination

The SaRe project directory is a clean, running instance of `marketing-starter` — template files intact, package name set to `SaRe`, pnpm installed, building and serving locally. Per-project customisation (brand config, env vars, additional pages) is deferred to after the migration.

## Notes

- **Domain**: Web app template migration
- **Skills**: grilling (every session for any new decision)
- **Package manager**: pnpm (template-native, do not convert to npm)
- **Nothing carries over** from the current SaRe codebase — all template decisions stand
- Template location: `git@github.com:dasa0006/marketing-starter.git`
- Existing SaRe remote (`git@github.com:dasa0006/SaRe.git`) is retained

## Decisions so far

<!-- the index — one line per closed ticket: enough to judge relevance, then zoom the link for the detail the ticket holds -->

- [Clone marketing-starter into SaRe](issues/01-clone-marketing-starter.md) — Template rsync'd into the SaRe directory, package.json name set to `SaRe`, pnpm installed, build verified (14 static pages, both locales). All old source replaced. Git history + remote retained.

## Not yet specified

All fog has graduated to issues — see below.

## Graduated to issues

- [Configure brand identity in SITE_CONFIG override seam](https://github.com/dasa0006/SaRe/issues/1) — decide name, description, URL, timezone
- [Set up production deployment and canonical URL](https://github.com/dasa0006/SaRe/issues/2) — hosting, env vars, CI/CD
- [Add SaRe-specific pages and components beyond template defaults](https://github.com/dasa0006/SaRe/issues/3) — additional content needs
- [Consider re-adding Vercel Analytics and Speed Insights](https://github.com/dasa0006/SaRe/issues/4) — optional add-back

## Out of scope

- Porting any existing SaRe code, components, messages, or config into the template instance
