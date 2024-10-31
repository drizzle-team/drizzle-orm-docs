---
title: Count rows
slug: count-rows
---
import Section from "@mdx/Section.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";
import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Callout from '@mdx/Callout.astro';

<IsSupportedChipGroup chips={{PostgreSQL: true, MySQL: true, SQLite: true}}/>

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) and [SQLite](/docs/get-started-sqlite)
- [Select statement](/docs/select)
- [Filters](/docs/operators) and [sql operator](/docs/sql)
- [Aggregations](/docs/select#aggregations) and [Aggregation helpers](/docs/select#aggregations-helpers)
- [Joins](/docs/joins)
</Prerequisites>

To count all rows in table you can use `count()` function or `sql` operator like below:

<CodeTabs items={["index.ts", "schema.ts"]}>
  <CodeTab>
    ```ts copy {6,9}
    import { count, sql } from 'drizzle-orm';
    import { products } from './schema';

    const db = drizzle(...);

    await db.select({ count: count() }).from(products);

    // Under the hood, the count() function casts its result to a number at runtime.
    await db.select({ count: sql`count(*)`.mapWith(Number) }).from(products);
    ```

    ```ts
    // result type
    type Result = {
      count: number;
    }[];
    ```

    ```sql
    select count(*) from products;
    ```
  </CodeTab>
  ```ts
  import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

  export const products = pgTable('products', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    discount: integer('discount'),
    price: integer('price').notNull(),
  });
  ```
</CodeTabs>

To count rows where the specified column contains non-NULL values you can use `count()` function with a column:

<Section>
```ts copy {1}
await db.select({ count: count(products.discount) }).from(products);
```

```ts
// result type
type Result = {
  count: number;
}[];
```

```sql
select count("discount") from products;
```
</Section>

Drizzle has simple and flexible API, which lets you create your custom solutions. In PostgreSQL and MySQL `count()` function returns bigint, which is interpreted as string by their drivers, so it should be casted to integer:

<Section>
```ts copy {5,7,11,12}
import { AnyColumn, sql } from 'drizzle-orm';

const customCount = (column?: AnyColumn) => {
  if (column) {
    return sql<number>`cast(count(${column}) as integer)`; // In MySQL cast to unsigned integer
  } else {
    return sql<number>`cast(count(*) as integer)`; // In MySQL cast to unsigned integer
  }
};

await db.select({ count: customCount() }).from(products);
await db.select({ count: customCount(products.discount) }).from(products);
```

```sql
select cast(count(*) as integer) from products;
select cast(count("discount") as integer) from products;
```
</Section>

In SQLite, `count()` result returns as integer.

<Section>
```ts copy {3,4}
import { sql } from 'drizzle-orm';

await db.select({ count: sql<number>`count(*)` }).from(products);
await db.select({ count: sql<number>`count(${products.discount})` }).from(products);
```

```sql
select count(*) from products;
select count("discount") from products;
```
</Section>

<Callout type="warning">
By specifying `sql<number>`, you are telling Drizzle that the **expected** type of the field is `number`.<br />
If you specify it incorrectly (e.g. use `sql<string>` for a field that will be returned as a number), the runtime value won't match the expected type.
Drizzle cannot perform any type casts based on the provided type generic, because that information is not available at runtime.

If you need to apply runtime transformations to the returned value, you can use the [`.mapWith()`](/docs/sql#sqlmapwith) method.
</Callout>

To count rows that match a condition you can use `.where()` method:

<Section>
```ts copy {4,6}
import { count, gt } from 'drizzle-orm';

await db
  .select({ count: count() })
  .from(products)
  .where(gt(products.price, 100));
```

```sql
select count(*) from products where price > 100
```
</Section>

This is how you can use `count()` function with joins and aggregations:

<CodeTabs items={["index.ts", "schema.ts"]}>
	<CodeTab>
    ```ts copy {8,11,12,13}
    import { count, eq } from 'drizzle-orm';
    import { countries, cities } from './schema';

    // Count cities in each country
    await db
      .select({
        country: countries.name,
        citiesCount: count(cities.id),
      })
      .from(countries)
      .leftJoin(cities, eq(countries.id, cities.countryId))
      .groupBy(countries.id)
      .orderBy(countries.name);
    ```

    ```sql
    select countries.name, count("cities"."id") from countries
      left join cities on countries.id = cities.country_id
      group by countries.id
      order by countries.name;
    ```
  </CodeTab>
  ```ts
  import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

  export const countries = pgTable('countries', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
  });

  export const cities = pgTable('cities', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    countryId: integer('country_id').notNull().references(() => countries.id),
  });
  ```
</CodeTabs>
