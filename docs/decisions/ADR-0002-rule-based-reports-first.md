# ADR-0002 - Rule-Based Reports First

## Status

Accepted

## Context

BugMonkey must work for users without requiring paid LLM API calls. The scanner's evidence should be the source of truth.

## Decision

Implement deterministic rule-based reporting first and make it the default with `REPORT_MODE=rule_based`.

## Consequences

- Reports work without API keys.
- Severity rules and templates must be maintained as product logic.
- AI-enhanced mode can improve summaries later but cannot replace core reporting.

