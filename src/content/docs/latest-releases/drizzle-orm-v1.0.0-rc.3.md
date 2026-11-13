---
title: "Drizzle ORM v1.0.0-rc.3 release"
pubDate: 2026-05-18T20:00:23Z
version: "1.0.0-rc.3"
description: "Updates MySQL query execution and result mapping, removes MySQL RQBv1, and adds iterator fallbacks for drivers without streaming support."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.3)

# v1.0.0-rc.3

Porting all the changes that were made in PostgreSQL to other dialects. This release is about MySQL:

- Removed RQBv1 from `mysql` dialect (`._query`)
- Internal MySQL sessions refactoring and moving to a unified query preparation function
- Fallback to regular queries on iterators for drivers that don't support streaming instead of throwing an error for compatibility
- Enabled optimized non-jit mappers for regular queries for MySQL dialect
- Switched RQBv2 to array mode querying, disabled root query level JSON conversions
- Fixed MySQL proxy driver not using `lastInsertId`, `affectedRows` from dedicated response fields

Next releases will include:
- Effect MySQL support 
- SQLite rework (same as this release for MySQL)
- SQLite Effect Support

