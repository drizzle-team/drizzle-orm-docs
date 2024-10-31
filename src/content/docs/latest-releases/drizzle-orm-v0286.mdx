---
title: DrizzleORM v0.28.6 release
pubDate: 2023-09-06
description: Changed datetime mapping for MySQL, added LibSQL batch API support, added JSON mode for text in SQLite, added '.toSQL()' to Relational Query API calls, added new PostgreSQL operators for Arrays, added more SQL operators for the 'where' function in Relational Queries, and fixed bugs.
---
import Section from "@mdx/Section.astro";

## Changes

> **Note**:
> MySQL `datetime` with `mode: 'date'` will now store dates in UTC strings and retrieve data in UTC as well to align with MySQL behavior for `datetime`. If you need a different behavior and want to handle `datetime` mapping in a different way, please use `mode: 'string'` or [Custom Types](/docs/custom-types) implementation

Check [Fix Datetime mapping for MySQL](https://github.com/drizzle-team/drizzle-orm/pull/1082) for implementation details

## New Features

### 🎉 `LibSQL` batch api support

Reference: https://docs.turso.tech/reference/client-access/javascript-typescript-sdk#execute-a-batch-of-statements

Batch API usage example:

<Section>
```ts copy {1}
const batchResponse = await db.batch([
	db.insert(usersTable).values({ id: 1, name: 'John' }).returning({
		id: usersTable.id,
	}),
	db.update(usersTable).set({ name: 'Dan' }).where(eq(usersTable.id, 1)),
	db.query.usersTable.findMany({}),
	db.select().from(usersTable).where(eq(usersTable.id, 1)),
	db.select({ id: usersTable.id, invitedBy: usersTable.invitedBy }).from(
		usersTable,
	),
]);
```

```ts
type BatchResponse = [
	{
		id: number;
	}[],
	ResultSet,
	{
		id: number;
		name: string;
		verified: number;
		invitedBy: number | null;
	}[],
	{
		id: number;
		name: string;
		verified: number;
		invitedBy: number | null;
	}[],
	{
		id: number;
		invitedBy: number | null;
	}[],
];
```
</Section>

All possible builders that can be used inside `db.batch`:

```ts
`db.all()`,
`db.get()`,
`db.values()`,
`db.run()`,
`db.query.<table>.findMany()`,
`db.query.<table>.findFirst()`,
`db.select()...`,
`db.update()...`,
`db.delete()...`,
`db.insert()...`,
```

More usage examples here: [integration-tests/tests/libsql-batch.test.ts](https://github.com/drizzle-team/drizzle-orm/pull/1161/files#diff-17253895532e520545027dd48dcdbac2d69a5a49d594974e6d55d7502f89b838R248) and in [docs](/docs/batch-api)

### 🎉 Add json mode for text in SQLite

Read more in [docs](/docs/get-started-postgresql#http-proxy)

```ts copy {2}
const test = sqliteTable('test', {
	dataTyped: text('data_typed', { mode: 'json' }).$type<{ a: 1 }>().notNull(),
});
```

### 🎉 Add `.toSQL()` to Relational Query API calls

```ts copy {1}
const query = db.query.usersTable.findFirst().toSQL();
```

### 🎉 Added new PostgreSQL operators for Arrays

List of operators and usage examples
`arrayContains`, `arrayContained`, `arrayOverlaps`

Read more in [docs](/docs/get-started-postgresql#http-proxy)

```ts copy {2,5,8,11,12,13,14}
const contains = await db.select({ id: posts.id }).from(posts)
	.where(arrayContains(posts.tags, ['Typescript', 'ORM']));

const contained = await db.select({ id: posts.id }).from(posts)
	.where(arrayContained(posts.tags, ['Typescript', 'ORM']));

const overlaps = await db.select({ id: posts.id }).from(posts)
	.where(arrayOverlaps(posts.tags, ['Typescript', 'ORM']));

const withSubQuery = await db.select({ id: posts.id }).from(posts)
	.where(arrayContains(
		posts.tags,
		db.select({ tags: posts.tags }).from(posts).where(eq(posts.id, 1)),
	));
```

### 🎉 Add more SQL operators for where filter function in Relational Queries

You can find more examples in [docs](/docs/rqb#select-filters)

<Section>
```ts
// Before
import { inArray } from "drizzle-orm/pg-core";

await db.users.findFirst({
  where: (table, _) => inArray(table.id, [ ... ])
})
```

```ts copy {3}
// After
await db.users.findFirst({
  where: (table, { inArray }) => inArray(table.id, [ ... ])
})
```
</Section>

## Fixes

- Correct where in on conflict in sqlite ([#1076](https://github.com/drizzle-team/drizzle-orm/pull/1076))
- Fix libsql/client type import ([#1122](https://github.com/drizzle-team/drizzle-orm/pull/1122))
- Fix: raw sql query not being mapped properly on RDS ([#1071](https://github.com/drizzle-team/drizzle-orm/pull/1071))
- Fix Datetime mapping for MySQL ([#1082](https://github.com/drizzle-team/drizzle-orm/pull/1082))
- Fix smallserial generating as serial ([#1127](https://github.com/drizzle-team/drizzle-orm/pull/1127))
