# ADR-0006: Remove Template/Project Component Distinction

**Status:** Accepted
**Deciders:** Project owner (via issues #135–#137)
**Date:** 2026-08-23
**Tags:** architecture, components, identity, upstream

---

## Context

SaRe began as a migration onto the `marketing-starter` template. The codebase inherited — and then preserved — a template-instance mental model: a distinction between components generic enough to belong to any site built on the starter and components belonging to "this particular project". Concretely, this showed up as the `src/components/project-components/` directory, which held WipGraphic and ContactForm apart from the ordinary component categories (`blocks/`, `ui/`, `layout/`, …).

Two things made the distinction hollow:

- **Nothing enforced it.** No lint rule, codegen boundary, or tooling distinguished project-components from anything else; the directories differed only in name. The axis existed purely as a placement decision to re-litigate every time a new component appeared.
- **It provided no benefit.** SaRe is forked-for-good from marketing-starter. There is no upstream sync and none is planned; nothing is ever contributed back. Every component in the repository — "generic" or not — serves exactly one client site. The repo is a client site, not a template instance.

The result was pure overhead: each new feature forced a judgement call ("is this a template concern or a project concern?") with no consequence for getting it wrong and no payoff for getting it right.

---

## Decision

1. **Dissolve the Template Instance / Project Instance boundary.** The categories are retired as an organising principle. Components are organised solely by the existing architectural categories (`blocks/`, `ui/`, `layout/`, `pages/`, …).

2. **Delete the `project-components/` directory.** Its two features join existing categories (#135):
   - ContactForm → `src/components/blocks/contact-form/`
   - WipGraphic → renamed **BrandMarquee**, at `src/components/blocks/brand-marquee/` (see the ADR-0005 amendment for its disposition)

3. **Accept that future upstream merges are impractical.** With SaRe forked-for-good from marketing-starter and its structure now diverging freely, syncing changes from upstream is accepted as impractical and is explicitly not a goal.

> **Conflicts with ADR-0002** (event tracking system), which lists "**Template Instance / Project Instance boundary preserved**" among its constraints. Worth superseding rather than reopening: the boundary this ADR dissolves is precisely the one ADR-0002's constraint assumed, and nothing in ADR-0002's mechanism (typed events, consent gate, adapter wiring) depends on it. The template/project split of _event definitions vs adapter wiring_ stands; only its framing in terms of Template/Project Instances is retired.

---

## Rationale

- The repo's identity changed: what started as a template deployment is unambiguously the SaRe ApS client site. Architecture should reflect what the code _is_, not what it once was forked from.
- Keeping an unused axis alive costs attention on every contribution while gating nothing. Removing it deletes a whole class of placement debates.
- The existing categories already express everything the old distinction pretended to: reuse scope lives in the Blocks/UI/Layout taxonomy, not in a parallel "project" bucket.
- Renaming rather than merely moving WipGraphic (→ BrandMarquee) lets the component's name match its actual role, instead of preserving a "WIP placeholder" label inside a directory scheme that claimed permanence.

---

## Consequences

### Positive

- One fewer architectural concept to explain to contributors and agents
- New components have an obvious home in exactly one taxonomy
- Component names and locations describe the current product, not its ancestry
- `project-components/` — a directory whose contents contradicted its own name — is gone

### Negative

- Upstream merges from marketing-starter are now impractical in practice, not just in policy; any future valuable upstream change must be cherry-picked by hand
- Historical references (issues, early commits, some docs) still speak of project-components; they are records of a superseded state and are left as-is
- `CONTEXT.md`'s glossary still defines **Template Instance**, **Project Instance**, **Template-Component**, and **Project-Component** as live vocabulary, and ADR-0002 references those glossary terms — both need a `/domain-modeling` pass to record the retired terms

### Open Questions

None.

---

## Related

- Issue #137 (source — record the decision)
- Issue #135 (implementation — dissolve project-components)
- Issue #136 (follow-up — BrandMarquee wired into the locale not-found page)
- ADR-0005 (WipGraphic Disposition — amended in place alongside this ADR)
- ADR-0002 (Event Tracking System — its Template/Project Instance constraint is partially superseded by this ADR; see Decision)
