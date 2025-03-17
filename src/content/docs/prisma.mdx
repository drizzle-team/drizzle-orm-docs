import Npm from '@mdx/Npm.astro';
import Tabs from '@mdx/Tabs.astro';
import Tab from '@mdx/Tab.astro';
import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Steps from '@mdx/Steps.astro';

# Drizzle extension for Prisma

If you have an existing project with Prisma and want to try Drizzle or gradually adopt it,
you can use our first-class extension that will add Drizzle API to your Prisma client. It will allow you to
use Drizzle alongside your Prisma queries reusing your existing DB connection.

## How to use

<Steps>
#### Install dependencies

You need to install Drizzle itself and a generator package that will create Drizzle schema from the Prisma schema.
<Npm>
drizzle-orm@latest
-D drizzle-prisma-generator
</Npm>

#### Update your Prisma schema

Add Drizzle generator to your Prisma schema. `output` is the path where generated Drizzle schema TS files will be placed.
```prisma copy filename="schema.prisma" {5-8}
generator client {
  provider = "prisma-client-js"
}

generator drizzle {
  provider = "drizzle-prisma-generator"
  output   = "./drizzle" // Where to put generated Drizle tables
}

// Rest of your Prisma schema

datasource db {
  provider = "postgresql"
  url      = env("DB_URL")
}

model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
}

...
```

#### Generate Drizzle schema

```bash
prisma generate
```

#### Add Drizzle extension to your Prisma client

<CodeTabs items={["PostgreSQL", "MySQL", "SQLite"]}>
<CodeTab>
```ts copy
import { PrismaClient } from '@prisma/client';
import { drizzle } from 'drizzle-orm/prisma/pg';

const prisma = new PrismaClient().$extends(drizzle());
```
</CodeTab>
<CodeTab>
```ts copy
import { PrismaClient } from '@prisma/client';
import { drizzle } from 'drizzle-orm/prisma/mysql';

const prisma = new PrismaClient().$extends(drizzle());
```
</CodeTab>
<CodeTab>
```ts copy
import { PrismaClient } from '@prisma/client';
import { drizzle } from 'drizzle-orm/prisma/sqlite';

const prisma = new PrismaClient().$extends(drizzle());
```
</CodeTab>
</CodeTabs>

#### Run Drizzle queries via `prisma.$drizzle` ✨

In order to use Drizzle query builder, you need references to Drizzle tables.
You can import them from the output path that you specified in the generator config.

```ts copy
import { User } from './drizzle';

await prisma.$drizzle.insert().into(User).values({ email: 'sorenbs@drizzle.team', name: 'Søren' });
const users = await prisma.$drizzle.select().from(User);
```

</Steps>

## Limitations

- [Relational queries](/docs/rqb) are not supported due to a [Prisma driver limitation](https://github.com/prisma/prisma/issues/17576). Because of it, Prisma is unable to return query results in array format, which is required for relational queries to work.
- In SQLite, `.values()` (e.g. `await db.select().from(table).values()`) is not supported, because of the same reason as above.
- [Prepared statements](/docs/perf-queries#prepared-statement) support is limited - `.prepare()` will only build the SQL query on Drizzle side, because there is no Prisma API for prepared queries.
