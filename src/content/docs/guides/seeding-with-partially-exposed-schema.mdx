---
title: Seeding Partially Exposed Tables with Foreign Key
slug: seeding-with-partially-exposed-tables
---

import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Callout from '@mdx/Callout.astro';

<IsSupportedChipGroup chips={{PostgreSQL: true, MySQL: true, SQLite: true}}/>

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) or [SQLite](/docs/get-started-sqlite)
- Get familiar with [Drizzle Seed](/docs/seed-overview)
</Prerequisites>

## Example 1
Let's assume you are trying to seed your database using the seeding script and schema shown below.
<CodeTabs items={["index.ts", "schema.ts"]}>
<CodeTab>
```ts
import { bloodPressure } from './schema.ts';

async function main() {
  const db = drizzle(...);
  await seed(db, { bloodPressure });
}
main();

```
</CodeTab>

<CodeTab>
```ts copy {10}
import { serial, pgTable, integer, doublePrecision } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
});

export const bloodPressure = pgTable("bloodPressure", {
	bloodPressureId: serial().primaryKey(),
	pressure: doublePrecision(),
	userId: integer().references(() => users.id).notNull(),
})
```
</CodeTab>
</CodeTabs>
If the `bloodPressure` table has a not-null constraint on the `userId` column, running the seeding script will cause an error.

```
Error: Column 'userId' has not null constraint, 
and you didn't specify a table for foreign key on column 'userId' in 'bloodPressure' table.
```

<Callout title='What does it mean?'>
This means we can't fill the `userId` column with Null values due to the not-null constraint on that column. 
Additionally, you didn't expose the `users` table to the `seed` function schema, so we can't generate `users.id` to populate the `userId` column with these values.
</Callout>


At this point, you have several options to resolve the error:
- You can remove the not-null constraint from the `userId` column;
- You can expose `users` table to `seed` function schema
```ts 
await seed(db, { bloodPressure, users });
```
- You can [refine](/docs/guides/seeding-with-partially-exposed-tables#refining-the-userid-column-generator) the `userId` column generator;

## Example 2

<CodeTabs items={["index.ts", "schema.ts"]}>
<CodeTab>
```ts
import { bloodPressure } from './schema.ts';

async function main() {
  const db = drizzle(...);
  await seed(db, { bloodPressure });
}
main();

```
</CodeTab>

<CodeTab>
```ts copy {10}
import { serial, pgTable, integer, doublePrecision } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
});

export const bloodPressure = pgTable("bloodPressure", {
	bloodPressureId: serial().primaryKey(),
	pressure: doublePrecision(),
	userId: integer().references(() => users.id),
})
```
</CodeTab>
</CodeTabs>

By running the seeding script above you will see a warning
```
Column 'userId' in 'bloodPressure' table will be filled with Null values
because you specified neither a table for foreign key on column 'userId' 
nor a function for 'userId' column in refinements.
```
<Callout title='What does it mean?'>
This means you neither provided the `users` table to the `seed` function schema nor refined the `userId` column generator. 
As a result, the `userId` column will be filled with Null values.
</Callout>
Then you will have two choices:
- If you're okay with filling the `userId` column with Null values, you can ignore the warning;

- Otherwise, you can [refine](/docs/guides/seeding-with-partially-exposed-tables#refining-the-userid-column-generator) the `userId` column generator. 

## Refining the `userId` column generator
Doing so requires the `users` table to already have IDs such as 1 and 2 in the database.
<CodeTabs items={["index.ts"]}>
<CodeTab>
```ts copy {8}
import { bloodPressure } from './schema.ts';

async function main() {
  const db = drizzle(...);
  await seed(db, { bloodPressure }).refine((funcs) => ({
    bloodPressure: {
      columns: {
        userId: funcs.valuesFromArray({ values: [1, 2] })
      }
    }
  }));
}
main();

```
</CodeTab>
</CodeTabs>