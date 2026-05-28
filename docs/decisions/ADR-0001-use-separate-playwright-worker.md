# ADR-0001 - Use Separate Playwright Worker

## Status

Accepted

## Context

Playwright browser automation can be heavy and long-running. BugMonkey's web app is intended for Vercel, where normal serverless request paths are not a good primary home for long scans.

## Decision

Keep Playwright scanning in `apps/worker`, separate from `apps/web`.

## Consequences

- The web app creates scan jobs and reads results.
- The worker owns crawling, browser automation, screenshots, and raw evidence capture.
- Local worker execution is acceptable for the MVP.
- Deployment must include a separate worker path later.

