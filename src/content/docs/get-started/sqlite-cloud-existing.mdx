import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Breadcrumbs from '@mdx/Breadcrumbs.astro';
import CodeTabs from "@mdx/CodeTabs.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import IntrospectSQLite from '@mdx/get-started/sqlite/IntrospectSqlite.mdx';
import FileStructure from '@mdx/get-started/FileStructure.mdx';
import InstallPackages from '@mdx/get-started/InstallPackages.mdx';
import SetupConfig from '@mdx/get-started/SetupConfig.mdx';
import SetupEnv from '@mdx/get-started/SetupEnv.mdx';
import TransferCode from '@mdx/get-started/TransferCode.mdx';
import ApplyChanges from '@mdx/get-started/ApplyChanges.mdx';
import RunFile from '@mdx/get-started/RunFile.mdx';
import ConnectSQLiteCloud from '@mdx/get-started/sqlite/ConnectSQLiteCloud.mdx';
import QueryDatabase from '@mdx/get-started/QueryDatabase.mdx';
import QueryDatabaseUpdated from '@mdx/get-started/QueryDatabaseUpdated.mdx';
import UpdateSchema from '@mdx/get-started/sqlite/UpdateSchema.mdx';

<Breadcrumbs/>

# Get Started with Drizzle and SQLite Cloud in existing project

<Prerequisites>
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **SQLite Cloud database** - [read here](https://docs.sqlitecloud.io/docs/overview)
  - **SQLite Cloud driver** - [read here](https://docs.sqlitecloud.io/docs/sdk-js-introduction) & [GitHub](https://github.com/sqlitecloud/sqlitecloud-js)
</Prerequisites>

<FileStructure/>

#### Step 1 - Install required package
<Npm>
  drizzle-orm@beta @sqlitecloud/drivers dotenv
  -D drizzle-kit@beta tsx
</Npm>

#### Step 2 - Setup connection variables

<SetupEnv env_variable='SQLITE_CLOUD_CONNECTION_STRING' />

#### Step 3 - Setup Drizzle config file

<SetupConfig dialect='sqlite' env_variable='SQLITE_CLOUD_CONNECTION_STRING'/>

#### Step 4 - Introspect your database

<IntrospectSQLite/>

#### Step 5 - Transfer code to your actual schema file

<TransferCode/>

#### Step 6 - Connect Drizzle ORM to the database

<ConnectSQLiteCloud/>

#### Step 7 - Query the database

```typescript copy filename="src/index.ts"
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/sqlite-cloud';
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
import { drizzle } from 'drizzle-orm/sqlite-cloud';
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