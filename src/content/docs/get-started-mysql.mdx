import Npm from '@mdx/Npm.astro';
import Callout from '@mdx/Callout.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";

# Drizzle \<\> MySQL

To use Drizzle with a MySQL database, you should use the `mysql2` driver

According to the **[official website](https://github.com/sidorares/node-mysql2)**, 
`mysql2` is a MySQL client for Node.js with focus on performance.  

Drizzle ORM natively supports `mysql2` with `drizzle-orm/mysql2` package.

#### Step 1 - Install packages
<Npm>
drizzle-orm mysql2
-D drizzle-kit
</Npm>

#### Step 2 - Initialize the driver and make a query
<CodeTabs items={['mysql2', 'mysql with config']}>
```typescript copy
import { drizzle } from "drizzle-orm/mysql2";

const db = drizzle(process.env.DATABASE_URL);

const response = await db.select().from(...)
```
```typescript copy
import { drizzle } from "drizzle-orm/mysql2";

// You can specify any property from the mysql2 connection options
const db = drizzle({ connection:{ uri: process.env.DATABASE_URL }});

const response = await db.select().from(...)
```
</CodeTabs>

If you need to provide your existing driver:

<CodeTabs items={['Client connection', 'Pool connection']}>
  ```typescript copy
  import { drizzle } from "drizzle-orm/mysql2";
  import mysql from "mysql2/promise";

  const connection = await mysql.createConnection({
    host: "host",
    user: "user",
    database: "database",
    ...
  });

  const db = drizzle({ client: connection });
  ```
  ```typescript copy
  import { drizzle } from "drizzle-orm/mysql2";
  import mysql from "mysql2/promise";

  const poolConnection = mysql.createPool({
    host: "host",
    user: "user",
    database: "database",
    ...
  });

  const db = drizzle({ client: poolConnection });
  ```
</CodeTabs>

<Callout type="warning" emoji="⚙️">
  For the built in `migrate` function with DDL migrations we and drivers strongly encourage you to use single `client` connection.  

  For querying purposes feel free to use either `client` or `pool` based on your business demands.
</Callout>

#### What's next?

<WhatsNextPostgres/>