# Report Engine Spec

## Purpose

The report engine turns structured scan evidence into a launch-readiness report.

## Modes

- `rule_based`: default, deterministic, no LLM calls.
- `mock`: deterministic provider for demos and tests.
- `llm_enhanced`: optional evidence-bound enhancement mode.

The selected report mode is stored per scan and should use the shared `reportModeSchema`.

## Rule-Based Requirements

- Classify issues deterministically.
- Assign severity using documented rules.
- Generate a launch score.
- Generate basic reproduction steps.
- Generate template-based summaries.
- Generate generic suggested fixes.
- Export Markdown and JSON.

## Initial Issue Types

- `PAGE_LOAD_FAILED`
- `HTTP_ERROR_STATUS`
- `FAILED_NETWORK_REQUEST`
- `CONSOLE_ERROR`
- `BROKEN_LINK`
- `BUTTON_INTERACTION_ERROR`
- `FORM_SUBMISSION_ERROR_SAFE_ONLY`
- `MISSING_TITLE`
- `MISSING_META_DESCRIPTION`
- `IMAGE_MISSING_ALT`
- `MOBILE_HORIZONTAL_OVERFLOW`
- `SLOW_PAGE_LOAD_WARNING`

## Shared Contracts

Report outputs should validate against `@bugmonkey/shared/contracts` before persistence:

- `issueTypeSchema` and `issueSeveritySchema` define the stable rule issue vocabulary.
- `issueEvidencePayloadSchema` keeps report claims grounded in captured scanner evidence.
- `reportOutputPayloadSchema` stores generated report/export payloads in `report_outputs`.

## Next Step

Implement deterministic report generation against the shared contracts before adding optional provider logic.
