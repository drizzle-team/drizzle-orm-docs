import Callout from '@mdx/Callout.astro';
import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Section from '@mdx/Section.astro';

# Magical `sql` operator 🪄

When working with an ORM library, there may be cases where you find it challenging to write a
specific query using the provided ORM syntax. In such situations, you can resort to using
raw queries, which involve constructing a query as a raw string. However, raw queries often
lack the benefits of type safety and query parameterization.

To address this, many libraries have introduced the concept of an `sql` template. This template 
allows you to write more type-safe and parameterized queries, enhancing the overall safety and 
flexibility of your code. Drizzle, being a powerful ORM library, also supports the sql template.

With Drizzle's `sql` template, you can go even further in crafting queries. If you encounter 
difficulties in writing an entire query using the library's query builder, you can selectively
use the `sql` template within specific sections of the Drizzle query. This flexibility enables you 
to employ the sql template in partial SELECT statements, WHERE clauses, ORDER BY clauses, HAVING
clauses, GROUP BY clauses, and even in relational query builders.

By leveraging the capabilities of the sql template in Drizzle, you can maintain the advantages 
of type safety and query parameterization while achieving the desired query structure and complexity.
This empowers you to create more robust and maintainable code within your application.

## sql`` template

One of the most common usages you may encounter in other ORMs as well 
is the ability to use `sql` queries as-is for raw queries.

```typescript copy
import { sql } from 'drizzle-orm' 

const id = 69;
await db.execute(sql`select * from ${usersTable} where ${usersTable.id} = ${id}`)
```

It will generate the current query

```sql
select * from "users" where "users"."id" = $1; --> [69]
```

Any tables and columns provided to the sql parameter are automatically mapped to their corresponding SQL 
syntax with escaped names for tables, and the escaped table names are appended to column names. 

Additionally, any dynamic parameters such as `${id}` will be mapped to the $1 placeholder, 
and the corresponding values will be moved to an array of values that are passed separately to the database. 

This approach effectively prevents any potential SQL Injection vulnerabilities.

## `sql<T>`

<Callout type="info" emoji="ℹ️">
    Please note that `sql<T>` does not perform any runtime mapping. The type you define using `sql<T>` is
    purely a helper for Drizzle. It is important to understand that there is no feasible way to 
    determine the exact type dynamically, as SQL queries can be highly versatile and customizable. 
</Callout>

You can define a custom type in Drizzle to be used in places where fields require a specific type other than `unknown`.

This feature is particularly useful in partial select queries, ensuring consistent typing for selected fields:

```typescript
// without sql<T> type defined
const response: { lowerName: unknown }[] = await db.select({
    lowerName: sql`lower(${usersTable.id})`
}).from(usersTable);

// with sql<T> type defined
const response: { lowerName: string }[] = await db.select({
    lowerName: sql<string>`lower(${usersTable.id})`
}).from(usersTable);
```

## `sql``.mapWith()`

For the cases you need to make a runtime mapping for values passed from database driver to drizzle you can use `.mapWith()`

This function accepts different values, that will map response in runtime.

You can replicate a specific column mapping strategy as long as
the interface inside mapWith is the same interface that is implemented by Column.

```typescript
const usersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
});

//  at runtime this values will be mapped same as `text` column is mapped in drizzle
sql`...`.mapWith(usersTable.name);
```

You can also pass your own implementation for the `DriverValueDecoder` interface:

```ts 
sql``.mapWith({
	mapFromDriverValue: (value: any) => {
		const mappedValue = value;
		// mapping you want to apply
		return mappedValue;
	},
});
    
// or
sql``.mapWith(Number);
```

## `sql``.as<T>()`

In different cases, it can sometimes be challenging to determine how to name a custom field that you want to use.
You may encounter situations where you need to explicitly specify an alias for a 
field that will be selected. This can be particularly useful when dealing with complex queries. 

To address these scenarios, we have introduced a helpful `.as('alias_name')` helper, which allows 
you to define an alias explicitly. By utilizing this feature, you can provide a clear and meaningful 
name for the field, making your queries more intuitive and readable.

<Section>
```typescript
sql`lower(usersTable.name)`.as('lower_name')
```
```sql
... "usersTable"."name" as lower_name ...
```
</Section>

## `sql.raw()`

There are cases where you may not need to create parameterized values from input or map tables/columns to escaped ones. 
Instead, you might simply want to generate queries as they are. For such situations, we provide the `sql.raw()` function.

The `sql.raw()` function allows you to include raw SQL statements within your queries without any additional processing or escaping.
This can be useful when you have pre-constructed SQL statements or when you need to incorporate complex or dynamic 
SQL code directly into your queries.

<Section>
```typescript
sql.raw(`select * from users where id = ${12}`);
// vs
sql`select * from users where id = ${12}`;
```
```sql
select * from users where id = 12;
--> vs
select * from users where id = $1; --> [12]
```
</Section>

You can also utilize `sql.raw()` within the sql function, enabling you to include any raw string
without escaping it through the main `sql` template function.

By using `sql.raw()` inside the `sql` function, you can incorporate unescaped raw strings 
directly into your queries. This can be particularly useful when you have specific
SQL code or expressions that should remain untouched by the template function's automatic escaping or modification.

<Section>
```typescript
sql`select * from ${usersTable} where id = ${12}`;
// vs
sql`select * from ${usersTable} where id = ${sql.raw(12)}`;
```
```sql
select * from "users" where id = $1; --> [12]
--> vs
select * from "users" where id = 12;
```
</Section>

## sql.fromList()

The `sql` template generates sql chunks, which are arrays of SQL parts that will be concatenated 
into the query and params after applying the SQL to the database or query in Drizzle.

In certain scenarios, you may need to aggregate these chunks into an array using custom business 
logic and then concatenate them into a single SQL statement that can be passed to the database or query.
For such cases, the fromList function can be quite useful.

The fromList function allows you to combine multiple SQL chunks into a single SQL statement. 
You can use it to aggregate and concatenate the individual SQL parts according to your specific 
requirements and then obtain a unified SQL query that can be executed.

<Section>
```typescript
const sqlChunks: SQL[] = [];

sqlChunks.push(sql`select * from users`);

// some logic

sqlChunks.push(sql` where `);

// some logic

for (let i = 0; i < 5; i++) {
	sqlChunks.push(sql`id = ${i}`);

	if (i === 4) continue;
	sqlChunks.push(sql` or `);
}

const finalSql: SQL = sql.fromList(sqlChunks)
```
```sql
select * from users where id = $1 or id = $2 or id = $3 or id = $4 or id = $5; --> [0, 1, 2, 3, 4]
```
</Section>

## sql.join()

Indeed, the `sql.join` function serves a similar purpose to the fromList helper. 
However, it provides additional flexibility when it comes to handling spaces between
SQL chunks or specifying custom separators for concatenating the SQL chunks.

With `sql.join`, you can concatenate SQL chunks together using a specified separator. 
This separator can be any string or character that you want to insert between the chunks. 

This is particularly useful when you have specific requirements for formatting or delimiting 
the SQL chunks. By specifying a custom separator, you can achieve the desired structure and formatting 
in the final SQL query.

<Section>
```typescript
const sqlChunks: SQL[] = [];

sqlChunks.push(sql`select * from users`);

// some logic

sqlChunks.push(sql`where`);

// some logic

for (let i = 0; i < 5; i++) {
	sqlChunks.push(sql`id = ${i}`);

if (i === 4) continue;
    sqlChunks.push(sql`or`);
}

const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));
```
```sql
select * from users where id = $1 or id = $2 or id = $3 or id = $4 or id = $5; --> [0, 1, 2, 3, 4]
```
</Section>

## sql.append()

If you have already generated SQL using the `sql` template, you can achieve the same behavior as `fromList`
by using the append function to directly add a new chunk to the generated SQL.

By using the append function, you can dynamically add additional SQL chunks to the existing SQL string,
effectively concatenating them together. This allows you to incorporate custom logic or business 
rules for aggregating the chunks into the final SQL query.

<Section>
```typescript 
const finalSql = sql`select * from users`;

// some logic

finalSql.append(sql` where `);

// some logic

for (let i = 0; i < 5; i++) {
	finalSql.append(sql`id = ${i}`);

	if (i === 4) continue;
	finalSql.append(sql` or `);
}
```
```sql
select * from users where id = $1 or id = $2 or id = $3 or id = $4 or id = $5; --> [0, 1, 2, 3, 4]
```
</Section>

## sql.empty()

By using sql.empty(), you can start with a blank SQL object and then dynamically append SQL chunks to it as needed. This allows you to construct the SQL query incrementally, applying custom logic or conditions to determine the contents of each chunk.

Once you have initialized the SQL object using sql.empty(), you can take advantage of the full range
of sql template features such as parameterization, composition, and escaping. 
This empowers you to construct the SQL query in a flexible and controlled manner, 
adapting it to your specific requirements.

```typescript 
const finalSql = sql.empty();

// some logic

finalSql.append(sql`select * from users`);

// some logic

finalSql.append(sql` where `);

// some logic

for (let i = 0; i < 5; i++) {
	finalSql.append(sql`id = ${i}`);

	if (i === 4) continue;
	finalSql.append(sql` or `);
}
```
```sql
select * from users where id = $1 or id = $2 or id = $3 or id = $4 or id = $5; --> [0, 1, 2, 3, 4]
```

## Convert `sql` to string and params

In all the previous examples, you observed the usage of SQL template syntax in TypeScript along with 
the generated SQL output.

If you need to obtain the query string and corresponding parameters generated from the SQL template, 
you must specify the database dialect you intend to generate the query for. Different databases have
varying syntax for parameterization and escaping, so selecting the appropriate dialect is crucial.

Once you have chosen the dialect, you can utilize the corresponding implementation's functionality
to convert the SQL template into the desired query string and parameter format. This ensures 
compatibility with the specific database system you are working with.

<CodeTabs items={["PostgreSQL", "MySQL", "SQLite"]}>
<CodeTab>
<Section>
```typescript copy
import { PgDialect } from 'drizzle-orm/pg-core';

const pgDialect = new PgDialect();
pgDialect.sqlToQuery(sql`select * from ${usersTable} where ${usersTable.id} = ${12}`);
```
```sql
select * from "users" where "users"."id" = $1; --> [ 12 ]
```
</Section>

</CodeTab>
<CodeTab>
<Section>
```typescript copy
import { MySqlDialect } from 'drizzle-orm/mysql-core';

const mysqlDialect = new MySqlDialect();
mysqlDialect.sqlToQuery(sql`select * from ${usersTable} where ${usersTable.id} = ${12}`);
```
```sql
select * from `users` where `users`.`id` = ?; --> [ 12 ]
```
</Section>
</CodeTab>
<CodeTab>
<Section>
```typescript copy
import { SQLiteSyncDialect } from 'drizzle-orm/sqlite-core';

const sqliteDialect = new SQLiteSyncDialect();
sqliteDialect.sqlToQuery(sql`select * from ${usersTable} where ${usersTable.id} = ${12}`);
```
```sql
select * from "users" where "users"."id" = ?; --> [ 12 ]
```
</Section>
</CodeTab>
</CodeTabs>

## `sql` select

You can use the sql functionality in partial select queries as well. Partial select queries allow you to 
retrieve specific fields or columns from a table rather than fetching the entire row.

For more detailed information about partial select queries, you can refer to the Core API
documentation available at **[Core API docs](/docs/select#basic-and-partial-select)**.

**Select different custom fields from table**

Here you can see a usage for **[`sql<T>`](/docs/sql#sqlt)**, **[`sql``.mapWith()`](/docs/sql#sqlmapwith)**, **[`sql``.as<T>()`](/docs/sql#sqlast)**.

<Section>
```typescript copy
import { sql } from 'drizzle-orm'
import { usersTable } from 'schema'

await db.select({
    id: usersTable.id,
    lowerName: sql<string>`lower(${usersTable.name})`,
    aliasedName: sql<string>`lower(${usersTable.name})`.as('aliased_column'),
    count: sql<number>`count(*)`.mapWith(Number) 
}).from(usersTable)
```
```sql
select `id`, lower(`name`), lower(`name`) as `aliased_column`, count(*) from `users`;
```
</Section>

## `sql` in where

Indeed, Drizzle provides a set of available expressions that you can use within the sql template. 
However, it is true that databases often have a wider range of expressions available, 
including those provided through extensions or other means.

To ensure flexibility and enable you to utilize any expressions that are not natively
supported by Drizzle, you have the freedom to write the SQL template
directly using the sql function. This allows you to leverage the full power of
SQL and incorporate any expressions or functionalities specific to your target database.

By using the sql template, you are not restricted to only the predefined expressions in Drizzle. 
Instead, you can express complex queries and incorporate any supported expressions that 
the underlying database system provides.


**Filtering by `id` but with sql**
<Section>
```typescript copy
import { sql } from 'drizzle-orm'
import { usersTable } from 'schema'

const id = 77

await db.select()
        .from(usersTable)
        .where(sql`${usersTable.id} = ${id}`)
```
```sql
select * from "users" where "users"."id" = $1; --> [ 77 ]
```
</Section>

**Advanced fulltext search where statement**
<Section>
```typescript copy
import { sql } from 'drizzle-orm'
import { usersTable } from 'schema'

const searchParam = "Ale"

await db.select()
        .from(usersTable)
        .where(sql`to_tsvector('simple', ${usersTable.name}) @@ to_tsquery('simple', ${searchParam})`)
```
```sql
select * from "users" where to_tsvector('simple', "users"."name") @@ to_tsquery('simple', '$1'); --> [ "Ale" ]
```
</Section>

## `sql` in orderBy

The `sql` template can indeed be used in the ORDER BY clause when you need specific functionality for ordering that is not
available in Drizzle, but you prefer not to resort to raw SQL.

<Section>
```typescript copy
import { sql } from 'drizzle-orm'
import { usersTable } from 'schema'

await db.select().from(usersTable).orderBy(sql`${usersTable.id} desc nulls first`)
```
```sql
select * from "users" order by "users"."id" desc nulls first;
```
</Section>

## `sql` in having and groupBy

The `sql` template can indeed be used in the HAVING and GROUP BY clauses when you need specific functionality for ordering that is not
available in Drizzle, but you prefer not to resort to raw SQL.

<Section>
```typescript copy
import { sql } from 'drizzle-orm'
import { usersTable } from 'schema'

await db.select({ 
    projectId: usersTable.projectId,
    count: sql<number>`count(${usersTable.id})`.mapWith(Number)
}).from(usersTable)
    .groupBy(sql`${usersTable.projectId}`)
    .having(sql`count(${usersTable.id}) > 300`)
```
```sql
select "project_id", count("users"."id") from users group by "users"."project_id" having count("users"."id") > 300; 
```
</Section>
