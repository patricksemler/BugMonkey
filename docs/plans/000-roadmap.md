# 000 - Roadmap

## Goal

Build BugMonkey as a realistic MVP: a Vercel-hosted Next.js dashboard with a separate Playwright worker, deterministic rule-based reporting, optional AI-enhanced summaries, and clear export formats.

## Recommended Implementation Order

1. Repo foundation.
2. Web UI shell.
3. Shared contracts.
4. Database, auth, and storage.
5. Worker scanner MVP.
6. Rule-based report engine.
7. AI provider architecture.
8. Deployment.
9. Polish, demo assets, and README updates.

## MVP Boundaries

- Max pages per scan: 10.
- Max crawl depth: 2.
- Max time per page: 10 seconds.
- Viewports: desktop and mobile.
- Hosted mode blocks localhost and private networks.
- Rule-based mode works without LLM calls.
- AI-enhanced mode only summarizes captured evidence.

## Milestones

- `001-repo-foundation.md`
- `002-web-ui-shell.md`
- `003-database-auth-storage.md`
- `004-worker-scanner-mvp.md`
- `005-rule-based-report-engine.md`
- `006-ai-provider-architecture.md`
- `007-deployment.md`
- `008-polish-demo-readme.md`

## Acceptance

The MVP lets a user create or view a demo project, run or inspect a scan, review deterministic issues and evidence, and export Markdown or JSON without requiring an LLM API key.

