---
title: Unique and Case-Insensitive Email Handling
slug: unique-case-insensitive-email
---

import Section from "@mdx/Section.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Callout from '@mdx/Callout.astro';

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) and [SQLite](/docs/get-started-sqlite)
- [Indexes](/docs/indexes-constraints#indexes)
- [Insert statement](/docs/insert) and [Select method](/docs/select)
- [sql operator](/docs/sql)
- You should have `drizzle-orm@0.31.0` and `drizzle-kit@0.22.0` or higher.
</Prerequisites>

### PostgreSQL

To implement a unique and case-insensitive `email` handling in PostgreSQL with Drizzle, you can create a unique index on the lowercased `email` column. This way, you can ensure that the `email` is unique regardless of the case.

Drizzle has simple and flexible API, which lets you easily create such an index using SQL-like syntax:
<CodeTabs items={["schema.ts", "migration.sql"]}>
  <CodeTab>
  ```ts copy {12,13}
  import { SQL, sql } from 'drizzle-orm';
  import { AnyPgColumn, pgTable, serial, text, uniqueIndex } from 'drizzle-orm/pg-core';

  export const users = pgTable(
    'users',
    {
      id: serial('id').primaryKey(),
      name: text('name').notNull(),
      email: text('email').notNull(),
    },
    (table) => [
      // uniqueIndex('emailUniqueIndex').on(sql`lower(${table.email})`),
      uniqueIndex('emailUniqueIndex').on(lower(table.email)),
    ],
  );

  // custom lower function
  export function lower(email: AnyPgColumn): SQL {
    return sql`lower(${email})`;
  }
  ```
  </CodeTab>
  ```sql
  CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL
  );
  --> statement-breakpoint
  CREATE UNIQUE INDEX IF NOT EXISTS "emailUniqueIndex" ON "users" USING btree (lower("email"));
  ```
</CodeTabs>

This is how you can select user by `email` with `lower` function:

<Section>
```ts copy {10}
import { eq } from 'drizzle-orm';
import { lower, users } from './schema';

const db = drizzle(...);

const findUserByEmail = async (email: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()));
};
```

```sql
select * from "users" where lower(email) = 'john@email.com';
```
</Section>

### MySQL

In MySQL, the default collation setting for string comparison is case-insensitive, which means that when performing operations like searching or comparing strings in SQL queries, the case of the characters does not affect the results. However, because collation settings can vary and may be configured to be case-sensitive, we will explicitly ensure that the `email` is unique regardless of case by creating a unique index on the lowercased `email` column.

Drizzle has simple and flexible API, which lets you easily create such an index using SQL-like syntax:
<CodeTabs items={["schema.ts", "migration.sql"]}>
  <CodeTab>
  ```ts copy {12,13}
  import { SQL, sql } from 'drizzle-orm';
  import { AnyMySqlColumn, mysqlTable, serial, uniqueIndex, varchar } from 'drizzle-orm/mysql-core';

  export const users = mysqlTable(
    'users',
    {
      id: serial('id').primaryKey(),
      name: varchar('name', { length: 255 }).notNull(),
      email: varchar('email', { length: 255 }).notNull(),
    },
    (table) => [
      // uniqueIndex('emailUniqueIndex').on(sql`(lower(${table.email}))`),
      uniqueIndex('emailUniqueIndex').on(lower(table.email)),
    ]
  );

  // custom lower function
  export function lower(email: AnyMySqlColumn): SQL {
    return sql`(lower(${email}))`;
  }
  ```
  </CodeTab>
  ```sql
  CREATE TABLE `users` (
	  `id` serial AUTO_INCREMENT NOT NULL,
	  `name` varchar(255) NOT NULL,
	  `email` varchar(255) NOT NULL,
	  CONSTRAINT `users_id` PRIMARY KEY(`id`),
	  CONSTRAINT `emailUniqueIndex` UNIQUE((lower(`email`)))
  );
  ```
</CodeTabs>

<Callout type="warning">
Functional indexes are supported in MySQL starting from version `8.0.13`. For the correct syntax, the expression should be enclosed in parentheses, for example, `(lower(column))`.
</Callout>

This is how you can select user by `email` with `lower` function:

<Section>
```ts copy {10}
import { eq } from 'drizzle-orm';
import { lower, users } from './schema';

const db = drizzle(...);

const findUserByEmail = async (email: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()));
};
```

```sql
select * from `users` where lower(email) = 'john@email.com';
```
</Section>

### SQLite

To implement a unique and case-insensitive `email` handling in SQLite with Drizzle, you can create a unique index on the lowercased `email` column. This way, you can ensure that the `email` is unique regardless of the case.

Drizzle has simple and flexible API, which lets you easily create such an index using SQL-like syntax:

<CodeTabs items={["schema.ts", "migration.sql"]}>
  <CodeTab>
  ```ts copy {12,13}
  import { SQL, sql } from 'drizzle-orm';
  import { AnySQLiteColumn, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

  export const users = sqliteTable(
    'users',
    {
      id: integer('id').primaryKey(),
      name: text('name').notNull(),
      email: text('email').notNull(),
    },
    (table) => [
      // uniqueIndex('emailUniqueIndex').on(sql`lower(${table.email})`),
      uniqueIndex('emailUniqueIndex').on(lower(table.email)),
    ]
  );

  // custom lower function
  export function lower(email: AnySQLiteColumn): SQL {
    return sql`lower(${email})`;
  }
  ```
  </CodeTab>
  ```sql
  CREATE TABLE `users` (
	  `id` integer PRIMARY KEY NOT NULL,
	  `name` text NOT NULL,
	  `email` text NOT NULL
  );
  --> statement-breakpoint
  CREATE UNIQUE INDEX `emailUniqueIndex` ON `users` (lower(`email`));
  ```
</CodeTabs>

This is how you can select user by `email` with `lower` function:

<Section>
```ts copy {10}
import { eq } from 'drizzle-orm';
import { lower, users } from './schema';

const db = drizzle(...);

const findUserByEmail = async (email: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(lower(users.email), email.toLowerCase()));
};
```

```sql
select * from "users" where lower(email) = 'john@email.com';
```
</Section>
