import CodeTab from "@mdx/CodeTab.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import Section from "@mdx/Section.astro";
import Tab from "@mdx/Tab.astro";
import Tabs from "@mdx/Tabs.astro";
import Callout from "@mdx/Callout.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import Npx from "@mdx/Npx.astro";

# `drizzle-kit up`

<Prerequisites>
- Get started with Drizzle and `drizzle-kit` - [read here](/docs/get-started)
- Drizzle schema fundamentals - [read here](/docs/sql-schema-declaration)
- Database connection basics - [read here](/docs/connect-overview)
- Drizzle migrations fundamentals - [read here](/docs/migrations)
- Drizzle Kit [overview](/docs/kit-overview) and [config file](/docs/drizzle-config-file)
- `drizzle-kit generate` command - [read here](/docs/drizzle-kit-generate)
</Prerequisites>

`drizzle-kit up` command lets you upgrade drizzle schema snapshots to a newer version. 
It's required whenever we introduce breaking changes to the json snapshots of the schema and upgrade the internal version.

<br/>
<hr/>
<br/>

`drizzle-kit up` command requires you to specify both `dialect` and database connection credentials, 
you can provide them either via [drizzle.config.ts](/docs/drizzle-config-file) config file or via CLI options

<CodeTabs items={["With config file", "As CLI options"]}>
<Section>
```ts {5,8}
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
});
```
```shell
npx drizzle-kit up
```
</Section>
```shell
npx drizzle-kit up --dialect=postgresql
```
</CodeTabs>

### Multiple configuration files in one project
You can have multiple config files in the project, it's very useful when you have multiple database stages or multiple databases on the same project:
<Npx>
  drizzle-kit migrate --config=drizzle-dev.config.ts
  drizzle-kit migrate --config=drizzle-prod.config.ts
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

### Extended list of configurations
We recommend configuring `drizzle-kit` through [drizzle.config.ts](/docs/drizzle-config-file) file, 
yet you can provide all configuration options through CLI if necessary, e.g. in CI/CD pipelines, etc.
<rem025/>
|           |            |                                                                         |
| :-------- | :--------- | :---------------------------------------------------------------------- |
| `dialect` | `required` | Database dialect you are using. Can be `postgresql`,`mysql` or `sqlite` |
| `out`     |            | Migrations folder, default=`./drizzle`                                  |
| `config`  |            | Configuration file path, default=`drizzle.config.ts`                           |
<br/>
<Npx>
drizzle-kit up --dialect=postgresql
drizzle-kit up --dialect=postgresql --out=./migrations-folder
</Npx>

![](@/assets/gifs/up_mysql.gif)

