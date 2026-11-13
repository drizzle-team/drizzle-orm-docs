---
title: "Drizzle ORM v0.26.2 release"
pubDate: 2023-05-29T20:48:58Z
version: "0.26.2"
description: "Fixes SQLite composite-key upserts and PostgreSQL conflict clauses, and adds experimental PostgreSQL OpenTelemetry support."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.26.2)

- 🐛 Fixed upsert targeting composite keys for SQLite (#521)
- 🐛 AWS Data API+Postgres: fixed adding of typings when merging queries (#517)
- 🐛 Fixed "on conflict" with "where" clause for Postgres (#651)
- 🐛 Various GitHub docs community fixes and improvements ♥ (#547, #548, #587, #606, #609, #625)
- **Experimental**: added OpenTelemetry support for Postgres

