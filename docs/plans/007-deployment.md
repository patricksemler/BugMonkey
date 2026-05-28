# 007 - Deployment

## Goal

Document and implement deployment paths for the Vercel web app and separate worker runtime.

## Changes

- Deploy `apps/web` to Vercel.
- Keep scan creation and report viewing in the web app.
- Keep long Playwright scans in `apps/worker`.
- Document local worker MVP operation.
- Document later worker targets: Render, Fly.io, Railway, Docker VPS, or similar.
- Add hosted-mode scan safety restrictions.

## Verification

- Web app can run on Vercel without bundling Playwright scanner execution into normal UI routes.
- Worker can run separately with documented environment variables.
- Hosted scans block private network targets.

