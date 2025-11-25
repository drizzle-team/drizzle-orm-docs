import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Steps from '@mdx/Steps.astro';

# Drizzle \<\> OP SQLite
According to the **[official github page](https://github.com/OP-Engineering/op-sqlite)**, 
OP-SQLite embeds the latest version of SQLite and provides a low-level API to execute SQL queries.

<Npm>
drizzle-orm @op-engineering/op-sqlite
-D drizzle-kit 
</Npm>

```ts
import { drizzle } from "drizzle-orm/op-sqlite";
import { open } from '@op-engineering/op-sqlite';

const opsqlite = open({
  name: 'myDB',
});
const db = drizzle(opsqlite);

await db.select().from(users);
```

You can use Drizzle Kit for SQL migration generation.  
Please make sure to check how [Drizzle Kit migrations](/docs/kit-overview) work before proceeding.  
OP SQLite requires you to have SQL migrations bundled into the app and we've got you covered.  

<Steps>

#### Install babel plugin
It's necessary to bundle SQL migration files as string directly to your bundle.
```shell
npm install babel-plugin-inline-import
```

#### Update config files.
You will need to update `babel.config.js`, `metro.config.js` and `drizzle.config.ts` files
```js filename='babel.config.js'
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'inline-import',
      {
        extensions: ['.sql'],
      },
    ],
  ],
};
```

```js filename="metro.config.js"
const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('sql');

module.exports = config;
```

Make sure to have `dialect: 'sqlite'` and `driver: 'expo'` in Drizzle Kit config
```ts filename="drizzle.config.ts"
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './db/schema.ts',
	out: './drizzle',
  dialect: 'sqlite',
	driver: 'expo', // <--- very important
});
```

#### Generate migrations
After creating SQL schema file and drizzle.config.ts file, you can generate migrations
```bash
npx drizzle-kit generate
```

#### Add migrations to your app
Now you need to import `migrations.js` file into your Expo/React Native app from `./drizzle` folder. 
You can run migrations on application startup using our custom `useMigrations` migrations hook on in `useEffect` hook manually as you want.

```ts filename="App.tsx"
import { drizzle } from "drizzle-orm/op-sqlite";
import { open } from '@op-engineering/op-sqlite';
import { useMigrations } from 'drizzle-orm/op-sqlite/migrator';
import migrations from './drizzle/migrations';

const opsqliteDb = open({
  name: 'myDB',
});

const db = drizzle(opsqliteDb);

export default function App() {
  const { success, error } = useMigrations(db, migrations);

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

  return ...your application component;
}
```

</Steps>

