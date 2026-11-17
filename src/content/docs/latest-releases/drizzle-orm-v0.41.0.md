---
title: "Drizzle ORM v0.41.0 release"
pubDate: 2025-03-21T15:49:14Z
version: "0.41.0"
description: "Adds number and bigint modes for decimal/numeric columns and fixes data mapping across drivers. SQL.js no longer exposes free()."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.41.0)

- `bigint`, `number` modes for `SQLite`, `MySQL`, `PostgreSQL`, `SingleStore` `decimal` & `numeric` column types  
- Changed behavior of `sql-js` query preparation to query prebuild instead of db-side prepare due to need to manually free prepared queries, removed `.free()` method  
- Fixed `MySQL`, `SingleStore` `varchar` allowing not specifying `length` in config  
- Fixed `MySQL`, `SingleStore` `binary`, `varbinary` data\\type mismatches  
- Fixed `numeric`\\`decimal` data\\type mismatches: [#1290](https://github.com/drizzle-team/drizzle-orm/issues/1290), [#1453](https://github.com/drizzle-team/drizzle-orm/issues/1453)  
- Fixed `drizzle-studio` + `AWS Data Api` connection issue: [#3224](https://github.com/drizzle-team/drizzle-orm/issues/3224)  
- Fixed `isConfig` utility function checking types of wrong fields  
- Enabled `supportBigNumbers` in auto-created `mysql2` driver instances  
- Fixed custom schema tables querying in RQBv1: [#4060](https://github.com/drizzle-team/drizzle-orm/issues/4060)  
- Removed in-driver mapping for postgres types `1231` (`numeric[]`), `1115` (`timestamp[]`), `1185` (`timestamp_with_timezone[]`), `1187` (`interval[]`), `1182` (`date[]`), preventing precision loss and data\\type mismatches  
- Fixed `SQLite` `buffer`-mode `blob` sometimes returning `number[]`

