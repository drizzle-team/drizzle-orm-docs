---
title: SQL Cursor-based pagination
slug: cursor-based-pagination
---

import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";
import Section from "@mdx/Section.astro";
import Prerequisites from "@mdx/Prerequisites.astro";

<IsSupportedChipGroup chips={{PostgreSQL: true, MySQL: true, SQLite: true}}/>

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) and [SQLite](/docs/get-started-sqlite)
- [Select statement](/docs/select) with [order by clause](/docs/select#order-by)
- [Relational queries](/docs/rqb) with [order by clause](/docs/rqb#order-by)
- [Indices](/docs/indexes-constraints)
</Prerequisites>

This guide demonstrates how to implement `cursor-based` pagination in Drizzle:

<CodeTabs items={["index.ts", "schema.ts"]}>
  <CodeTab>
  ```ts copy {10,11,12}
  import { asc, gt } from 'drizzle-orm';
  import { users } from './schema';

  const db = drizzle(...);

  const nextUserPage = async (cursor?: number, pageSize = 3) => {
    await db
      .select()
      .from(users)
      .where(cursor ? gt(users.id, cursor) : undefined) // if cursor is provided, get rows after it
      .limit(pageSize) // the number of rows to return
      .orderBy(asc(users.id)); // ordering
  };

  // pass the cursor of the last row of the previous page (id)
  await nextUserPage(3);
  ```

  ```sql
  select * from users order by id asc limit 3;
  ```

  ```ts
  // next page, 4-6 rows returned
  [
    {
      id: 4,
      firstName: 'Brian',
      lastName: 'Brown',
      createdAt: 2024-03-08T12:34:55.182Z
    },
    {
      id: 5,
      firstName: 'Beth',
      lastName: 'Davis',
      createdAt: 2024-03-08T12:40:55.182Z
    },
    {
      id: 6,
      firstName: 'Charlie',
      lastName: 'Miller',
      createdAt: 2024-03-08T13:04:55.182Z
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
  +----+------------+------------+----------------------------+
  | id | first_name | last_name  |         created_at         |
  +----+------------+------------+----------------------------+
  |  1 | Alice      | Johnson    | 2024-03-08 12:23:55.251797 |
  +----+------------+------------+----------------------------+
  |  2 | Alex       | Smith      | 2024-03-08 12:25:55.182    |
  +----+------------+------------+----------------------------+
  |  3 | Aaron      | Williams   | 2024-03-08 12:28:55.182    |
  +----+------------+------------+----------------------------+
  |  4 | Brian      | Brown      | 2024-03-08 12:34:55.182    |
  +----+------------+------------+----------------------------+
  |  5 | Beth       | Davis      | 2024-03-08 12:40:55.182    |
  +----+------------+------------+----------------------------+
  |  6 | Charlie    | Miller     | 2024-03-08 13:04:55.182    |
  +----+------------+------------+----------------------------+
  |  7 | Clara      | Wilson     | 2024-03-08 13:22:55.182    |
  +----+------------+------------+----------------------------+
  |  8 | David      | Moore      | 2024-03-08 13:34:55.182    |
  +----+------------+------------+----------------------------+
  |  9 | Aaron      | Anderson   | 2024-03-08 12:40:33.677235 |
  +----+------------+------------+----------------------------+
  ```
  </CodeTab>

</CodeTabs>

If you need dynamic order by you can do like below:

```ts copy {6,8}
const nextUserPage = async (order: 'asc' | 'desc' = 'asc', cursor?: number, pageSize = 3) => {
  await db
    .select()
    .from(users)
    // cursor comparison
    .where(cursor ? (order === 'asc' ? gt(users.id, cursor) : lt(users.id, cursor)) : undefined)
    .limit(pageSize)
    .orderBy(order === 'asc' ? asc(users.id) : desc(users.id));
};

await nextUserPage();
await nextUserPage('asc', 3);
// descending order
await nextUserPage('desc');
await nextUserPage('desc', 7);
```

The main idea of this pagination is to use cursor as a pointer to a specific row in a dataset, indicating the end of the previous page. For correct ordering and cursor comparison, cursor should be unique and sequential.

If you need to order by a non-unique and non-sequential column, you can use multiple columns for cursor. This is how you can do it:

<Section>
```ts copy {14,15,16,17,18,19,22}
import { and, asc, eq, gt, or } from 'drizzle-orm';

const nextUserPage = async (
  cursor?: {
    id: number;
    firstName: string;
  },
  pageSize = 3,
) => {
  await db
    .select()
    .from(users)
    .where(
      cursor
        ? or(
            gt(users.firstName, cursor.firstName),
            and(eq(users.firstName, cursor.firstName), gt(users.id, cursor.id)),
          )
        : undefined,
    )
    .limit(pageSize)
    .orderBy(asc(users.firstName), asc(users.id));
};

// pass the cursor from previous page (id & firstName)
await nextUserPage({
  id: 2,
  firstName: 'Alex',
});
```

```sql
select * from users
  where (first_name > 'Alex' or (first_name = 'Alex' and id > 2))
  order by first_name asc, id asc limit 3;
```

```ts
// next page, 4-6 rows returned
[
  {
    id: 1,
    firstName: 'Alice',
    lastName: 'Johnson',
    createdAt: 2024-03-08T12:23:55.251Z
  },
  {
    id: 5,
    firstName: 'Beth',
    lastName: 'Davis',
    createdAt: 2024-03-08T12:40:55.182Z
  },
  {
    id: 4,
    firstName: 'Brian',
    lastName: 'Brown',
    createdAt: 2024-03-08T12:34:55.182Z
  }
]
```
</Section>

Make sure to create indices for the columns that you use for cursor to make query efficient.

<Section>
```ts copy {7,8}
import { index, ...imports } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  // columns declaration
},
(t) => [
  index('first_name_index').on(t.firstName).asc(),
  index('first_name_and_id_index').on(t.firstName, t.id).asc(),
]);
```

```sql
-- As of now drizzle-kit only supports index name and on() param, so you have to add order manually
CREATE INDEX IF NOT EXISTS "first_name_index" ON "users" ("first_name" ASC);
CREATE INDEX IF NOT EXISTS "first_name_and_id_index" ON "users" ("first_name" ASC,"id" ASC);
```
</Section>

If you are using primary key which is not sequential (e.g. `UUIDv4`), you should add sequential column (e.g. `created_at` column) and use multiple cursor.
This is how you can do it:

<Section>
```ts copy {12,13,14,15,16,17,18,21}

const nextUserPage = async (
  cursor?: {
    id: string;
    createdAt: Date;
  },
  pageSize = 3,
) => {
  await db
    .select()
    .from(users)
    .where(
      // make sure to add indices for the columns that you use for cursor
      cursor
        ? or(
            gt(users.createdAt, cursor.createdAt),
            and(eq(users.createdAt, cursor.createdAt), gt(users.id, cursor.id)),
          )
        : undefined,
    )
    .limit(pageSize)
    .orderBy(asc(users.createdAt), asc(users.id));
};

// pass the cursor from previous page (id & createdAt)
await nextUserPage({
  id: '66ed00a4-c020-4dfd-a1ca-5d2e4e54d174',
  createdAt: new Date('2024-03-09T17:59:36.406Z'),
});
```
</Section>

Drizzle has useful relational queries API, that lets you easily implement `cursor-based` pagination:

```ts copy {7,8,9}
import * as schema from './db/schema';

const db = drizzle(..., { schema });

const nextUserPage = async (cursor?: number, pageSize = 3) => {
  await db.query.users.findMany({
    where: (users, { gt }) => (cursor ? gt(users.id, cursor) : undefined),
    orderBy: (users, { asc }) => asc(users.id),
    limit: pageSize,
  });
};

// next page, cursor of last row of the first page (id = 3)
await nextUserPage(3);
```

**Benefits** of `cursor-based` pagination: consistent query results, with no skipped or duplicated rows due to insert or delete operations, and greater efficiency compared to `limit/offset` pagination because it does not need to scan and skip previous rows to access the next page.

**Drawbacks** of `cursor-based` pagination: the inability to directly navigate to a specific page and complexity of implementation. Since you add more columns to the sort order, you'll need to add more filters to the `where` clause for the cursor comparison to ensure consistent pagination.

So, if you need to directly navigate to a specific page or you need simpler implementation of pagination, you should consider using [offset/limit](/docs/guides/limit-offset-pagination) pagination instead.
