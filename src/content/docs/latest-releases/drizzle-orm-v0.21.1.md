---
title: "Drizzle ORM v0.21.1 release"
pubDate: 2023-03-04T00:56:57Z
version: "0.21.1"
description: "Adds HAVING clauses and callbacks for referencing selected fields in filters, grouping and ordering."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.21.1)

- 🎉 Added support for `HAVING` clause
- 🎉 Added support for referencing selected fields in `.where()`, `.having()`, `.groupBy()` and `.orderBy()` using an optional callback:

  ```ts
  await db
    .select({
      id: citiesTable.id,
      name: sql<string>`upper(${citiesTable.name})`.as('upper_name'),
      usersCount: sql<number>`count(${users2Table.id})::int`.as('users_count'),
    })
    .from(citiesTable)
    .leftJoin(users2Table, eq(users2Table.cityId, citiesTable.id))
    .where(({ name }) => sql`length(${name}) >= 3`)
    .groupBy(citiesTable.id)
    .having(({ usersCount }) => sql`${usersCount} > 0`)
    .orderBy(({ name }) => name);
  ```

