---
test: 10
---
export const a = 10;

import Callout from '@mdx/Callout.astro';
import Steps from '@mdx/Steps.astro';
import CodeTab from '@mdx/CodeTab.astro';
import CodeTabs from '@mdx/CodeTabs.astro';
import Section from '@mdx/Section.astro';
import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';
import Npm from '@mdx/Npm.astro';
import Tag from '@mdx/Tag.astro'


# Drizzle migrations fundamentals

SQL databases require you to specify a **strict schema** of entities you're going to store upfront 
and if (when) you need to change the shape of those entities - you will need to do it via **schema migrations**.

There're multiple production grade ways of managing database migrations. 
Drizzle is designed to perfectly suits all of them, regardless of you going **database first** or **codebase first**.

**Database first** is when your database schema is a source of truth. You manage your database schema either directly on the database or 
via database migration tools and then you pull your database schema to your codebase application level entities.  
 
**Codebase first** is when database schema in your codebase is a source of truth and is under version control. You declare and manage your database schema in JavaScript/TypeScript
and then you apply that schema to the database itself either with Drizzle, directly or via external migration tools. 

#### How can Drizzle help?
We've built [**drizzle-kit**](/docs/kit-overview) - CLI app for managing migrations with Drizzle. 
```shell
drizzle-kit migrate
drizzle-kit generate
drizzle-kit push
drizzle-kit pull
```
It is designed to let you choose how to approach migrations based on your current business demands. 

It fits in both database and codebase first approaches, it lets you **push your schema** or **generate SQL migration** files or **pull the schema** from database. 
It is perfect wether you work alone or in a team.
<br/>

<hr/>
<rem/>

**Now let's pick the best option for your project:**
<rem/>

<Tag style="font-size: 12px">**Option 1**</Tag>
> I manage database schema myself using external migration tools or by running SQL migrations directly on my database.
> From Drizzle I just need to get current state of the schema from my database and save it as TypeScript schema file.

<Callout collapsed="Expand details">
That's a **database first** approach. You have your database schema as a **source of truth** and 
Drizzle lets you pull database schema to TypeScript using [`drizzle-kit pull`](/docs/drizzle-kit-pull) command.

<Section>
```
                                  ┌────────────────────────┐      ┌─────────────────────────┐ 
                                  │                        │ <---  CREATE TABLE "users" (
┌──────────────────────────┐      │                        │        "id" SERIAL PRIMARY KEY,
│ ~ drizzle-kit pull       │      │                        │        "name" TEXT,
└─┬────────────────────────┘      │        DATABASE        │        "email" TEXT UNIQUE
  │                               │                        │       );
  └ Pull datatabase schema -----> │                        │
  ┌ Generate Drizzle       <----- │                        │
  │ schema TypeScript file        └────────────────────────┘
  │
  v
```
```typescript
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
});
```
</Section>
</Callout>

<rem/>
<rem/>
<rem/>

<Tag style="font-size: 12px">**Option 2**</Tag>
> I want to have database schema in my TypeScript codebase, 
> I don't wanna deal with SQL migration files.  
> I want Drizzle to "push" my schema directly to the database

<Callout collapsed="Expand details">
That's a **codebase first** approach. You have your TypeScript Drizzle schema as a **source of truth** and 
Drizzle lets you push schema changes to the database using [`drizzle-kit push`](/docs/drizzle-kit-push) command.

That's the best approach for rapid prototyping and we've seen dozens of teams 
and solo developers successfully using it as a primary migrations flow in their production applications.

<Section>
```typescript {6} filename="src/schema.ts"
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(), // <--- added column
});
```
```
Add column to `users` table                                                                          
┌──────────────────────────┐                  
│ + email: text().unique() │                  
└─┬────────────────────────┘                  
  │                                           
  v                                           
┌──────────────────────────┐                  
│ ~ drizzle-kit push       │                  
└─┬────────────────────────┘                  
  │                                           ┌──────────────────────────┐
  └ Pull current datatabase schema ---------> │                          │
                                              │                          │
  ┌ Generate alternations based on diff <---- │         DATABASE         │
  │                                           │                          │
  └ Apply migrations to the database -------> │                          │
                                       │      └──────────────────────────┘
                                       │
  ┌────────────────────────────────────┴──────────────┐
   ALTER TABLE `users` ADD COLUMN `email` TEXT UNIQUE; 
```
</Section>
</Callout>

<rem/>
<rem/>
<rem/>

<Tag style="font-size: 12px">**Option 3**</Tag>
> I want to have database schema in my TypeScript codebase, 
> I want Drizzle to generate SQL migration files for me and apply them to my database

<Callout collapsed="Expand details">
That's a **codebase first** approach. You have your TypeScript Drizzle schema as a source of truth and 
Drizzle lets you generate SQL migration files based on your schema changes with [`drizzle-kit generate`](/docs/drizzle-kit-generate)
and then apply them to the database with [`drizzle-kit migrate`](/docs/drizzle-kit-migrate) commands. 
<Section>
```typescript filename="src/schema.ts"
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
});
```
```                                  
┌────────────────────────┐                  
│ $ drizzle-kit generate │                  
└─┬──────────────────────┘                  
  │                                           
  └ 1. read previous migration folders
    2. find diff between current and previous schema
    3. prompt developer for renames if necessary
  ┌ 4. generate SQL migration and persist to file
  │    ┌─┴───────────────────────────────────────┐  
  │      📂 drizzle       
  │      └ 📂 20242409125510_premium_mister_fear
  │        ├ 📜 snapshot.json
  │        └ 📜 migration.sql
  v
```
```sql
-- drizzle/20242409125510_premium_mister_fear/migration.sql

CREATE TABLE "users" (
 "id" SERIAL PRIMARY KEY,
 "name" TEXT,
 "email" TEXT UNIQUE
);
```
```
┌───────────────────────┐                  
│ $ drizzle-kit migrate │                  
└─┬─────────────────────┘                  
  │                                                         ┌──────────────────────────┐                                         
  └ 1. read migration.sql files in migrations folder        │                          │
    2. fetch migration history from database -------------> │                          │
  ┌ 3. pick previously unapplied migrations <-------------- │         DATABASE         │
  └ 4. apply new migration to the database ---------------> │                          │
                                                            │                          │
                                                            └──────────────────────────┘
[✓] done!                                                 
```
</Section>
</Callout>

<rem/>
<rem/>
<rem/>

<Tag style="font-size: 12px">**Option 4**</Tag>
> I want to have database schema in my TypeScript codebase,
> I want Drizzle to generate SQL migration files for me and I want Drizzle to apply them during runtime

<Callout collapsed="Expand details">
That's a **codebase first** approach. You have your TypeScript Drizzle schema as a source of truth and 
Drizzle lets you generate SQL migration files based on your schema changes with [`drizzle-kit generate`](/docs/drizzle-kit-generate) and then 
you can apply them to the database during runtime of your application.

This approach is widely used for **monolithic** applications when you apply database migrations 
during zero downtime deployment and rollback DDL changes if something fails. 
This is also used in **serverless** deployments with migrations running in **custom resource** once during deployment process.

<Section>
```typescript filename="src/schema.ts"
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
});
```
```                                  
┌────────────────────────┐                  
│ $ drizzle-kit generate │                  
└─┬──────────────────────┘                  
  │                                           
  └ 1. read previous migration folders
    2. find diff between current and previous schema
    3. prompt developer for renames if necessary
  ┌ 4. generate SQL migration and persist to file
  │    ┌─┴───────────────────────────────────────┐  
  │      📂 drizzle       
  │      └ 📂 20242409125510_premium_mister_fear
  │        ├ 📜 snapshot.json
  │        └ 📜 migration.sql
  v
```
```sql
-- drizzle/20242409125510_premium_mister_fear/migration.sql

CREATE TABLE "users" (
 "id" SERIAL PRIMARY KEY,
 "name" TEXT,
 "email" TEXT UNIQUE
);
```
```ts
// index.ts
import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const db = drizzle(process.env.DATABASE_URL);

await migrate(db);
```
```
┌───────────────────────┐                  
│ npx tsx src/index.ts  │                  
└─┬─────────────────────┘                  
  │                                                      
  ├ 1. init database connection                             ┌──────────────────────────┐                                         
  └ 2. read migration.sql files in migrations folder        │                          │
    3. fetch migration history from database -------------> │                          │
  ┌ 4. pick previously unapplied migrations <-------------- │         DATABASE         │
  └ 5. apply new migration to the database ---------------> │                          │
                                                            │                          │
                                                            └──────────────────────────┘
[✓] done!                                                 
```
</Section>
</Callout>

<rem/>
<rem/>
<rem/>

<Tag style="font-size: 12px">**Option 5**</Tag>
> I want to have database schema in my TypeScript codebase,
> I want Drizzle to generate SQL migration files for me,
> but I will apply them to my database myself or via external migration tools 

<Callout collapsed="Expand details">
That's a **codebase first** approach. You have your TypeScript Drizzle schema as a source of truth and 
Drizzle lets you generate SQL migration files based on your schema changes with [`drizzle-kit generate`](/docs/drizzle-kit-generate) and then 
you can apply them to the database either directly or via external migration tools.

<Section>
```typescript filename="src/schema.ts"
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
});
```
```                                  
┌────────────────────────┐                  
│ $ drizzle-kit generate │                  
└─┬──────────────────────┘                  
  │                                           
  └ 1. read previous migration folders
    2. find diff between current and previous scheama
    3. prompt developer for renames if necessary
  ┌ 4. generate SQL migration and persist to file
  │    ┌─┴───────────────────────────────────────┐  
  │      📂 drizzle       
  │      └ 📂 20242409125510_premium_mister_fear
  │        ├ 📜 snapshot.json
  │        └ 📜 migration.sql
  v
```
```sql
-- drizzle/20242409125510_premium_mister_fear/migration.sql

CREATE TABLE "users" (
 "id" SERIAL PRIMARY KEY,
 "name" TEXT,
 "email" TEXT UNIQUE
);
```
```
┌───────────────────────────────────┐                  
│ (._.) now you run your migrations │           
└─┬─────────────────────────────────┘  
  │
 directly to the database
  │                                         ┌────────────────────┐
  ├────────────────────────────────────┬───>│                    │  
  │                                    │    │      Database      │           
 or via external tools                 │    │                    │   
  │                                    │    └────────────────────┘
  │  ┌────────────────────┐            │      
  └──│ Bytebase           ├────────────┘         
     ├────────────────────┤  
     │ Liquibase          │
     ├────────────────────┤ 
     │ Atlas              │
     ├────────────────────┤ 
     │ etc…               │
     └────────────────────┘

[✓] done!                                                 
```
</Section>
</Callout>

<rem/>
<rem/>
<rem/>

<Tag style="font-size: 12px">**Option 6**</Tag>
> I want to have database schema in my TypeScript codebase,
> I want Drizzle to output the SQL representation of my Drizzle schema to the console,
> and I will apply them to my database via [Atlas](https://atlasgo.io/guides/orms/drizzle)

<Callout collapsed="Expand details">
That's a **codebase first** approach. You have your TypeScript Drizzle schema as a source of truth and 
Drizzle lets you export SQL statements based on your schema changes with [`drizzle-kit export`](/docs/drizzle-kit-generate) and then 
you can apply them to the database via [Atlas](https://atlasgo.io/guides/orms/drizzle) or other external SQL migration tools.

<Section>
```typescript filename="src/schema.ts"
import * as p from "drizzle-orm/pg-core";

export const users = p.pgTable("users", {
  id: p.serial().primaryKey(),
  name: p.text(),
  email: p.text().unique(),
});
```
```                                  
┌────────────────────────┐                  
│ $ drizzle-kit export   │                  
└─┬──────────────────────┘                  
  │                                           
  └ 1. read your drizzle schema
    2. generated SQL representation of your schema
  ┌ 3. outputs to console
  │    
  │        
  v
```
```sql
CREATE TABLE "users" (
 "id" SERIAL PRIMARY KEY,
 "name" TEXT,
 "email" TEXT UNIQUE
);
```
```
┌───────────────────────────────────┐                  
│ (._.) now you run your migrations │           
└─┬─────────────────────────────────┘  
  │
 via Atlas
  │                                    ┌──────────────┐
  │  ┌────────────────────┐            │              │
  └──│ Atlas              ├───────────>│  Database    │      
     └────────────────────┘            │              │       
                                       └──────────────┘

[✓] done!                                                 
```
</Section>
</Callout>

<rem/>
<rem/>
