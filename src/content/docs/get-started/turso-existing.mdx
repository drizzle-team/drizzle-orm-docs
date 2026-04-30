import Npm from '@mdx/Npm.astro';
import Npx from '@mdx/Npx.astro';
import Callout from '@mdx/Callout.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";
import Breadcrumbs from '@mdx/Breadcrumbs.astro';
import FileStructure from '@mdx/get-started/FileStructure.mdx';
import InstallPackages from '@mdx/get-started/InstallPackages.mdx';
import SetupConfig from '@mdx/get-started/SetupConfig.mdx';
import TransferCode from '@mdx/get-started/TransferCode.mdx';
import QueryDatabase from '@mdx/get-started/QueryDatabase.mdx';
import QueryDatabaseUpdated from '@mdx/get-started/QueryDatabaseUpdated.mdx';
import RunFile from '@mdx/get-started/RunFile.mdx';
import ApplyChanges from '@mdx/get-started/ApplyChanges.mdx';
import SetupEnv from '@mdx/get-started/SetupEnv.mdx';
import IntrospectSqlite from '@mdx/get-started/sqlite/IntrospectSqlite.mdx';
import ConnectLibsql from '@mdx/get-started/sqlite/ConnectLibsql.mdx';
import UpdateSchema from '@mdx/get-started/sqlite/UpdateSchema.mdx';
import QueryTurso from '@mdx/get-started/sqlite/QueryTurso.mdx';
import QueryTursoUpdated from '@mdx/get-started/sqlite/QueryTursoUpdated.mdx';
import LibsqlTable from '@mdx/LibsqlTable.mdx';
import LibsqlTabs from '@mdx/LibsqlTabs.mdx';

<Breadcrumbs/>

# Get Started with Drizzle and Turso Cloud in existing project

<Prerequisites>  
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **turso** - SQLite for Production - [read here](https://turso.tech/)
  - **libsql** - a fork of SQLite optimized for low query latency, making it suitable for global applications - [read here](https://docs.turso.tech/libsql)
</Prerequisites>

<FileStructure />

#### Step 1 - Install required packages

<InstallPackages lib='@libsql/client'/>

#### Step 2 - Setup connection variables

Create a `.env` file in the root of your project and add you Turso database url and auth token:

```plaintext copy
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
```

<Callout type='info' title='important'>
If you don't know your `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` values, you can refer to the LibSQL Driver SDK tutorial. 
Check it out [here](https://docs.turso.tech/sdk/ts/quickstart), then return with all the values generated and added to the `.env` file
</Callout>

#### Step 3 - Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
```

#### Step 4 - Introspect your database

<IntrospectSqlite/>

#### Step 5 - Transfer code to your actual schema file

<TransferCode/>

#### Step 6 - Connect Drizzle ORM to the database
Drizzle has native support for all @libsql/client driver variations:

<LibsqlTable />
<br/>
<LibsqlTabs />

Create a `index.ts` file in the `src` directory and initialize the connection:

```typescript copy
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';

// You can specify any property from the libsql connection options
const db = drizzle({ 
  connection: { 
    url: process.env.TURSO_DATABASE_URL!, 
    authToken: process.env.TURSO_AUTH_TOKEN!
  }
});
```

If you need to provide your existing driver:

```typescript copy
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

const client = createClient({ 
  url: process.env.TURSO_DATABASE_URL!, 
  authToken: process.env.TURSO_AUTH_TOKEN!
});

const db = drizzle({ client });
```

#### Step 7 - Query the database

<QueryTurso/>

#### Step 8 - Run index.ts file

<RunFile/>

#### Step 9 - Update your table schema (optional)

<UpdateSchema/>

#### Step 9 - Applying changes to the database (optional)

<ApplyChanges/>

#### Step 10 - Query the database with a new field (optional)

<QueryTursoUpdated />