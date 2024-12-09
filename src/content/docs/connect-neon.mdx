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

# Drizzle \<\> Neon Postgres
<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- Neon serverless database - [website](https://neon.tech)
- Neon serverless driver - [docs](https://neon.tech/docs/serverless/serverless-driver) & [GitHub](https://github.com/neondatabase/serverless)
- Drizzle PostgreSQL drivers - [docs](/docs/get-started-postgresql)
</Prerequisites>

Drizzle has native support for Neon connections with the `neon-http` and `neon-websockets` drivers. These use the **neon-serverless** driver under the hood.  
  
With the `neon-http` and `neon-websockets` drivers, you can access a Neon database from serverless environments over HTTP or WebSockets instead of TCP.  
Querying over HTTP is faster for single, non-interactive transactions.  
  
If you need session or interactive transaction support, or a fully compatible drop-in replacement for the `pg` driver, you can use the WebSocket-based `neon-serverless` driver.  
You can connect to a Neon database directly using [Postgres](/docs/get-started/postgresql-new)
  
For an example of using Drizzle ORM with the Neon Serverless driver in a Cloudflare Worker, **[see here.](http://driz.link/neon-cf-ex)**  
To use Neon from a serverful environment, you can use the PostgresJS driver, as described in Neon's **[official Node.js docs](https://neon.tech/docs/guides/node)** — see **[docs](#postgresjs)**.

#### Step 1 - Install packages
<Npm>
drizzle-orm @neondatabase/serverless
-D drizzle-kit
</Npm>

#### Step 2 - Initialize the driver and make a query
<CodeTabs items={["Neon HTTP", "Neon Websockets", "node-postgres", "postgres.js"]}>
```typescript
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```
<Section> 
```typescript 
import { drizzle } from 'drizzle-orm/neon-serverless';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```
```typescript
// For Node.js - make sure to install the 'ws' and 'bufferutil' packages
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

const db = drizzle({
  connection: process.env.DATABASE_URL,
  ws: ws,
});

const result = await db.execute('select 1');
```
<Callout type="warning" emoji="⚙️"> 
Additional configuration is required to use WebSockets in environments where the `WebSocket` global is not defined, such as Node.js. 
Add the `ws` and `bufferutil` packages to your project's dependencies, and set `ws` in the Drizzle config. 
</Callout>
</Section> 
```typescript 
// Make sure to install the 'pg' package 
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL);
 
const result = await db.execute('select 1');
```
```typescript
// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```
</CodeTabs>

If you need to provide your existing drivers:

<CodeTabs items={["Neon HTTP", "Neon Websockets", "node-postgres", "postgres.js"]}>
```typescript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const result = await db.execute('select 1');
```
<Section> 
```typescript 
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool })

const result = await db.execute('select 1');
```
```typescript
// For Node.js - make sure to install the 'ws' and 'bufferutil' packages
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle({ client: pool })

const result = await db.execute('select 1');
```
<Callout type="warning" emoji="⚙️"> 
Additional configuration is required to use WebSockets in environments where the `WebSocket` global is not defined, such as Node.js. 
Add the `ws` and `bufferutil` packages to your project's dependencies, and set `ws` in the Drizzle config. 
</Callout>
</Section> 
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
