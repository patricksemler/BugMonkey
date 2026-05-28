# Export Formats Spec

## Purpose

BugMonkey reports should be useful outside the dashboard.

## MVP Formats

- Markdown report.
- GitHub issue body.
- JSON evidence export.

## Markdown Report

Should include score, severity counts, launch blockers, recommended fixes, affected URLs, reproduction steps, and evidence references.

## GitHub Issue Body

Should focus on one issue and include title, severity, affected URL, reproduction steps, evidence, and suggested fix.

## JSON Evidence Export

Should preserve structured scan evidence and issue classification for debugging and downstream tools.

## Next Step

Define stable export DTOs after report DTOs exist.

