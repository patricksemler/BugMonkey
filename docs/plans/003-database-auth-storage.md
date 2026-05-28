# 003 - Supabase Database And Shared Schema Foundation

## Goal

Define the persistence layer and shared validation contracts for projects, scans, pages, issues, evidence assets, scan events, and report outputs.

## Decisions

- Use Supabase Postgres for persistent app data.
- Use Supabase Auth as the future user identity source.
- Use Supabase Storage later for private evidence assets and signed URLs.
- Use Drizzle ORM and Drizzle Kit for TypeScript-first schema and SQL migration generation.
- Use Zod in `packages/shared` for runtime validation across future web, worker, scanner, and report-engine code.

## Changes

- Do not add an app `users` table in this milestone. Reference `auth.users.id` from user-owned app tables.
- Add schema for projects, scans, scanned pages, issues, evidence assets, scan events, and report outputs.
- Store report mode per scan.
- Store raw evidence before report summaries.
- Add local migration generation through Drizzle Kit without requiring a hosted Supabase connection.
- Keep the current static web app buildable without Supabase environment variables.

## Non-Goals

- No Supabase Auth UI.
- No database wiring in the current UI.
- No scanner behavior.
- No storage uploads.
- No LLM calls.

## Verification

- `pnpm db:generate`
- `pnpm --filter @bugmonkey/shared typecheck`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`
- `pnpm --filter @bugmonkey/web build`
