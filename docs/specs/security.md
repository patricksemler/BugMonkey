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
- Use Supabase Auth user IDs as app data owners without duplicating Auth users in public tables.
- Enable Row Level Security on public app tables and scope user-owned data through `auth.uid()`.
- Keep service role credentials server-only for future trusted worker or backend operations.
- Keep Supabase secret keys and database URLs out of browser code, docs, commit messages, PR bodies, and logs.
- Only public Supabase URL and anon/publishable key values may be used by future browser code.
- Use private Supabase Storage buckets, storage RLS, and signed URLs for future evidence access.

## AI Safety

- Do not send evidence to LLM providers unless AI-enhanced mode is explicitly configured.
- LLM summaries must be grounded in captured evidence.

## Next Step

Formalize URL validation and hosted-mode network-blocking rules before worker implementation. Auth UI and storage uploads remain outside Milestone 003.
