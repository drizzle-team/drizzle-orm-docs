import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Section from '@mdx/Section.astro';

# Joins [SQL]
Join clause in SQL is used to combine 2 or more tables, based on related columns between them.
Drizzle ORM joins syntax is a balance between the SQL-likeness and type safety.

## Join types
Drizzle ORM has APIs for `INNER JOIN [LATERAL]`, `FULL JOIN`, `LEFT JOIN [LATERAL]`, `RIGHT JOIN`, `CROSS JOIN [LATERAL]`.
Lets have a quick look at examples based on below table schemas:
```typescript copy
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});

export const pets = pgTable('pets', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  ownerId: integer('owner_id').notNull().references(() => users.id),
})
```

### Left Join
<Section>
```typescript copy
const result = await db.select().from(users).leftJoin(pets, eq(users.id, pets.ownerId))
```
```sql
select ... from "users" left join "pets" on "users"."id" = "pets"."owner_id"
```
```typescript
// result type
const result: {
    user: {
        id: number;
        name: string;
    };
    pets: {
        id: number;
        name: string;
        ownerId: number;
    } | null;
}[];
```
</Section>

### Left Join Lateral
<Section>
```typescript copy
const subquery = db.select().from(pets).where(gte(users.age, 16)).as('userPets')
const result = await db.select().from(users).leftJoinLateral(subquery, sql`true`)
```
```sql
select ... from "users" left join lateral (select ... from "pets" where "users"."age" >= 16) "userPets" on true
```
```typescript
// result type
const result: {
    user: {
        id: number;
        name: string;
    };
    userPets: {
        id: number;
        name: string;
        ownerId: number;
    } | null;
}[];
```
</Section>

### Right Join
<Section>
```typescript copy
const result = await db.select().from(users).rightJoin(pets, eq(users.id, pets.ownerId))
```
```sql
select ... from "users" right join "pets" on "users"."id" = "pets"."owner_id"
```
```typescript
// result type
const result: {
    user: {
        id: number;
        name: string;
    } | null;
    pets: {
        id: number;
        name: string;
        ownerId: number;
    };
}[];
```
</Section>

### Inner Join
<Section>
```typescript copy
const result = await db.select().from(users).innerJoin(pets, eq(users.id, pets.ownerId))
```
```sql
select ... from "users" inner join "pets" on "users"."id" = "pets"."owner_id"
```
```typescript
// result type
const result: {
    user: {
        id: number;
        name: string;
    };
    pets: {
        id: number;
        name: string;
        ownerId: number;
    };
}[];
```
</Section>

### Inner Join Lateral
<Section>
```typescript copy
const subquery = db.select().from(pets).where(gte(users.age, 16)).as('userPets')
const result = await db.select().from(users).innerJoinLateral(subquery, sql`true`)
```
```sql
select ... from "users" inner join lateral (select ... from "pets" where "users"."age" >= 16) "userPets" on true
```
```typescript
// result type
const result: {
    user: {
        id: number;
        name: string;
    };
    userPets: {
        id: number;
        name: string;
        ownerId: number;
    };
}[];
```
</Section>

### Full Join
<Section>
```typescript copy
const result = await db.select().from(users).fullJoin(pets, eq(users.id, pets.ownerId))
```
```sql
select ... from "users" full join "pets" on "users"."id" = "pets"."owner_id"
```
```typescript
// result type
const result: {
    user: {
        id: number;
        name: string;
    } | null;
    pets: {
        id: number;
        name: string;
        ownerId: number;
    } | null;
}[];
```
</Section>

### Cross Join
<Section>
```typescript copy
const result = await db.select().from(users).crossJoin(pets)
```
```sql
select ... from "users" cross join "pets"
```
```typescript
// result type
const result: {
    user: {
        id: number;
        name: string;
    };
    pets: {
        id: number;
        name: string;
        ownerId: number;
    };
}[];
```
</Section>

### Cross Join Lateral
<Section>
```typescript copy
const subquery = db.select().from(pets).where(gte(users.age, 16)).as('userPets')
const result = await db.select().from(users).crossJoinLateral(subquery)
```
```sql
select ... from "users" cross join lateral (select ... from "pets" where "users"."age" >= 16) "userPets"
```
```typescript
// result type
const result: {
    user: {
        id: number;
        name: string;
    };
    userPets: {
        id: number;
        name: string;
        ownerId: number;
    };
}[];
```
</Section>

## Partial select
If you need to select a particular subset of fields or to have a flat response type, Drizzle ORM
supports joins with partial select and will automatically infer return type based on `.select({ ... })` structure.
<Section>
```typescript copy
await db.select({
  userId: users.id,
  petId: pets.id,
}).from(user).leftJoin(pets, eq(users.id, pets.ownerId))
```
```sql
select "users"."id", "pets"."id" from "users" left join "pets" on "users"."id" = "pets"."owner_id"
```
```typescript
// result type
const result: {
  userId: number;
  petId: number | null;
}[];
```
</Section>
You might've noticed that `petId` can be null now, it's because we're left joining and there can be users without a pet.

It's very important to keep in mind when using `sql` operator for partial selection fields and aggregations when needed,
you should to use `sql<type | null>` for proper result type inference, that one is on you!
<Section>
```typescript copy
const result = await db.select({
  userId: users.id,
  petId: pets.id,
  petName1: sql`upper(${pets.name})`,
  petName2: sql<string | null>`upper(${pets.name})`,
  //˄we should explicitly tell 'string | null' in type, since we're left joining that field
}).from(user).leftJoin(pets, eq(users.id, pets.ownerId))
```
```sql
select "users"."id", "pets"."id", upper("pets"."name")... from "users" left join "pets" on "users"."id" = "pets"."owner_id"
```
```typescript
// result type
const result: {
  userId: number;
  petId: number | null;
  petName1: unknown;
  petName2: string | null;
}[];
```
</Section>
To avoid plethora of nullable fields when joining tables with lots of columns we can utilise our **nested select object syntax**,
our smart type inference will make whole object nullable instead of making all table fields nullable!
<Section>
```typescript copy
await db.select({
  userId: users.id,
  userName: users.name,
  pet: {
    id: pets.id,
    name: pets.name,
    upperName: sql<string>`upper(${pets.name})`
  }
}).from(user).fullJoin(pets, eq(users.id, pets.ownerId))
```
```sql
select ... from "users" full join "pets" on "users"."id" = "pets"."owner_id"
```
```typescript
// result type
const result: {
    userId: number | null;
    userName: string | null;
    pet: {
        id: number;
        name: string;
        upperName: string;
    } | null;
}[];
```
</Section>

## Aliases & Selfjoins
Drizzle ORM supports table aliases which comes really handy when you need to do selfjoins.

Lets say you need to fetch users with their parents:
<CodeTabs items={["index.ts", "schema.ts"]}>
<CodeTab>
```typescript copy
import { user } from "./schema";

const parent = alias(user, "parent");
const result = db
  .select()
  .from(user)
  .leftJoin(parent, eq(parent.id, user.parentId));
```
```sql
select ... from "user" left join "user" "parent" on "parent"."id" = "user"."parent_id"
```
```typescript
// result type
const result: {
    user: {
        id: number;
        name: string;
        parentId: number;
    };
    parent: {
        id: number;
        name: string;
        parentId: number;
    } | null;
}[];
```
</CodeTab>

```typescript
export const user = pgTable("user", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  parentId: integer("parent_id").notNull().references((): AnyPgColumn => user.id)
});
```

</CodeTabs>

## Aggregating results
Drizzle ORM delivers name-mapped results from the driver without changing the structure.

You're free to operate with results the way you want, here's an example of mapping many-one relational data:
```typescript
type User = typeof users.$inferSelect;
type Pet = typeof pets.$inferSelect;

const rows = db.select({
    user: users,
    pet: pets,
  }).from(users).leftJoin(pets, eq(users.id, pets.ownerId)).all();

const result = rows.reduce<Record<number, { user: User; pets: Pet[] }>>(
  (acc, row) => {
    const user = row.user;
    const pet = row.pet;

    if (!acc[user.id]) {
      acc[user.id] = { user, pets: [] };
    }

    if (pet) {
      acc[user.id].pets.push(pet);
    }

    return acc;
  },
  {}
);

// result type
const result: Record<number, {
    user: User;
    pets: Pet[];
}>;
```

## Many-to-one example
```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const cities = sqliteTable('cities', {
  id: integer('id').primaryKey(),
  name: text('name'),
});

const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
  cityId: integer('city_id').references(() => cities.id)
});

const db = drizzle();

const result = db.select().from(cities).leftJoin(users, eq(cities.id, users.cityId)).all();
```
## Many-to-many example
```typescript
const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name'),
});

const chatGroups = sqliteTable('chat_groups', {
  id: integer('id').primaryKey(),
  name: text('name'),
});

const usersToChatGroups = sqliteTable('usersToChatGroups', {
  userId: integer('user_id').notNull().references(() => users.id),
  groupId: integer('group_id').notNull().references(() => chatGroups.id),
});


// querying user group with id 1 and all the participants(users)
db.select()
  .from(usersToChatGroups)
  .leftJoin(users, eq(usersToChatGroups.userId, users.id))
  .leftJoin(chatGroups, eq(usersToChatGroups.groupId, chatGroups.id))
  .where(eq(chatGroups.id, 1))
  .all();
```
