# Deployment Spec

## Purpose

Deploy BugMonkey with a Vercel web app and a separate worker runtime.

## Web App

`apps/web` is deployed to Vercel and owns:

- Landing page.
- Auth.
- Dashboard.
- Project CRUD.
- Scan creation UI.
- Report viewing.
- Issue detail pages.
- Export routes.
- Demo mode.
- Normal API routes.

For the current static UI milestone, configure the Vercel project Root Directory as `apps/web` and rely on Vercel's Next.js framework detection. A root `vercel.json` is not required for the current monorepo shape.

## Worker

`apps/worker` owns Playwright scanning and can run locally for the MVP once implemented. The worker/scanner is not implemented yet. Later deployment options include Render, Fly.io, Railway, Docker VPS, or similar.

## Constraint

Long Playwright scans must not depend on standard Vercel serverless functions as the primary architecture.

## Next Step

Document the local worker handoff after scan job persistence exists.
