# 001 - Repo Foundation

## Goal

Initialize the repository with docs, monorepo placeholders, safe tooling skeletons, and a design-system direction.

## Changes

- Create root docs: `README.md`, `AGENTS.md`, `CLAUDE.md`, `PLAN.md`, `PLAN_LOG.md`, `CHANGELOG.md`, and `CONTRIBUTING.md`.
- Create workspace folders: `apps/web`, `apps/worker`, and `packages/shared`.
- Create `docs/plans`, `docs/specs`, `docs/decisions`, `docs/logs`, and `docs/architecture`.
- Add `package.json`, `pnpm-workspace.yaml`, `.gitignore`, `.editorconfig`, `.env.example`, and `tsconfig.base.json`.
- Use placeholder scripts only.

## Non-Goals

- No Next.js app.
- No scanner code.
- No database schema.
- No auth or storage integration.
- No LLM provider implementation.

## Verification

- `git status --short`
- `git diff --check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm test`

If `pnpm` is unavailable, record that in `PLAN_LOG.md`.

