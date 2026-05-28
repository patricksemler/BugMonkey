# 002 - Web UI Shell

## Status

Completed across 002a, 002b, and 002c.

## Completion Summary

- 002a initialized `apps/web` as a real Next.js App Router TypeScript app with Tailwind, local shadcn-style primitives, a static dashboard overview, and a static demo report.
- 002b added real static dashboard routes for projects, scans, settings, and demo issue detail, plus active navigation and reusable empty/loading/error UI treatment.
- 002c completed final static UI polish, added App Router `loading`, `error`, and `not-found` states, extracted shared metric cards, tightened mobile responsiveness, and documented Vercel web-app readiness.

## Branches And PRs

- `feature/static-dashboard-route-polish`
- PR #1: `feat(web): add static dashboard route polish`
- `feature/final-static-ui-vercel-readiness`

## Final Result

The static web dashboard is ready for backend/database integration. It now has polished mock-only route shells for overview, projects, scans, settings, demo report, issue detail, and unknown routes.

## Remaining Non-Goals

- No auth.
- No database.
- No worker.
- No scanner.
- No storage.
- No shared contracts.
- No LLM logic.
- No real deployment or environment-variable requirements.

## Verification

- Web app starts locally.
- Static routes render mock-only content.
- Placeholder pages do not claim unfinished functionality works.
- Desktop and mobile layouts have no obvious overlap or clipped content.
