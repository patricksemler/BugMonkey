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

## Safety

Hosted mode must block localhost and private network targets unless explicitly running in local development mode.

## Next Step

Define shared scan config types in `packages/shared` before implementing the worker.

