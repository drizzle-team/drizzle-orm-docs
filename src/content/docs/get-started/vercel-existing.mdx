import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Breadcrumbs from '@mdx/Breadcrumbs.astro';
import CodeTabs from "@mdx/CodeTabs.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import IntrospectPostgreSQL from '@mdx/get-started/postgresql/IntrospectPostgreSQL.mdx';
import FileStructure from '@mdx/get-started/FileStructure.mdx';
import InstallPackages from '@mdx/get-started/InstallPackages.mdx';
import SetupConfig from '@mdx/get-started/SetupConfig.mdx';
import SetupEnv from '@mdx/get-started/SetupEnv.mdx';
import TransferCode from '@mdx/get-started/TransferCode.mdx';
import ApplyChanges from '@mdx/get-started/ApplyChanges.mdx';
import RunFile from '@mdx/get-started/RunFile.mdx';
import ConnectVercel from '@mdx/get-started/postgresql/ConnectVercel.mdx'
import QueryDatabase from '@mdx/get-started/QueryDatabase.mdx';
import QueryDatabaseUpdated from '@mdx/get-started/QueryDatabaseUpdated.mdx';
import UpdateSchema from '@mdx/get-started/postgresql/UpdateSchema.mdx';

<Breadcrumbs/>

# Get Started with Drizzle and Vercel Postgres in existing project

<Prerequisites>
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **Vercel Postgres database** - [read here](https://vercel.com/docs/storage/vercel-postgres)
  - **Vercel Postgres driver** - [read here](https://vercel.com/docs/storage/vercel-postgres/sdk) & [GitHub](https://github.com/vercel/storage/tree/main/packages/postgres)
</Prerequisites>

<FileStructure/>

#### Step 1 - Install required package
<InstallPackages lib='@vercel/postgres'/>

#### Step 2 - Setup connection variables

<SetupEnv env_variable='POSTGRES_URL' />

<Callout title='warning'>
It's important to name the variable `POSTGRES_URL` for Vercel Postgres.

In the Vercel Postgres storage tab, you can find the `.env.local` tab and copy the `POSTGRES_URL` variable
</Callout>

#### Step 3 - Setup Drizzle config file

<SetupConfig dialect='postgresql' env_variable='POSTGRES_URL'/>

#### Step 4 - Introspect your database

<IntrospectPostgreSQL/>

#### Step 5 - Transfer code to your actual schema file

<TransferCode/>

#### Step 6 - Connect Drizzle ORM to the database

<ConnectVercel/>

#### Step 7 - Query the database

```typescript copy filename="src/index.ts"
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { usersTable } from './db/schema';

async function main() {
  const db = drizzle();

  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}

main();
```

#### Step 8 - Run index.ts file

<RunFile/>

#### Step 9 - Update your table schema (optional)

<UpdateSchema/>

#### Step 10 - Applying changes to the database (optional)

<ApplyChanges />

#### Step 11 - Query the database with a new field (optional)

```typescript copy filename="src/index.ts"
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { usersTable } from './db/schema';

async function main() {
  const db = drizzle();

  const user: typeof usersTable.$inferInsert = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
    phone: '123-456-7890',
  };

  await db.insert(usersTable).values(user);
  console.log('New user created!')

  const users = await db.select().from(usersTable);
  console.log('Getting all users from the database: ', users)
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
    phone: string | null;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  console.log('User info updated!')

  await db.delete(usersTable).where(eq(usersTable.email, user.email));
  console.log('User deleted!')
}

main();
```