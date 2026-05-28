# AGENTS.md

This is the operating manual for coding agents working in BugMonkey.

## Read First

Before coding, read:

1. `README.md`
2. `AGENTS.md`
3. `PLAN.md`
4. The relevant file in `docs/plans/`
5. The relevant files in `docs/specs/`
6. `PLAN_LOG.md`

## Project Rules

- Keep the web app in `apps/web`.
- Keep Playwright scanning in `apps/worker`.
- Keep shared schemas, constants, issue enums, and report types in `packages/shared`.
- Preserve deterministic rule-based reporting as the default mode.
- Keep AI-enhanced reporting optional and evidence-bound.
- Store raw evidence before summaries.
- Do not require paid LLM calls for core production behavior.
- Do not put scanner logic inside React components or normal UI route handlers.
- Keep files short and modules focused.

## Safety Rules

- Never commit secrets, API keys, tokens, `.env` files, private screenshots, or real user data.
- Validate URLs before scanning.
- Block localhost and private IP ranges in hosted mode unless local dev mode explicitly allows them.
- Avoid destructive actions and unsafe form submissions during scans.

## Commands

Placeholder commands until implementation begins:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm dev:web
pnpm dev:worker
pnpm scan:demo
```

If a command is not implemented yet, document that in `PLAN_LOG.md` rather than inventing unrelated setup.

## Documentation Rules

- Update `PLAN_LOG.md` after each agent session.
- Update specs when behavior changes.
- Update `README.md` only when setup, architecture, deployment, or demo workflow changes.
- Keep `CLAUDE.md` short and point back here.

## Git Rules

- Do not implement milestones directly on `main`.
- Each implementation milestone must use a dedicated branch.
- Branch names must use the format `<type>/<short-description>`.
- Allowed branch prefixes are `feature/`, `fix/`, `docs/`, `refactor/`, `test/`, `chore/`, and `ci/`.
- Use kebab-case branch descriptions.
- Use small Conventional Commits.
- One logical change per commit.
- Check `git status` and `git diff` before committing.
- Run relevant checks before committing.
- Update `PLAN_LOG.md` before committing.
- Push the milestone branch after verification if a remote is configured.
- Open a pull request into `main` if GitHub CLI is available and authenticated.
- If GitHub CLI is unavailable, print the exact PR title, body, and command for the user to run.
- Do not merge pull requests unless explicitly instructed.
- Merge to `main` only after review approval and passing checks.

Allowed commit types:

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

## Pull Request Rules

Pull requests must include:

- Summary.
- Files changed.
- Commands run.
- Verification result.
- Screenshots or manual QA notes for UI changes.
- Confirmation that `PLAN_LOG.md` was updated.

After a pull request is opened, a separate review pass or agent should inspect the diff before merge. The review should check scope control, UI quality, docs updates, tests/checks, and whether unrelated files changed.

## Definition Of Done

- The feature or documentation change matches the active plan.
- Relevant checks pass, or limitations are recorded in `PLAN_LOG.md`.
- Docs are updated when behavior or setup changes.
- No secrets are introduced.
- No unrelated changes are included.
