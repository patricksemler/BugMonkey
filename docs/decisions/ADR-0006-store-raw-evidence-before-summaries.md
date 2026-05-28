# ADR-0006 - Store Raw Evidence Before Summaries

## Status

Accepted

## Context

Reports, exports, and optional AI summaries need to be grounded in real scan observations.

## Decision

Persist raw scan evidence before generating rule-based or AI-enhanced summaries.

## Consequences

- Reports can cite evidence records.
- AI providers are constrained to observed facts.
- Debugging and JSON export are easier.
- Storage design must account for screenshots, logs, and network evidence.

