# Branch Model & Promotion

How code moves through this repository: every change lands on `dev`, and `dev`
content is promoted upward through `staging` to `main` (production) **only**
via dedicated promotion PRs. Nothing else may target `staging` or `main`.

## The chain

| Branch    | Role                              | Receives from                                          |
| --------- | --------------------------------- | ------------------------------------------------------ |
| `dev`     | Integration branch                | All feature branches (`feat/*`, `fix/*`, `chore/*`, …) |
| `staging` | Pre-production review environment | Only `chore/*-promote-dev-to-staging` PRs              |
| `main`    | Production                        | Only `chore/*-promote-staging-to-main` PRs             |

Each promotion is tracked as a GitHub issue titled `ci: promote <from> to <to>
(<summary>)` (e.g. #144, #147). The issue lists what it includes — the merged
PRs moving up ("Includes since last promotion…"). It does not restate the
procedure; this document is the procedure.

## Legal PR targets

Exactly three head → base pairings exist:

| Head branch                                                                       | Base      | Purpose                                   |
| --------------------------------------------------------------------------------- | --------- | ----------------------------------------- |
| `feat/*`, `fix/*`, `chore/*`, `docs/*`, `refactor/*`, `research/*`, `prototype/*` | `dev`     | Feature work                              |
| `chore/<issue>-promote-dev-to-staging`                                            | `staging` | Promote current `dev` content up          |
| `chore/<issue>-promote-staging-to-main`                                           | `main`    | Promote current `staging` content to prod |

Decision tree — "where does this PR go?"

```
What does this branch carry?
├── New or changed code (feature / fix / chore / docs / refactor / research)
│     → base = dev
├── The full current contents of dev, moving one environment up
│     → branch: chore/<issue>-promote-dev-to-staging,  base: staging
└── The full current contents of staging, moving to production
      → branch: chore/<issue>-promote-staging-to-main,  base: main
```

Anything else is a mistake: a feature branch opened against `staging` or
`main` will be closed. **No exceptions** — tooling-only changes (`.github/*`,
config) are not exempt and flow through the same chain.

Enforcement is split: the CI branch-naming check validates the head branch's
_format_; whether a PR may target `staging`/`main` is decided by this table and
enforced by GitHub branch protection on those branches (see
[docs/quality-gates.md](./quality-gates.md) → Layer 4 for the live settings).

## How a promotion works

`staging` and `main` are protected, so content reaches them only as a
CI-green, squash-merged PR from a dedicated promotion branch. A promotion
branch carries **no new commits of its own** — it is the current source branch
cut under the promotion name so it can travel as a PR.

### Before you start

- Promotions are **serialized and ordered**: `dev` → `staging` first, then
  `staging` → `main`. Never run two promotions at once, and never cut a
  `staging` → `main` promotion while a `dev` → `staging` promotion is open.
- Check whether a tracking issue already exists:
  `gh issue list --search "ci: promote" --state open`. If merged work has
  accumulated on the source since the last promotion to the destination,
  create the issue with its Includes list (mirror #144/#147).
- Destinations only ever receive promotions. If `staging` or `main` ever
  holds content the source lacks, stop and ask before promoting — do not
  hand-merge inside a promotion branch.

### Steps — `dev` → `staging` shown (swap names for `staging` → `main`)

1. `git fetch origin` — always start from current remotes.
2. Compute what moved since the last promotion to the destination:

   ```sh
   git log --oneline origin/staging..origin/dev
   ```

   Each merged PR line is an entry in the tracking issue's Includes list
   (create the issue first if none exists).

3. Cut the promotion branch from the **source** branch:

   ```sh
   git switch -c chore/<issue>-promote-dev-to-staging origin/dev
   ```

   Make no content changes on it.

4. Push and open the PR:

   ```sh
   git push -u origin chore/<issue>-promote-dev-to-staging
   gh pr create --base staging \
     --head chore/<issue>-promote-dev-to-staging \
     --title "ci: promote dev to staging (<short content summary>)" \
     --body "Closes #<issue>

   Promotes all merged dev work to staging.

   **Includes** (since last promotion to staging):
   - <one line per merged PR from step 2>"
   ```

   The PR title mirrors the issue title; the body is the Includes list;
   `Closes #<issue>` links the two.

5. Drive the PR green (see the error table below), then merge with **squash**
   and let delete-branch-on-merge remove the promotion branch.

### If the destination moved while the PR was open

Strict status checks require the branch to stay up to date. Because
promotions are serialized, the destination only moves if another promotion
(or an emergency fix) landed mid-flight. Recovery: refresh the promotion
branch to the current source so the destination receives exactly the source's
current content:

```sh
git fetch origin
git switch chore/<issue>-promote-dev-to-staging
git reset --hard origin/dev    # promotion branches are throwaway — force is safe
git push --force-with-lease
```

## GitHub errors → meaning → action

GitHub's protection errors state that something is blocked, never why or what
to do instead. This table is the explanation:

| You see (GitHub)                                        | Meaning                                              | Action                                                                                                              |
| ------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `push declined: branch is protected`                    | Direct push to `dev` / `staging` / `main` is blocked | Work travels in PRs, never direct pushes. Promotions push the dedicated promotion branch, not the protected branch. |
| PR from a feature branch into `staging`/`main`          | Illegal base (see legal-targets table)               | Re-target the PR to `dev`, or re-cut the work as a `chore/<issue>-promote-*` branch against the correct base.       |
| `Merging is blocked: required status check "quality"…`  | CI must pass before the merge                        | `pnpm lint && pnpm typecheck && pnpm test:run && pnpm build`; watch progress with `gh pr checks`.                   |
| `Required status check "e2e" is expected` (on `main`)   | Playwright gates production PRs                      | Runs automatically on pushes to `main` and on PRs labeled `e2e`. Wait for it; investigate via `gh pr checks`.       |
| `Branch is out of date` / `branches must be up to date` | The destination advanced after the PR was opened     | Promotion PR: refresh from the current source (recovery above). Feature PR: rebase onto `origin/dev`.               |
| CI branch-naming step fails                             | Head branch does not match the naming pattern        | Rename to `^(feat\|fix\|chore\|docs\|refactor)/<issue>-<kebab-description>`; protected branches are exempt.         |
| Promotion PR has no diff / `nothing to compare`         | Source has nothing the destination lacks             | Nothing to promote — close the tracking issue as a no-op with a short note.                                         |

## Related

- [docs/quality-gates.md](./quality-gates.md) — the enforced gates,
  including branch protection and merge settings (Layer 4)
- [.github/pull_request_template.md](../.github/pull_request_template.md) —
  the per-PR checklist, including the target-branch rule
- [docs/agents/issue-tracker.md](./agents/issue-tracker.md) — how promotion
  issues are picked up via `gh`
