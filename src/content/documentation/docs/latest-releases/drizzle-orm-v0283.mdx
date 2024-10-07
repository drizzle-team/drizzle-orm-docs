---
title: DrizzleORM v0.28.3 release
pubDate: 2023-08-22
description: Added SQLite simplified query API, added methods to column builders and to table model type inference. Fixed sqlite-proxy and SQL.js response from '.get()' when the result is empty.
---

## Fixes

- Fixed sqlite-proxy and SQL.js response from `.get()` when the result is empty

## New Features

### 🎉 Added SQLite simplified query API

### 🎉 Added `.$defaultFn()` / `.$default()` methods to column builders

For more information check docs for [PostgreSQL](/docs/column-types/pg#default-value), [MySQL](/docs/column-types/mysql#default-value) and [SQLite](/docs/column-types/sqlite#default-value).

You can specify any logic and any implementation for a function like `cuid()` for runtime defaults. Drizzle won't limit you in the number of implementations you can add.

> Note: This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`

```ts copy {5}
import { varchar, mysqlTable } from "drizzle-orm/mysql-core";
import { createId } from '@paralleldrive/cuid2';

const table = mysqlTable('table', {
	id: varchar('id', { length: 128 }).$defaultFn(() => createId()),
});
```

### 🎉 Added `table.$inferSelect` / `table._.inferSelect` and `table.$inferInsert` / `table._.inferInsert` for more convenient table model type inference

- 🛠 Deprecated `InferModel` type in favor of more explicit `InferSelectModel` and `InferInsertModel`

```ts copy {11,12,14,15}
import { InferSelectModel, InferInsertModel } from 'drizzle-orm'

const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  verified: boolean('verified').notNull().default(false),
  jsonb: jsonb('jsonb').$type<string[]>(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

type SelectUser = typeof usersTable.$inferSelect;
type InsertUser = typeof usersTable.$inferInsert;

type SelectUser2 = InferSelectModel<typeof usersTable>;
type InsertUser2 = InferInsertModel<typeof usersTable>;
```

- 🛠 Disabled `.d.ts` files bundling
