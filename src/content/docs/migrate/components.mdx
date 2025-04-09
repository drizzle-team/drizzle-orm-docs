import Npm from "@mdx/Npm.astro";
import AnchorCards from "@mdx/AnchorCards.astro";
import Callout from "@mdx/Callout.astro";
import CodeTabs from "@mdx/CodeTabs.astro";
import CodeTab from "@mdx/CodeTab.astro";
import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";
import Section from "@mdx/Section.astro";
import Tabs from "@mdx/Tabs.astro";
import Tab from "@mdx/Tab.astro";
import SimpleLinkCards from "@mdx/SimpleLinkCards.astro";
import Steps from "@mdx/Steps.astro";
import YoutubeCards from "@mdx/YoutubeCards.astro";

## Npm

<Npm>drizzle-orm</Npm>

<Npm>drizzle-orm -D drizzle-kit</Npm>

## AnchorCards

<AnchorCards
  cards={{
    Anchor1: "#anchor1",
    Anchor2: "#anchor2",
    Anchor3: "#anchor3",
    Anchor4: "#anchor4",
  }}
/>

## Callout

<Callout emoji={"😀"}>Callout example</Callout>

<Callout>Callout example</Callout>

<Callout type={"info"}>Callout example</Callout>

<Callout type={"warning"}>Callout example</Callout>

<Callout type={"error"}>Callout example</Callout>

## CodeTabs with CodeTab

<CodeTabs items={["index.ts", "schema.ts"]}>
	<CodeTab>
	```typescript copy /schema/3
	import * as schema from './schema';
	import { drizzle } from 'drizzle-orm/...';

    const db = drizzle(client, { schema });

    const result = await db.query.users.findMany({
    	with: {
    		posts: true
    	},
    });
    ```

    ```ts
    [{
    	id: 10,
    	name: "Dan",
    	posts: [
    		{
    			id: 1,
    			content: "SQL is awesome",
    			authorId: 10,
    		},
    		{
    			id: 2,
    			content: "But check relational queries",
    			authorId: 10,
    		}
    	]
    }]
    ```
    </CodeTab>

    ```typescript copy
    import { integer, serial, text, pgTable } from 'drizzle-orm/pg-core';
    import { relations } from 'drizzle-orm';

    export const users = pgTable('users', {
    	id: serial('id').primaryKey(),
    	name: text('name').notNull(),
    });

    export const usersRelations = relations(users, ({ many }) => ({
    	posts: many(posts),
    }));

    export const posts = pgTable('posts', {
    	id: serial('id').primaryKey(),
    	content: text('content').notNull(),
    	authorId: integer('author_id').notNull(),
    });

    export const postsRelations = relations(posts, ({ one }) => ({
    	author: one(users, { fields: [posts.authorId], references: [users.id] }),
    }));
    ```

</CodeTabs>

## IsSupportedChipGroup

<IsSupportedChipGroup
  chips={{ PostgreSQL: true, SQLite: true, MySQL: false }}
/>

## Section

For codeblocks connection

<Section>
```typescript
import { sql } from "drizzle-orm";
import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

const table = sqliteTable('table', {
int1: integer('int1').default(42),
int2: integer('int2').default(sql`(abs(42))`)
});

```
```sql
CREATE TABLE `table` (
  `int1` integer DEFAULT 42,
  `int2` integer DEFAULT (abs(42))
);
```

</Section>

## Tabs with Tab and Section

<Tabs items={['PostgreSQL', 'MySQL', 'SQLite']}>
  <Tab>
    <Section>
    ```typescript
    import { sql } from "drizzle-orm";
    import { integer, uuid, pgTable } from "drizzle-orm/pg-core";

    const table = pgTable('table', {
      integer1: integer('integer1').default(42),
      integer2: integer('integer2').default(sql`'42'::integer`),
      uuid1: uuid('uuid1').defaultRandom(),
      uuid2: uuid('uuid2').default(sql`gen_random_uuid()`),
    });
    ```

    ```sql
    CREATE TABLE IF NOT EXISTS "table" (
      "integer1" integer DEFAULT 42,
      "integer2" integer DEFAULT '42'::integer,
      "uuid1" uuid DEFAULT gen_random_uuid(),
      "uuid2" uuid DEFAULT gen_random_uuid()
    );
    ```
    </Section>

  </Tab> 
  <Tab>
    <Section>
    ```typescript
    import { sql } from "drizzle-orm";
    import { int, time, mysqlTable } from "drizzle-orm/mysql-core";
    
    const table = mysqlTable("table", {
      int: int("int").default(42),
      time: time("time").default(sql`cast("14:06:10" AS TIME)`),
    });
    ```
    ```sql
    CREATE TABLE `table` (
      `int` int DEFAULT 42,
      `time` time DEFAULT cast("14:06:10" AS TIME)
    );
    ```
    </Section>
  </Tab>
  <Tab>
    <Section>
    ```typescript
    import { sql } from "drizzle-orm";
    import { integer, sqliteTable } from "drizzle-orm/sqlite-core";

    const table = sqliteTable('table', {
      int1: integer('int1').default(42),
      int2: integer('int2').default(sql`(abs(42))`)
    });

    ```
    ```sql
    CREATE TABLE `table` (
      `int1` integer DEFAULT 42,
      `int2` integer DEFAULT (abs(42))
    );
    ```
    </Section>
  </Tab>
</Tabs>

## SimpleLinkCards

<SimpleLinkCards
  cards={{
    "PostgreSQL column types": "/docs/column-types/pg",
    "MySQL column types": "/docs/column-types/mysql",
    "SQLite column types": "/docs/column-types/sqlite",
  }}
/>

## Steps

With h4 headers

<Steps>

#### Install babel plugin

It's necessary to bundle SQL migration files as string directly to your bundle.

```shell
npm install babel-plugin-inline-import
```

#### Update config files.

You will need to update `babel.config.js`, `metro.config.js` and `drizzle.config.ts` files

```js filename='babel.config.js'
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],
    plugins: [["inline-import", { extensions: [".sql"] }]], // <-- add this
  };
};
```
</Steps>

## YoutubeCards

<YoutubeCards cards={[
	{
		id: "4ZhtoOFKFP8",
		title: "Easiest Database Setup in Next.js&nbsp;14 with Turso&nbsp;&&nbsp;Drizzle",
		description: "Sam Meech-Ward",
		time: '38:08'
	}, 
	{
		id: "NfVELsEZFsA",
		title: "Next.js Project with Vercel, Neon, Drizzle, TailwindCSS, FlowBite and more!",
		description: "CodingEntrepreneurs",
		time: '5:46:28'
	}, 
	{
		id: "_SLxGYzv6jo",
		title: "I Have A New Favorite Database&nbsp;Tool",
		description: "Theo - t3.gg",
		time: '5:46'
	}
]}/>


## Collapsable code block

```prisma  copy filename="prisma/schema.prisma" collapsable
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}


model Product {
  id              Int           @id @default(autoincrement())
  name            String
  supplierId      Int
  unitPrice       Decimal       @db.Decimal(10, 4)
  unitsInStock    Int

  supplier        Supplier?     @relation(fields: [supplierId], references: [id])
  orderDetails    OrderDetail[]

  @@map("products")
}

model Supplier {
  id           Int       @id @default(autoincrement())
  companyName  String
  city         String
  country      String

  products     Product[]

  @@map("suppliers")
}

model OrderDetail {
  orderId   Int
  productId Int
  quantity  Int

  order   Order   @relation(fields: [orderId], references: [id])
  product Product @relation(fields: [productId], references: [id])

  @@id([orderId, productId])
  @@map("order_details")
}

model Order {
  id             Int       @id @default(autoincrement())
  orderDate      DateTime  @db.Date
  shippedDate    DateTime? @db.Date
  shipAddress    String
  shipPostalCode String?
  shipCountry    String

  orderDetails OrderDetail[]

  @@map("orders")
}
```