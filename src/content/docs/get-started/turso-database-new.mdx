import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Breadcrumbs from '@mdx/Breadcrumbs.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import FileStructure from '@mdx/get-started/FileStructure.mdx';
import InstallPackages from '@mdx/get-started/InstallPackages.mdx';
import ConnectTursoDatabase from '@mdx/get-started/sqlite/ConnectTursoDatabase.mdx'
import CreateTable from '@mdx/get-started/sqlite/CreateTable.mdx'
import SetupConfig from '@mdx/get-started/SetupConfig.mdx';
import ApplyChanges from '@mdx/get-started/ApplyChanges.mdx';
import RunFile from '@mdx/get-started/RunFile.mdx';
import QueryDatabase from '@mdx/get-started/QueryDatabase.mdx';
import SetupEnv from '@mdx/get-started/SetupEnv.mdx';

<Breadcrumbs/>

# Get Started with Drizzle and Turso Database

<Prerequisites>
  - **dotenv** - package for managing environment variables - [read here](https://www.npmjs.com/package/dotenv)
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - Turso Database - [website](https://docs.turso.tech/introduction)
  - Turso Database driver - [website](https://docs.turso.tech/connect/javascript) & [GitHub](https://github.com/tursodatabase/turso/tree/main/bindings/javascript)
</Prerequisites>

<FileStructure/>

#### Step 1 - Install required package
<Npm>
  drizzle-orm@beta @tursodatabase/database dotenv
  -D drizzle-kit@beta tsx
</Npm>

#### Step 2 - Setup connection variables

<SetupEnv env_variable='DB_FILE_NAME' />

<Callout type='info' title='important'>
For example, if you want to create an SQLite database file in the root of your project for testing purposes, you can use this example:
```plaintext copy
DB_FILE_NAME=mydb.sqlite
```
</Callout>

#### Step 3 - Connect Drizzle ORM to the database

<ConnectTursoDatabase/>

#### Step 4 - Create a table

<CreateTable />

#### Step 5 - Setup Drizzle config file

<SetupConfig dialect='sqlite' env_variable='DB_FILE_NAME'/>

#### Step 6 - Applying changes to the database

<ApplyChanges />

#### Step 7 - Seed and Query the database

```typescript copy filename="src/index.ts"
import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/tursodatabase/database';
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