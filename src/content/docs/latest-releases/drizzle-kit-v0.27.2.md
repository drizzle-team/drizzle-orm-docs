---
title: "Drizzle Kit v0.27.2 release"
pubDate: 2024-11-06T13:32:59Z
version: "0.27.2"
description: "Fixes push failures involving row-level security and policies linked to Supabase tables."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.27.2)

- Fix [[BUG]: Undefined properties when using drizzle-kit push](https://github.com/drizzle-team/drizzle-orm/issues/3391)
- Fix TypeError: Cannot read properties of undefined (reading 'isRLSEnabled')
- Fix push bugs, when pushing a schema with linked policy to a table from `drizzle-orm/supabase`

