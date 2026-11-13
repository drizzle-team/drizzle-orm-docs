---
title: "Drizzle ORM v1.0.0-beta.17 release"
pubDate: 2026-03-11T17:26:32Z
version: "1.0.0-beta.17"
description: "Adds the node-sqlite driver and validates that migration table upgrades have access to the complete migration history."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-beta.17)

## New SQLite driver `node-sqlite`

**Usage example:**

```typescript copy
import { drizzle } from 'drizzle-orm/node-sqlite';

const db = drizzle("sqlite.db");

const result = db.select().from(...);
```

If you need to provide your existing driver:

```typescript copy
import { drizzle } from 'drizzle-orm/node-sqlite';
import { DatabaseSync } from 'node:sqlite';

const sqlite = new DatabaseSync('sqlite.db');
const db = drizzle({ client: sqlite });

const result = db.select().from(...);
```

## Fixes

We added a few checks to the migration upgrade logic introduced in `beta.16`. Now, when your migrations table is upgraded, we double-check that all entities in the table have been updated. If any are missing, we prompt you to pull all migrations into your environment so that we can properly update the `drizzle_migrations` table

