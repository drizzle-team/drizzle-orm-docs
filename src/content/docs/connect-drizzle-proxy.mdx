import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import Section from "@mdx/Section.astro";

# Drizzle HTTP proxy

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
</Prerequisites>

How an HTTP Proxy works and why you might need it

Drizzle Proxy is used when you need to implement your own driver communication with the database. 
It can be used in several cases, such as adding custom logic at the query stage with existing drivers. 
The most common use is with an HTTP driver, which sends queries to your server with the database, executes the query 
on your database, and responds with raw data that Drizzle ORM can then map to results

<Callout collapsed="How it works under the hood?">
```                                  
┌───────────────────────────┐                 ┌─────────────────────────────┐              
│       Drizzle ORM         │                 │  HTTP Server with Database  │             
└─┬─────────────────────────┘                 └─────────────────────────┬───┘             
  │                                                ^                    │
  │-- 1. Build query         2. Send built query --│                    │
  │                                                │                    │
  │              ┌───────────────────────────┐     │                    │
  └─────────────>│                           │─────┘                    │ 
                 │      HTTP Proxy Driver    │                          │
  ┌──────────────│                           │<─────────────┬───────────┘
  │              └───────────────────────────┘              │
  │                                                  3. Execute a query + send raw results back
  │-- 4. Map data and return        
  │                   
  v
```
</Callout>

Drizzle ORM also supports simply using asynchronous callback function for executing SQL.

- `sql` is a query string with placeholders.
- `params` is an array of parameters.
- One of the following values will set for `method` depending on the SQL statement - `run`, `all`, `values` or `get`.

Drizzle always waits for `{rows: string[][]}` or `{rows: string[]}` for the return value.

- When the `method` is `get`, you should return a value as `{rows: string[]}`.
- Otherwise, you should return `{rows: string[][]}`.

<br/>

<CodeTabs items={['PostgreSQL', 'MySQL', 'SQLite']}>
<Section>
```typescript copy
// Example of driver implementation
import { drizzle } from 'drizzle-orm/pg-proxy';

const db = drizzle(async (sql, params, method) => {
  try {
    const rows = await axios.post('http://localhost:3000/query', { sql, params, method });

    return { rows: rows.data };
  } catch (e: any) {
    console.error('Error from pg proxy server: ', e.response.data)
    return { rows: [] };
  }
});
```
```ts
// Example of server implementation
import { Client } from 'pg';
import express from 'express';

const app = express();

app.use(express.json());
const port = 3000;

const client = new Client('postgres://postgres:postgres@localhost:5432/postgres');

app.post('/query', async (req, res) => {
  const { sql, params, method } = req.body;

  // prevent multiple queries
  const sqlBody = sql.replace(/;/g, '');

  try {
    const result = await client.query({
      text: sqlBody,
      values: params,
      rowMode: method === 'all' ? 'array': undefined,
    });
    res.send(result.rows);
  } catch (e: any) {
    res.status(500).json({ error: e });
  }

  res.status(500).json({ error: 'Unknown method value' });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```
</Section>
<Section>
```typescript copy
// Example of driver implementation
import { drizzle } from 'drizzle-orm/mysql-proxy';

const db = drizzle(async (sql, params, method) => {
  try {
    const rows = await axios.post('http://localhost:3000/query', { sql, params, method });

    return { rows: rows.data };
  } catch (e: any) {
    console.error('Error from mysql proxy server: ', e.response.data)
    return { rows: [] };
  }
});
```
```ts
// Example of server implementation
import * as mysql from 'mysql2/promise';
import express from 'express';

const app = express();

app.use(express.json());
const port = 3000;

const main = async () => {
    const connection = await mysql.createConnection('mysql://root:mysql@127.0.0.1:5432/drizzle');

    app.post('/query', async (req, res) => {
      const { sql, params, method } = req.body;

      // prevent multiple queries
      const sqlBody = sql.replace(/;/g, '');

      try {
            const result = await connection.query({
                sql: sqlBody,
                values: params,
                rowsAsArray: method === 'all',
                typeCast: function(field: any, next: any) {
                    if (field.type === 'TIMESTAMP' || field.type === 'DATETIME' || field.type === 'DATE') {
                        return field.string();
                    }
                    return next();
                },
            });
      } catch (e: any) {
        res.status(500).json({ error: e });
      }

      if (method === 'all') {
        res.send(result[0]);
      } else if (method === 'execute') {
        res.send(result);
      }
      res.status(500).json({ error: 'Unknown method value' });
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
}

main();
```
</Section>
<Section>
```typescript copy
import { drizzle } from 'drizzle-orm/sqlite-proxy';

const db = drizzle(async (sql, params, method) => {
  try {
    const rows = await axios.post('http://localhost:3000/query', { sql, params, method });

    return { rows: rows.data };
  } catch (e: any) {
    console.error('Error from sqlite proxy server: ', e.response.data)
    return { rows: [] };
  }
});
```

**Batch support**

Sqlite Proxy supports batch requests, the same as it's done for all other drivers. Check full [docs](/docs/batch-api)

You will need to specify a specific callback for batch queries and handle requests to proxy server:

```ts
import { drizzle } from 'drizzle-orm/sqlite-proxy';

type ResponseType = { rows: any[][] | any[] }[];

const db = drizzle(async (sql, params, method) => {
  // single queries logic. Same as in code above
}, async (queries: { sql: string, params: any[], method: 'all' | 'run' | 'get' | 'values'}[]) => {
    try {
      const result: ResponseType = await axios.post('http://localhost:3000/batch', { queries });

      return result;
    } catch (e: any) {
      console.error('Error from sqlite proxy server:', e);
      throw e;
    }
  });
```

And then you can use `db.batch([])` method, that will proxy all queries

<Callout>
  Response from the batch should be an array of raw values (an array within an array), in the same order as they were sent to the proxy server
</Callout>

Unless you plan on writing every SQL query by hand, a table declaration is helpful:
```typescript copy
import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

const users = sqliteTable('users', {
  id: text('id'),
  textModifiers: text('text_modifiers').notNull().default(sql`CURRENT_TIMESTAMP`),
  intModifiers: integer('int_modifiers', { mode: 'boolean' }).notNull().default(false),
});
```
For more details about column types, see the **[SQLite column types in Drizzle.](/docs/column-types/sqlite)**
</Section>
</CodeTabs>

