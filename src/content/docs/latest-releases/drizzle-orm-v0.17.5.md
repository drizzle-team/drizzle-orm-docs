---
title: "Drizzle ORM v0.17.5 release"
pubDate: 2023-02-03T11:27:54Z
version: "0.17.5"
description: "Adds support for the PlanetScale serverless driver."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.17.5)

We have released [Planetscale Serverless](https://github.com/planetscale/database-js) driver support

---

Usage example:

```typescript
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';

// create the connection
const connection = connect({
  host: process.env['DATABASE_HOST'],
  username: process.env['DATABASE_USERNAME'],
  password: process.env['DATABASE_PASSWORD'],
});

const db = drizzle(connection);
```

