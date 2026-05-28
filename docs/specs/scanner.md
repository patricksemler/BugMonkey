# Scanner Spec

## Purpose

The scanner visits a deployed web app URL with Playwright and captures structured evidence for launch-readiness reporting.

## MVP Limits

- Max pages per scan: 10.
- Max crawl depth: 2.
- Max time per page: 10 seconds.
- Viewports: desktop and mobile.
- Avoid destructive actions.
- Do not submit dangerous forms.
- Deduplicate URLs before visiting.
- Respect scan timeout and failure boundaries.

## Evidence To Capture

- Page URL and status code.
- Page load failure.
- Console errors.
- Failed network requests.
- Screenshots.
- Broken links.
- Simple interaction failures.
- Safe form issues.
- Missing title and meta description.
- Missing image alt text.
- Mobile horizontal overflow.
- Slow page load warning.

## Shared Contracts

Scanner inputs and outputs should validate against `@bugmonkey/shared/contracts` before persistence:

- `scanConfigSchema` controls crawl limits, timeout, target URL, viewport selection, and screenshot capture preference.
- `scanPageResultSchema` captures per-page status, timing, metadata, issue counts, and screenshot asset references.
- `issueEvidencePayloadSchema` stores structured issue evidence while allowing rule-specific details.
- `evidence_asset_type`, `viewport_type`, and `scan_event_type` enums keep worker output compatible with database persistence.

## Safety

Hosted mode must block localhost and private network targets unless explicitly running in local development mode.

## Next Step

Implement the worker against the shared contracts without placing scanner logic in `apps/web`.
