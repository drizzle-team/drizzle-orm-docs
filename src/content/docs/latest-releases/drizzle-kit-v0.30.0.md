---
title: "Drizzle Kit v0.30.0 release"
pubDate: 2024-12-09T13:37:12Z
version: "0.30.0"
description: "Removes PostgreSQL IF NOT EXISTS guards and related wrappers so conflicting schema objects produce errors instead of being silently skipped."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.30.0)

Starting from this update, the PostgreSQL dialect will align with the behavior of all other dialects. It will no longer include `IF NOT EXISTS`, `$DO`, or similar statements, which could cause incorrect DDL statements to not fail when an object already exists in the database and should actually fail.

This change marks our first step toward several major upgrades we are preparing:

- An updated and improved migration workflow featuring commutative migrations, a revised folder structure, and enhanced collaboration capabilities for migrations.
- Better support for Xata migrations.
- Compatibility with CockroachDB (achieving full compatibility will only require removing serial fields from the migration folder).

