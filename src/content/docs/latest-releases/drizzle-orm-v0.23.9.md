---
title: "Drizzle ORM v0.23.9 release"
pubDate: 2023-04-09T17:44:33Z
version: "0.23.9"
description: "Introduces transactions across the supported databases and drivers."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.23.9)

## Transactions support 🎉

You can now use transactions with all the supported databases and drivers.

`node-postgres` example:

```ts
await db.transaction(async (tx) => {
  await tx.insert(users).values(newUser);
  await tx.update(users).set({ name: 'Mr. Dan' }).where(eq(users.name, 'Dan'));
  await tx.delete(users).where(eq(users.name, 'Dan'));
});
```

For more information, see transactions docs:

- [PostgreSQL](https://github.com/drizzle-team/drizzle-orm/blob/0.23.9/drizzle-orm/src/pg-core/README.md#transactions)
- [MySQL](https://github.com/drizzle-team/drizzle-orm/blob/0.23.9/drizzle-orm/src/mysql-core/README.md#transactions)
- [SQLite](https://github.com/drizzle-team/drizzle-orm/blob/0.23.9/drizzle-orm/src/sqlite-core/README.md#transactions)

