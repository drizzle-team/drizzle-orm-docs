---
title: Update many with different values for each row
slug: update-many-with-different-value
---

import Section from "@mdx/Section.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";

<IsSupportedChipGroup chips={{PostgreSQL: true, MySQL: true, SQLite: true}}/>

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) and [SQLite](/docs/get-started-sqlite)
- [Update statement](/docs/update)
- [Filters](/docs/operators) and [sql operator](/docs/sql)
</Prerequisites>

To implement update many with different values for each row within 1 request you can use `sql` operator with `case` statement and `.update().set()` methods like this:

<Section>
```ts {26, 29, 32, 36, 38, 40}
import { SQL, inArray, sql } from 'drizzle-orm';
import { users } from './schema';

const db = drizzle(...);

const inputs = [
  {
    id: 1,
    city: 'New York',
  },
  {
    id: 2,
    city: 'Los Angeles',
  },
  {
    id: 3,
    city: 'Chicago',
  },
];

// You have to be sure that inputs array is not empty
if (inputs.length === 0) {
  return;
}

const sqlChunks: SQL[] = [];
const ids: number[] = [];

sqlChunks.push(sql`(case`);

for (const input of inputs) {
  sqlChunks.push(sql`when ${users.id} = ${input.id} then ${input.city}`);
  ids.push(input.id);
}

sqlChunks.push(sql`end)`);

const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));

await db.update(users).set({ city: finalSql }).where(inArray(users.id, ids));
```

```sql
update users set "city" = 
  (case when id = 1 then 'New York' when id = 2 then 'Los Angeles' when id = 3 then 'Chicago' end)
where id in (1, 2, 3)
```
</Section>
