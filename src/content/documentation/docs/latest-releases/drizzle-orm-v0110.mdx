---
pubDate: 2022-07-20
title: DrizzleORM v0.11.0 release
description: DrizzleORM - is an open source TypeScript ORM, supports PostgreSQL and about to have MySQL and SQLite support in couple of weeks. We've decided it's time to share it with public.
---
import Section from "@mdx/Section.astro";

DrizzleORM - is an open source TypeScript ORM, supports PostgreSQL and about to have MySQL and SQLite support in couple of weeks. We've decided it's time to share it with public.

With drizzle you have a fully typed SQL schema in-code which benefits you in multiple different major ways, which I'll cover later

```ts
// declaring enum in database
export const popularityEnum = createEnum({ alias: 'popularity', values: ['unknown', 'known', 'popular'] });

export class CountriesTable extends PgTable<CountriesTable> {
  id = this.serial("id").primaryKey();
  name = this.varchar("name", { size: 256 })

  // declaring index
  nameIndex = this.uniqueIndex(this.name)

  public tableName(): string {
    return 'countries';
  }
}

export class CitiesTable extends PgTable<CitiesTable> {
  id = this.serial("id").primaryKey();
  name = this.varchar("name", { size: 256 })
  countryId = this.int("country_id").foreignKey(CountriesTable, (country) => country.id)

  // declaring enum column in table
  popularity = this.type(popularityEnum, "popularity")

  public tableName(): string {
    return 'cities';
  }
}
```

This is quick start example of how you connect to the database and make your first query with typed result

```ts
import { drizzle, PgTable } from 'drizzle-orm'

export class UsersTable extends PgTable<UsersTable> {
  public id = this.serial('id').primaryKey();
  public fullName = this.text('full_name');
  public phone = this.varchar('phone', { size: 256 });

  public tableName(): string {
    return 'users';
  }
}
export type User = InferType<UsersTable>

const db = await drizzle.connect("postgres://user:password@host:port/db");
const usersTable = new UsersTable(db);

const users: User[] = await usersTable.select().execute();
```

This is how you use `WHERE` statement with filters, run partial select queries, use `limit/offset` and `orderBy`

```ts
await table.select().where(
  eq(table.id, 42)
).execute();

// you can combine filters with eq(...) or or(...)
await table.select().where(
  and([eq(table.id, 42), eq(table.name, "Dan")])
).execute();

await table.select().where(
  or([eq(table.id, 42), eq(table.id, 1)])
).execute();

// partial select
const result = await table.select({
     mapped1: table.id,
     mapped2: table.name,
}).execute();
const { mapped1, mapped2 } = result[0];

// limit offset & order by
await table.select().limit(10).offset(10).execute()
await table.select().orderBy((table) => table.name, Order.ASC)
await table.select().orderBy((table) => table.name, Order.DESC)
```

This is how you run `inserts`, `updates` and `deletes`

```ts
const result = await usersTable.insert({
  name: "Andrew",
  createdAt: new Date(),
}).execute();

const result = await usersTable.insertMany([{
  name: "Andrew",
  createdAt: new Date(),
}, {
  name: "Dan",
  createdAt: new Date(),
}]).execute();

await usersTable.update()
  .where(eq(usersTable.name, 'Dan'))
  .set({ name: 'Mr. Dan' })
  .execute();

await usersTable.delete()
  .where(eq(usersTable.name, 'Dan'))
  .execute();
```

One of the most powerful features we have in our ORM are fully typed joins, compiler won't let you make a mistake

```ts
const usersTable = new UsersTable(db);
const citiesTable = new CitiesTable(db);

const result = await citiesTable.select()
  .leftJoin(usersTable, (cities, users) => eq(cities.userId, users.id))
  .where((cities, users) => eq(cities.id, 1))
  .execute();

const citiesWithUsers: { city: City, user: User }[] = result.map((city, user) => ({ city, user }));
```

Here's a `many to many` relationship example

```ts
export class UsersTable extends PgTable<UsersTable> {
  id = this.serial("id").primaryKey();
    name = this.varchar("name");
}

export class ChatGroupsTable extends PgTable<ChatGroupsTable> {
  id = this.serial("id").primaryKey();
}

export class ManyToManyTable extends PgTable<ManyToManyTable> {
  userId = this.int('user_id').foreignKey(UsersTable, (table) => table.id, { onDelete: 'CASCADE' });
  groupId = this.int('group_id').foreignKey(ChatGroupsTable, (table) => table.id, { onDelete: 'CASCADE' });
}

...
const usersTable = new UsersTable(db);
const chatGroupsTable = new ChatGroupsTable(db);
const manyToManyTable = new ManyToManyTable(db);

// querying user group with id 1 and all the participants(users)
const usersWithUserGroups = await manyToManyTable.select()
  .leftJoin(usersTable, (manyToMany, users) => eq(manyToManyTable.userId, users.id))
  .leftJoin(chatGroupsTable, (manyToMany, _users, chatGroups) => eq(manyToManyTable.groupId, chatGroups.id))
  .where((manyToMany, _users, userGroups) => eq(userGroups.id, 1))
  .execute();
```

Last but not least are migrations. We've implemented a CLI tool for automatic migrations generation, which does handle renames and deletes by prompting you to resolve.

For a typescript schema below

<Section>
```ts
import { PgTable } from "drizzle-orm";

export class UsersTable extends PgTable<UsersTable> {
  public id = this.serial("id").primaryKey();
  public fullName = this.varchar("full_name", { size: 256 });

  public fullNameIndex = this.index(this.fullName);

  public tableName(): string {
    return "users";
  }
}

export class AuthOtpTable extends PgTable<AuthOtpTable> {
  public id = this.serial("id").primaryKey();
  public phone = this.varchar("phone", { size: 256 });
  public userId = this.int("user_id").foreignKey(UsersTable, (t) => t.id);

  public tableName(): string {
    return "auth_otp";
  }
}
```

```sql
-- SQL migration
CREATE TABLE IF NOT EXISTS auth_otp (
    "id" SERIAL PRIMARY KEY,
    "phone" character varying(256),
    "user_id" INT
);

CREATE TABLE IF NOT EXISTS users (
    "id" SERIAL PRIMARY KEY,
    "full_name" character varying(256)
);

DO $$ BEGIN
 ALTER TABLE auth_otp ADD CONSTRAINT auth_otp_user_id_fkey FOREIGN KEY ("user_id") REFERENCES users(id);
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS users_full_name_index ON users (full_name);
```
</Section>
