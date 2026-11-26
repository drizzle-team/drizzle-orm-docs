---
title: "Drizzle ORM v0.45.0 release"
pubDate: 2025-12-04T15:21:19Z
version: "0.45.0"
description: "Allows subqueries in select fields and fixes PostgreSQL transaction pool detection, SQL-valued update hooks and Bun SQL date mapping."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.45.0)

- Fixed pg-native Pool detection in node-postgres transactions  
- Allowed subqueries in select fields  
- Updated typo algorythm => algorithm  
- Fixed `$onUpdate` not handling `SQL` values (fixes [#2388](https://github.com/drizzle-team/drizzle-orm/issues/2388), tests implemented by [L-Mario564](https://github.com/L-Mario564) in [#2911](https://github.com/drizzle-team/drizzle-orm/pull/2911))
- Fixed `pg` mappers not handling `Date` instances in `bun-sql:postgresql` driver responses for `date`, `timestamp` types (fixes [#4493](https://github.com/drizzle-team/drizzle-orm/issues/4493))

