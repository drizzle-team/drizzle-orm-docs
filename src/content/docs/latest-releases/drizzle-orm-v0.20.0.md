---
title: "Drizzle ORM v0.20.0 release"
pubDate: 2023-02-19T01:21:10Z
version: "0.20.0"
description: "Adds common table expressions and fixes subquery queries. Renames subquery aliases to as() and updates typed SQL syntax."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.20.0)

- 🎉 **Implemented support for WITH clause ([docs](https://github.com/drizzle-team/drizzle-orm/blob/0.20.0/drizzle-orm/src/pg-core/README.md#with-clause)). Example usage:**

  ```ts
  const sq = db
    .select()
    .from(users)
    .prepareWithSubquery('sq');

  const result = await db
    .with(sq)
    .select({
      id: sq.id,
      name: sq.name,
      total: sql<number>`count(${sq.id})::int`(),
    })
    .from(sq)
    .groupBy(sq.id, sq.name);
  ```

- 🐛 Fixed various bugs with selecting/joining of subqueries.
- ❗ Renamed `.subquery('alias')` to `.as('alias')`.
- ❗ ``sql`query`.as<type>()`` is now ``sql<type>`query`()``. Old syntax is still supported, but is deprecated and will be removed in one of the next releases.

