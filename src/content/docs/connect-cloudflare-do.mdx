import Npm from "@mdx/Npm.astro";
import Callout from '@mdx/Callout.astro';
import AnchorCards from '@mdx/AnchorCards.astro';
import Steps from '@mdx/Steps.astro';
import WhatsNextPostgres from "@mdx/WhatsNextPostgres.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from "@mdx/CodeTabs.astro";

# Drizzle \<\> Cloudflare Durable Objects SQLite

<Prerequisites>
- Database [connection basics](/docs/connect-overview) with Drizzle
- **Cloudflare SQLite Durable Objects** - SQLite database embedded within a Durable Object - [read here](https://developers.cloudflare.com/durable-objects/best-practices/access-durable-objects-storage/#sqlite-storage-backend)
</Prerequisites>
  
Drizzle ORM fully supports the Cloudflare Durable Objects database and Cloudflare Workers environment.
We embrace SQL dialects and dialect specific drivers and syntax and mirror most popular 
SQLite-like `all`, `get`, `values` and `run` query methods syntax.

To setup project for your Cloudflare Durable Objects please refer to **[official docs.](https://developers.cloudflare.com/durable-objects)**

#### Step 1 - Install packages
<Npm>
drizzle-orm
-D drizzle-kit
</Npm>

#### Step 2 - Initialize the driver and make a query

You would need to have a `wrangler.toml` file for Durable Objects database and will look something like this:
```toml {16-18,21-24}
#:schema node_modules/wrangler/config-schema.json
name = "sqlite-durable-objects"
main = "src/index.ts"
compatibility_date = "2024-11-12"
compatibility_flags = [ "nodejs_compat" ]

# Bind a Durable Object. Durable objects are a scale-to-zero compute primitive based on the actor model.
# Durable Objects can live for as long as needed. Use these when you need a long-running "server", such as in realtime apps.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#durable-objects
[[durable_objects.bindings]]
name = "MY_DURABLE_OBJECT"
class_name = "MyDurableObject"

# Durable Object migrations.
# Docs: https://developers.cloudflare.com/workers/wrangler/configuration/#migrations
[[migrations]]
tag = "v1"
new_sqlite_classes = ["MyDurableObject"]

# We need rules so we can import migrations in the next steps
[[rules]] 
type = "Text"
globs = ["**/*.sql"]
fallthrough = true
```

Make your first Durable Objects SQLite query:
```typescript copy
/// <reference types="@cloudflare/workers-types" />
import { drizzle, DrizzleSqliteDODatabase } from 'drizzle-orm/durable-sqlite';
import { DurableObject } from 'cloudflare:workers'
import { migrate } from 'drizzle-orm/durable-sqlite/migrator';
import migrations from '../drizzle/migrations';
import { usersTable } from './db/schema';

export class MyDurableObject extends DurableObject {
	storage: DurableObjectStorage;
	db: DrizzleSqliteDODatabase<any>;

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		this.storage = ctx.storage;
		this.db = drizzle(this.storage, { logger: false });

		// Make sure all migrations complete before accepting queries.
		// Otherwise you will need to run `this.migrate()` in any function
		// that accesses the Drizzle database `this.db`.
		ctx.blockConcurrencyWhile(async () => {
			await this._migrate();
		});
	}

	async insertAndList(user: typeof usersTable.$inferInsert) {
		await this.insert(user);
		return this.select();
	}

	async insert(user: typeof usersTable.$inferInsert) {
		await this.db.insert(usersTable).values(user);
	}

	async select() {
		return this.db.select().from(usersTable);
	}

	async _migrate() {
		migrate(this.db, migrations);
	}
}

export default {
	/**
	 * This is the standard fetch handler for a Cloudflare Worker
	 *
	 * @param request - The request submitted to the Worker from the client
	 * @param env - The interface to reference bindings declared in wrangler.toml
	 * @param ctx - The execution context of the Worker
	 * @returns The response to be sent back to the client
	 */
	async fetch(request: Request, env: Env): Promise<Response> {
		const id: DurableObjectId = env.MY_DURABLE_OBJECT.idFromName('durable-object');
		const stub = env.MY_DURABLE_OBJECT.get(id);

		// Option A - Maximum performance.
		// Prefer to bundle all the database interaction within a single Durable Object call
		// for maximum performance, since database access is fast within a DO.
		const usersAll = await stub.insertAndList({
			name: 'John',
			age: 30,
			email: 'john@example.com',
		});
		console.log('New user created. Getting all users from the database: ', users);

		// Option B - Slow but maybe useful sometimes for debugging.
		// You can also directly call individual Drizzle queries if they are exposed
		// but keep in mind every query is a round-trip to the Durable Object instance.
		await stub.insert({
			name: 'John',
			age: 30,
			email: 'john@example.com',
		});
		console.log('New user created!');
	
		const users = await stub.select();
		console.log('Getting all users from the database: ', users);

		return Response.json(users);
	}
}
```

#### What's next?

<WhatsNextPostgres/>