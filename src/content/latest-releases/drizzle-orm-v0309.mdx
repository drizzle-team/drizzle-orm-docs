---
title: DrizzleORM v0.30.9 release
pubDate: 2024-04-22
description: Added 'setWhere' and 'targetWhere' fields to '.onConflictDoUpdate()' config in SQLite, added schema information to Drizzle instances via 'db._.fullSchema' and fixed migrator in AWS Data API.
---

## New Features

- Added `setWhere` and `targetWhere` fields to `.onConflictDoUpdate()` config in SQLite instead of single `where` field:

```ts copy
await db.insert(employees)
  .values({ employeeId: 123, name: 'John Doe' })
  .onConflictDoUpdate({
    target: employees.employeeId,
    targetWhere: sql`name <> 'John Doe'`,
    set: { name: sql`excluded.name` }
  });
  
await db.insert(employees)
  .values({ employeeId: 123, name: 'John Doe' })
  .onConflictDoUpdate({
    target: employees.employeeId,
    set: { name: 'John Doe' },
    setWhere: sql`name <> 'John Doe'`
  });
```

Read more about `.onConflictDoUpdate()` method [here](/docs/insert#on-conflict-do-update).

- 🛠️ Added schema information to Drizzle instances via `db._.fullSchema`

## Fixes

- Fixed migrator in AWS Data API

To get started with Drizzle and AWS Data API follow the [documentation](/docs/get-started-postgresql#aws-data-api).
