# ADR-0004 - Use pnpm Monorepo

## Status

Accepted

## Context

BugMonkey has a web app, worker, and shared package. A workspace layout keeps boundaries clear while allowing shared TypeScript contracts.

## Decision

Use `pnpm` workspaces with `apps/*` and `packages/*`.

## Consequences

- Dependency boundaries stay visible.
- Shared schemas and constants can be imported by web and worker packages.
- Contributors should use `corepack enable` before installing dependencies.

