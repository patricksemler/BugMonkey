# Security Spec

## Purpose

BugMonkey scans untrusted URLs. Security and abuse prevention are core product requirements.

## Scan Safety

- Validate URLs before scanning.
- Block localhost and private IP ranges in hosted mode.
- Avoid destructive actions.
- Do not submit dangerous forms.
- Enforce crawl limits and timeouts.
- Do not store real user secrets in logs or reports.

## Data Safety

- Never commit `.env` files.
- Never commit API keys, tokens, private screenshots, or real user data.
- Store evidence assets with controlled access.
- Treat screenshots and logs as potentially sensitive.

## AI Safety

- Do not send evidence to LLM providers unless AI-enhanced mode is explicitly configured.
- LLM summaries must be grounded in captured evidence.

## Next Step

Formalize URL validation and hosted-mode network-blocking rules before worker implementation.

