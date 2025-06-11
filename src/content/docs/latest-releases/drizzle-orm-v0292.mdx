---
title: DrizzleORM v0.29.2 release
pubDate: 2023-12-25
description: Implemented enhancements in the planescale relational tests. Corrected string escaping for empty PgArrays. Rectified syntax error for the exists function in SQLite. Ensured proper handling of dates in AWS Data API. Resolved the Hermes mixins constructor issue.
---

## Fixes: 

- Added improvements to the planescale relational tests ([#1579](https://github.com/drizzle-team/drizzle-orm/pull/1579))
- FIX: correct string escaping for empty PgArrays ([#1640](https://github.com/drizzle-team/drizzle-orm/pull/1640))
- Fix wrong syntax for exists fn in sqlite ([#1647](https://github.com/drizzle-team/drizzle-orm/pull/1647))
- Properly handle dates in AWS Data API
- Fix Hermes mixins constructor issue

## ESLint Drizzle Plugin, v0.2.3

```bash copy
npm i eslint-plugin-drizzle@0.2.3
```

🎉 [ESLint] Add support for functions and improve error messages

- Allowed Drizzle object to be or to be retrieved from a function, e.g.
- Added better context to the suggestion in the error message.

For more info you can check [docs](/docs/eslint-plugin)
## New Drivers

**🎉 Expo SQLite Driver is available**

For starting with [Expo SQLite Driver](/docs/get-started-sqlite#expo-sqlite), you need to install `expo-sqlite` and `drizzle-orm` packages.

```bash copy
npm install drizzle-orm expo-sqlite@next
```

Then, you can use it like this:

```ts copy {4,6}
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expoDb = openDatabaseSync("db.db");

const db = drizzle(expoDb);

await db.select().from(...)...

// or

db.select().from(...).then(...);

// or

db.select().from(...).all();
```

If you want to use Drizzle Migrations, you need to update babel and metro configuration files.

1. Install `babel-plugin-inline-import` package.

```bash copy
npm install babel-plugin-inline-import
```

2. Update `babel.config.js` and `metro.config.js` files.

```ts filename="babel.config.js" copy {6}
module.exports = function(api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
+   plugins: [["inline-import", { "extensions": [".sql"] }]]
  };
};
```

```ts filename="metro.config.js" copy {6}
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

+config.resolver.sourceExts.push('sql');

module.exports = config;
```

3. Create `drizzle.config.ts` file in your project root folder.

```ts copy
import type { Config } from 'drizzle-kit';

export default {
	schema: './db/schema.ts',
	out: './drizzle',
    dialect: 'sqlite',
	driver: 'expo',
} satisfies Config;
```

After creating schema file and drizzle.config.ts file, you can generate migrations like this:

```bash copy
npx drizzle-kit generate
```

Then you need to import `migrations.js` file in your `App.tsx` file from `./drizzle` folder and use hook `useMigrations` or `migrate` function.

```ts copy {4,11}
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
