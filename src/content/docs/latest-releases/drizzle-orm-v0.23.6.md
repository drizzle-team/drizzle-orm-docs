---
title: "Drizzle ORM v0.23.6 release"
pubDate: 2023-04-05T11:17:26Z
version: "0.23.6"
description: "Fixes aliased field references, IN query generation and column types, and allows readonly arrays in PostgreSQL enum definitions."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.23.6)

- 🐛 Fixed referencing the selected aliased field in the same query
- 🐛 Fixed decimal column data type in MySQL
- 🐛 Fixed mode autocompletion for integer column in SQLite
- 🐛 Fixed extra parentheses in the generated SQL for the `IN` operator (#382)
- 🐛 Fixed regression in `pgEnum.enumValues` type (#358)
- 🎉 Allowed readonly arrays to be passed to `pgEnum`

