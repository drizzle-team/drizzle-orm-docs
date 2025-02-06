import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Steps from '@mdx/Steps.astro';
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";

# Drizzle \<\> Cloudflare D1

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- D1 Database - [website](https://developers.cloudflare.com/d1/)
- D1 driver - [website](https://developers.cloudflare.com/d1/build-with-d1/d1-client-api/)
</Prerequisites>

According to the **[official website](https://developers.cloudflare.com/d1/)**, 
D1 is Cloudflare's first queryable relational database.  
  
Drizzle ORM fully supports the Cloudflare D1 database and Cloudflare Workers environment.
We embrace SQL dialects and dialect specific drivers and syntax and mirror most popular 
SQLite-like `all`, `get`, `values` and `run` query methods syntax.

To setup project for your Cloudflare D1 please refer to **[official docs.](https://developers.cloudflare.com/d1/)**

#### Step 1 - Install packages
<Npm>
drizzle-orm
-D drizzle-kit
</Npm>

#### Step 2 - Initialize the driver and make a query

You would need to have either a `wrangler.json` or a `wrangler.toml` file for D1 database and will look something like this:
<CodeTabs items={["wrangler.json", "wrangler.toml"]}>
```json
{
    "name": "YOUR_PROJECT_NAME",
    "main": "src/index.ts",
    "compatibility_date": "2024-09-26",
    "compatibility_flags": [
        "nodejs_compat"
    ],
    "d1_databases": [
        {
            "binding": "BINDING_NAME",
            "database_name": "YOUR_DB_NAME",
            "database_id": "YOUR_DB_ID",
            "migrations_dir": "drizzle/migrations"
        }
    ]
}
```
```toml
name = "YOUR_PROJECT_NAME"
main = "src/index.ts"
compatibility_date = "2022-11-07"
node_compat = true

[[ d1_databases ]]
binding = "BINDING_NAME"
database_name = "YOUR_DB_NAME"
database_id = "YOUR_DB_ID"
migrations_dir = "drizzle/migrations"
```
</CodeTabs>

Make your first D1 query:
```typescript copy
import { drizzle } from 'drizzle-orm/d1';

export interface Env {
  <BINDING_NAME>: D1Database;
}

export default {
  async fetch(request: Request, env: Env) {
    const db = drizzle(env.<BINDING_NAME>);
    const result = await db.select().from(users).all()
    return Response.json(result);
  },
};
```

#### What's next?

<WhatsNextPostgres/>