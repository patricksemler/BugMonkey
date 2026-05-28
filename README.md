# BugMonkey

Find the bugs your users would notice before your first user sees them.

BugMonkey is an AI-assisted pre-launch QA scanner for solo developers, students, indie hackers, hackathon teams, and small software teams. Paste a deployed web app URL, run an automated Playwright scan, and get a launch-readiness report with screenshots, console errors, failed network requests, broken links, mobile layout issues, severity scoring, reproduction steps, and GitHub-ready bug report text.

## Status

This repository is in foundation setup. The first implementation pass intentionally contains only documentation, monorepo placeholders, and tooling skeletons.

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
- Postgres via Supabase or Neon, to be decided later
- Object storage via Supabase Storage, Vercel Blob, or S3-compatible storage, to be decided later

## Local Setup

Prerequisite:

```bash
corepack enable
```

Install dependencies after the real app packages exist:

```bash
pnpm install
```

Current placeholder checks:

```bash
pnpm lint
pnpm typecheck
pnpm test
```

## Environment

Copy `.env.example` to `.env.local` when implementation begins. Rule-based mode is the default and must work without API keys.

```bash
REPORT_MODE=rule_based
```

## Planned Commands

These commands are intentionally placeholders until the matching packages are created.

```bash
pnpm dev:web
pnpm dev:worker
pnpm scan:demo
```

## Roadmap

See [PLAN.md](/Users/user/Documents/Projects/BugMonkey/PLAN.md) and [docs/plans/000-roadmap.md](/Users/user/Documents/Projects/BugMonkey/docs/plans/000-roadmap.md).

## Limitations And Safety

- Hosted scans must block localhost and private network targets unless explicitly running in local development mode.
- Scans must validate URLs, respect crawl limits, and avoid destructive actions.
- AI providers may only summarize and explain captured evidence. They must not invent bugs.

