---
title: DrizzleORM v0.29.4 release
pubDate: 2024-02-22
description: Added Neon HTTP Batch support and updated the default behavior and instances of database-js.
---
import Section from "@mdx/Section.astro";

## New Features

### 🎉 Neon HTTP Batch

For more info you can check [Neon docs](https://neon.tech/docs/serverless/serverless-driver#issue-multiple-queries-with-the-transaction-function) and [Get started with Neon and Drizzle](/docs/get-started-postgresql#neon).

<Section>
```ts copy {8}
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { usersTable } from './schema';

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
const db = drizzle(sql);

const batchResponse: BatchType = await db.batch([
	db.insert(usersTable).values({ id: 1, name: 'John' }).returning({
		id: usersTable.id,
	}),
	db.insert(usersTable).values({ id: 2, name: 'Dan' }),
	db.query.usersTable.findMany({}),
	db.query.usersTable.findFirst({}),
]);
```

```ts
type BatchType = [
	{
		id: number;
	}[],
	NeonHttpQueryResult<never>,
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
	} | undefined,
];
```
</Section>

## Improvements

Thanks to the `database-js` and `PlanetScale` teams, we have updated the default behavior and instances of `database-js`.

As suggested by the `database-js` core team, you should use the `Client` instance instead of `connect()`:

```ts copy {1,5}
import { Client } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';

// create the connection
const client = new Client({
	host: process.env['DATABASE_HOST'],
	username: process.env['DATABASE_USERNAME'],
	password: process.env['DATABASE_PASSWORD'],
});

const db = drizzle(client);
```

> Warning: In this version, there are no breaking changes, but starting from version `0.30.0`, you will encounter an error if you attempt to use anything other than a `Client` instance.
>
> We suggest starting to change connections to PlanetScale now to prevent any runtime errors in the future.

Previously our docs stated to use `connect()` and only this function was can be passed to drizzle. In this realase we are adding support for `new Client()` and deprecating `connect()`, by suggesting from `database-js` team. In this release you will see a `warning` when trying to pass `connect()` function result:

**Warning text**

```mdx
Warning: You need to pass an instance of Client:

import { Client } from "@planetscale/database";

const client = new Client({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

const db = drizzle(client);

Starting from version 0.30.0, you will encounter an error if you attempt to use anything other than a Client instance.

Please make the necessary changes now to prevent any runtime errors in the future
```
