import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Steps from '@mdx/Steps.astro';


# Drizzle \<\> Expo SQLite
According to the **[official website](https://expo.dev/)**, Expo is an ecosystem of tools to develop, build and ship applications on React Native. 
It's powered by Hermes JavaScript runtime and Metro bundler, Drizzle Expo driver is built to natively support both.  
  
Drizzle ORM has the best in class toolkit for Expo SQLite:
- Native ORM driver for Expo SQLite ✅
- [Drizzle Kit](/docs/kit-overview) support for migration generation and bundling in application ✅
- [Drizzle Studio](https://github.com/drizzle-team/drizzle-studio-expo) dev tools plugin to browse on device database ✅
- Live Queries ✅
  
<Npm>
drizzle-orm expo-sqlite@next
-D drizzle-kit 
</Npm>

```ts
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expo = openDatabaseSync("db.db");
const db = drizzle(expo);

await db.select().from(users);
```
#### Live Queries
With `useLiveQuery` hook you can make any Drizzle query reactive:
```ts
import { useLiveQuery, drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import { Text } from 'react-native';
import * as schema from './schema';

const expo = openDatabaseSync('db.db', { enableChangeListener: true }); // <-- enable change listeners
const db = drizzle(expo);

const App = () => {
  // Re-renders automatically when data changes
  const { data } = useLiveQuery(db.select().from(schema.users));
  return <Text>{JSON.stringify(data)}</Text>;
};

export default App;
```

#### Expo SQLite migrations with Drizzle Kit
You can use Drizzle Kit for SQL migration generation.  
Please make sure to check how [Drizzle migrations](/docs/kit-overview) work before proceeding.  
Expo / React Native requires you to have SQL migrations bundled into the app and we've got you covered.  

<Steps>
#### Install babel plugin
It's necessary to bundle SQL migration files as string directly to your bundle.
```shell
npm install babel-plugin-inline-import
```

#### Update config files.
You will need to update `babel.config.js`, `metro.config.js` and `drizzle.config.ts` files
```js filename='babel.config.js'
module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [["inline-import", { "extensions": [".sql"] }]] // <-- add this
  };
};
```

```js filename="metro.config.js"
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('sql'); // <--- add this

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
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';

const expoDb = openDatabaseSync("db.db");

const db = drizzle(expoDb);

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
