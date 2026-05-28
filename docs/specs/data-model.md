# Data Model Spec

## Purpose

Persist projects, scan jobs, raw evidence, issues, events, and report outputs.

## Planned Entities

- User.
- Project.
- Scan.
- Scanned page.
- Issue.
- Evidence asset.
- Scan event.
- Export.

## Requirements

- Store report mode per scan.
- Store raw evidence before summaries.
- Link issues to affected URLs and evidence records.
- Track screenshots and logs as evidence assets.
- Support demo data without requiring production credentials.

## Decisions Needed

- Supabase Auth or Auth.js.
- Supabase Postgres or Neon Postgres.
- Prisma or Drizzle.
- Storage provider.

## Next Step

Choose database and ORM during `003-database-auth-storage`.

