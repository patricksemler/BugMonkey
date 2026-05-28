# ADR-0003 - Vercel Dashboard And Worker Architecture

## Status

Accepted

## Context

BugMonkey needs a polished web dashboard and a browser automation runtime. These have different hosting and runtime needs.

## Decision

Deploy `apps/web` to Vercel and keep `apps/worker` as a separate Node.js worker.

## Consequences

- Vercel handles landing pages, auth, dashboard, project CRUD, scan creation UI, reports, demo mode, and normal API routes.
- The worker handles long Playwright scan execution.
- Shared types and constants live in `packages/shared`.

