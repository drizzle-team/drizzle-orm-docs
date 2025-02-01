---
title: "Drizzle with Netlify Edge Functions and Neon Postgres "
date: "2025-01-30"
---

import Prerequisites from "@mdx/Prerequisites.astro";
import Npm from '@mdx/Npm.astro';
import Steps from '@mdx/Steps.astro';
import Section from "@mdx/Section.astro";
import Callout from "@mdx/Callout.astro";

This tutorial demonstrates how to use Drizzle ORM with [Netlify Edge Functions](https://docs.netlify.com/edge-functions/overview/) and [Neon Postgres](https://neon.tech/) database.

<Prerequisites>
- You should have the latest version of [Netlify CLI](https://docs.netlify.com/cli/get-started/#installation) installed.
- You should have installed Drizzle ORM and [Drizzle kit](/docs/kit-overview). You can do this by running the following command:
<Npm>
drizzle-orm
-D drizzle-kit
</Npm>

- You should have installed the `dotenv` package for managing environment variables. If you use Node.js `v20.6.0` or later, there is no need to install it because Node.js natively supports `.env` files. Read more about it [here](https://nodejs.org/en/blog/release/v20.6.0#built-in-env-file-support).
<Npm>
  dotenv
</Npm>

- Optionally, you can install the `@netlify/edge-functions` package to import the types for the `Context` object which will be used later.
<Npm>
  @netlify/edge-functions
</Npm>
</Prerequisites>

<Callout type="warning">
These installed packages are used only to create table in the database in [Create a table](#create-a-table), [Setup Drizzle config file](#setup-drizzle-config-file) and [Apply changes to the database](#apply-changes-to-the-database) steps. These packages do not affect the code running inside Netlify Edge Functions. We will use `import_map.json` to import the necessary packages for the Edge Functions.
</Callout>

<Steps>
#### Setup Neon Postgres

Log in to the [Neon Console](https://console.neon.tech/app/projects) and navigate to the Projects section. Select a project or click the `New Project` button to create a new one. 

Your Neon projects come with a ready-to-use Postgres database named `neondb`. We'll use it in this tutorial.

#### Setup connection string variable

In **Project Dashboard** section click the `Connect` button and copy your database connection string. It should look similar to this:

```bash
postgres://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

Add the `DATABASE_URL` environment variable to your `.env` file, which you'll use to connect to the Neon database.

```text copy
DATABASE_URL=NEON_DATABASE_CONNECTION_STRING
```

#### Setup Netlify Edge Functions

Create `netlify/edge-functions` directory in the root of your project. This is where you'll store your Edge Functions.

Create a function `user.ts` in the `netlify/edge-functions` directory.

```typescript copy filename="netlify/edge-functions/user.ts"
import type { Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  return new Response("User data");
};
```

<Callout type="warning">
The types for the `Request` and `Response` objects are in the global scope.
</Callout>

#### Setup imports

Create a `import_map.json` file in the root of your project and add the following content:

```json copy filename="import_map.json"
{
  "imports": {
    "drizzle-orm/": "https://esm.sh/drizzle-orm/",
    "@neondatabase/serverless": "https://esm.sh/@neondatabase/serverless"
  }
}
```

Read more about `import_map.json` in Netlify Edge Functions [here](https://docs.netlify.com/edge-functions/api/#import-maps).

#### Create a Netlify configuration file

Create a `netlify.toml` file in the root of your project and add the following content:

```toml copy filename="netlify.toml"
[functions]
  deno_import_map = "./import_map.json"

[[edge_functions]]
  path = "/user"
  function = "user"
```

This configuration tells Netlify to use the `import_map.json` file for Deno imports and to route requests to the `/user` path to the `user.ts` function. 
Read more about `netlify.toml` [here](https://docs.netlify.com/configure-builds/file-based-configuration/).

#### Create a table

Create a `schema.ts` file in the `netlify/edge-functions/common` directory and declare a table schema:

```typescript copy filename="netlify/edge-functions/common/schema.ts"
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users_table', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  age: integer('age').notNull(),
  email: text('email').notNull().unique(),
})
```

#### Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import 'dotenv/config'; // remove this line if you use Node.js v20.6.0 or later
import type { Config } from "drizzle-kit";

export default {
  schema: './netlify/edge-functions/common/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

In this tutorial we will use Drizzle kit to push changes to the Neon database.

#### Apply changes to the database

```bash copy
npx drizzle-kit push
```
<Callout type="warning">Push command is good for situations where you need to quickly test new schema designs or changes in a local development environment, allowing for fast iterations without the overhead of managing migration files.</Callout>

Alternatively, you can use migrations workflow. Read about it here: [Migrations](/docs/migrations).

#### Connect Drizzle ORM to your database

Update your `netlify/edge-functions/user.ts` file and set up your database configuration:

```typescript copy filename="netlify/edge-functions/user.ts"
import type { Context } from "@netlify/edge-functions";
import { usersTable } from "./common/schema.ts";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

export default async (request: Request, context: Context) => {
  const sql = neon(Netlify.env.get("DATABASE_URL")!);
  const db = drizzle({ client: sql });

  const users = await db.select().from(usersTable);

  return new Response(JSON.stringify(users));
};
```

<Callout type="warning">
You might see a red underline under the imports if you're using VS Code. The Edge Function will still execute. To get rid of the red underline, you can configure VS Code to use Edge Functions in the next step.
</Callout>

#### Test your code locally

Run the following command to start the Netlify dev server:

```bash copy
netlify dev
```

When you first run the command it will suggest to configure VS Code to use Edge Functions. Click `Yes` to configure it. `settings.json` file will be created in the `.vscode` directory.
If you still see red underlines, you can restart the Deno Language Server.

Open your browser and navigate to the route `/user`. You should see the user data returned from the Neon database:

```plaintext
[]
```

It could be an empty array if you haven't added any data to the `users_table` table.

#### Initialize a new Netlify project

Run the following command to initialize a new Netlify project:

```bash copy
netlify init
```

Answer the questions in the CLI to create a new Netlify project. In this tutorial, we will choose `Yes, create and deploy site manually` -> `<YOUR_TEAM>` -> `<SITE_NAME>`.

#### Setup Netlify environment variables

Run the following command to import your environment variables into Netlify:

```bash copy
netlify env:import .env
```

Read more about Netlify environment variables [here](https://docs.netlify.com/environment-variables/get-started/).

#### Deploy your project

Run the following command to deploy your project:

```bash copy
netlify deploy
```

Follow the instructions in the CLI to deploy your project to Netlify. In this tutorial our publish directory is `'.'`.

It is a [draft deployment](https://docs.netlify.com/cli/get-started/#draft-deploys) by default.
To do a production deployment, run the following command:

```bash copy
netlify deploy --prod
```

</Steps>

Finally, you can use URL of the deployed website and navigate to the route you created `(e.g. /user)` to access your edge function.

