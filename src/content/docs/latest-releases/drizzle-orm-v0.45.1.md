---
title: "Drizzle ORM v0.45.1 release"
pubDate: 2025-12-10T15:02:24Z
version: "0.45.1"
description: "Fixes PostgreSQL native pool detection in environments that prohibit require()."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.45.1)

- Fixed pg-native Pool detection in node-postgres transactions breaking in environments with forbidden `require()` ([#5107](https://github.com/drizzle-team/drizzle-orm/issues/5107))

