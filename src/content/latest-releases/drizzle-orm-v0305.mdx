---
title: DrizzleORM v0.30.5 release
pubDate: 2024-03-27
description: Added '$onUpdate' functionality for PostgreSQL, MySQL and SQLite and fixed insertions on columns with the smallserial datatype.
---

## New Features

### `$onUpdate` functionality for PostgreSQL, MySQL and SQLite

Adds a dynamic update value to the column.
The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.

> Note: This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.

```ts copy {4,5,6}
const usersOnUpdate = pgTable('users_on_update', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  updateCounter: integer('update_counter').default(sql`1`).$onUpdateFn(() => sql`update_counter + 1`),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).$onUpdate(() => new Date()),
  alwaysNull: text('always_null').$type<string | null>().$onUpdate(() => null),
});
```

## Fixes

- Insertions on columns with the smallserial datatype are not optional - [#1848](https://github.com/drizzle-team/drizzle-orm/issues/1848)
