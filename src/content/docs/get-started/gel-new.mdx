import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from "@mdx/Npm.astro";
import Npx from "@mdx/Npx.astro";
import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Breadcrumbs from '@mdx/Breadcrumbs.astro';
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import FileStructure from '@mdx/get-started/FileStructure.mdx';
import InstallPackages from '@mdx/get-started/InstallPackages.mdx';
import ConnectPostgreSQL from '@mdx/get-started/postgresql/ConnectPostgreSQL.mdx'
import CreateTable from '@mdx/get-started/postgresql/CreateTable.mdx'
import SetupConfig from '@mdx/get-started/SetupConfig.mdx';
import ApplyChanges from '@mdx/get-started/ApplyChanges.mdx';
import RunFile from '@mdx/get-started/RunFile.mdx';
import QueryDatabase from '@mdx/get-started/QueryDatabase.mdx';
import SetupEnv from '@mdx/get-started/SetupEnv.mdx';

<Breadcrumbs/>

# Get Started with Drizzle and Gel

<Prerequisites>
  - **tsx** - package for running TypeScript files - [read here](https://tsx.is/)
  - **gel-js** - package for querying your Gel database - [read here](https://github.com/geldata/gel-js)
</Prerequisites>

Drizzle has native support for Gel connections with the `gel` client.

This is the basic file structure of the project. In the `src` directory, we have table definition in `index.ts`. In `drizzle` folder there are generated Gel to Drizzle schema

```plaintext
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 │ └ 📜 index.ts
 ├ 📜 drizzle.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
```

#### Step 1 - Install and init **Gel** project

<Npx>
gel project init
</Npx>

#### Step 2 - Define basic Gel schema

In `dbschema/default.esdl` file add a basic Gel schema

```esdl
module default {
    type user {
        name: str;
        required email: str;
        age: int16;
    }
}
```

#### Step 3 - Push Gel schema to the database

Generate Gel migration file:
```bash
gel migration create
```

Apply Gel migrations to the database
```bash
gel migration apply
```

<Callout>
Now you should have this file structure

```plaintext
📦 <project root>
 ├ 📂 dbschema
 │ ├ 📂 migrations
 │ ├ 📜 default.esdl
 │ └ 📜 scoping.esdl
 ├ 📂 src
 │ └ 📜 index.ts
 ├ 📜 drizzle.config.ts
 ├ 📜 edgedb.toml
 ├ 📜 package.json
 └ 📜 tsconfig.json
```
</Callout>

#### Step 4 - Install required packages
<Npm>
  drizzle-orm gel
  -D drizzle-kit tsx
</Npm>

#### Step 5 - Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'gel',
});
```

#### Step 6 - Pull Gel types to Drizzle schema

Pull your database schema:
<Npx>
drizzle-kit pull
</Npx>

Here is an example of the generated schema.ts file:

```typescript filename="drizzle/schema.ts"
import { gelTable, uniqueIndex, uuid, smallint, text } from "drizzle-orm/gel-core"
import { sql } from "drizzle-orm"

export const users = gelTable("users", {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	age: smallint(),
	email: text().notNull(),
	name: text(),
}, (table) => [
	uniqueIndex("a8c6061c-f37f-11ef-9249-0d78f6c1807b;schemaconstr").using("btree", table.id.asc().nullsLast().op("uuid_ops")),
]);
```

#### Step 7 - Connect Drizzle ORM to the database

Create a `index.ts` file in the `src` directory and initialize the connection:

```typescript copy filename="src/index.ts"
import { drizzle } from "drizzle-orm/gel";
import { createClient } from "gel";

const gelClient = createClient();
const db = drizzle({ client: gelClient });
```

#### Step 8 - Query the database

```typescript copy filename="src/index.ts"
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/gel";
import { createClient } from "gel";
import { users } from "../drizzle/schema";

const gelClient = createClient();
const db = drizzle({ client: gelClient });

async function main() {
  const user: typeof users.$inferInsert = {
    name: "John",
    age: 30,
    email: "john@example.com",
  };

  await db.insert(users).values(user);
  console.log("New user created!");

  const usersResponse = await db.select().from(users);
  console.log("Getting all users from the database: ", usersResponse);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(users)
    .set({
      age: 31,
    })
    .where(eq(users.email, user.email));
  console.log("User info updated!");

  await db.delete(users).where(eq(users.email, user.email));
  console.log("User deleted!");
}

main();
```

#### Step 9 - Run index.ts file

<RunFile/>