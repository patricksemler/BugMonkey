# 003 - Database, Auth, And Storage

## Goal

Add the persistence layer for projects, scans, pages, issues, evidence assets, scan events, and report mode.

## Decisions Needed

- Supabase Auth or Auth.js.
- Supabase Postgres or Neon Postgres.
- Supabase Storage, Vercel Blob, or S3-compatible storage.
- Prisma or Drizzle.

## Changes

- Add schema for users, projects, scans, scanned pages, issues, evidence assets, scan events, and exports.
- Store report mode per scan.
- Store raw evidence before report summaries.
- Add local setup and migration commands.
- Add demo-mode data strategy without requiring real accounts.

## Verification

- Migrations apply locally.
- Basic project and scan records can be created and read.
- Evidence assets have stable references.
- README setup instructions are updated.

