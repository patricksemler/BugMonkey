# LLM Providers Spec

## Purpose

AI-enhanced reporting improves readability and prioritization, but it must never replace scan evidence or become required for core reporting.

## Providers

- `RuleBasedReportProvider`
- `MockReportProvider`
- `LLMReportProvider`

## Environment

```bash
REPORT_MODE=rule_based
LLM_PROVIDER=
LLM_MODEL=
LLM_API_KEY=
```

Allowed report modes:

- `rule_based`
- `mock`
- `llm_enhanced`

Allowed LLM providers:

- `openai`
- `compatible`

## Rules

- Default to `rule_based`.
- Missing LLM configuration must not break scans or reports.
- LLMs may only summarize, group, prioritize, and explain captured evidence.
- LLMs must not invent bugs.

## Next Step

Design provider input and output types after the rule-based report DTOs exist.

