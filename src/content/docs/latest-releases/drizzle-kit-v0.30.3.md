---
title: "Drizzle Kit v0.30.3 release"
pubDate: 2025-01-27T10:42:17Z
version: "0.30.3"
description: "Handles unsupported SingleStore schema alterations through table recreation and data transfer, and fixes index naming errors."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.30.3)

## SingleStore `push` and `generate` improvements

As SingleStore did not support certain DDL statements before this release, you might encounter an error indicating that some schema changes cannot be applied due to a database issue. Starting from this version, drizzle-kit will detect such cases and initiate table recreation with data transfer between the tables

## Bug fixes

- [[BUG] If the index name is the same as the generated name, it will be empty and a type error will occur](https://github.com/drizzle-team/drizzle-orm/issues/3420)

