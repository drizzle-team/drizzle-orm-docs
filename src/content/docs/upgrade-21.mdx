import Callout from '@mdx/Callout.astro';

## How to migrate to `0.21.0`

#### 1. Remove all `:dialect` prefixes from your drizzle-kit commands.
Example: Change `drizzle-kit push:mysql` to `drizzle-kit push`.

#### 2. Update your `drizzle.config.ts` file:
 - Add `dialect` to `drizzle.config.ts`. It is now mandatory and can be `postgresql`, `mysql`, or `sqlite`.
 - Add `driver` to `drizzle.config.ts` ONLY if you are using `aws-data-api`, `turso`, `d1-http`(WIP), or `expo`. Otherwise, you can remove the `driver` from `drizzle.config.ts`.
 - If you were using `connectionString` or `uri` in `dbCredentials`, you should now use `url`.
    
```ts
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "sqlite", // "postgresql" | "mysql"
    driver: "turso", // optional and used only if `aws-data-api`, `turso`, `d1-http`(WIP) or `expo` are used
    dbCredentials: {
        url: ""
    }
})
```

#### 3. If you are using PostgreSQL or SQLite and had migrations generated in your project, please run `drizzle-kit up` so Drizzle can upgrade all the snapshots to version 6.

<Callout>
  You can check everything that was changed in `0.21.0` in details here
</Callout>

## Changelog

**❗ Snapshots Upgrade**

All PostgreSQL and SQLite-generated snapshots will be upgraded to version 6. You will be prompted to upgrade them by running `drizzle-kit up`

**❗ Removing :dialect from `drizzle-kit` cli commands**

You can now just use commands, like:

- `drizzle-kit generate`
- `drizzle-kit push`
- etc.

without specifying dialect. This param is moved to `drizzle.config.ts`

**❗ `drizzle.config` update**

- `dialect` is now mandatory; specify which database dialect you are connecting to. Options include `mysql`, `postgresql`, or `sqlite`.
- `driver` has become optional and will have a specific driver, each with a different configuration of `dbCredentials`. Available drivers are:
  - `aws-data-api`
  - `turso`
  - `d1-http` - currently WIP
  - `expo`
- `url` - a unified parameter for the previously existing `connectionString` and `uri`.
- `migrations` - a new object parameter to specify a custom table and schema for the migrate command:
  - `table` - the custom table where drizzle will store migrations.
  - `schema` - the custom schema where drizzle will store migrations (Postgres only).

Usage examples for all new and updated commands
```ts
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    dialect: "sqlite", // "postgresql" | "mysql"
    driver: "turso"
    dbCredentials: {
        url: ""
    },
    migration: {
        table: "migrations",
        schema: "public"
    }
})
```

Drizzle driver selection follows the current strategy:

If a `driver` is specified, use this driver for querying.

If no driver is specified:

- For `postgresql` dialect, Drizzle will:
  - Check if the `pg` driver is installed and use it.
  - If not, try to find the `postgres` driver and use it.
  - If still not found, try to find `@vercel/postgres`.
  - Then try `@neondatabase/serverless`.
  - If nothing is found, an error will be thrown.

- For `mysql` dialect, Drizzle will:
  - Check if the `mysql2` driver is installed and use it.
  - If not, try to find `@planetscale/database` and use it.
  - If nothing is found, an error will be thrown.

- For `sqlite` dialect, Drizzle will:
  - Check if the `@libsql/client` driver is installed and use it.
  - If not, try to find `better-sqlite3` and use it.
  - If nothing is found, an error will be thrown

**❗ MySQL schemas/database are no longer supported by drizzle-kit**

Drizzle Kit won't handle any schema changes for additional schemas/databases in your drizzle schema file

# New Features

**🎉 Pull relations**

Drizzle will now pull `relations` from the database by extracting foreign key information and translating it into a `relations` object. You can view the `relations.ts` file in the `out` folder after introspection is complete

For more info about relations, please check [the docs](/docs/rqb#declaring-relations)


**🎉 Custom name for generated migrations**

To specify a name for your migration you should use `--name <name>`

Usage
```
drizzle-kit generate --name init_db
```

**🎉 New command `migrate`**

You can now apply generated migrations to your database directly from `drizzle-kit`

Usage
```
drizzle-kit migrate
```

By default, drizzle-kit will store migration data entries in the `__drizzle_migrations` table and, in the case of PostgreSQL, in a `drizzle` schema. If you want to change this, you will need to specify the modifications in `drizzle.config.ts`.

```ts
import { defineConfig } from "drizzle-kit"

export default defineConfig({
    migrations: {
        table: "migrations",
        schema: "public"
    }
})
```