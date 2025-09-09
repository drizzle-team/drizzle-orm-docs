import CodeTab from "@mdx/CodeTab.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import Section from "@mdx/Section.astro";
import Tab from "@mdx/Tab.astro";
import Tabs from "@mdx/Tabs.astro";
import Callout from "@mdx/Callout.astro";
import Prerequisites from "@mdx/Prerequisites.astro"
import Npx from "@mdx/Npx.astro";
import SchemaFilePaths from "@mdx/SchemaFilePaths.mdx"
import Dialects from "@mdx/Dialects.mdx"

# `drizzle-kit export` 

<Prerequisites>
- Get started with Drizzle and `drizzle-kit` - [read here](/docs/get-started)
- Drizzle schema fundamentals - [read here](/docs/sql-schema-declaration)
- Database connection basics - [read here](/docs/connect-overview)
- Drizzle migrations fundamentals - [read here](/docs/migrations)
- Drizzle Kit [overview](/docs/kit-overview) and [config file](/docs/drizzle-config-file)
</Prerequisites>


<br/>

`drizzle-kit export` lets you export SQL representation of Drizzle schema and print in console SQL DDL representation on it.
<Callout collapsed="How it works under the hood?">
Drizzle Kit `export` command triggers a sequence of events:
1. It will read through your Drizzle schema file(s) and compose a json snapshot of your schema
3. Based on json differences it will generate SQL DDL statements
4. Output SQL DDL statements to console
</Callout>

It's designed to cover [codebase first](/docs/migrations) approach of managing Drizzle migrations. 
You can export the SQL representation of the Drizzle schema, allowing external tools like Atlas to handle all the migrations for you

`drizzle-kit export` command requires you to provide both `dialect` and `schema` path options, 
you can set them either via [drizzle.config.ts](/docs/drizzle-config-file) config file or via CLI options
<CodeTabs items={["With config file", "As CLI options"]}>
<Section>
```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
});
```
```shell
npx drizzle-kit export
```
</Section>

```shell
npx drizzle-kit export --dialect=postgresql --schema=./src/schema.ts
```
</CodeTabs>

### Schema files path
You can have a single `schema.ts` file or as many schema files as you want spread out across the project. 
Drizzle Kit requires you to specify path(s) to them as a [glob](https://www.digitalocean.com/community/tools/glob?comments=true&glob=/**/*.js&matches=false&tests=//%20This%20will%20match%20as%20it%20ends%20with%20'.js'&tests=/hello/world.js&tests=//%20This%20won't%20match!&tests=/test/some/globs) via `schema` configuration option.

<SchemaFilePaths/>

### Multiple configuration files in one project
You can have multiple config files in the project, it's very useful when you have multiple database stages or multiple databases or different databases on the same project:
<Npx>
  drizzle-kit export --config=drizzle-dev.config.ts
  drizzle-kit export --config=drizzle-prod.config.ts
</Npx>
```plaintext {5-6}
📦 <project root>
 ├ 📂 drizzle
 ├ 📂 src
 ├ 📜 .env
 ├ 📜 drizzle-dev.config.ts
 ├ 📜 drizzle-prod.config.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
```

### Extended list of available configurations
`drizzle-kit export` has a list of cli-only options

<rem025/>

|               |                                                      |
| :--------     | :--------------------------------------------------- |
| `--sql`       | generating SQL representation of Drizzle Schema               |

By default, Drizzle Kit outputs SQL files, but in the future, we want to support different formats

<rem025/>

<Npx>
drizzle-kit push --name=init
drizzle-kit push --name=seed_users --custom
</Npx>

<br/>
<hr/>
<br/>
We recommend configuring `drizzle-kit` through [drizzle.config.ts](/docs/drizzle-config-file) file, 
yet you can provide all configuration options through CLI if necessary, e.g. in CI/CD pipelines, etc.

|               |            |                                                                            |
| :------------ | :-------   | :----------------------------------------------------------------------    |
| `dialect`     | `required` | Database dialect, one of <Dialects/>                                       |
| `schema`      | `required` | Path to typescript schema file(s) or folder(s) with multiple schema files  |
| `config`      |            | Configuration file path, default is `drizzle.config.ts`                    |

### Example
Example of how to export drizzle schema to console with Drizzle schema located in `./src/schema.ts`

We will also place drizzle config file in the `configs` folder.

Let's create config file:

```plaintext {4}
📦 <project root>
 ├ 📂 configs
 │ └ 📜 drizzle.config.ts
 ├ 📂 src
 │ └ 📜 schema.ts
 └ …
```
```ts filename='drizzle.config.ts'
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
});
```

```ts filename='schema.ts'
import { pgTable, serial, text } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	email: text('email').notNull(),
	name: text('name')
});
```

Now let's run
```shell
npx drizzle-kit export --config=./configs/drizzle.config.ts
```
And it will successfully output SQL representation of drizzle schema
```bash
CREATE TABLE "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "email" text NOT NULL,
        "name" text
);
```