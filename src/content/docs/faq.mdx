import Callout from '@mdx/Callout.astro';

# FAQ & Troubleshooting

## **Should I use `generate` or `push`?**

Those are logically 2 different commands. `generate` is used to create an sql file together with additional
information needed for `drizzle-kit` (or any other migration tool).

After generating those migrations, they won't be applied to a database. 
You need to do it in the next step. You can read more about it **[here](/docs/migrations)**

On the other hand, `push` doesn't need any migrations to be generated. It will
simply sync your schema with the database schema. Please be careful when using it;
we recommend it only for local development and local databases. To read more about it, check out **[`drizzle-kit push`](/docs/drizzle-kit-push)**

## How `push` and `generate` works for PostgreSQL indexes

### Limitations

1. **You should specify a name for your index manually if you have an index on at least one expression**

Example

```ts
index().on(table.id, table.email) // will work well and name will be autogeneretaed
index('my_name').on(table.id, table.email) // will work well

// but

index().on(sql`lower(${table.email})`) // error
index('my_name').on(sql`lower(${table.email})`) // will work well
```

2. **Push won't generate statements if these fields(list below) were changed in an existing index:**

- expressions inside `.on()` and `.using()`
- `.where()` statements
- operator classes `.op()` on columns

If you are using `push` workflows and want to change these fields in the index, you would need to:

1. Comment out the index
2. Push
3. Uncomment the index and change those fields
4. Push again

For the `generate` command, `drizzle-kit` will be triggered by any changes in the index for any property in the new drizzle indexes API, so there are no limitations here.