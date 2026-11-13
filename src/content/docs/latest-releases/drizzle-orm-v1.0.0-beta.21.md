---
title: "Drizzle ORM v1.0.0-beta.21 release"
pubDate: 2026-04-14T09:40:10Z
version: "1.0.0-beta.21"
description: "Corrects PostgreSQL enum conflict checks and merges enum values added on separate migration branches."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-beta.21)

More fixes for the drizzle-kit migration process and commutativity checks

- Adding a value to a PostgreSQL enum will no longer be treated as commutative
- Enum values added in different leaves will now be merged properly

