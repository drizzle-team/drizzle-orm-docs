---
title: "Drizzle ORM v0.38.2 release"
pubDate: 2024-12-13T17:29:49Z
version: "0.38.2"
description: "Adds MySQL USE INDEX, FORCE INDEX and IGNORE INDEX hints for controlling query index selection."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.38.2)

## New features

### `USE INDEX`, `FORCE INDEX` and `IGNORE INDEX` for MySQL

In MySQL, the statements USE INDEX, FORCE INDEX, and IGNORE INDEX are hints used in SQL queries to influence how the query optimizer selects indexes. These hints provide fine-grained control over index usage, helping optimize performance when the default behavior of the optimizer is not ideal.

#### Use Index

The `USE INDEX` hint suggests to the optimizer which indexes to consider when processing the query. The optimizer is not forced to use these indexes but will prioritize them if they are suitable.

```ts 
export const users = mysqlTable('users', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
}, () => [usersTableNameIndex]);

const usersTableNameIndex = index('users_name_index').on(users.name);

await db.select()
  .from(users, { useIndex: usersTableNameIndex })
  .where(eq(users.name, 'David'));
```

#### Ignore Index

The `IGNORE INDEX` hint tells the optimizer to avoid using specific indexes for the query. MySQL will consider all other indexes (if any) or perform a full table scan if necessary.

```ts
export const users = mysqlTable('users', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
}, () => [usersTableNameIndex]);

const usersTableNameIndex = index('users_name_index').on(users.name);

await db.select()
  .from(users, { ignoreIndex: usersTableNameIndex })
  .where(eq(users.name, 'David'));
```

#### Force Index

The `FORCE INDEX` hint forces the optimizer to use the specified index(es) for the query. If the specified index cannot be used, MySQL will not fall back to other indexes; it might resort to a full table scan instead.

```ts copy
export const users = mysqlTable('users', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
}, () => [usersTableNameIndex]);

const usersTableNameIndex = index('users_name_index').on(users.name);

await db.select()
  .from(users, { forceIndex: usersTableNameIndex })
  .where(eq(users.name, 'David'));
```

You can also combine those hints and use multiple indexes in a query if you need

