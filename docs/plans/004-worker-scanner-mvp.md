# 004 - Worker Scanner MVP

## Goal

Build a local Playwright worker that crawls a target URL within strict limits and writes structured evidence.

## Changes

- Implement worker entrypoint in `apps/worker`.
- Validate scan URLs and block private targets in hosted mode.
- Crawl internal links up to 10 pages and depth 2.
- Capture desktop and mobile screenshots.
- Capture page status, console errors, failed network requests, broken links, and page timing.
- Detect safe interaction issues without destructive form submission.
- Deduplicate URLs before visiting.
- Respect per-page and total scan timeout boundaries.

## Initial Issue Types

- `PAGE_LOAD_FAILED`
- `HTTP_ERROR_STATUS`
- `FAILED_NETWORK_REQUEST`
- `CONSOLE_ERROR`
- `BROKEN_LINK`
- `BUTTON_INTERACTION_ERROR`
- `FORM_SUBMISSION_ERROR_SAFE_ONLY`
- `SLOW_PAGE_LOAD_WARNING`

## Verification

- Worker can scan a local demo target.
- Worker does not run inside the Next.js request path.
- Failed scans produce structured failure records.

