---
title: "Drizzle ORM v0.24.5 release"
pubDate: 2023-04-23T08:31:58Z
version: "0.24.5"
description: "Allows query placeholders in limit() and offset()."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.24.5)

- Add possibility to have placeholders in `.limit()` and `.offset()`

```ts
const stmt = db
  .select({
    id: usersTable.id,
    name: usersTable.name,
  })
  .from(usersTable)
  .limit(placeholder('limit'))
  .offset(placeholder('offset'))
  .prepare('stmt');

const result = await stmt.execute({ limit: 1, offset: 1 });
```

