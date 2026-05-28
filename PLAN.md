# PLAN.md

## Current Goal

Complete Milestone 003: Supabase database and shared schema foundation.

## Completed Milestones

- [x] 001 - Repo foundation.
- [x] 002a - Initial static Next.js UI shell.
- [x] 002b - Static dashboard route polish.
- [x] 002c - Final static UI polish and Vercel readiness.
- [x] Overall Milestone 002 - Web UI shell.

## Active Milestone

Milestone 003 establishes the first backend-facing foundation without implementing scanner execution:

- Use Supabase Postgres, Supabase Auth, and future Supabase Storage as the backend direction.
- Use Drizzle ORM and Drizzle Kit for the TypeScript-first database schema and SQL migrations.
- Define shared Zod contract foundations in `packages/shared`.
- Keep scanner logic out of `apps/web`.
- Preserve rule-based reporting as the default.
- Keep AI-enhanced behavior optional and unimplemented until the provider milestone.
- Keep the current static web app buildable without Supabase environment variables.

## Non-Goals For The Next Milestone

- No Playwright worker implementation.
- No production scanner runs.
- No LLM provider implementation.
- No destructive scan actions.
- No real user data or secrets committed.

## Verification Baseline

```bash
pnpm db:generate
pnpm --filter @bugmonkey/shared typecheck
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter @bugmonkey/web build
```

`pnpm test` remains a placeholder until test coverage is introduced.
