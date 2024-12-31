---
title: Seeding using 'with' option
slug: seeding-using-with-option
---

import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Callout from '@mdx/Callout.astro';
import Section from "@mdx/Section.astro";

<IsSupportedChipGroup chips={{PostgreSQL: true, MySQL: true, SQLite: true}}/>

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) or [SQLite](/docs/get-started-sqlite)
- Get familiar with [One-to-many Relation](/docs/relations#one-to-many)
- Get familiar with [Drizzle Seed](/docs/seed-overview)
</Prerequisites>

<Callout title='Warning'>
Using `with` implies tables to have a one-to-many relationship.

Therefore, if `one` user has `many` posts, you can use `with` as follows:
```ts
users: {
    count: 2,
    with: {
        posts: 3,
    },
},
```
</Callout>

## Example 1
<CodeTabs items={["index.ts", "schema.ts"]}>
<CodeTab>
```ts
import { users, posts } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts }).refine(() => ({
        users: {
            count: 2,
            with: {
                posts: 3,
            },
        },
    }));
}
main();

```
</CodeTab>

<CodeTab>
```ts
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull(),
});
```
</CodeTab>
</CodeTabs>

Running the seeding script above will cause an error.

```
Error: "posts" table doesn't have a reference to "users" table or
you didn't include your one-to-many relation in the seed function schema.
You can't specify "posts" as parameter in users.with object.
```

You will have several options to resolve an error:
- You can add reference to the `authorId` column in `posts` table in your schema
<CodeTabs items={["index.ts", "schema.ts"]}>
<CodeTab>
<Section>
```ts
import { users, posts } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts }).refine(() => ({
        users: {
            count: 2,
            with: {
                posts: 3,
            },
        },
    }));
}
main();

// Running the seeding script above will fill you database with values shown below
```

```mdx
`users`

| id |   name   |   
| -- | -------- |
|  1 | 'Melanny' | 
|  2 | 'Elvera' |

`posts`

| id |        content        | author_id |   
| -- | --------------------- | --------- |
|  1 | 'tf02gUXb0LZIdEg6SL'  |     2     |
|  2 | 'j15YdT7Sma'          |     2     |
|  3 | 'LwwvWtLLAZzIpk'      |     1     |
|  4 | 'mgyUnBKSrQw'         |     1     |
|  5 | 'CjAJByKIqilHcPjkvEw' |     2     |
|  6 | 'S5g0NzXs'            |     1     |
```
</Section>
</CodeTab>
<CodeTab>
```ts copy{11}
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull().references(() => users.id),
});
```
</CodeTab>
</CodeTabs>

- You can add one-to-many relation to your schema and include it in the seed function schema
<CodeTabs items={["index.ts", "schema.ts"]}>
<CodeTab>
<Section>
```ts copy{1,5}
import { users, posts, postsRelations } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts, postsRelations }).refine(() => ({
        users: {
            count: 2,
            with: {
                posts: 3,
            },
        },
    }));
}
main();

// Running the seeding script above will fill you database with values shown below
```

```mdx
`users`

| id |   name   |   
| -- | -------- |
|  1 | 'Melanny' | 
|  2 | 'Elvera' |

`posts`

| id |        content        | author_id |   
| -- | --------------------- | --------- |
|  1 | 'tf02gUXb0LZIdEg6SL'  |     2     |
|  2 | 'j15YdT7Sma'          |     2     |
|  3 | 'LwwvWtLLAZzIpk'      |     1     |
|  4 | 'mgyUnBKSrQw'         |     1     |
|  5 | 'CjAJByKIqilHcPjkvEw' |     2     |
|  6 | 'S5g0NzXs'            |     1     |
```
</Section>
</CodeTab>

<CodeTab>
```ts copy{2,15-20}
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
}));
```
</CodeTab>
</CodeTabs>


## Example 2
<CodeTabs items={["index.ts", "schema.ts"]}>
<CodeTab>
```ts
import { users, posts } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts }).refine(() => ({
        posts: {
            count: 2,
            with: {
                users: 3,
            },
        },
    }));
}
main();

```
</CodeTab>

<CodeTab>
```ts
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull().references(() => users.id),
});
```
</CodeTab>
</CodeTabs>

Running the seeding script above will cause an error.

```
Error: "posts" table doesn't have a reference to "users" table or
you didn't include your one-to-many relation in the seed function schema.
You can't specify "posts" as parameter in users.with object.
```

<Callout title='Why?'>
You have a `posts` table referencing a `users` table in your schema, 
```ts copy{7}
.
.
.
export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id').notNull().references(() => users.id),
});
```
or in other words, you have one-to-many relation where `one` user can have `many` posts.

However, in your seeding script, you're attempting to generate 3 (`many`) users for `one` post.
```ts
posts: {
    count: 2,
    with: {
        users: 3,
    },
},
```
</Callout>

To resolve the error, you can modify your seeding script as follows:
<Section>
```ts copy{6-9}
import { users, posts, postsRelations } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users, posts, postsRelations }).refine(() => ({
        users: {
            count: 2,
            with: {
                posts: 3,
            },
        },
    }));
}
main();

// Running the seeding script above will fill you database with values shown below
```

```mdx
`users`

| id |   name   |   
| -- | -------- |
|  1 | 'Melanny' | 
|  2 | 'Elvera' |

`posts`

| id |        content        | author_id |   
| -- | --------------------- | --------- |
|  1 | 'tf02gUXb0LZIdEg6SL'  |     2     |
|  2 | 'j15YdT7Sma'          |     2     |
|  3 | 'LwwvWtLLAZzIpk'      |     1     |
|  4 | 'mgyUnBKSrQw'         |     1     |
|  5 | 'CjAJByKIqilHcPjkvEw' |     2     |
|  6 | 'S5g0NzXs'            |     1     |
```
</Section>

## Example 3

<CodeTabs items={["index.ts", "schema.ts"]}>
<CodeTab>
```ts copy{6-9}
import { users } from './schema.ts';

async function main() {
    const db = drizzle(...);
    await seed(db, { users }).refine(() => ({
        users: {
            count: 2,
            with: {
                users: 3,
            },
        },
    }));
}
main();

```
</CodeTab>

<CodeTab>
```ts
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";
import type { AnyPgColumn } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
    reportsTo: integer('reports_to').references((): AnyPgColumn => users.id),
});
```
</CodeTab>
</CodeTabs>

Running the seeding script above will cause an error.

```
Error: "users" table has self reference.
You can't specify "users" as parameter in users.with object.
```

<Callout title='Why?'>
You have a `users` table referencing a `users` table in your schema, 
```ts copy{7}
.
.
.
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
    reportsTo: integer('reports_to').references((): AnyPgColumn => users.id),
});
```
or in other words, you have one-to-one relation where `one` user can have only `one` user.

However, in your seeding script, you're attempting to generate 3 (`many`) users for `one` user, which is impossible.
```ts
users: {
    count: 2,
    with: {
        users: 3,
    },
},
```
</Callout>