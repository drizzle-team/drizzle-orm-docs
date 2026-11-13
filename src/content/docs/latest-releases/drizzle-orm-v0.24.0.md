---
title: "Drizzle ORM v0.24.0 release"
pubDate: 2023-04-17T18:28:15Z
version: "0.24.0"
description: "Adds mysql2 query iteration and makes names optional when preparing MySQL queries."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.24.0)

- 🎉 Added iterator support to `mysql2` (sponsored by @rizen ❤). Read more in the [docs](https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/mysql-core/README.md#querying-large-datasets)
- ❗ `.prepare()` in MySQL no longer requires a name argument

