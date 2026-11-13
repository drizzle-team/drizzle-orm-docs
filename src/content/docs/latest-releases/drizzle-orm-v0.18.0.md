---
title: "Drizzle ORM v0.18.0 release"
pubDate: 2023-02-06T12:28:08Z
version: "0.18.0"
description: "Improves partial-select join types and renames the Postgres.js and SQL.js driver import paths to avoid bundling errors."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.18.0)

- Improved join result types for partial selects (refer to the [docs](https://github.com/drizzle-team/drizzle-orm/blob/0.18.0/docs/joins.md) page for more information)
- Renamed import paths for Postgres.js and SQL.js drivers to avoid bundling errors:
  - `drizzle-orm/postgres.js` -> `drizzle-orm/postgres-js`
  - `drizzle-orm/sql.js` -> `drizzle-orm/sql-js`

