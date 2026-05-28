# 005 - Rule-Based Report Engine

## Goal

Generate useful launch-readiness reports from structured evidence without LLM calls.

## Changes

- Classify evidence into deterministic issue types.
- Assign severity with rules.
- Generate launch score.
- Generate template-based summaries, reproduction steps, and generic suggested fixes.
- Generate Markdown report export.
- Generate JSON evidence export.

## Severity Defaults

- Critical: main page cannot load, primary route returns 500, or app crashes during core interaction.
- High: login/signup/contact failure, API request failure during interaction, repeated important console errors, or broken important navigation.
- Medium: internal 404, mobile overflow, missing labels, important image missing alt text, or failed non-critical asset.
- Low: missing meta description, minor accessibility issue, slow load warning, or minor console warning.

## Verification

- `REPORT_MODE=rule_based` works without LLM API keys.
- Reports cite evidence records rather than invented findings.
- Markdown and JSON exports are stable and readable.

