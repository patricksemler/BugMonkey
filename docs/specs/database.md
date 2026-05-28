# Database Spec

## Purpose

BugMonkey uses Supabase Postgres for persistent app data. Supabase Auth remains the source of user identity, and app tables reference Auth user IDs instead of duplicating users in a local profile table.

## Tooling

- Drizzle ORM defines the TypeScript-first database schema in `packages/shared/src/db/schema.ts`.
- Drizzle Kit generates SQL migrations into `supabase/migrations`.
- Zod contracts in `packages/shared/src/contracts` validate scan, issue, evidence, and report payloads before they are stored as JSONB.
- A hosted Supabase project is not required to build the current static web app.

## Tables

### `projects`

Stores user-owned scan targets.

- `id uuid primary key`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `name text not null`
- `target_url text not null`
- `created_at`, `updated_at`, `archived_at`
- Indexes: `user_id`, `created_at`

### `scans`

Stores scan jobs and run-level configuration.

- `id uuid primary key`
- `project_id uuid not null references projects(id) on delete cascade`
- `target_url text not null`
- `status scan_status not null default 'queued'`
- `report_mode report_mode not null default 'rule_based'`
- `config jsonb not null`
- `started_at`, `completed_at`, `failed_reason`, `created_at`, `updated_at`
- Indexes: `project_id`, `status`, `created_at`

### `scan_pages`

Stores per-page scan results.

- `id uuid primary key`
- `scan_id uuid not null references scans(id) on delete cascade`
- `url text not null`
- `final_url text`
- `status_code integer`
- `title text`
- `load_time_ms integer`
- `result jsonb not null default '{}'`
- Indexes: `scan_id`, `url`

### `issues`

Stores rule-detected issues and evidence payloads.

- `id uuid primary key`
- `scan_id uuid not null references scans(id) on delete cascade`
- `page_id uuid references scan_pages(id) on delete set null`
- `type issue_type not null`
- `severity issue_severity not null`
- `title text not null`
- `affected_url text not null`
- `evidence jsonb not null default '{}'`
- `fingerprint text`
- `created_at`, `updated_at`
- Indexes: `scan_id`, `page_id`, `severity`, `type`
- Unique index: `(scan_id, fingerprint)` for non-null issue dedupe fingerprints

### `evidence_assets`

Stores references to future evidence files. This milestone does not upload files.

- `id uuid primary key`
- `scan_id uuid not null references scans(id) on delete cascade`
- `page_id uuid references scan_pages(id) on delete set null`
- `issue_id uuid references issues(id) on delete set null`
- `type evidence_asset_type not null`
- `viewport viewport_type`
- `storage_bucket text`
- `storage_path text`
- `metadata jsonb not null default '{}'`
- `captured_at timestamptz not null`
- Indexes: `scan_id`, `issue_id`, `type`

### `scan_events`

Stores append-style scan progress and diagnostic events.

- `id uuid primary key`
- `scan_id uuid not null references scans(id) on delete cascade`
- `page_id uuid references scan_pages(id) on delete set null`
- `type scan_event_type not null`
- `message text`
- `payload jsonb not null default '{}'`
- `created_at timestamptz not null`
- Indexes: `scan_id`, `type`, `created_at`

### `report_outputs`

Stores generated report/export payloads.

- `id uuid primary key`
- `scan_id uuid not null references scans(id) on delete cascade`
- `mode report_mode not null`
- `format report_output_format not null`
- `score integer`
- `payload jsonb not null`
- `generated_at timestamptz not null`
- Unique index: `(scan_id, mode, format)`

## Enums

- `scan_status`: `queued`, `running`, `completed`, `failed`, `canceled`
- `issue_type`: `PAGE_LOAD_FAILED`, `HTTP_ERROR_STATUS`, `FAILED_NETWORK_REQUEST`, `CONSOLE_ERROR`, `BROKEN_LINK`, `BUTTON_INTERACTION_ERROR`, `FORM_SUBMISSION_ERROR_SAFE_ONLY`, `MISSING_TITLE`, `MISSING_META_DESCRIPTION`, `IMAGE_MISSING_ALT`, `MOBILE_HORIZONTAL_OVERFLOW`, `SLOW_PAGE_LOAD_WARNING`
- `issue_severity`: `critical`, `high`, `medium`, `low`
- `report_mode`: `rule_based`, `mock`, `llm_enhanced`
- `viewport_type`: `desktop`, `mobile`
- `evidence_asset_type`: `screenshot`, `console_log`, `network_log`, `trace`, `html_snapshot`, `report_export`
- `scan_event_type`: `scan_queued`, `scan_started`, `page_started`, `page_completed`, `page_failed`, `issue_detected`, `asset_captured`, `scan_completed`, `scan_failed`
- `report_output_format`: `json`, `markdown`

## RLS Ownership

RLS is enabled on all public app tables.

- `projects` policies compare `projects.user_id` to `auth.uid()`.
- Child table policies verify ownership through `scans -> projects`.
- Policies explicitly require `auth.uid()` to be non-null.
- Future trusted server or worker code may use a server-only service role key. It must never be exposed to browser code.

## Migration Strategy

Generate SQL migrations without a live database:

```bash
pnpm db:generate
```

Optional local Supabase verification can apply migrations with the Supabase CLI:

```bash
supabase start
supabase db reset
```

The current static web build must continue to pass without Supabase environment variables.
