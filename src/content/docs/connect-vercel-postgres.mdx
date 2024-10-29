import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";

# Drizzle \<\> Vercel Postgres

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- Vercel Postgres database - [website](https://vercel.com/docs/storage/vercel-postgres)
- Vercel Postgres driver - [docs](https://vercel.com/docs/storage/vercel-postgres/sdk) & [GitHub](https://github.com/vercel/storage/tree/main/packages/postgres)
- Drizzle PostgreSQL drivers - [docs](/docs/get-started-postgresql)
</Prerequisites>

According to their **[official website](https://vercel.com/docs/storage/vercel-postgres)**,
Vercel Postgres is a serverless SQL database designed to integrate with Vercel Functions.

Drizzle ORM natively supports both **[@vercel/postgres](https://vercel.com/docs/storage/vercel-postgres)** serverless
driver with `drizzle-orm/vercel-postgres` package and **[`postgres`](#postgresjs)** or **[`pg`](#node-postgres)**
drivers to access Vercel Postgres through `postgesql://`

Check out the official **[Vercel Postgres + Drizzle](https://vercel.com/docs/storage/vercel-postgres/using-an-orm#drizzle)** docs.

#### Step 1 - Install packages

<Npm>
drizzle-orm @vercel/postgres
-D drizzle-kit
</Npm>

#### Step 2 - Prepare Vercel Postgres

Setup a project according to the **[official docs.](https://vercel.com/docs/storage/vercel-postgres/quickstart)** 

#### Step 3 - Initialize the driver and make a query

```typescript copy
import { drizzle } from 'drizzle-orm/vercel-postgres';

const db = drizzle();

const result = await db.execute('select 1');
```

If you need to provide your existing driver:

```typescript copy
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

const db = drizzle({ client: sql })

const result = await db.execute('select 1');
```

With **[@vercel/postgres](https://vercel.com/docs/storage/vercel-postgres)** severless package
you can access Vercel Postgres from either serverful or serverless environments with no TCP available,
like Cloudflare Workers, through websockets.  
  
If you're about to use Vercel Postgres from a _serverfull_ environment, you can do it
either with `@vercel/postgres` or directly access the DB through `postgesql://` with 
either **[`postgres`](#postgresjs)** or **[`pg`](#node-postgres)**.

#### What's next?

<WhatsNextPostgres/>
