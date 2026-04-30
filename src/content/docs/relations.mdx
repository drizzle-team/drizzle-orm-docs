import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import IsSupportedChipGroup from '@mdx/IsSupportedChipGroup.astro';
import Callout from '@mdx/Callout.astro';
import Section from '@mdx/Section.astro';

import CodeTab from '@mdx/CodeTab.astro';
import CodeTabs from '@mdx/CodeTabs.astro';

# Drizzle soft relations
The sole purpose of Drizzle relations is to let you query your relational data in the most simple and consise way:

<CodeTabs items={["Relational queries", "Select with joins"]}>
<Section>
```ts
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/…';

const db = drizzle(client, { schema });

const result = db.query.users.findMany({
  with: {
    posts: true,
  },
});
```
```ts
[{
  id: 10,
  name: "Dan",
  posts: [
    {
      id: 1,
      content: "SQL is awesome",
      authorId: 10,
    },
    {
      id: 2,
      content: "But check relational queries",
      authorId: 10,
    }
  ]
}]
```
</Section>
<Section>
```ts
import { drizzle } from 'drizzle-orm/…';
import { eq } from 'drizzle-orm';
import { posts, users } from './schema';

const db = drizzle(client);

const res = await db.select()
                    .from(users)
                    .leftJoin(posts, eq(posts.authorId, users.id))
                    .orderBy(users.id)
const mappedResult =  
```
</Section>
</CodeTabs>


### One-to-one
Drizzle ORM provides you an API to define `one-to-one` relations between tables with the `relations` operator.

An example of a `one-to-one` relation between users and users, where a user can invite another (this example uses a self reference):

```typescript copy {10-15}
import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
	invitedBy: integer('invited_by'),
});

export const usersRelations = relations(users, ({ one }) => ({
	invitee: one(users, {
		fields: [users.invitedBy],
		references: [users.id],
	}),
}));
```

Another example would be a user having a profile information stored in separate table. In this case, because the foreign key is stored in the "profile_info" table, the user relation have neither fields or references. This tells Typescript that `user.profileInfo` is nullable:

```typescript copy {9-17}
import { pgTable, serial, text, integer, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const usersRelations = relations(users, ({ one }) => ({
	profileInfo: one(profileInfo),
}));

export const profileInfo = pgTable('profile_info', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => users.id),
	metadata: jsonb('metadata'),
});

export const profileInfoRelations = relations(profileInfo, ({ one }) => ({
	user: one(users, { fields: [profileInfo.userId], references: [users.id] }),
}));

const user = await queryUserWithProfileInfo();
//____^? type { id: number, profileInfo: { ... } | null  }
```

### One-to-many
Drizzle ORM provides you an API to define `one-to-many` relations between tables with `relations` operator. 

Example of `one-to-many` relation between users and posts they've written:

```typescript copy {9-11, 19-24}
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts),
}));

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id'),
});

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
}));
```

Now lets add comments to the posts:
```typescript copy {14,17-22,24-29}
...

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id'),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
	}),
	comments: many(comments)
}));

export const comments = pgTable('comments', {
	id: serial('id').primaryKey(),
	text: text('text'),
	authorId: integer('author_id'),
	postId: integer('post_id'),
});

export const commentsRelations = relations(comments, ({ one }) => ({
	post: one(posts, {
		fields: [comments.postId],
		references: [posts.id],
	}),
}));
```


### Many-to-many
Drizzle ORM provides you an API to define `many-to-many` relations between tables through so called `junction` or `join` tables,
they have to be explicitly defined and store associations between related tables.  
  
Example of `many-to-many` relation between users and groups:
```typescript copy {9-11, 18-20, 37-46}
import { relations } from 'drizzle-orm';
import { integer, pgTable, primaryKey, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToGroups: many(usersToGroups),
}));

export const groups = pgTable('groups', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  usersToGroups: many(usersToGroups),
}));

export const usersToGroups = pgTable(
  'users_to_groups',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    groupId: integer('group_id')
      .notNull()
      .references(() => groups.id),
  },
  (t) => [
		primaryKey({ columns: [t.userId, t.groupId] })
	],
);

export const usersToGroupsRelations = relations(usersToGroups, ({ one }) => ({
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
}));
```

### Foreign keys

You might've noticed that `relations` look similar to foreign keys — they even have a `references` property. So what's the difference?

While foreign keys serve a similar purpose, defining relations between tables, they work on a different level compared to `relations`.

Foreign keys are a database level constraint, they are checked on every `insert`/`update`/`delete` operation and throw an error if a constraint is violated.
On the other hand, `relations` are a higher level abstraction, they are used to define relations between tables on the application level only.
They do not affect the database schema in any way and do not create foreign keys implicitly.

What this means is `relations` and foreign keys can be used together, but they are not dependent on each other.
You can define `relations` without using foreign keys (and vice versa), which allows them to be used with databases that do not support foreign keys.

The following two examples will work exactly the same in terms of querying the data using Drizzle relational queries.
<CodeTabs items={["schema1.ts", "schema2.ts"]}>
<CodeTab>
```ts {15}
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const usersRelations = relations(users, ({ one, many }) => ({
	profileInfo: one(users, {
		fields: [profileInfo.userId],
		references: [users.id],
	}),
}));

export const profileInfo = pgTable('profile_info', {
	id: serial('id').primaryKey(),
	userId: integer("user_id"),
	metadata: jsonb("metadata"),
});
```
</CodeTab>
<CodeTab>
```ts {15}
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const usersRelations = relations(users, ({ one, many }) => ({
	profileInfo: one(users, {
		fields: [profileInfo.userId],
		references: [users.id],
	}),
}));

export const profileInfo = pgTable('profile_info', {
	id: serial('id').primaryKey(),
	userId: integer("user_id").references(() => users.id),
	metadata: jsonb("metadata"),
});
```
</CodeTab>
</CodeTabs>

### Foreign key actions

For more information check the [PostgreSQL foreign keys docs](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)

You can specify actions that should occur when the referenced data in the parent table is modified. These actions are known as "foreign key actions." PostgreSQL provides several options for these actions.

On Delete/ Update Actions

- `CASCADE`: When a row in the parent table is deleted, all corresponding rows in the child table will also be deleted. This ensures that no orphaned rows exist in the child table.

- `NO ACTION`: This is the default action. It prevents the deletion of a row in the parent table if there are related rows in the child table. The DELETE operation in the parent table will fail.

- `RESTRICT`: Similar to NO ACTION, it prevents the deletion of a parent row if there are dependent rows in the child table. It is essentially the same as NO ACTION and included for compatibility reasons.

- `SET DEFAULT`: If a row in the parent table is deleted, the foreign key column in the child table will be set to its default value if it has one. If it doesn't have a default value, the DELETE operation will fail.

- `SET NULL`: When a row in the parent table is deleted, the foreign key column in the child table will be set to NULL. This action assumes that the foreign key column in the child table allows NULL values.

> Analogous to ON DELETE there is also ON UPDATE which is invoked when a referenced column is changed (updated). The possible actions are the same, except that column lists cannot be specified for SET NULL and SET DEFAULT. In this case, CASCADE means that the updated values of the referenced column(s) should be copied into the referencing row(s).
in drizzle you can add foreign key action using `references()` second argument.

type of the actions

```typescript
export type UpdateDeleteAction = 'cascade' | 'restrict' | 'no action' | 'set null' | 'set default';

// second argument of references interface
actions?: {
		onUpdate?: UpdateDeleteAction;
		onDelete?: UpdateDeleteAction;
	} | undefined
```

In the following example, adding `onDelete: 'cascade'` to the author field on the `posts` schema means that deleting the `user` will also delete all related Post records.


```typescript {11}
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	name: text('name'),
	author: integer('author').references(() => users.id, {onDelete: 'cascade'}).notNull(),
});
```

For constraints specified with the `foreignKey` operator, foreign key actions are defined with the syntax:

```typescript {18-19}
import { foreignKey, pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});

export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	name: text('name'),
	author: integer('author').notNull(),
}, (table) => [
	foreignKey({
		name: "author_fk",
		columns: [table.author],
		foreignColumns: [users.id],
	})
		.onDelete('cascade')
		.onUpdate('cascade')
]);
```

### Disambiguating relations

Drizzle also provides the `relationName` option as a way to disambiguate
relations when you define multiple of them between the same two tables. For
example, if you define a `posts` table that has the `author` and `reviewer`
relations.

```ts {9-12, 21-32}
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
 
export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: text('name'),
});
 
export const usersRelations = relations(users, ({ many }) => ({
	author: many(posts, { relationName: 'author' }),
	reviewer: many(posts, { relationName: 'reviewer' }),
}));
 
export const posts = pgTable('posts', {
	id: serial('id').primaryKey(),
	content: text('content'),
	authorId: integer('author_id'),
	reviewerId: integer('reviewer_id'),
});
 
export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id],
		relationName: 'author',
	}),
	reviewer: one(users, {
		fields: [posts.reviewerId],
		references: [users.id],
		relationName: 'reviewer',
	}),
}));
```
