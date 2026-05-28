# PLAN_LOG.md

Append-only work log. Never delete old entries.

## 2026-05-28 - Repository foundation

- Task attempted: initialize BugMonkey repo foundation from product spec.
- Files changed: root docs, monorepo placeholders, planning docs, spec skeletons, ADR skeletons, config placeholders.
- Commands run: `git init`, `git branch -M main`, repository inspection commands, `git status --short`, `git diff --check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `npm run lint`, `npm run typecheck`, `npm run test`, `npm install -g pnpm@9.15.4`, `pnpm install`.
- Tests/checks performed: `git diff --check` passed. `npm run lint`, `npm run typecheck`, and `npm run test` ran placeholder scripts successfully. After installing `pnpm`, `pnpm lint`, `pnpm typecheck`, and `pnpm test` also ran placeholder scripts successfully.
- Result: foundation files created and ready for the initial commit.
- Known issues: none for this foundation pass.
- Next recommended step: commit `chore(repo): initialize project foundation`, then begin `002-web-ui-shell`.

## 2026-05-28 - README link cleanup

- Task attempted: remove absolute local links from `README.md`.
- Files changed: `README.md`, `PLAN_LOG.md`.
- Commands run: `sed -n '1,220p' README.md`, `git status --short`, `rg -n "/Users/user|Documents/Projects/BugMonkey" ...`, `git diff --check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`.
- Tests/checks performed: absolute local path scan found no remaining matches. `git diff --check`, `pnpm lint`, `pnpm typecheck`, and `pnpm test` passed.
- Result: README roadmap links now use repo-relative Markdown links.
- Known issues: none.
- Next recommended step: continue with `002-web-ui-shell`.

## 2026-05-28 - Initial web UI shell

- Task attempted: implement Milestone 002a as a static Next.js App Router web shell only.
- Files changed: added `apps/web` Next.js, Tailwind, ESLint, and TypeScript config; added static `/` and `/demo-report` pages; added shadcn-style local UI primitives, severity badge, app shell, demo data, and favicon; removed `apps/web/.gitkeep`; updated root scripts in `package.json`; updated `pnpm-lock.yaml`; updated `README.md` setup and script notes.
- Commands run: `git status --short`, repo inspection commands, `node --version`, `pnpm --version`, `pnpm install`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm dev:web`, browser verification for `http://localhost:3000/` and `/demo-report`, `git diff --check`, `lsof -ti tcp:3000 | xargs kill`.
- Tests/checks performed: `pnpm lint` passed after switching ESLint to a Next-compatible flat config; `pnpm typecheck` passed; `pnpm test` ran the documented placeholder; `git diff --check` passed.
- Visual QA notes: verified `/` and `/demo-report` in the browser at desktop size and mobile width `390x844`; static pages rendered without obvious overlap; scan and export actions are disabled and do not claim real functionality; favicon 404 found during QA was fixed; final browser console check reported no errors.
- Result: `apps/web` is now a real static Next.js UI shell with Tailwind and local shadcn-style primitives. No backend, database, auth, worker, scanner, storage, shared contracts, or LLM functionality was added.
- Known issues: `pnpm test` is still a placeholder until test coverage is introduced.
- Next recommended step: commit `feat(web): add initial Next.js UI shell`.

## 2026-05-28 - Branch workflow rules

- Task attempted: document required branch-based milestone workflow before Milestone 002b implementation.
- Files changed: `AGENTS.md`, `CONTRIBUTING.md`, `.github/pull_request_template.md`, `PLAN_LOG.md`.
- Commands run: `git status --short`, `git branch --show-current`, `git switch -c feature/static-dashboard-route-polish`, repository documentation inspection commands.
- Tests/checks performed: pending for the full Milestone 002b session.
- Result: branch naming, PR content, review, push, and no-self-merge rules documented for agents and contributors.
- Known issues: no remote is currently configured, so branch push and PR creation may require user follow-up.
- Next recommended step: commit `docs(workflow): require branch-based milestone work`, then implement Milestone 002b UI polish on `feature/static-dashboard-route-polish`.

## 2026-05-28 - Static dashboard route polish

- Task attempted: implement Milestone 002b static UI route polish on `feature/static-dashboard-route-polish`.
- Files changed: `apps/web/components/app-shell.tsx`, `apps/web/components/app-nav.tsx`, `apps/web/components/status-state.tsx`, `apps/web/app/page.tsx`, `apps/web/app/demo-report/page.tsx`, `apps/web/app/projects/page.tsx`, `apps/web/app/scans/page.tsx`, `apps/web/app/settings/page.tsx`, `apps/web/app/demo-report/issues/[issueId]/page.tsx`, `apps/web/lib/demo-data.ts`, `PLAN_LOG.md`.
- Commands run: `git status --short`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm dev:web`, `rg -n "href=\\{?['\\\"]#|href: ['\\\"]#" apps/web`, browser verification for `/`, `/demo-report`, `/demo-report/issues/BM-DEMO-001`, `/demo-report/issues/unknown`, `/projects`, `/scans`, and `/settings`, mobile viewport screenshots for `/`, `/projects`, and `/demo-report/issues/unknown`, browser console checks, `git diff --check`, `lsof -ti tcp:3000 | xargs kill`.
- Tests/checks performed: `pnpm lint` passed; `pnpm typecheck` passed; `pnpm test` ran the documented placeholder; `git diff --check` passed; nav link scan found no `#` hrefs in `apps/web`.
- Visual QA notes: verified desktop route rendering for all 002b routes; verified mobile layout at `390x844` for overview, projects, and unknown issue fallback; no obvious overlap, clipped controls, or unreadable table content; disabled scan/export/settings actions remained disabled; final browser console check reported no errors.
- Result: static dashboard route polish completed with mock-only data and graceful known/unknown issue detail states. No auth, database, worker, scanner, storage, shared contracts, or LLM logic was added.
- Known issues: no remote is currently configured, so branch push and PR creation may require user follow-up.
- Next recommended step: commit `feat(web): add static dashboard route polish`, then push/open a PR if a remote is configured.

## 2026-05-28 - Final static UI polish and Vercel readiness

- Branch: `feature/final-static-ui-vercel-readiness`.
- Task attempted: finish Milestone 002c closeout after completing final static UI polish.
- Files changed: `apps/web` static UI state files and shared components, `apps/web/package.json`, `apps/web/tsconfig.json`, `README.md`, `docs/specs/deployment.md`, `docs/plans/002-web-ui-shell.md`, `PLAN.md`, `PLAN_LOG.md`, `CHANGELOG.md`.
- Commands run: `git switch main`, `git pull --ff-only origin main`, `git switch -c feature/final-static-ui-vercel-readiness`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, `pnpm dev:web`, browser QA for `/`, `/projects`, `/scans`, `/settings`, `/demo-report`, `/demo-report/issues/BM-DEMO-001`, `/demo-report/issues/unknown`, and `/not-a-real-route`, mobile viewport QA for `/`, `/projects`, and `/not-a-real-route`, browser console checks, `git diff --check`, `lsof -ti tcp:3000 | xargs kill`, closeout documentation inspection commands.
- Tests/checks performed: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, and `git diff --check` passed for the closeout.
- Visual QA notes: desktop routes rendered static/mock-only content; mobile width `390x844` showed no obvious overlap, clipped controls, unreadable tables, or awkward button wrapping; known and unknown issue detail states worked; disabled scan/export/settings actions remained disabled; final browser console check on a valid route reported no errors. The `/not-a-real-route` request correctly returned a 404 while rendering the polished not-found UI.
- Commit hashes available: `84e8423` (`feat(web): polish final static UI states`). Closeout commit pending.
- PR URL: https://github.com/patricksemler/BugMonkey/pull/2
- Vercel config: intentionally avoided `vercel.json`; current docs instruct Vercel to use project Root Directory `apps/web` and framework auto-detection. Worker/scanner remain separate and unimplemented.
- Result: Milestone 002 docs are closed out and the static web UI is ready for Milestone 003 backend/database/shared-schema planning.
- Known issues: `pnpm test` remains a placeholder until real test coverage is added.
- Next recommended milestone: Milestone 003 - database/shared schema foundation.

## 2026-05-28 - GitHub Actions CI

- Branch: `chore/add-github-actions-ci`.
- Task attempted: add GitHub Actions CI before Milestone 003 without adding deployment or product logic.
- Files changed: `.github/workflows/ci.yml`, `CONTRIBUTING.md`, `PLAN_LOG.md`.
- Commands run: `git switch main`, `git pull --ff-only origin main`, `git switch -c chore/add-github-actions-ci`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, `git diff --check`, `git status --short`, `git commit -m "ci(github): add pull request checks"`, `git push -u origin chore/add-github-actions-ci`, `gh pr create`.
- Tests/checks performed: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, and `git diff --check` passed.
- Result: GitHub Actions CI workflow added for pull requests into `main` and pushes to `main`; contributor CI notes added.
- Known issues: `pnpm test` remains a placeholder until real test coverage is added.
- PR URL: https://github.com/patricksemler/BugMonkey/pull/3

## 2026-05-28 - Supabase database and shared schema foundation

- Branch: `feature/supabase-shared-schema-foundation`.
- Task attempted: implement Milestone 003 as a backend foundation only, choosing Supabase Postgres/Auth/future Storage with Drizzle ORM, Drizzle Kit migrations, and shared Zod contracts.
- Files changed: root package scripts/dependencies, `pnpm-lock.yaml`, `drizzle.config.ts`, `supabase/migrations`, `packages/shared`, `.env.example`, `README.md`, `PLAN.md`, `CHANGELOG.md`, `docs/plans/003-database-auth-storage.md`, `docs/specs/database.md`, `docs/specs/data-model.md`, `docs/specs/security.md`, `docs/specs/scanner.md`, `docs/specs/report-engine.md`, `docs/specs/deployment.md`, `PLAN_LOG.md`.
- Dependencies added: root dev dependencies `drizzle-kit`, `typescript`, and `@types/node`; shared package dependencies `drizzle-orm` and `zod`.
- Commands run: `git switch main`, `git pull --ff-only origin main`, `git switch -c feature/supabase-shared-schema-foundation`, `pnpm install`, `pnpm db:generate`, `pnpm --filter @bugmonkey/shared typecheck`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, `git diff --check`.
- Tests/checks performed: `pnpm db:generate` reported no schema changes after the initial migration was generated; `pnpm --filter @bugmonkey/shared typecheck`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, and `git diff --check` passed.
- Supabase verification: local Supabase CLI/Docker migration application was not run; it remains optional for this milestone.
- Result: shared validation contracts and Drizzle schema were added, initial Supabase/Postgres tables and RLS policies were generated, and docs now describe the database, ownership, scanner evidence, and report payload foundations. No auth UI, Supabase client wiring, scanner behavior, storage uploads, LLM calls, or UI changes were added.
- Secrets check: no real Supabase URLs, keys, service role secrets, database passwords, private screenshots, or real user data were added.
- Known issues: `pnpm test` remains a placeholder until real test coverage is introduced.

## 2026-05-28 - Supabase project configuration docs

- Branch: `chore/configure-supabase-project`.
- Task attempted: add safe local Supabase project configuration documentation and placeholder env examples without applying remote migrations.
- Files changed: `.gitignore`, `.env.example`, `apps/web/.env.example`, `apps/worker/.env.example`, `README.md`, `docs/specs/database.md`, `docs/specs/security.md`, `docs/specs/deployment.md`, `PLAN_LOG.md`.
- Commands run: `git switch main`, `git pull --ff-only origin main`, `git switch -c chore/configure-supabase-project`, repository inspection commands, `pnpm db:generate`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, `git diff --check`, tracked-file secret pattern scans.
- Tests/checks performed: `pnpm db:generate` reported no schema changes; `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, and `git diff --check` passed. Tracked setup/docs files were scanned for Supabase URL/key/password patterns with no matches.
- Remote migrations: not applied. `supabase login`, `supabase link`, and `supabase db push` were intentionally not run.
- Result: safe Supabase local configuration docs and placeholder env examples were added without product behavior changes.
- Secrets check: only placeholder env values were added; no real Supabase values should be committed.

## 2026-05-28 - Local Supabase project link

- Branch: `chore/configure-supabase-project`.
- Task attempted: link the local Supabase CLI workspace to the real BugMonkey Supabase project without applying migrations or committing secrets.
- Files changed: `.gitignore`.
- Commands run: `pnpm dlx supabase projects list --output json`, `pnpm dlx supabase link --project-ref <redacted>`, `pnpm dlx supabase migration list`, `git diff --check`.
- Tests/checks performed: Supabase CLI linked successfully; migration list completed as a read-only verification; `git diff --check` passed.
- Remote migrations: not applied. `supabase db push` and `supabase db reset` were intentionally not run.
- Result: local Supabase CLI metadata was created under `supabase/.temp/`, and `.gitignore` now excludes that local link metadata.
- Secrets check: no project password, Supabase keys, database URL, or project-specific link metadata should be committed.

## 2026-05-28 - Local Supabase env cleanup

- Branch: `chore/configure-supabase-project`.
- Task attempted: keep only local `.env.local` files needed for development and remove duplicate plain `.env` files from the workspace.
- Files changed: `PLAN_LOG.md`.
- Commands run: local env filename/variable-name checks, `pnpm dlx supabase migration list`, `git status --short --ignored`.
- Tests/checks performed: local Supabase link metadata is present; read-only remote migration listing completed successfully; local `.env.local` files are ignored by Git.
- Remote migrations: not applied. `supabase db push` and `supabase db reset` were intentionally not run.
- Result: root, web, and worker `.env.local` files remain locally with restrictive permissions; duplicate plain `.env` files were removed.
- Secrets check: no secret values were printed or committed.

## 2026-05-28 - Remote Supabase migration apply

- Branch: `chore/configure-supabase-project`.
- Task attempted: apply the existing committed Supabase migration to the linked remote Supabase project after explicit approval.
- Files changed: `PLAN_LOG.md`.
- Commands run: preflight inspection commands, `pnpm dlx supabase migration list`, approved `pnpm dlx supabase db push`, read-only remote verification queries, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, `git diff --check`.
- Tests/checks performed: remote migration list shows local migration `0000` matched to remote migration `0000`; read-only verification found 7/7 expected tables, 8/8 expected enums, RLS enabled on 7/7 tables, and policies present on 7/7 tables; `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm --filter @bugmonkey/web build`, and `git diff --check` passed.
- Remote migrations: applied. `0000_remarkable_quasimodo.sql` was pushed to the linked remote Supabase database.
- Result: remote Supabase database now has the Milestone 003 schema, enums, indexes, foreign keys, and RLS policies.
- Secrets check: no project password, Supabase keys, database URL, or project-specific link metadata were printed or committed.
