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
