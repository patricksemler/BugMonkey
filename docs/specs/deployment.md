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

Milestone 003 adds Supabase and shared-schema foundations, but the web app remains static/mock-only. `pnpm --filter @bugmonkey/web build` must pass without Supabase environment variables.

Future browser-side Supabase configuration may use only public values such as `NEXT_PUBLIC_SUPABASE_URL` and either `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Service role keys, secret keys, and direct database URLs must remain server-only and untracked.

## Worker

`apps/worker` owns Playwright scanning and can run locally for the MVP once implemented. The worker/scanner is not implemented yet. Later deployment options include Render, Fly.io, Railway, Docker VPS, or similar.

Do not run Playwright scanner execution in Supabase Edge Functions or normal Vercel UI routes.

Future worker deployment may use server-only Supabase values from its runtime environment. Do not expose worker secrets to the Vercel browser bundle.

## Constraint

Long Playwright scans must not depend on standard Vercel serverless functions as the primary architecture.

## Next Step

Document the local worker handoff after scan job persistence exists.
