---
title: "Drizzle ORM v0.27.1 release"
pubDate: 2023-07-10T15:12:31Z
version: "0.27.1"
description: "Adds support for the Neon HTTP driver."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.27.1)

- 🎉 Added support for [Neon HTTP driver](https://neon.tech/docs/serverless/serverless-driver)

```typescript
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchConnectionCache = true;

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

db.select(...)
```

