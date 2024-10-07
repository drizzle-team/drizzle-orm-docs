---
title: DrizzleORM v0.29.5 release
pubDate: 2024-03-06
description: Added with update, with delete, with insert, possibility to specify custom schema and custom name for migrations table, sqlite proxy batch and relational queries support.
---

import Section from "@mdx/Section.astro";

## New Features

### 🎉 WITH UPDATE, WITH DELETE, WITH INSERT

You can now use `WITH` statements with [INSERT](/docs/insert#with-insert-clause), [UPDATE](/docs/update#with-update-clause) and [DELETE](/docs/delete#with-delete-clause) statements

Usage examples

<Section>
```ts copy {6,7}
const averageAmount = db.$with('average_amount').as(
	db.select({ value: sql`avg(${orders.amount})`.as('value') }).from(orders),
);

const result = await db
	.with(averageAmount)
	.delete(orders)
	.where(gt(orders.amount, sql`(select * from ${averageAmount})`))
	.returning({
		id: orders.id,
	});
```

```sql
with "average_amount" as (select avg("amount") as "value" from "orders") 
delete from "orders" 
where "orders"."amount" > (select * from "average_amount") 
returning "id";
```
</Section>

For more examples for all statements, check docs:

- [with insert docs](/docs/insert#with-insert-clause)
- [with update docs](/docs/update#with-update-clause)
- [with delete docs](/docs/delete#with-delete-clause)

### 🎉 Possibility to specify custom schema and custom name for migrations table

- **Custom table for migrations**

By default, all information about executed migrations will be stored in the database inside the `__drizzle_migrations` table,
and for PostgreSQL, inside the `drizzle` schema. However, you can configure where to store those records.

To add a custom table name for migrations stored inside your database, you should use the `migrationsTable` option

Usage example

```ts copy {3}
await migrate(db, {
	migrationsFolder: './drizzle',
	migrationsTable: 'my_migrations',
});
```

- **Custom schema for migrations**

> Works only with PostgreSQL databases

To add a custom schema name for migrations stored inside your database, you should use the `migrationsSchema` option

Usage example

```ts copy {3}
await migrate(db, {
	migrationsFolder: './drizzle',
	migrationsSchema: 'custom',
});
```

### 🎉 SQLite Proxy bacth and Relational Queries support

You can find more information about SQLite proxy in [docs](/docs/get-started-sqlite#http-proxy).

- You can now use `.query.findFirst` and `.query.findMany` syntax with sqlite proxy driver

- SQLite Proxy supports batch requests, the same as it's done for all other drivers. Check full [docs](/docs/batch-api)

  You will need to specify a specific callback for batch queries and handle requests to proxy server:

```ts
import { drizzle } from 'drizzle-orm/sqlite-proxy';

type ResponseType = { rows: any[][] | any[] }[];

const db = drizzle(
	async (sql, params, method) => {
		// single query logic
	},
	// new batch callback
	async (
		queries: {
			sql: string;
			params: any[];
			method: 'all' | 'run' | 'get' | 'values';
		}[],
	) => {
		try {
			const result: ResponseType = await axios.post(
				'http://localhost:3000/batch',
				{ queries },
			);

			return result;
		} catch (e: any) {
			console.error('Error from sqlite proxy server:', e);
			throw e;
		}
	},
);
```

And then you can use `db.batch([])` method, that will proxy all queries

> Response from the batch should be an array of raw values (an array within an array), in the same order as they were sent to the proxy server
