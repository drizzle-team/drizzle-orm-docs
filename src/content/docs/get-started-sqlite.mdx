import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Steps from '@mdx/Steps.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";
import LibsqlTable from '@mdx/LibsqlTable.mdx';
import LibsqlTabs from '@mdx/LibsqlTabs.mdx';

# Drizzle \<\> SQLite

Drizzle has native support for SQLite connections with the `libsql` and `better-sqlite3` drivers.
  
There are a few differences between the `libsql` and `better-sqlite3` drivers that we discovered while using both and integrating them with the Drizzle ORM. For example:

At the driver level, there may not be many differences between the two, but the main one is that `libSQL` can connect to both SQLite files and `Turso` remote databases. LibSQL is a fork of SQLite that offers a bit more functionality compared to standard SQLite, such as:

- More ALTER statements are available with the `libSQL` driver, allowing you to manage your schema more easily than with just `better-sqlite3`.
- You can configure the encryption at rest feature natively.
- A large set of extensions supported by the SQLite database is also supported by `libSQL`.

## libsql
#### Step 1 - Install packages
<Npm>
drizzle-orm @libsql/client
-D drizzle-kit
</Npm>

#### Step 2 - Initialize the driver
Drizzle has native support for all @libsql/client driver variations:

<LibsqlTable />
<br/>
<LibsqlTabs />

#### Step 3 - make a query
<CodeTabs items={["libsql", "libsql with config"]}>
```typescript copy
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle(process.env.DATABASE_URL);
 
const result = await db.execute('select 1');
```
```typescript copy
import { drizzle } from 'drizzle-orm/libsql';

// You can specify any property from the libsql connection options
const db = drizzle({ connection: { url:'', authToken: '' }});
 
const result = await db.execute('select 1');
```
</CodeTabs>

If you need a synchronous connection, you can use our additional connection API, 
where you specify a driver connection and pass it to the Drizzle instance.

```typescript copy
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ url: process.env.DATABASE_URL, authToken: process.env.DATABASE_AUTH_TOKEN });
const db = drizzle(client);

const result = await db.execute('select 1');
```

## better-sqlite3
#### Step 1 - Install packages
<Npm>
drizzle-orm better-sqlite3
-D drizzle-kit @types/better-sqlite3
</Npm>

#### Step 2 - Initialize the driver and make a query
<CodeTabs items={["better-sqlite3", "better-sqlite3 with config"]}>
```typescript copy
import { drizzle } from 'drizzle-orm/better-sqlite3';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```
```typescript copy
import { drizzle } from 'drizzle-orm/better-sqlite3';

// You can specify any property from the better-sqlite3 connection options
const db =  drizzle({ connection: { source: process.env.DATABASE_URL }});

const result = await db.execute('select 1');
```
</CodeTabs>

If you need to provide your existing driver:
```typescript copy
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('sqlite.db');
const db = drizzle({ client: sqlite });

const result = await db.execute('select 1');
```

#### What's next?

<WhatsNextPostgres/>
