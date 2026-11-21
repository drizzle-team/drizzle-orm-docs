---
title: "Drizzle ORM v0.39.1 release"
pubDate: 2025-01-29T16:28:18Z
version: "0.39.1"
description: "Fixes stacked SQLite conflict clauses, adds aliased view support and corrects schema prefixes on aliased objects."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.39.1)

- Fixed SQLite onConflict clauses being overwritten instead of stacked - [#2276](https://github.com/drizzle-team/drizzle-orm/issues/2276)
- Added view support to `aliasedTable()`
- Fixed sql builder prefixing aliased views and tables with their schema

