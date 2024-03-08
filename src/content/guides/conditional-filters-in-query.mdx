---
title: Conditional filters in query
slug: conditional-filters-in-query
---
import Section from "@mdx/Section.astro";
import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";
import Prerequisites from "@mdx/Prerequisites.astro";

<IsSupportedChipGroup chips={{PostgreSQL: true, MySQL: true, SQLite: true}}/>

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql), [MySQL](/docs/get-started-mysql) and [SQLite](/docs/get-started-sqlite);
- [Select statement](/docs/select);
- [Filtering](/docs/select#filtering) and [Filter operators](/docs/operators);
</Prerequisites>

To pass a conditional filter in query you can use `.where()` method and logical operator like below:

<Section>
```ts copy {9}
import { ilike } from 'drizzle-orm';

const db = drizzle(...)

const searchPosts = async (term?: string) => {
  await db
    .select()
    .from(posts)
    .where(term ? ilike(posts.title, term) : undefined);
};

await searchPosts();
await searchPosts('AI');
```


```sql
select * from posts;
select * from posts where title ilike 'AI';
```
</Section>

To combine conditional filters you can use `and()` or `or()` operators like below:

<Section>
```ts copy {7,8,9,10,11,12,13}
import { and, gt, ilike, inArray } from 'drizzle-orm';

const searchPosts = async (term?: string, categories: string[] = [], views = 0) => {
  await db
    .select()
    .from(posts)
    .where(
      and(
        term ? ilike(posts.title, term) : undefined,
        categories.length > 0 ? inArray(posts.category, categories) : undefined,
        views > 100 ? gt(posts.views, views) : undefined,
      ),
    );
};

await searchPosts();
await searchPosts('AI', ['Tech', 'Art', 'Science'], 200);
```

```sql
select * from posts;
select * from posts
  where (
    title ilike 'AI'
    and category in ('Tech', 'Science', 'Art')
    and views > 200
  );
```
</Section>

If you need to combine conditional filters in different part of the project you can create a variable, push filters and then use it in `.where()` method with `and()` or `or()` operators like below:

```ts copy {7,10}
import { SQL, ... } from 'drizzle-orm';

const searchPosts = async (filters: SQL[]) => {
  await db
    .select()
    .from(posts)
    .where(and(...filters));
};

const filters: SQL[] = [];
filters.push(ilike(posts.title, 'AI'));
filters.push(inArray(posts.category, ['Tech', 'Art', 'Science']));
filters.push(gt(posts.views, 200));

await searchPosts(filters);
```

Drizzle has useful and flexible API, which lets you create your custom solutions. This is how you can create a custom filter operator:

<Section>

```ts copy {5,14}
import { AnyColumn, ... } from 'drizzle-orm';

// length less than
const lenlt = (column: AnyColumn, value: number) => {
  return sql`length(${column}) < ${value}`;
};

const searchPosts = async (maxLen = 0, views = 0) => {
  await db
    .select()
    .from(posts)
    .where(
      and(
        maxLen ? lenlt(posts.title, maxLen) : undefined,
        views > 100 ? gt(posts.views, views) : undefined,
      ),
    );
};

await searchPosts(8);
await searchPosts(8, 200);
```

```sql
select * from posts where length(title) < 8;
select * from posts where (length(title) < 8 and views > 200);
```
</Section>

Drizzle filter operators are just SQL expressions under the hood. This is example of how `lt` operator is implemented in Drizzle:

```js
const lt = (left, right) => {
  return sql`${left} < ${bindIfParam(right, left)}`; // bindIfParam is internal magic function
};
```
