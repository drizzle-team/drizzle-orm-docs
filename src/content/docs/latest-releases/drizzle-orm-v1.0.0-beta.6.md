---
title: "Drizzle ORM v1.0.0-beta.6 release"
pubDate: 2025-12-25T10:10:28Z
version: "1.0.0-beta.6"
description: "Fixes false schema differences involving JSON key order, composite primary keys and custom types, plus introspection and D1 schema issues."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-beta.6)

## Bug fixes

- [[BUG]: 1.0.0-beta.2 - drizzle-kit push does consider json (jsonb) key order relevant](https://github.com/drizzle-team/drizzle-orm/issues/5119)
- [[BUG]: drizzle-kit pull generates string instead of sql statement for default value](https://github.com/drizzle-team/drizzle-orm/issues/5093)
- [[BUG]: Failed schema with d1 table](https://github.com/drizzle-team/drizzle-orm/issues/3590)
- [[BUG]: drizzle-kit: push runs already applied migration](https://github.com/drizzle-team/drizzle-orm/issues/3844)
- [[BUG]: Drizzle-Kit detects change when Composite Primary Key Columns are in different order than in schema definition](https://github.com/drizzle-team/drizzle-orm/issues/3103)
- [[BUG]: drizzle-kit push always shows columns with custom types as changed even tho the type didn't change](https://github.com/drizzle-team/drizzle-orm/issues/3047);

