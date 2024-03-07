---
title: DrizzleORM v0.16.2 release
pubDate: 2023-01-21
description: Drizzle ORM - is an idiomatic TypeScript ORM which can be used as query builder and as an ORM being the source of truth for SQL schema and CLI for automatic migrations generation.
---
import Section from "@mdx/Section.astro";

Drizzle ORM - is an idiomatic TypeScript ORM which can be used as query builder and as an ORM being the source of truth for SQL schema and CLI for automatic migrations generation.

Since last major update we've added numerous requested features 🚀

### 🎉 PostgreSQL schemas

You can now declare [PostgreSQL schemas](https://www.postgresql.org/docs/current/ddl-schemas.html) and tables to be created within this schema

<Section>
```ts copy
// src/schema.ts
import { pgSchema } from "drizzle-orm-pg";

export const mySchema = pgSchema("my_schema");

export const users = mySchema("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
});
```
```sql
CREATE SCHEMA "my_schema";

CREATE TABLE IF NOT EXISTS "my_schema"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"email" text
);
```
</Section>

[drizzle-kit](https://driz.link/kit) will automatically generate all needed SQL migrations

 ```shell 
drizzle-kit generate:pg --schema=src/schema.ts --out=migrations/ 
 ```

### 🎉 MySQL databases/schemas

You can now declare [MySQL databases/schemas](https://dev.mysql.com/doc/refman/8.0/en/create-database.html) and tables to be created within it

```ts copy
// schema.ts
import { mysqlSchema } from "drizzle-orm-mysql";

const mySchema = mysqlSchema("my_schema");

const users = mySchema("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
});
```

[drizzle-kit](https://driz.link/kit) will automatically generate all needed SQL migrations ```shell drizzle-kit
generate:mysql --schema=src/schema.ts --out=migrations/ ```

which will automatically generate you SQL migration

```sql
CREATE DATABASE `my_schema`;

CREATE TABLE `my_schema`.`users` (
	`id` serial PRIMARY KEY NOT NULL,
	`name` text,
	`email` text
);
```

### 🎉 PostgreSQL introspect

You can now pull database schema from your existing PostgreSQL database within seconds with [drizzle-kit](https://driz.link/kit), this vanishes mostly any friction for you to switch from any existing orm or vanilla SQL.
It supports:

- enums
- tables with all native and non-native columns
- indexes
- foreign keys, self references and cyclic fks
- schemas

```shell
drizzle-kit introspect:pg --out=migrations/ --connectionString=postgresql://user:pass@host:port/db_name
```

it will print you `schema.ts`

```ts copy
export const myEnum = pgEnum("my_enum", ["one", "two", "three"]);
export const mySchema = pgSchema("my_schema");

export const users = mySchema("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  email: text("email"),
});

export const users2 = pgTable("users2", {
  id: serial("id").primaryKey(),
  name: varchar("name2"),
  enum: myEnum("enum"),
});

export const allColumns = pgTable("all_columns", {
  sm: smallint("smallint"),
  smdef: smallint("smallint_def").default(10),
  int: integer("integer"),
  intdef: integer("integer_def").default(10),
  numeric: numeric("numeric"),
  numeric2: numeric("numeric2", { precision: 7 }),
  numeric3: numeric("numeric3", { scale: 7 }),
  numeric4: numeric("numeric4", { precision: 7, scale: 7 }),
  numericdef: numeric("numeridef").default("100"),
  bigint: bigint("bigint", { mode: "number" }),
  bigintdef: bigint("bigint", { mode: "number" }).default(100),
  bool: boolean("boolean"),
  booldef: boolean("boolean_def").default(true),
  text: text("text"),
  textdef: text("textdef").default("text"),
  varchar: varchar("varchar"),
  varchardef: varchar("varchardef").default("text"),
  serial: serial("serial"),
  bigserial: bigserial("bigserial", { mode: "bigint" }),
  decimal: decimal("decimal", { precision: 100, scale: 2 }),
  decimaldef: decimal("decimaldef", { precision: 100, scale: 2 }).default(
    "100.0",
  ),
  doublePrecision: doublePrecision("decimal"),
  doublePrecisiondef: doublePrecision("decimaldef").default(100.0),
  real: real("real"),
  realdef: real("decimaldef").default(100.0),
  json: json<{ attr: string }>("json"),
  jsondef: json<{ attr: string }>("jsondef").default({ attr: "value" }),
  jsonb: jsonb<{ attr: string }>("jsonb"),
  jsonbdef: jsonb<{ attr: string }>("jsonbdef").default({ attr: "value" }),
  time: time("time"),
  time2: time("time2", { precision: 6, withTimezone: true }),
  timedefnow: time("timedefnow").defaultNow(),
  timestamp: timestamp("timestamp"),
  timestamp2: timestamp("timestamp2", { precision: 6, withTimezone: true }),
  timestamp3: timestamp("timestamp3", { withTimezone: true }),
  timestamp4: timestamp("timestamp4", { precision: 4 }),
  timestampdef: timestamp("timestampdef").defaultNow(),
  date: date("date", { mode: "date" }),
  datedef: date("datedef").defaultNow(),
  interval: interval("interval"),
  intervaldef: interval("intervaldef").default("10 days"),
});

export const cyclic1 = pgTable("cyclic1", {
  id: serial("id").primaryKey(),
  ext2: integer("ext2").references(() => cyclic2.id),
});

export const cyclic2 = pgTable("cyclic2", {
  id: serial("id").primaryKey(),
  ext1: integer("ext1").references((): AnyPgColumn => cyclic1.id),
});

export const example = pgTable(
  "example",
  {
    id: serial("id").primaryKey(),
    reportsTo: integer("reports_to"),
  },
  (table) => {
    return {
      reportsToFK: foreignKey({
        columns: [table.reportsTo],
        foreignColumns: [table.id],
      }),
    };
  },
);
```

### 🎉 Postgres.js driver support

We've added full support for [postgres.js](https://github.com/porsager/postgres), it is lightweight and it is fast 🚀

```ts copy
// schema.ts
import { pgTable, serial, text, varchar } from "drizzle-orm-pg";
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  phone: varchar("phone", { length: 256 }),
});

// index.ts
import { drizzle, PostgresJsDatabase } from "drizzle-orm-pg/postgres.js";
import postgres from "postgres";
import { users } from "./schema";

const client = postgres(connectionString);
const db: PostgresJsDatabase = drizzle(client);

const allUsers = await db.select(users);
```

Full PostgreSQL docs see [here](https://github.com/drizzle-team/drizzle-orm/tree/main/drizzle-orm-pg)

### 🎉 PostgreSQL and MySQL types

We've added useful operators for you to create any needed non-native PostgreSQL or MySQL types

```ts copy
// PostgreSQL
const customText = customType<{ data: string }>({
  dataType() {
    return "text";
  },
});

const usersTable = pgTable("users", {
  name: customText("name").notNull(),
});

// MySQL
const customText = customType<{ data: string }>({
  dataType() {
    return "text";
  },
});

const usersTable = mysqlTable("users", {
  name: customText("name").notNull(),
});
```
