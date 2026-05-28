# BugMonkey

Find the bugs your users would notice before your first user sees them.

BugMonkey is an AI-assisted pre-launch QA scanner for solo developers, students, indie hackers, hackathon teams, and small software teams. Paste a deployed web app URL, run an automated Playwright scan, and get a launch-readiness report with screenshots, console errors, failed network requests, broken links, mobile layout issues, severity scoring, reproduction steps, and GitHub-ready bug report text.

## Status

This repository has the foundation setup, a polished static Next.js web UI shell in `apps/web`, and the first Supabase/Postgres shared schema foundation. Auth UI, scanner execution, storage uploads, and LLM work are not implemented yet.

Demo link: TODO

Screenshots/GIFs: TODO

## Core Principles

- Keep the Next.js dashboard on Vercel.
- Keep Playwright scanning in a separate worker.
- Store raw scan evidence before creating summaries.
- Make rule-based reports work without LLM calls.
- Make AI-enhanced reports optional.
- Use shadcn/ui, Tailwind, Radix primitives, and lucide-react for a clean SaaS UI.
- Keep the repo friendly to coding agents and human contributors.

## Planned Architecture

```text
apps/web       Next.js App Router dashboard deployed to Vercel
apps/worker    Separate Node.js Playwright scanner worker
packages/shared Shared schemas, constants, issue enums, and report types
supabase/      Supabase/Postgres migrations for app data and RLS policies
docs/          Specs, plans, decisions, logs, and architecture notes
```

## Planned Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Radix UI primitives
- lucide-react
- Playwright
- Supabase Postgres
- Supabase Auth
- Supabase Storage for future private evidence assets
- Drizzle ORM and Drizzle Kit
- Zod shared validation contracts

## Local Setup

Prerequisite:

```bash
corepack enable
```

Install dependencies:

```bash
pnpm install
```

Run the web UI locally:

```bash
pnpm dev:web
```

Static demo routes:

```text
/
/projects
/scans
/settings
/demo-report
/demo-report/issues/BM-DEMO-001
```

Current checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm --filter @bugmonkey/web build
```

`pnpm test` is still a placeholder until test coverage is added.

Generate database migrations from the Drizzle schema:

```bash
pnpm db:generate
```

Optional local Supabase verification, when the Supabase CLI and Docker are available:

```bash
supabase start
supabase db reset
```

## Vercel Web Deployment

Create the Vercel project with Root Directory set to `apps/web`. Let Vercel auto-detect the Next.js framework settings from that app directory.

The Playwright worker/scanner is separate and is not implemented yet. Do not run browser scanning inside normal Vercel UI routes.

The current web build does not require Supabase environment variables. Future authenticated database access should use Supabase Auth with cookie-based SSR helpers and RLS-backed tables.

## Environment

Copy `.env.example` to `.env.local` when implementation begins. Rule-based mode is the default and must work without API keys.

```bash
REPORT_MODE=rule_based
```

Optional Supabase placeholders are present for future milestones. Do not commit real project URLs, anon keys, service role keys, or database passwords.

## Planned Commands

These commands are intentionally placeholders until the matching packages are created.

```bash
pnpm dev:worker
pnpm scan:demo
```

## Roadmap

See [PLAN.md](PLAN.md) and [docs/plans/000-roadmap.md](docs/plans/000-roadmap.md).

## Limitations And Safety

- Hosted scans must block localhost and private network targets unless explicitly running in local development mode.
- Scans must validate URLs, respect crawl limits, and avoid destructive actions.
- AI providers may only summarize and explain captured evidence. They must not invent bugs.
- User-owned app data must be protected by Supabase RLS policies using `auth.uid()` ownership checks.
