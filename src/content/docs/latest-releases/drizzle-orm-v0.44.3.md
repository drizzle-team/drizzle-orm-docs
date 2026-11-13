---
title: "Drizzle ORM v0.44.3 release"
pubDate: 2025-07-14T17:08:39Z
version: "0.44.3"
description: "Corrects client types for Drizzle-created connections and adds updated_at to the predefined Neon Auth users table."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.44.3)

- Fixed types of `$client` for clients created by drizzle function

```ts
await db.$client.[...]
```

- Added the `updated_at` column to the `neon_auth.users_sync` table definition.

