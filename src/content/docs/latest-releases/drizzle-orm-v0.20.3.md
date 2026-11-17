---
title: "Drizzle ORM v0.20.3 release"
pubDate: 2023-03-02T21:11:32Z
version: "0.20.3"
description: "Adds SELECT locking clauses for PostgreSQL and MySQL, and lets custom column types return SQL from toDriver()."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.20.3)

- 🎉 Added support for locking clauses in SELECT (`SELECT ... FOR UPDATE`):

  PostgreSQL

  ```ts
  await db
    .select()
    .from(users)
    .for('update')
    .for('no key update', { of: users })
    .for('no key update', { of: users, skipLocked: true })
    .for('share', { of: users, noWait: true });
  ```

  MySQL

  ```ts
  await db.select().from(users).for('update');
  await db.select().from(users).for('share', { skipLocked: true });
  await db.select().from(users).for('update', { noWait: true });
  ```

- 🎉🐛 Custom column types now support returning `SQL` from `toDriver()` method in addition to the `driverData` type from generic.

