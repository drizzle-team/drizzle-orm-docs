---
title: "Drizzle Kit v0.30.1 release"
pubDate: 2024-12-13T15:57:06Z
version: "0.30.1"
description: "Adds drizzle-kit export to output schema definitions as SQL DDL for use with other migration tools."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.30.1)

# New Features

### `drizzle-kit export`

To make drizzle-kit integration with other migration tools, like Atlas much easier, we've prepared a new command called `export`. It will translate your drizzle schema in SQL representation(DDL) statements and outputs to the console

```ts
// schema.ts
import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: text('email').notNull(),
	name: text('name')
});
```
Running
```bash
npx drizzle-kit export
```

will output this string to console
```bash
CREATE TABLE "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "email" text NOT NULL,
        "name" text
);
```

By default, the only option for now is `--sql`, so the output format will be SQL DDL statements. In the future, we will support additional output formats to accommodate more migration tools

```bash
npx drizzle-kit export --sql
```

