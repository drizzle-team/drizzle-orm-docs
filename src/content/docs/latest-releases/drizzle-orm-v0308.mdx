---
title: DrizzleORM v0.30.8 release
pubDate: 2024-04-11
description: Added custom schema support to enums in Postgres, changed D1 'migrate()' function to use batch API, updated '.onConflictDoUpdate' method, fixed query generation for 'where' clause in Postgres '.onConflictDoNothing' method and fixed various bugs related to AWS Data API.
---

## New Features

- Added custom schema support to enums in Postgres (fixes [#669](https://github.com/drizzle-team/drizzle-orm/issues/669) via [#2048](https://github.com/drizzle-team/drizzle-orm/pull/2048)):

```ts copy {3,4}
import { pgSchema } from 'drizzle-orm/pg-core';

const mySchema = pgSchema('mySchema');
const colors = mySchema.enum('colors', ['red', 'green', 'blue']);
```

Learn more about Postgres [schemas](/docs/schemas) and [enums](/docs/column-types/pg#enum).

## Fixes

- Changed D1 `migrate()` function to use batch API ([#2137](https://github.com/drizzle-team/drizzle-orm/pull/2137))

To get started with Drizzle and D1 follow the [documentation](/docs/get-started-sqlite#cloudflare-d1).

- Split `where` clause in Postgres `.onConflictDoUpdate` method into `setWhere` and `targetWhere` clauses, to support both `where` cases in `on conflict ...` clause (fixes [#1628](https://github.com/drizzle-team/drizzle-orm/issues/1628), [#1302](https://github.com/drizzle-team/drizzle-orm/issues/1302) via [#2056](https://github.com/drizzle-team/drizzle-orm/pull/2056)). 

```ts copy
await db.insert(employees)
  .values({ employeeId: 123, name: 'John Doe' })
  .onConflictDoUpdate({
    target: employees.employeeId,
    targetWhere: sql`name <> 'John Doe'`,
    set: { name: sql`excluded.name` }
  });
  
await db.insert(employees)
  .values({ employeeId: 123, name: 'John Doe' })
  .onConflictDoUpdate({
    target: employees.employeeId,
    set: { name: 'John Doe' },
    setWhere: sql`name <> 'John Doe'`
  });
```

Learn more about `.onConflictDoUpdate` method [here](/docs/insert#on-conflict-do-update).
- Fixed query generation for `where` clause in Postgres `.onConflictDoNothing` method, as it was placed in a wrong spot (fixes [#1628](https://github.com/drizzle-team/drizzle-orm/issues/1628) via [#2056](https://github.com/drizzle-team/drizzle-orm/pull/2056)).

Learn more about `.onConflictDoNothing` method [here](/docs/insert#on-conflict-do-nothing).

- Fixed multiple issues with AWS Data API driver (fixes [#1931](https://github.com/drizzle-team/drizzle-orm/pull/1931), [#1932](https://github.com/drizzle-team/drizzle-orm/issues/1932), [#1934](https://github.com/drizzle-team/drizzle-orm/issues/1934), [#1936](https://github.com/drizzle-team/drizzle-orm/issues/1936) via [#2119](https://github.com/drizzle-team/drizzle-orm/pull/2119))
- Fix inserting and updating array values in AWS Data API (fixes [#1912](https://github.com/drizzle-team/drizzle-orm/issues/1912) via [#1911](https://github.com/drizzle-team/drizzle-orm/pull/1911))

To get started with Drizzle and AWS Data API follow the [documentation](/docs/get-started-postgresql#aws-data-api).
