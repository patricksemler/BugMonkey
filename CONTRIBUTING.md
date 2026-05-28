# Contributing

BugMonkey uses small, reviewable changes and Conventional Commits.

## Branch Naming

Use descriptive branches:

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

## Pull Request Expectations

- Explain the problem and the change.
- Include screenshots for UI changes.
- Include test notes.
- Link relevant plan, spec, or ADR docs.
- Call out limitations and follow-up work.

## Documentation Expectations

- Update specs when behavior changes.
- Update README only when setup, architecture, deployment, or demo workflow changes.
- Keep `PLAN_LOG.md` current for agent sessions.

