---
title: "Drizzle ORM v0.19.0 release"
pubDate: 2023-02-09T10:31:34Z
version: "0.19.0"
description: "Adds subqueries to selects and joins, and replaces the select syntax with select(fields).from(table)."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.19.0)

- Implemented selecting and joining a subquery. Example usage:

  ```ts
  const sq = db
    .select({
      categoryId: courseCategoriesTable.id,
      category: courseCategoriesTable.name,
      total: sql`count(${courseCategoriesTable.id})`.as<number>(),
    })
    .from(courseCategoriesTable)
    .groupBy(courseCategoriesTable.id, courseCategoriesTable.name)
    .subquery('sq');
  ```

  After that, just use the subquery instead of a table as usual.

- ❗ Replaced `db.select(table).fields({ ... })` syntax with `db.select({ ... }).from(table)` to look more like its SQL counterpart.

