---
title: "Drizzle ORM v0.17.3 release"
pubDate: 2023-01-31T20:17:22Z
version: "0.17.3"
description: "Adds PostgreSQL support through the AWS Data API, with interval mapping still unsupported in this release."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.17.3)

We have released [AWS Data API support](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.html) for PostgreSQL

---

Connection example

```typescript
import { drizzle, migrate } from 'drizzle-orm/aws-data-api/pg';

const rdsClient = new RDSDataClient({});

const db = drizzle(rdsClient, {
  database: '',
  secretArn: '',
  resourceArn: '',
});

await migrate(db, { migrationsFolder: '' });
```

> **Note**:
> All drizzle pg data types are working well with data api, except of `interval`. This type is not yet mapped in proper way

