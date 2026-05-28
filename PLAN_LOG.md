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
