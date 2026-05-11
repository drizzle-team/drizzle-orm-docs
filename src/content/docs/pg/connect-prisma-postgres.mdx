import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import Section from "@mdx/Section.astro";
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";

# Drizzle \<\> Prisma Postgres
<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- Prisma Postgres serverless database - [website](https://prisma.io/postgres)
- Prisma Postgres direct connections - [docs](https://www.prisma.io/docs/postgres/database/direct-connections) 
- Drizzle PostgreSQL drivers - [docs](/docs/get-started-postgresql)
</Prerequisites>

Prisma Postgres is a serverless database built on [unikernels](https://www.prisma.io/blog/announcing-prisma-postgres-early-access). It has a large free tier, [operation-based pricing](https://www.prisma.io/blog/operations-based-billing) and no cold starts.
  
You can connect to it using either the [`node-postgres`](https://node-postgres.com/) or [`postgres.js`](https://github.com/porsager/postgres) drivers for PostgreSQL.

<Callout type="info">
Prisma Postgres also has a [serverless driver](https://www.prisma.io/docs/postgres/database/serverless-driver) that will be supported with Drizzle ORM in the future.
</Callout>

#### Step 1 - Install packages
<CodeTabs items={["node-postgres (pg)", "postgres.js"]}>
<Npm>
drizzle-orm pg
-D drizzle-kit
</Npm>

<Npm>
drizzle-orm postres
-D drizzle-kit
</Npm>

</CodeTabs>


#### Step 2 - Initialize the driver and make a query
<CodeTabs items={["node-postgres (pg)", "postgres.js"]}>
```typescript 
// Make sure to install the 'pg' package 
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });
 
const result = await db.execute('select 1');
```
```typescript
// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle({ client: queryClient });

const result = await db.execute('select 1');
```
</CodeTabs>

#### What's next?

<WhatsNextPostgres/>
