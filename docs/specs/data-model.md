# Data Model Spec

## Purpose

Persist projects, scan jobs, raw evidence, issues, events, and report outputs.

## Entities

- Project.
- Scan.
- Scanned page.
- Issue.
- Evidence asset.
- Scan event.
- Export.

Supabase Auth owns users. App tables reference `auth.users.id`; BugMonkey does not duplicate Auth users in a public app table for Milestone 003.

## Requirements

- Store report mode per scan.
- Store raw evidence before summaries.
- Link issues to affected URLs and evidence records.
- Track screenshots and logs as evidence assets.
- Support demo data without requiring production credentials.

## Decisions

- Supabase Postgres is the database target.
- Supabase Auth is the future identity provider.
- Supabase Storage is the future private evidence storage target.
- Drizzle ORM and Drizzle Kit manage the TypeScript database schema and SQL migrations.
- Zod contracts in `packages/shared` validate shared payloads.

## Next Step

See `docs/specs/database.md` for the table, enum, migration, and RLS details.
