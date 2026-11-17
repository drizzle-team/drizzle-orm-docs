---
title: "Drizzle ORM v0.25.4 release"
pubDate: 2023-05-01T17:41:47Z
version: "0.25.4"
description: "Adds Vercel Postgres support."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.25.4)

- 🎉 Added support for [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart)

```typescript
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from "@vercel/postgres";

const db = drizzle(sql);

db.select(...)
```

