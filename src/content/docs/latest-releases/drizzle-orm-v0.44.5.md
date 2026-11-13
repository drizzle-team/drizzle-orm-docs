---
title: "Drizzle ORM v0.44.5 release"
pubDate: 2025-08-25T14:30:31Z
version: "0.44.5"
description: "Fixes Durable SQLite queries and improves SQLite blob mapping and browser compatibility."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.44.5)

- Fixed invalid usage of `.one()` in `durable-sqlite` session
- Fixed spread operator related crash in sqlite `blob` columns
- Better browser support for sqlite `blob` columns 
- Improved sqlite `blob` mapping

