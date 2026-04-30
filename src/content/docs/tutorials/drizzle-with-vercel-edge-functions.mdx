---
title: "Drizzle with Vercel Edge Functions"
date: "2024-04-17"
svgs: ['<svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="9.63139" height="40.8516" rx="4.8157" transform="matrix(0.873028 0.48767 -0.497212 0.867629 43.4805 67.3037)" fill="currentColor"></rect><rect width="9.63139" height="40.8516" rx="4.8157" transform="matrix(0.873028 0.48767 -0.497212 0.867629 76.9395 46.5342)" fill="currentColor"></rect><rect width="9.63139" height="40.8516" rx="4.8157" transform="matrix(0.873028 0.48767 -0.497212 0.867629 128.424 46.5352)" fill="currentColor"></rect><rect width="9.63139" height="40.8516" rx="4.8157" transform="matrix(0.873028 0.48767 -0.497212 0.867629 94.957 67.3037)" fill="currentColor"></rect></svg>', <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 5L4 19H20L12 5Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>]
---

import Prerequisites from "@mdx/Prerequisites.astro";
import Npm from '@mdx/Npm.astro';
import Steps from '@mdx/Steps.astro';
import Section from "@mdx/Section.astro";
import Callout from "@mdx/Callout.astro";

This tutorial demonstrates how to use Drizzle ORM with [Vercel Functions](https://vercel.com/docs/functions) in [Edge runtime](https://vercel.com/docs/functions/runtimes/edge-runtime).

<Prerequisites>
- You should have the latest version of [Vercel CLI](https://vercel.com/docs/cli#) installed.
<Npm>
-g vercel
</Npm>

- You should have an existing Next.js project or create a new one using the following command:

```bash copy
npx create-next-app@latest --typescript
```
- You should have installed Drizzle ORM and [Drizzle kit](/docs/kit-overview). You can do this by running the following command:
<Npm>
drizzle-orm
-D drizzle-kit
</Npm>
</Prerequisites>

<Callout type="warning">
In case you face the issue with resolving dependencies during installation:

If you're not using React Native, forcing the installation with `--force` or `--legacy-peer-deps` should resolve the issue. If you are using React Native, then you need to use the exact version of React which is compatible with your React Native version.
</Callout>

## Edge-compatible driver

When using Drizzle ORM with Vercel Edge functions you have to use edge-compatible drivers because the functions run in [Edge runtime](https://vercel.com/docs/functions/runtimes/edge-runtime) not in Node.js runtime, so there are some limitations of standard Node.js APIs.

You can choose one of these drivers according to your database dialect:

- [Neon serverless driver](/docs/get-started-postgresql#neon) allows you to query your Neon Postgres databases from serverless and edge environments over HTTP or WebSockets in place of TCP. We recommend using this driver for connecting to `Neon Postgres`.
- [Vercel Postgres driver](/docs/get-started-postgresql#vercel-postgres) is built on top of the `Neon serverless driver`. We recommend using this driver for connecting to `Vercel Postgres`.
- [PlanetScale serverless driver](/docs/get-started-mysql#planetscale) allows you access any `MySQL` client and execute queries over an HTTP connection, which is generally not blocked by cloud providers.
- [libSQL client](/docs/get-started-sqlite#turso) allows you to access [Turso](https://docs.turso.tech/introduction) database.

## Navigation

- Navigate directly to the [Neon Postgres](/docs/tutorials/drizzle-with-vercel-edge-functions#neon-postgres) section.
- Navigate directly to the [Vercel Postgres](/docs/tutorials/drizzle-with-vercel-edge-functions#vercel-postgres) section.
- Navigate directly to the [PlanetScale](/docs/tutorials/drizzle-with-vercel-edge-functions#planetscale) section.
- Navigate directly to the [Turso](/docs/tutorials/drizzle-with-vercel-edge-functions#turso) section.

### Neon Postgres

<Steps>
#### Install the `@neondatabase/serverless` driver

Install the `@neondatabase/serverless` driver:

<Npm>
@neondatabase/serverless
</Npm>

#### Create a table

Create a `schema.ts` file in the `src/db` directory and declare a table schema:

```typescript copy filename="src/db/schema.ts"
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: text('age').notNull(),
  email: text('email').notNull().unique(),
})
```

#### Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
```

Configure your database connection string in the `.env` file:

```plaintext filename=".env"
POSTGRES_URL="postgres://[user]:[password]@[host]-[region].aws.neon.tech:5432/[db-name]?sslmode=[ssl-mode]"
```

#### Applying changes to the database

You can generate migrations using `drizzle-kit generate` command and then run them using the `drizzle-kit migrate` command.

Generate migrations:

```bash copy
npx drizzle-kit generate
```

These migrations are stored in the `drizzle` directory, as specified in your `drizzle.config.ts`. This directory will contain the SQL files necessary to update your database schema and a `meta` folder for storing snapshots of the schema at different migration stages.

Example of a generated migration:

```sql
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
```

Run migrations:

```bash copy
npx drizzle-kit migrate
```

Alternatively, you can push changes directly to the database using [Drizzle kit push command](/docs/kit-overview#prototyping-with-db-push):

```bash copy
npx drizzle-kit push
```

<Callout type="warning">Push command is good for situations where you need to quickly test new schema designs or changes in a local development environment, allowing for fast iterations without the overhead of managing migration files.</Callout>

#### Connect Drizzle ORM to your database

Create a `index.ts` file in the `src/db` directory and set up your database configuration:

```typescript copy filename="src/db/index.ts"
import { drizzle } from 'drizzle-orm/neon-serverless';


export const db = drizzle(process.env.POSTGRES_URL!)
```

#### Create an API route

Create `route.ts` file in `src/app/api/hello` directory. To learn more about how to write a function, see the [Functions API Reference](https://vercel.com/docs/functions/functions-api-reference) and [Vercel Functions Quickstart](https://vercel.com/docs/functions/quickstart).

```ts copy filename="src/app/api/hello/route.ts"
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
export const runtime = 'edge' // specify the runtime to be edge

export async function GET(request: Request) {
  const users = await db.select().from(usersTable)

  return NextResponse.json({ users, message: 'success' });
}
```

#### Test your code locally

Run the `next dev` command to start your local development server:

```bash copy
npx next dev
```

Navigate to the route you created `(e.g. /api/hello)` in your browser:

```plaintext
{
  "users": [],
  "message": "success"
}
```

#### Deploy your project

Create a new project in the [dashboard](https://vercel.com/new) or run the `vercel` command to deploy your project:

```bash copy
vercel
```

Add `POSTGRES_URL` environment variable:

```bash copy
vercel env add POSTGRES_URL
```

Redeploy your project to update your environment variables:

```bash copy
vercel
```
</Steps>

Finally, you can use URL of the deployed project and navigate to the route you created `(e.g. /api/hello)` to access your edge function.

### Vercel Postgres

You can check quickstart guide for Drizzle with Vercel Postgres client in the [documentation](/docs/get-started-postgresql#vercel-postgres).

<Steps>
#### Install the `@vercel/postgres` driver

Install the `@vercel/postgres` driver:

<Npm>
@vercel/postgres
</Npm>

#### Create a table

Create a `schema.ts` file in the `src/db` directory and declare a table schema:

```typescript copy filename="src/db/schema.ts"
import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: text('age').notNull(),
  email: text('email').notNull().unique(),
})
```

#### Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
```

Configure your database connection string in the `.env` file:

```plaintext filename=".env"
POSTGRES_URL="postgres://[user]:[password]@[host]-[region].aws.neon.tech:5432/[db-name]?sslmode=[ssl-mode]"
```

#### Applying changes to the database

You can generate migrations using `drizzle-kit generate` command and then run them using the `drizzle-kit migrate` command.

Generate migrations:

```bash copy
npx drizzle-kit generate
```

These migrations are stored in the `drizzle` directory, as specified in your `drizzle.config.ts`. This directory will contain the SQL files necessary to update your database schema and a `meta` folder for storing snapshots of the schema at different migration stages.

Example of a generated migration:

```sql
CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" text NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
```

Run migrations:

```bash copy
npx drizzle-kit migrate
```

Alternatively, you can push changes directly to the database using [Drizzle kit push command](/docs/kit-overview#prototyping-with-db-push):

```bash copy
npx drizzle-kit push
```

<Callout type="warning">Push command is good for situations where you need to quickly test new schema designs or changes in a local development environment, allowing for fast iterations without the overhead of managing migration files.</Callout>

#### Connect Drizzle ORM to your database

Create a `index.ts` file in the `src/db` directory and set up your database configuration:

```typescript copy filename="src/db/index.ts"
import { drizzle } from 'drizzle-orm/vercel-postgres';

export const db = drizzle()
```

#### Create an API route

Create `route.ts` in `src/app/api/hello` directory. To learn more about how to write a function, see the [Functions API Reference](https://vercel.com/docs/functions/functions-api-reference) and [Vercel Functions Quickstart](https://vercel.com/docs/functions/quickstart).

```ts copy filename="src/app/api/hello/route.ts"

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
export const runtime = 'edge' // specify the runtime to be edge

export async function GET(request: Request) {
  const users = await db.select().from(usersTable)

  return NextResponse.json({ users, message: 'success' });
}
```

#### Test your code locally

Run the `next dev` command to start your local development server:

```bash copy
npx next dev
```

Navigate to the route you created `(e.g. /api/hello)` in your browser:

```plaintext
{
  "users": [],
  "message": "success"
}
```

#### Deploy your project

Create a new project in the [dashboard](https://vercel.com/new) or run the `vercel` command to deploy your project:

```bash copy
vercel
```

Add `POSTGRES_URL` environment variable:

```bash copy
vercel env add POSTGRES_URL
```

Redeploy your project to update your environment variables:

```bash copy
vercel
```
</Steps>

Finally, you can use URL of the deployed project and navigate to the route you created `(e.g. /api/hello)` to access your edge function.

### PlanetScale

In this tutorial we use [PlanetScale MySQL](https://planetscale.com).

<Steps>
#### Install the `@planetscale/database` driver

Install the `@planetscale/database` driver:

<Npm>
@planetscale/database
</Npm>

#### Create a table

Create a `schema.ts` file in the `src/db` directory and declare a table schema:

```typescript copy filename="src/db/schema.ts"
import { mysqlTable, serial, text } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: text('age').notNull(),
  email: text('email').notNull().unique(),
})
```

#### Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "mysql",
  dbCredentials: {
    url: process.env.MYSQL_URL!,
  },
});
```

Configure your database connection string in the `.env` file:

```plaintext filename=".env"
MYSQL_URL="mysql://[user]:[password]@[host].[region].psdb.cloud/[db-name]?ssl={'rejectUnauthorized':[ssl-rejectUnauthorized]}"
```

#### Applying changes to the database

You can generate migrations using `drizzle-kit generate` command and then run them using the `drizzle-kit migrate` command.

Generate migrations:

```bash copy
npx drizzle-kit generate
```

These migrations are stored in the `drizzle` directory, as specified in your `drizzle.config.ts`. This directory will contain the SQL files necessary to update your database schema and a `meta` folder for storing snapshots of the schema at different migration stages.

Example of a generated migration:

```sql
CREATE TABLE `users_table` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` text NOT NULL,
	`email` text NOT NULL,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);
```

Run migrations:

```bash copy
npx drizzle-kit migrate
```

Alternatively, you can push changes directly to the database using [Drizzle kit push command](/docs/kit-overview#prototyping-with-db-push):

```bash copy
npx drizzle-kit push
```

<Callout type="warning">Push command is good for situations where you need to quickly test new schema designs or changes in a local development environment, allowing for fast iterations without the overhead of managing migration files.</Callout>

#### Connect Drizzle ORM to your database

Create a `index.ts` file in the `src/db` directory and set up your database configuration:

```typescript copy filename="src/db/index.ts"
import { drizzle } from "drizzle-orm/planetscale-serverless";

export const db = drizzle(process.env.MYSQL_URL!)
```

#### Create an API route

Create `route.ts` in `src/app/api/hello` directory. To learn more about how to write a function, see the [Functions API Reference](https://vercel.com/docs/functions/functions-api-reference) and [Vercel Functions Quickstart](https://vercel.com/docs/functions/quickstart).

```ts copy filename="src/app/api/hello/route.ts"
import { db } from "@/app/db/db";
import { usersTable } from "@/app/db/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
export const runtime = 'edge' // specify the runtime to be edge

export async function GET(request: Request) {
  const users = await db.select().from(usersTable)

  return NextResponse.json({ users, message: 'success' });
}
```

#### Test your code locally

Run the `next dev` command to start your local development server:

```bash copy
npx next dev
```

Navigate to the route you created `(e.g. /api/hello)` in your browser:

```plaintext
{
  "users": [],
  "message": "success"
}
```

#### Deploy your project

Create a new project in the [dashboard](https://vercel.com/new) or run the `vercel` command to deploy your project:

```bash copy
vercel
```

Add `MYSQL_URL` environment variable:

```bash copy
vercel env add MYSQL_URL
```

Redeploy your project to update your environment variables:

```bash copy
vercel
```
</Steps>

Finally, you can use URL of the deployed project and navigate to the route you created `(e.g. /api/hello)` to access your edge function.

### Turso

You can check [quickstart guide](/docs/get-started-sqlite#turso) or [tutorial](/docs/tutorials/drizzle-with-turso) for Drizzle with Turso in the documentation.

<Steps>
#### Install the `@libsql/client` driver

Install the `@libsql/client` driver:

<Npm>
@libsql/client
</Npm>

#### Create a table

Create a `schema.ts` file in the `src/db` directory and declare a table schema:

```typescript copy filename="src/db/schema.ts"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable('users_table', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  age: text('age').notNull(),
  email: text('email').notNull().unique(),
})
```

#### Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});
```

Configure your database connection string and auth token in the `.env` file:

```plaintext filename=".env"
TURSO_CONNECTION_URL="libsql://[db-name].turso.io"
TURSO_AUTH_TOKEN="[auth-token]"
```

#### Applying changes to the database

You can generate migrations using `drizzle-kit generate` command and then run them using the `drizzle-kit migrate` command.

Generate migrations:

```bash copy
npx drizzle-kit generate
```

These migrations are stored in the `drizzle` directory, as specified in your `drizzle.config.ts`. This directory will contain the SQL files necessary to update your database schema and a `meta` folder for storing snapshots of the schema at different migration stages.

Example of a generated migration:

```sql
CREATE TABLE `users_table` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`age` text NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);
```

Run migrations:

```bash copy
npx drizzle-kit migrate
```

Alternatively, you can push changes directly to the database using [Drizzle kit push command](/docs/kit-overview#prototyping-with-db-push):

```bash copy
npx drizzle-kit push
```

<Callout type="warning">Push command is good for situations where you need to quickly test new schema designs or changes in a local development environment, allowing for fast iterations without the overhead of managing migration files.</Callout>

#### Connect Drizzle ORM to your database

Create a `index.ts` file in the `src/db` directory and set up your database configuration:

```typescript copy filename="src/db/index.ts"
import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle({ connection: {
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
}})
```

#### Create an API route

Create `route.ts` in `src/app/api/hello` directory. To learn more about how to write a function, see the [Functions API Reference](https://vercel.com/docs/functions/functions-api-reference) and [Vercel Functions Quickstart](https://vercel.com/docs/functions/quickstart).

```ts copy filename="src/app/api/hello/route.ts"
import { db } from "@/app/db/db";
import { usersTable } from "@/app/db/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
export const runtime = 'edge' // specify the runtime to be edge

export async function GET(request: Request) {
  const users = await db.select().from(usersTable)

  return NextResponse.json({ users, message: 'success' });
}
```

#### Test your code locally

Run the `next dev` command to start your local development server:

```bash copy
npx next dev
```

Navigate to the route you created `(e.g. /api/hello)` in your browser:

```plaintext
{
  "users": [],
  "message": "success"
}
```

#### Deploy your project

Create a new project in the [dashboard](https://vercel.com/new) or run the `vercel` command to deploy your project:

```bash copy
vercel
```

Add `TURSO_CONNECTION_URL` environment variable:

```bash copy
vercel env add TURSO_CONNECTION_URL
```

Add `TURSO_AUTH_TOKEN` environment variable:

```bash copy
vercel env add TURSO_AUTH_TOKEN
```

Redeploy your project to update your environment variables:

```bash copy
vercel
```
</Steps>

Finally, you can use URL of the deployed project and navigate to the route you created `(e.g. /api/hello)` to access your edge function.
