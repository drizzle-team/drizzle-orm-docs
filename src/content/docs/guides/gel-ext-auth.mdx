---
title: Gel auth extension
slug: gel-ext-auth
---
import Prerequisites from "@mdx/Prerequisites.astro";
import Callout from "@mdx/Callout.astro";
import Npx from "@mdx/Npx.astro";

<Prerequisites>
- Get started with [Gel](/docs/get-started-gel)
- Using [drizzle-kit pull](/docs/drizzle-kit-pull)
</Prerequisites>

#### Step 1 - Define Gel auth schema

In `dbschema/default.esdl` file add a Gel schema with an auth extension

```esdl
using extension auth;

module default {
  global current_user := (
    assert_single((
      select User { id, username, email }
      filter .identity = global ext::auth::ClientTokenIdentity
    ))
  );

  type User {
    required identity: ext::auth::Identity;
    required username: str;
    required email: str;
  }
}
```

#### Step 2 - Push Gel schema to the database

Generate Gel migration file:
```bash
gel migration create
```

Apply Gel migrations to the database
```bash
gel migration apply
```

#### Step 3 - Setup Drizzle config file

**Drizzle config** - a configuration file that is used by [Drizzle Kit](/docs/kit-overview) and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'gel',
  // Enable auth schema for drizzle-kit
  schemaFilter: ['ext::auth', 'public']
});
```

#### Step 4 - Pull Gel types to Drizzle schema

Pull your database schema:
<Npx>
drizzle-kit pull
</Npx>

Here is an example of the generated schema.ts file:

<Callout type="warning">
You'll get more than just the `Identity` table from `ext::auth`. Drizzle will pull in all the 
`auth` tables you can use. The example below showcases just one of them.
</Callout>

```ts
import { gelTable, uniqueIndex, uuid, text, gelSchema, timestamptz, foreignKey } from "drizzle-orm/gel-core"
import { sql } from "drizzle-orm"

export const extauth = gelSchema('ext::auth');

export const identityInExtauth = extauth.table('Identity', {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	createdAt: timestamptz('created_at').default(sql`(clock_timestamp())`).notNull(),
	issuer: text().notNull(),
	modifiedAt: timestamptz('modified_at').notNull(),
	subject: text().notNull(),
}, (table) => [
	uniqueIndex('6bc2dd19-bce4-5810-bb1b-7007afe97a11;schemaconstr').using(
		'btree',
		table.id.asc().nullsLast().op('uuid_ops'),
	),
]);

export const user = gelTable('User', {
	id: uuid().default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	email: text().notNull(),
	identityId: uuid('identity_id').notNull(),
	username: text().notNull(),
}, (table) => [
	uniqueIndex('d504514c-26a7-11f0-b836-81aa188c0abe;schemaconstr').using(
		'btree',
		table.id.asc().nullsLast().op('uuid_ops'),
	),
	foreignKey({
		columns: [table.identityId],
		foreignColumns: [identityInExtauth.id],
		name: 'User_fk_identity',
	}),
]);
```

🎉 Now you can use the `auth` tables in your queries!