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
import CreateTable from '@mdx/get-started/sqlite/CreateTable.mdx';
import ConnectLibsql from '@mdx/get-started/sqlite/ConnectLibsql.mdx';

<Breadcrumbs/>

# Get Started with Drizzle and OP-SQLite

<Prerequisites>  
  - **OP-SQLite** - SQLite library for react-native - [read here](https://github.com/OP-Engineering/op-sqlite)
</Prerequisites>


#### Step 1 - Setup a project from Expo Template
<Npx>
create expo-app --template blank-typescript
</Npx>

You can read more about this template [here](https://docs.expo.dev/more/create-expo/#create-a-new-project).

#### Basic file structure

After installing the template and adding the `db` folder, you'll find the following content: In the `db/schema.ts` file with drizzle table definitions. The `drizzle` folder contains SQL migration files and snapshots

```plaintext
📦 <project root>
 ├ 📂 assets
 ├ 📂 drizzle
 ├ 📂 db
 │  └ 📜 schema.ts
 ├ 📜 .gitignore
 ├ 📜 .npmrc
 ├ 📜 app.json
 ├ 📜 App.tsx
 ├ 📜 babel.config.ts
 ├ 📜 drizzle.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
```

#### Step 2 - Install required packages
<Npm>
  drizzle-orm @op-engineering/op-sqlite
  -D drizzle-kit
</Npm>

#### Step 3 - Connect Drizzle ORM to the database

Create a `App.tsx` file in the root directory and initialize the connection:

```ts
import { open } from '@op-engineering/op-sqlite';
import { drizzle } from 'drizzle-orm/op-sqlite';

const opsqliteDb = open({
  name: 'db',
});

const db = drizzle(opsqliteDb);
```

#### Step 4 - Create a table

Create a `schema.ts` file in the `db` directory and declare your table:

```typescript copy filename="src/db/schema.ts"
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});
```

#### Step 5 - Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './db/schema.ts',
  out: './drizzle',
});
```

#### Step 6 - Setup `metro` config

Create a file `metro.config.js` in root folder and add this code inside:

```js copy filename="metro.config.js"
const { getDefaultConfig } = require('expo/metro-config');
/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);
config.resolver.sourceExts.push('sql');
module.exports = config;
```

#### Step 7 - Update `babel` config
```js copy filename="babel.config.js"
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [["inline-import", { "extensions": [".sql"] }]] // <-- add this
  };
};
```

#### Step 8 - Applying changes to the database

With Expo, you would need to generate migrations using the `drizzle-kit generate` command and then apply them at runtime using the `drizzle-orm` `migrate()` function

Generate migrations:
```bash copy
npx drizzle-kit generate
```

#### Step 9 - Apply migrations and query your db:

Let's **App.tsx** file with migrations and queries to create, read, update, and delete users

```ts copy
import { Text, View } from 'react-native';
import { open } from '@op-engineering/op-sqlite';
import { useEffect, useState } from 'react';
import { drizzle } from 'drizzle-orm/op-sqlite';
import { usersTable } from './db/schema';
import { useMigrations } from 'drizzle-orm/op-sqlite/migrator';
import migrations from './drizzle/migrations';

const opsqliteDb = open({
  name: 'db',
});

const db = drizzle(opsqliteDb);

export default function App() {
  const { success, error } = useMigrations(db, migrations);
  const [items, setItems] = useState<typeof usersTable.$inferSelect[] | null>(null);

  useEffect(() => {
    if (!success) return;

    (async () => {
      await db.delete(usersTable);

      await db.insert(usersTable).values([
        {
            name: 'John',
            age: 30,
            email: 'john@example.com',
        },
      ]);

      const users = await db.select().from(usersTable);
      setItems(users);
    })();
  }, [success]);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }

  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  if (items === null || items.length === 0) {
    return (
      <View>
        <Text>Empty</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      {items.map((item) => (
        <Text key={item.id}>{item.email}</Text>
      ))}
    </View>
  );
}
```

#### Step 10 - Prebuild and run expo app

<CodeTabs items={['npm', 'yarn', 'pnpm', 'bun']}>
```bash copy
npx expo run:ios
```
```bash copy
yarn expo run:ios
```
```bash copy
pnpm expo run:ios
```
```bash copy
bun expo run:ios
```
</CodeTabs>