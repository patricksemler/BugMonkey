# PLAN.md

## Current Goal

Initialize the BugMonkey repository foundation with agent-friendly documentation, monorepo placeholders, basic tooling skeletons, and planning docs.

## Scope

- Root project docs.
- `docs/plans/` milestone breakdown.
- `docs/specs/` behavior spec skeletons.
- `docs/decisions/` ADR skeletons.
- Monorepo folder placeholders for `apps/web`, `apps/worker`, and `packages/shared`.
- Basic package, workspace, environment, and editor config files.

## Non-Goals

- No Next.js implementation.
- No Playwright scanner implementation.
- No database schema or migrations.
- No auth setup.
- No storage setup.
- No LLM provider implementation.
- No production deployment config beyond documentation placeholders.

## Active Checklist

- [x] Initialize Git repository.
- [x] Add root docs.
- [x] Add monorepo and tooling placeholders.
- [x] Add milestone plans.
- [x] Add specs and ADR skeletons.
- [x] Verify no secrets or feature implementation.
- [x] Commit as `chore(repo): initialize project foundation`.

## Target Files

- `README.md`
- `AGENTS.md`
- `CLAUDE.md`
- `PLAN.md`
- `PLAN_LOG.md`
- `CHANGELOG.md`
- `CONTRIBUTING.md`
- `docs/plans/`
- `docs/specs/`
- `docs/decisions/`
- `apps/web/.gitkeep`
- `apps/worker/.gitkeep`
- `packages/shared/.gitkeep`

## Verification Steps

```bash
git status --short
git diff --check
pnpm lint
pnpm typecheck
pnpm test
```

If `pnpm` is not installed locally, record that in `PLAN_LOG.md`.

## Rollback Notes

This foundation pass is docs and placeholders only. Roll back by reverting the initial foundation commit.

## Open Questions

- Choose Supabase Postgres or Neon Postgres.
- Choose Supabase Storage, Vercel Blob, or S3-compatible storage.
- Choose Auth.js or Supabase Auth.
