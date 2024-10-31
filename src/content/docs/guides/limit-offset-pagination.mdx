---
title: SQL Limit/Offset pagination
slug: limit-offset-pagination
---

import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Section from "@mdx/Section.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";

<IsSupportedChipGroup chips={{PostgreSQL: true, MySQL: true, SQLite: true}}/>

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) and [SQLite](/docs/get-started-sqlite)
- [Select statement](/docs/select) with [order by clause](/docs/select#order-by) and [limit & offset clauses](/docs/select#limit--offset)
- [Relational queries](/docs/rqb) with [order by clause](/docs/rqb#order-by) and [limit & offset clauses](/docs/rqb#limit--offset)
- [Dynamic query building](/docs/dynamic-query-building)
</Prerequisites>

This guide demonstrates how to implement `limit/offset` pagination in Drizzle:

<CodeTabs items={["index.ts", "schema.ts"]}>
  <CodeTab>
    ```ts copy {9,10,11}
    import { asc } from 'drizzle-orm';
    import { users } from './schema';

    const db = drizzle(...);

    await db
      .select()
      .from(users)
      .orderBy(asc(users.id)) // order by is mandatory
      .limit(4) // the number of rows to return
      .offset(4); // the number of rows to skip
    ```

    ```sql
    select * from users order by id asc limit 4 offset 4;
    ```

    ```ts
    // 5-8 rows returned
    [
      {
        id: 5,
        firstName: 'Beth',
        lastName: 'Davis',
        createdAt: 2024-03-11T20:51:46.787Z
      },
      {
        id: 6,
        firstName: 'Charlie',
        lastName: 'Miller',
        createdAt: 2024-03-11T21:15:46.787Z
      },
      {
        id: 7,
        firstName: 'Clara',
        lastName: 'Wilson',
        createdAt: 2024-03-11T21:33:46.787Z
      },
      {
        id: 8,
        firstName: 'David',
        lastName: 'Moore',
        createdAt: 2024-03-11T21:45:46.787Z
      }
    ]
    ```
  </CodeTab>
  <CodeTab>
    ```ts copy
    import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

    export const users = pgTable('users', {
      id: serial('id').primaryKey(),
      firstName: text('first_name').notNull(),
      lastName: text('last_name').notNull(),
      createdAt: timestamp('created_at').notNull().defaultNow(),
    });
    ```

    ```plaintext
    +----+------------+-----------+----------------------------+
    | id | first_name | last_name |         created_at         |
    +----+------------+-----------+----------------------------+
    |  1 | Alice      | Johnson   | 2024-03-08 12:23:55.251797 |
    +----+------------+-----------+----------------------------+
    |  2 | Alex       | Smith     | 2024-03-08 12:25:55.182    |
    +----+------------+-----------+----------------------------+
    |  3 | Aaron      | Williams  | 2024-03-08 12:28:55.182    |
    +----+------------+-----------+----------------------------+
    |  4 | Brian      | Brown     | 2024-03-08 12:34:55.182    |
    +----+------------+-----------+----------------------------+
    |  5 | Beth       | Davis     | 2024-03-08 12:40:55.182    |
    +----+------------+-----------+----------------------------+
    |  6 | Charlie    | Miller    | 2024-03-08 13:04:55.182    |
    +----+------------+-----------+----------------------------+
    |  7 | Clara      | Wilson    | 2024-03-08 13:22:55.182    |
    +----+------------+-----------+----------------------------+
    |  8 | David      | Moore     | 2024-03-08 13:34:55.182    |
    +----+------------+-----------+----------------------------+
    ```
  </CodeTab>
</CodeTabs>

Limit is the number of rows to return `(page size)` and offset is the number of rows to skip `((page number - 1) * page size)`. 
For consistent pagination, ensure ordering by a unique column. Otherwise, the results can be inconsistent.

If you need to order by a non-unique column, you should also append a unique column to the ordering.

This is how you can implement `limit/offset` pagination with 2 columns:

<Section>
```ts copy {5}
const getUsers = async (page = 1, pageSize = 3) => {
  await db
    .select()
    .from(users)
    .orderBy(asc(users.firstName), asc(users.id)) // order by first_name (non-unique), id (pk)
    .limit(pageSize) 
    .offset((page - 1) * pageSize);
}

await getUsers();
```
</Section>

Drizzle has useful relational queries API, that lets you easily implement `limit/offset` pagination:

<Section>
```ts copy {7,8,9}
import * as schema from './db/schema';

const db = drizzle({ schema });

const getUsers = async (page = 1, pageSize = 3) => {
  await db.query.users.findMany({
    orderBy: (users, { asc }) => asc(users.id),
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });
};

await getUsers();
```
</Section>

Drizzle has simple and flexible API, which lets you easily create custom solutions. This is how you can create custom function for pagination using `.$dynamic()` function:

<Section>
```ts copy {11,12,13,16}
import { SQL, asc } from 'drizzle-orm';
import { PgColumn, PgSelect } from 'drizzle-orm/pg-core';

function withPagination<T extends PgSelect>(
  qb: T,
  orderByColumn: PgColumn | SQL | SQL.Aliased,
  page = 1,
  pageSize = 3,
) {
  return qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

const query = db.select().from(users); // query that you want to execute with pagination

await withPagination(query.$dynamic(), asc(users.id));
```

</Section>

You can improve performance of `limit/offset` pagination by using `deferred join` technique. This method performs the pagination on a subset of the data instead of the entire table.

To implement it you can do like this:

```ts copy {10}
const getUsers = async (page = 1, pageSize = 10) => {
   const sq = db
    .select({ id: users.id })
    .from(users)
    .orderBy(users.id)
    .limit(pageSize)
    .offset((page - 1) * pageSize)
    .as('subquery');

   await db.select().from(users).innerJoin(sq, eq(users.id, sq.id)).orderBy(users.id);
};
```

**Benefits** of `limit/offset` pagination: it's simple to implement and pages are easily reachable, which means that you can navigate to any page without having to save the state of the previous pages.

**Drawbacks** of `limit/offset` pagination: degradation in query performance with increasing offset because database has to scan all rows before the offset to skip them, and inconsistency due to data shifts, which can lead to the same row being returned on different pages or rows being skipped.

This is how it works:

<Section>
```ts copy
const getUsers = async (page = 1, pageSize = 3) => {
  await db
    .select()
    .from(users)
    .orderBy(asc(users.id))
    .limit(pageSize)
    .offset((page - 1) * pageSize);
};

// user is browsing the first page
await getUsers();
```

```ts
// results for the first page
[
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    createdAt: 2024-03-10T17:17:06.148Z
  },
  {
    id: 2,
    firstName: 'Alex',
    lastName: 'Smith',
    createdAt: 2024-03-10T17:19:06.147Z
  },
  {
    id: 3,
    firstName: 'Aaron',
    lastName: 'Williams',
    createdAt: 2024-03-10T17:22:06.147Z
  }
]
```

```ts
// while user is browsing the first page, a row with id 2 is deleted
await db.delete(users).where(eq(users.id, 2));

// user navigates to the second page
await getUsers(2);
```

```ts
// second page, row with id 3 was skipped
[
  {
    id: 5,
    firstName: 'Beth',
    lastName: 'Davis',
    createdAt: 2024-03-10T17:34:06.147Z
  },
  {
    id: 6,
    firstName: 'Charlie',
    lastName: 'Miller',
    createdAt: 2024-03-10T17:58:06.147Z
  },
  {
    id: 7,
    firstName: 'Clara',
    lastName: 'Wilson',
    createdAt: 2024-03-10T18:16:06.147Z
  }
]
```
</Section>

So, if your database experiences frequently insert and delete operations in real time or you need high performance to paginate large tables, you should consider using [cursor-based](/docs/guides/cursor-based-pagination) pagination instead.

To learn more about `deferred join` technique you should follow these guides: [Planetscale Pagination Guide](https://planetscale.com/blog/mysql-pagination) and [Efficient Pagination Guide by Aaron Francis](https://aaronfrancis.com/2022/efficient-pagination-using-deferred-joins).
