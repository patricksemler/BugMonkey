# PLAN.md

## Current Goal

Begin Milestone 003: database and shared schema foundation.

## Completed Milestones

- [x] 001 - Repo foundation.
- [x] 002a - Initial static Next.js UI shell.
- [x] 002b - Static dashboard route polish.
- [x] 002c - Final static UI polish and Vercel readiness.
- [x] Overall Milestone 002 - Web UI shell.

## Next Active Milestone

Milestone 003 should establish the first backend-facing foundation without implementing scanner execution:

- Choose the database/auth/storage direction needed for local development.
- Define shared schema foundations in `packages/shared`.
- Keep scanner logic out of `apps/web`.
- Preserve rule-based reporting as the default.
- Keep AI-enhanced behavior optional and unimplemented until the provider milestone.

## Non-Goals For The Next Milestone

- No Playwright worker implementation.
- No production scanner runs.
- No LLM provider implementation.
- No destructive scan actions.
- No real user data or secrets committed.

## Verification Baseline

```bash
pnpm lint
pnpm typecheck
pnpm test
```

`pnpm test` remains a placeholder until test coverage is introduced.
