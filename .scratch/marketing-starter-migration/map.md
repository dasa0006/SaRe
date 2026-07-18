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

## Not yet specified

- **Production deployment** — the template needs a production URL for canonical links, OG images, sitemap. Unknown where/whether SaRe will be deployed. Will graduate after the clone is in place.
- **Brand identity** — the template's `src/lib/config/site.ts` override seam has defaults (name: "Marketing Starter", description: "..."). The production validation guard will throw if these aren't customised before any production `next start`. Not urgent locally.
- **Additional pages/components** — the template ships Home, About, Privacy Policy, Cookie Policy. Any SaRe-specific additions (pages, blocks, project-components) are not yet known.
- **Vercel Analytics / Speed Insights** — the template does not ship these. Current SaRe had them. Revisit if needed after migration.

## Out of scope

- Porting any existing SaRe code, components, messages, or config into the template instance
