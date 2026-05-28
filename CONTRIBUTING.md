# Contributing

BugMonkey uses small, reviewable changes and Conventional Commits.

## Branch Naming

Do not implement milestones directly on `main`. Each implementation milestone must use a dedicated branch with this format:

```text
<type>/<short-description>
```

Use kebab-case branch descriptions. Allowed prefixes:

- `feature/`
- `fix/`
- `docs/`
- `refactor/`
- `test/`
- `chore/`
- `ci/`

Examples:

- `feature/scanner-console-errors`
- `feature/rule-based-reports`
- `feature/report-dashboard`
- `fix/worker-url-validation`
- `docs/agent-workflow`
- `refactor/report-provider-interface`

## Commit Style

Use:

```text
<type>(optional-scope): <description>
```

Examples:

```text
feat(scanner): capture console errors during page scan
feat(reports): add rule-based severity scoring
fix(worker): prevent duplicate URLs during crawl
docs(readme): add local setup instructions
chore(repo): add pull request template
```

Allowed types:

- `feat`
- `fix`
- `docs`
- `refactor`
- `test`
- `chore`
- `perf`
- `ci`
- `build`
- `style`

## Before Each Commit

1. Check `git status`.
2. Check `git diff`.
3. Confirm no secrets.
4. Run relevant lint, typecheck, and tests.
5. Update `PLAN_LOG.md`.
6. Commit one logical change.

## Continuous Integration

GitHub Actions runs CI on pull requests into `main` and pushes to `main`.
Before opening a pull request, run the same checks locally:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter @bugmonkey/web build
```

## Pull Request Expectations

- Push the milestone branch after verification if a remote is configured.
- Open a pull request into `main` if GitHub CLI is available and authenticated.
- If GitHub CLI is unavailable, print the exact PR title, body, and command to run.
- Do not merge a pull request unless explicitly instructed.
- Merge to `main` only after review approval and passing checks.

Pull requests must include:

- Summary.
- Files changed.
- Commands run.
- Verification result.
- Screenshots or manual QA notes for UI changes.
- Confirmation that `PLAN_LOG.md` was updated.
- Links to relevant plan, spec, or ADR docs.
- Limitations and follow-up work.

After a pull request is opened, a separate review pass or agent should inspect the diff before merge. The review should check scope control, UI quality, docs updates, tests/checks, and whether unrelated files changed.

## Documentation Expectations

- Update specs when behavior changes.
- Update README only when setup, architecture, deployment, or demo workflow changes.
- Keep `PLAN_LOG.md` current for agent sessions.
