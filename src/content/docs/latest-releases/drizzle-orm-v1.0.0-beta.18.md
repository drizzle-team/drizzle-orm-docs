---
title: "Drizzle ORM v1.0.0-beta.18 release"
pubDate: 2026-03-17T11:20:34Z
version: "1.0.0-beta.18"
description: "Adds node:sqlite support to Kit and Studio, and fixes TypeScript path alias resolution when loading schema files."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-beta.18)

## New driver support for `kit` and `studio`

You can now use the `node:sqlite` driver to run migrations and browse Drizzle Studio. If `node:sqlite` is available at runtime, we will automatically detect it and use it.

## Fixes 

- resolved tsconfig path aliases in drizzle-kit loader using get-tsconfig + jiti alias mapping
- added fixtures and tests covering wildcard and non-wildcard path aliases
- ensured schema load succeeds for alias imports
- Updated to `hanji@0.0.8` - native bun `stringWidth`, `stripANSI` support, errors for non-TTY environments  
- [[BUG]: drizzle-kit@1.0.0-beta.13 regression in module resolution](https://github.com/drizzle-team/drizzle-orm/issues/5365)
- [[BUG]: drizzle-kit does not support node:sqlite](https://github.com/drizzle-team/drizzle-orm/issues/5471)

