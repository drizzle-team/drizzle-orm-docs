---
title: "Drizzle Kit v0.24.2 release"
pubDate: 2024-08-26T12:42:34Z
version: "0.24.2"
description: "Adds PGlite support across Drizzle Kit commands and Studio, and fixes MySQL generated column handling."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.24.2)

## New Features

### 🎉 Support for `pglite` driver

You can now use pglite with all drizzle-kit commands, including Drizzle Studio!

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  driver: "pglite",
  schema: "./schema.ts",
  dbCredentials: {
    url: "local-pg.db",
  },
  verbose: true,
  strict: true,
});
```

## Bug fixes

- mysql-kit: fix GENERATED ALWAYS AS ... NOT NULL - [#2824](https://github.com/drizzle-team/drizzle-orm/pull/2824)

