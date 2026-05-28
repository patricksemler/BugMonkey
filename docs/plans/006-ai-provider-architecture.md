# 006 - AI Provider Architecture

## Goal

Add an optional report-provider architecture that can enhance report quality without becoming required for core behavior.

## Changes

- Add `RuleBasedReportProvider`.
- Add `MockReportProvider`.
- Add `LLMReportProvider` shell.
- Support `REPORT_MODE=rule_based | mock | llm_enhanced`.
- Support `LLM_PROVIDER=openai | compatible`.
- Keep `REPORT_MODE=rule_based` as the default.

## Constraints

- The scanner remains the source of truth.
- LLMs may only summarize, group, prioritize, and explain captured evidence.
- LLMs must not invent bugs.
- Missing API keys must not break rule-based mode.

## Verification

- Rule-based mode works without network calls.
- Mock mode is deterministic enough for tests and demos.
- LLM mode fails gracefully when not configured.

