import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";

# Drizzle \<\> Nile

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- Nile Database - [website](https://thenile.dev)
- Drizzle PostgreSQL drivers - [docs](/docs/get-started-postgresql)
</Prerequisites>

According to the **[official website](https://thenile.dev)**, Nile is PostgreSQL re-engineered for multi-tenant apps.

Checkout official **[Nile + Drizzle Quickstart](https://www.thenile.dev/docs/getting-started/languages/drizzle)** and **[Migration](https://www.thenile.dev/docs/getting-started/schema_migrations/drizzle)** docs.

You can use Nile with any of Drizzle's Postgres drivers, we'll be showing the use of `node-postgres` below.

#### Step 1 - Install packages

<Npm>
drizzle-orm postgres
-D drizzle-kit
</Npm>

#### Step 2 - Initialize the driver and make a query

```typescript copy filename="index.ts"
// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres'

const db = drizzle(process.env.NILEDB_URL);

const response = await db.select().from(...);
```

If you need to provide your existing driver:

```typescript copy filename="index.ts"
// Make sure to install the 'pg' package
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

const response = await db.select().from(...);
```

#### Connecting to a virtual tenant database

Nile provides virtual tenant databases, when you set the tenant context, Nile will direct your queries to the virtual database for this particular tenant and all queries will apply to that tenant (i.e. `select * from table` will result records only for this tenant). 

In order to set the tenant context, we wrap each query in a transaction that sets the appropriate tenant context before running the transaction.

The tenant ID can simply be passed into the wrapper as an argument:

```typescript copy filename="index.ts"
import { drizzle } from 'drizzle-orm/node-postgres';
import { todosTable, tenants } from "./db/schema";
import { sql } from 'drizzle-orm';
import 'dotenv/config';

const db = drizzle(process.env.NILEDB_URL);

function tenantDB<T>(tenantId: string, cb: (tx: any) => T | Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    if (tenantId) {
      await tx.execute(sql`set local nile.tenant_id = '${sql.raw(tenantId)}'`);
    }

    return cb(tx);
  }) as Promise<T>;
}

// In a webapp, you'll likely get it from the request path parameters or headers
const tenantId = '01943e56-16df-754f-a7b6-6234c368b400'

const response = await tenantDB(tenantId, async (tx) => {
    // No need for a "where" clause here
    return await tx.select().from(todosTable);
});

console.log(response);
```

If you are using a web framwork that supports it, you can set up [AsyncLocalStorage](https://nodejs.org/api/async_context.html) and use middleware to populate it with the tenant ID. In this case, your Drizzle client setup will be:

```typescript copy filename="db/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import dotenv from "dotenv/config";
import { sql } from "drizzle-orm";
import { AsyncLocalStorage } from "async_hooks";

export const db = drizzle(process.env.NILEDB_URL);
export const tenantContext = new AsyncLocalStorage<string | undefined>();

export function tenantDB<T>(cb: (tx: any) => T | Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    const tenantId = tenantContext.getStore();
    console.log("executing query with tenant: " + tenantId);
    // if there's a tenant ID, set it in the transaction context
    if (tenantId) {
      await tx.execute(sql`set local nile.tenant_id = '${sql.raw(tenantId)}'`);
    }

    return cb(tx);
  }) as Promise<T>;
}
```

And then, configure a middleware to populate the the AsyncLocalStorage and use `tenantDB` method when handling requests:

```typescript copy filename="app.ts"
// Middleware to set tenant context
app.use("/api/tenants/:tenantId/*", async (c, next) => {
  const tenantId = c.req.param("tenantId");
  console.log("setting context to tenant: " + tenantId);
  return tenantContext.run(tenantId, () => next());
});

// Route handler
app.get("/api/tenants/:tenantId/todos", async (c) => {
    const todos = await tenantDB(c, async (tx) => {
      return await tx
        .select({
          id: todoSchema.id,
          tenant_id: todoSchema.tenantId,
          title: todoSchema.title,
          estimate: todoSchema.estimate,
        })
        .from(todoSchema);
    });
    return c.json(todos);
});
```


#### What's next?

<WhatsNextPostgres/>



