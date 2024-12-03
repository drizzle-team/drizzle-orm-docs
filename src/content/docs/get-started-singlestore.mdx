import Npm from '@mdx/Npm.astro';
import Callout from '@mdx/Callout.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";

# Drizzle \<\> SingleStore

To use Drizzle with a SingleStore database, you should use the `mysql2` driver

Drizzle ORM natively supports `mysql2` with `drizzle-orm/singlestore` package.

#### Step 1 - Install packages
<Npm>
drizzle-orm mysql2
-D drizzle-kit
</Npm>

#### Step 2 - Initialize the driver and make a query
<CodeTabs items={['mysql2', 'mysql with config']}>
```typescript copy
import { drizzle } from "drizzle-orm/singlestore";

const db = drizzle(process.env.DATABASE_URL);

const response = await db.select().from(...)
```
```typescript copy
import { drizzle } from "drizzle-orm/singlestore";

// You can specify any property from the mysql2 connection options
const db = drizzle({ connection:{ uri: process.env.DATABASE_URL }});

const response = await db.select().from(...)
```
</CodeTabs>

If you need to provide your existing driver:

<CodeTabs items={['Client connection', 'Pool connection']}>
  ```typescript copy
  import { drizzle } from "drizzle-orm/singlestore";
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
  import { drizzle } from "drizzle-orm/singlestore";
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

#### Limitations

Currently, the SingleStore dialect has a set of limitations and features that do not work on the SingleStore database side:

- SingleStore's serial column type only ensures the uniqueness of column values.
- `ORDER BY` and `LIMIT` cannot be chained together.
- Foreign keys are not supported (check).
- `INTERSECT ALL` and `EXCEPT ALL` operations are not supported by SingleStore.
- Nested transactions are not supported by [SingleStore](https://docs.singlestore.com/cloud/reference/sql-reference/procedural-sql-reference/transactions-in-stored-procedures/).
- SingleStore [only supports](https://docs.singlestore.com/cloud/getting-started-with-singlestore-helios/about-singlestore-helios/singlestore-helios-faqs/durability/) one `isolationLevel`.
- The FSP option in `DATE`, `TIMESTAMP`, and `DATETIME` is not supported.
- The relational API is not supported and will be implemented once the SingleStore team develops all the necessary APIs for it.
- There may be more limitations because SingleStore is not 100% compatible with MySQL.

#### What's next?

<WhatsNextPostgres/>