---
title: SQL Increment value
slug: incrementing-a-value
---
import Section from "@mdx/Section.astro";
import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";
import Prerequisites from "@mdx/Prerequisites.astro";

<IsSupportedChipGroup chips={{PostgreSQL: true, MySQL: true, SQLite: true}}/>

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) and [SQLite](/docs/get-started-sqlite)
- [Update statement](/docs/update)
- [Filters](/docs/operators) and [sql operator](/docs/sql)
</Prerequisites>

To increment a column value you can use `update().set()` method like below:

<Section>
```ts copy {8}
import { eq, sql } from 'drizzle-orm';

const db = drizzle(...)
  
await db
  .update(table)
  .set({
    counter: sql`${table.counter} + 1`,
  })
  .where(eq(table.id, 1));
```

```sql
update "table" set "counter" = "counter" + 1 where "id" = 1;
```
</Section>

Drizzle has simple and flexible API, which lets you easily create custom solutions. This is how you do custom increment function:

```ts copy {4,10,11}
import { AnyColumn } from 'drizzle-orm';

const increment = (column: AnyColumn, value = 1) => {
  return sql`${column} + ${value}`;
};

await db
  .update(table)
  .set({
    counter1: increment(table.counter1),
    counter2: increment(table.counter2, 10),
  })
  .where(eq(table.id, 1));
```
