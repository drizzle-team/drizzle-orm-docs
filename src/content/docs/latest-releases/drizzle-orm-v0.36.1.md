---
title: "Drizzle ORM v0.36.1 release"
pubDate: 2024-11-06T20:10:31Z
version: "0.36.1"
description: "Fixes query placeholders, PostgreSQL identity-column inserts and bigint handling with Bun."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.36.1)

## Bug Fixes

- [[BUG]: Using sql.placeholder with limit and/or offset for a prepared statement produces TS error](https://github.com/drizzle-team/drizzle-orm/issues/2146) - thanks @L-Mario564
- [[BUG] If a query I am trying to modify with a dynamic query (....$dynamic()) contains any placeholders, I'm getting an error that says No value for placeholder.... provided](https://github.com/drizzle-team/drizzle-orm/issues/2272) - thanks @L-Mario564
- [[BUG]: Error thrown when trying to insert an array of new rows using generatedAlwaysAsIdentity() for the id column](https://github.com/drizzle-team/drizzle-orm/issues/2849) - thanks @L-Mario564
- [[BUG]: Unable to Use BigInt Types with Bun and Drizzle](https://github.com/drizzle-team/drizzle-orm/issues/2603) - thanks @L-Mario564

