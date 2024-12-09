import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";

# Drizzle \<\> PostgreSQL
<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- node-postgres [basics](https://node-postgres.com/)
- postgres.js [basics](https://github.com/porsager/postgres?tab=readme-ov-file#usage)
</Prerequisites>

Drizzle has native support for PostgreSQL connections with the `node-postgres` and `postgres.js` drivers.

There are a few differences between the `node-postgres` and `postgres.js` drivers that we discovered while using both and integrating them with the Drizzle ORM. For example:

- With `node-postgres`, you can install `pg-native` to boost the speed of both `node-postgres` and Drizzle by approximately 10%.
- `node-postgres` supports providing type parsers on a per-query basis without globally patching things. For more details, see [Types Docs](https://node-postgres.com/features/queries#types).
- `postgres.js` uses prepared statements by default, which you may need to opt out of. This could be a potential issue in AWS environments, among others, so please keep that in mind.
- If there's anything else you'd like to contribute, we'd be happy to receive your PRs [here](https://github.com/drizzle-team/drizzle-orm-docs/pulls)

## node-postgres
#### Step 1 - Install packages
<Npm>
drizzle-orm pg
-D drizzle-kit @types/pg
</Npm>

#### Step 2 - Initialize the driver and make a query
<CodeTabs items={["node-postgres", "node-postgres with config"]}>
```typescript copy
// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL);
 
const result = await db.execute('select 1');
```
```typescript copy
// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';

// You can specify any property from the node-postgres connection options
const db = drizzle({ 
  connection: { 
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});
 
const result = await db.execute('select 1');
```
</CodeTabs>

If you need to provide your existing driver:

```typescript copy
// Make sure to install the 'pg' package 
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });
 
const result = await db.execute('select 1');
```

## postgres.js
#### Step 1 - Install packages
<Npm>
drizzle-orm postgres
-D drizzle-kit
</Npm>

#### Step 2 - Initialize the driver and make a query
<CodeTabs items={["postgres.js", "postgres.js with config"]}>
```typescript copy
import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```
```typescript copy
import { drizzle } from 'drizzle-orm/postgres-js';

// You can specify any property from the postgres-js connection options
const db = drizzle({ 
  connection: { 
    url: process.env.DATABASE_URL, 
    ssl: true 
  }
});

const result = await db.execute('select 1');
```
</CodeTabs>

If you need to provide your existing driver:

```typescript copy
// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle({ client: queryClient });

const result = await db.execute('select 1');
```

#### What's next?

<WhatsNextPostgres/>