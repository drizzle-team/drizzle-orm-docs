---
title: SQL Timestamp as a default value
slug: timestamp-default-value
---

import Section from "@mdx/Section.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) and [SQLite](/docs/get-started-sqlite)
- Learn about column data types for [PostgreSQL](/docs/column-types/pg), [MySQL](/docs/column-types/mysql) and [SQLite](/docs/column-types/sqlite)
- [sql operator](/docs/sql)
</Prerequisites>

### PostgreSQL

To set current timestamp as a default value in PostgreSQL, you can use the `defaultNow()` method or `sql` operator with `now()` function which returns the current date and time with the time zone:

<Section>
```ts copy {6,9}
import { sql } from 'drizzle-orm';
import { timestamp, pgTable, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  timestamp1: timestamp('timestamp1').notNull().defaultNow(),
  timestamp2: timestamp('timestamp2', { mode: 'string' })
    .notNull()
    .default(sql`now()`),
});
```

```sql
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp1" timestamp DEFAULT now() NOT NULL,
	"timestamp2" timestamp DEFAULT now() NOT NULL
);
```
</Section>

The `mode` option defines how values are handled in the application. Values with `string` mode are treated as `string` in the application, but stored as timestamps in the database.

<Section>
```plaintext
// Data stored in the database
+----+----------------------------+----------------------------+
| id |         timestamp1         |         timestamp2         |
+----+----------------------------+----------------------------+
| 1  | 2024-04-11 14:14:28.038697 | 2024-04-11 14:14:28.038697 |
+----+----------------------------+----------------------------+
```

```ts
// Data returned by the application
[
  {
    id: 1,
    timestamp1: 2024-04-11T14:14:28.038Z, // Date object
    timestamp2: '2024-04-11 14:14:28.038697' // string
  }
]
```
</Section>

To set unix timestamp as a default value in PostgreSQL, you can use the `sql` operator and `extract(epoch from now())` function which returns the number of seconds since `1970-01-01 00:00:00 UTC`:

<Section>
```ts copy {8}
import { sql } from 'drizzle-orm';
import { integer, pgTable, serial } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  timestamp: integer('timestamp')
    .notNull()
    .default(sql`extract(epoch from now())`),
});
```

```sql
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"timestamp" integer DEFAULT extract(epoch from now()) NOT NULL
);
```

```plaintext
// Data stored in the database
+----+------------+
| id | timestamp  |
+----+------------+
|  1 | 1712846784 |
+----+------------+
```

```ts
// Data returned by the application
[ 
  { 
    id: 1, 
    timestamp: 1712846784 // number
  } 
]
```
</Section>


### MySQL

To set current timestamp as a default value in MySQL, you can use the `defaultNow()` method or `sql` operator with `now()` function which returns the current date and time `(YYYY-MM-DD HH-MM-SS)`:

<Section>
```ts copy {6,9,12}
import { sql } from 'drizzle-orm';
import { mysqlTable, serial, timestamp } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  timestamp1: timestamp('timestamp1').notNull().defaultNow(),
  timestamp2: timestamp('timestamp2', { mode: 'string' })
    .notNull()
    .default(sql`now()`),
  timestamp3: timestamp('timestamp3', { fsp: 3 }) // fractional seconds part
    .notNull()
    .default(sql`now(3)`),
});
```

```sql
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`timestamp1` timestamp NOT NULL DEFAULT now(),
	`timestamp2` timestamp NOT NULL DEFAULT now(),
	`timestamp3` timestamp(3) NOT NULL DEFAULT now(3),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
```
</Section>

`fsp` option defines the number of fractional seconds to include in the timestamp. The default value is `0`.
The `mode` option defines how values are handled in the application. Values with `string` mode are treated as `string` in the application, but stored as timestamps in the database.

<Section>
```plaintext
// Data stored in the database
+----+---------------------+---------------------+-------------------------+
| id | timestamp1          | timestamp2          | timestamp3              |
+----+---------------------+---------------------+-------------------------+
|  1 | 2024-04-11 15:24:53 | 2024-04-11 15:24:53 | 2024-04-11 15:24:53.236 |
+----+---------------------+---------------------+-------------------------+
```

```ts
// Data returned by the application
[
  {
    id: 1,
    timestamp1: 2024-04-11T15:24:53.000Z, // Date object
    timestamp2: '2024-04-11 15:24:53', // string
    timestamp3: 2024-04-11T15:24:53.236Z // Date object
  }
]
```
</Section>

To set unix timestamp as a default value in MySQL, you can use the `sql` operator and `unix_timestamp()` function which returns the number of seconds since `1970-01-01 00:00:00 UTC`:

<Section>
```ts copy {8}
import { sql } from 'drizzle-orm';
import { mysqlTable, serial, int } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  id: serial('id').primaryKey(),
  timestamp: int('timestamp')
    .notNull()
    .default(sql`(unix_timestamp())`),
});
```

```sql
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`timestamp` int NOT NULL DEFAULT (unix_timestamp()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
```

```plaintext
// Data stored in the database
+----+------------+
| id | timestamp  |
+----+------------+
|  1 | 1712847986 |
+----+------------+
```

```ts
// Data returned by the application
[ 
  { 
    id: 1, 
    timestamp: 1712847986 // number
  } 
]
```
</Section>

### SQLite

To set current timestamp as a default value in SQLite, you can use `sql` operator with `current_timestamp` constant which returns text representation of the current UTC date and time `(YYYY-MM-DD HH:MM:SS)`:

<Section>
```ts copy {8}
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  timestamp: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
});
```

```sql
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
```

```plaintext
// Data stored in the database
+----+---------------------+
| id | timestamp           |
+----+---------------------+
|  1 | 2024-04-11 15:40:43 |
+----+---------------------+
```

```ts
// Data returned by the application
[
  {
    id: 1,
    timestamp: '2024-04-11 15:40:43' // string
  }
]
```
</Section>

To set unix timestamp as a default value in SQLite, you can use the `sql` operator and `unixepoch()` function which returns the number of seconds since `1970-01-01 00:00:00 UTC`:

<Section>
```ts copy {8,11,14}
import { sql } from 'drizzle-orm';
import { integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  timestamp1: integer('timestamp1', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
  timestamp2: integer('timestamp2', { mode: 'timestamp_ms' })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  timestamp3: integer('timestamp3', { mode: 'number' })
    .notNull()
    .default(sql`(unixepoch())`),
});
```

```sql
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`timestamp1` integer DEFAULT (unixepoch()) NOT NULL,
	`timestamp2` integer DEFAULT (unixepoch() * 1000) NOT NULL,
	`timestamp3` integer DEFAULT (unixepoch()) NOT NULL
);
```
</Section>

The `mode` option defines how values are handled in the application. In the application, values with `timestamp` and `timestamp_ms` modes are treated as `Date` objects, but stored as integers in the database.
The difference is that `timestamp` handles seconds, while `timestamp_ms` handles milliseconds.

<Section>
```plaintext
// Data stored in the database
+------------+------------+---------------+------------+
| id         | timestamp1 | timestamp2    | timestamp3 |
+------------+------------+---------------+------------+
| 1          | 1712835640 | 1712835640000 | 1712835640 |
+------------+------------+---------------+------------+
```

```ts
// Data returned by the application
[
  {
    id: 1,
    timestamp1: 2024-04-11T11:40:40.000Z, // Date object
    timestamp2: 2024-04-11T11:40:40.000Z, // Date object
    timestamp3: 1712835640 // number
  }
]
```
</Section>
