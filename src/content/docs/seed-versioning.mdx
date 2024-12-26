import Tab from "@mdx/Tab.astro";
import Tabs from "@mdx/Tabs.astro";
import Callout from "@mdx/Callout.astro";
import TableWrapper from "@mdx/TableWrapper.astro";

# Versioning

`drizzle-seed` uses versioning to manage outputs for static and dynamic data. To ensure true 
determinism, ensure that values remain unchanged when using the same `seed` number. If changes are made to 
static data sources or dynamic data generation logic, the version will be updated, allowing
you to choose between sticking with the previous version or using the latest.

You can upgrade to the latest `drizzle-seed` version for new features, such as additional
generators, while maintaining deterministic outputs with a previous version if needed. This
is particularly useful when you need to rely on existing deterministic data while accessing new functionality.

```ts
await seed(db, schema, { version: '2' });
```

## History
<TableWrapper>
|          api version  |   npm version    |     Changed generators                             |
|  :-------------- | :-------------- | :-------------                         |
|       `v1`            | `0.1.1`          |                                         |
|       `v2 (LTS) `       | `0.2.1`          |`string()`, `interval({ isUnique: true })` |
</TableWrapper>

<Callout collapsed="How it works under the hood?">
> This is not an actual API change; it is just an example of how we will proceed with `drizzle-seed` versioning.

For example, `lastName` generator was changed, and new version, `V2`, of this generator became available.

Later, `firstName` generator was changed, making `V3` version of this generator available.

|                  |       `V1`       |      `V2`       |   `V3(latest)`   |
| :--------------: | :--------------: | :-------------: | :--------------: |
| **LastNameGen**  | `LastNameGenV1`  | `LastNameGenV2` |                  |
| **FirstNameGen** | `FirstNameGenV1` |                 | `FirstNameGenV3` |


##### Use the `firstName` generator of version 3 and the `lastName` generator of version 2
```ts
await seed(db, schema);
```

If you are not ready to use latest generator version right away, you can specify max version to use

##### Use the `firstName` generator of version 1 and the `lastName` generator of version 2
```ts
await seed(db, schema, { version: '2' });
```

##### Use the `firstName` generator of version 1 and the `lastName` generator of version 1.
```ts
await seed(db, schema, { version: '1' });
```

</Callout>

## Version 2
#### Unique `interval` generator was changed

<Callout title='Reason for upgrade'>
An older version of the generator could produce intervals like `1 minute 60 seconds` and `2 minutes 0 seconds`, treating them as distinct intervals.
However, when the `1 minute 60 seconds` interval is inserted into a PostgreSQL database, it is automatically converted to `2 minutes 0 seconds`. As a result, attempting to insert the `2 minutes 0 seconds` interval into a unique column afterwards will cause an error
</Callout>

You will be affected, if your table includes a unique column of type `interval`:
<Tabs items={['PostgreSQL']}>
<Tab>
```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, interval } from "drizzle-orm/pg-core";
import { seed } from "drizzle-seed";

const intervals = pgTable("intervals", {
    interval: interval().unique()
});

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, { intervals });
}

main();
```
</Tab>
</Tabs>

You will be affected, if you use the unique `interval` generator in your seeding script, as shown in the script below:
<Tabs items={['PostgreSQL', 'MySQL', 'SQLite']}>
<Tab>
```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, interval, char, varchar, text } from "drizzle-orm/pg-core";
import { seed } from "drizzle-seed";

const intervals = pgTable("intervals", {
    interval: interval().unique(),
    interval1: interval(),
    interval2: char({ length: 256 }).unique(),
    interval3: char({ length: 256 }),
    interval4: varchar().unique(),
    interval5: varchar(),
    interval6: text().unique(),
    interval7: text(),
});

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, { intervals }).refine((f) => ({
    intervals: {
        columns: {
            interval: f.interval({ isUnique: true }),
            interval1: f.interval({ isUnique: true }),
            interval2: f.interval({ isUnique: true }),
            interval3: f.interval({ isUnique: true }),
            interval4: f.interval({ isUnique: true }),
            interval5: f.interval({ isUnique: true }),
            interval6: f.interval({ isUnique: true }),
            interval7: f.interval({ isUnique: true }),
        }
    }
  }));
}

main();
```
</Tab>
<Tab>
```ts
import { binary, char, mysqlTable, text, varbinary, varchar } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';
import { seed } from "drizzle-seed";

const intervals = mysqlTable('intervals', {
	interval1: char({ length: 255 }).unique(),
	interval2: char({ length: 255 }),
	interval3: varchar({ length: 255 }).unique(),
	interval4: varchar({ length: 255 }),
	interval5: binary({ length: 255 }).unique(),
	interval6: binary({ length: 255 }),
	interval7: varbinary({ length: 255 }).unique(),
	interval8: varbinary({ length: 255 }),
	interval9: text(),
});

async function main() {
	const db = drizzle(process.env.DATABASE_URL!);

	await seed(db, { intervals }, { version: '2' }).refine((f) => ({
		intervals: {
			columns: {
				interval: f.interval({ isUnique: true }),
				interval1: f.interval({ isUnique: true }),
				interval2: f.interval({ isUnique: true }),
				interval3: f.interval({ isUnique: true }),
				interval4: f.interval({ isUnique: true }),
				interval5: f.interval({ isUnique: true }),
				interval6: f.interval({ isUnique: true }),
				interval7: f.interval({ isUnique: true }),
				interval8: f.interval({ isUnique: true }),
				interval9: f.interval({ isUnique: true }),
			},
		},
	}));
}

main();

```
</Tab>
<Tab>
```ts
import { blob, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { seed } from 'drizzle-seed';

const intervals = sqliteTable('intervals', {
	interval1: text().unique(),
	interval2: text(),
	interval3: blob().unique(),
	interval4: blob(),
});

async function main() {
	const db = drizzle(process.env.DATABASE_URL!);

	await seed(db, { intervals }).refine((f) => ({
		intervals: {
			columns: {
				interval1: f.interval({ isUnique: true }),
				interval2: f.interval({ isUnique: true }),
				interval3: f.interval({ isUnique: true }),
				interval4: f.interval({ isUnique: true }),
			},
		},
	}));
}

main();

```
</Tab>
</Tabs>

#### `string` generators were changed: both non-unique and unique

<Callout title='Reason to upgrade'>
Ability to generate a unique string based on the length of the text column (e.g., `varchar(20)`)
</Callout>

You will be affected, if your table includes a column of a text-like type with a maximum length parameter or a unique column of a text-like type:
<Tabs items={['PostgreSQL', 'MySQL', 'SQLite']}>
<Tab>
```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, char, varchar, text } from "drizzle-orm/pg-core";
import { seed } from "drizzle-seed";

const strings = pgTable("strings", {
    string2: char({ length: 256 }).unique(),
    string3: char({ length: 256 }),
    string4: varchar().unique(),
    string5: varchar({ length: 256 }).unique(),
    string6: varchar({ length: 256 }),
    string7: text().unique(),
});

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, { strings });
}

main();
```
</Tab>
<Tab>
```ts
import { binary, char, mysqlTable, varbinary, varchar } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';
import { seed } from "drizzle-seed";

const strings = mysqlTable('strings', {
	string1: char({ length: 255 }).unique(),
	string2: char({ length: 255 }),
	string3: varchar({ length: 255 }).unique(),
	string4: varchar({ length: 255 }),
	string5: binary({ length: 255 }).unique(),
	string6: binary({ length: 255 }),
	string7: varbinary({ length: 255 }).unique(),
	string8: varbinary({ length: 255 }),
});

async function main() {
	const db = drizzle(process.env.DATABASE_URL!);

	await seed(db, { strings });
}

main();

```
</Tab>
<Tab>
```ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { blob, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { seed } from "drizzle-seed";

const strings = sqliteTable('strings', {
	string1: text().unique(),
	string2: text({ length: 256 }),
	string3: text({ length: 256 }).unique(),
	string4: blob().unique(),
});

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, { strings });
}

main();
```
</Tab>
</Tabs>

You will be affected, if you use the `string` generator in your seeding script, as shown in the script below:
<Tabs items={['PostgreSQL', 'MySQL', 'SQLite']}>
<Tab>
```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, char, varchar, text } from "drizzle-orm/pg-core";
import { seed } from "drizzle-seed";

const strings = pgTable("strings", {
    string1: char({ length: 256 }).unique(),
    string2: char({ length: 256 }),
    string3: char({ length: 256 }),
    string4: varchar(),
    string5: varchar().unique(),
    string6: varchar({ length: 256 }).unique(),
    string7: varchar({ length: 256 }),
    string8: varchar({ length: 256 }),
    string9: text().unique(),
    string10: text(),
});

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, { strings }).refine((f) => ({
    strings: {
        columns: {
            string1: f.string({ isUnique: true }),
            string2: f.string(),
            string3: f.string({ isUnique: true }),
            string4: f.string({ isUnique: true }),
            string5: f.string({ isUnique: true }),
            string6: f.string({ isUnique: true }),
            string7: f.string(),
            string8: f.string({ isUnique: true }),
            string9: f.string({ isUnique: true }),
            string10: f.string({ isUnique: true }),
        }
    }
  }));
}

main();
```
</Tab>
<Tab>
```ts
import { binary, char, mysqlTable, text, varbinary, varchar } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';
import { seed } from "drizzle-seed";

const strings = mysqlTable('strings', {
	string1: char({ length: 255 }).unique(),
	string2: char({ length: 255 }),
	string3: char({ length: 255 }),
	string4: varchar({ length: 255 }).unique(),
	string5: varchar({ length: 255 }),
	string6: varchar({ length: 255 }),
	string7: binary({ length: 255 }).unique(),
	string8: binary({ length: 255 }),
	string9: binary({ length: 255 }),
	string10: varbinary({ length: 255 }).unique(),
	string11: varbinary({ length: 255 }),
	string12: varbinary({ length: 255 }),
	string13: text(),
});

async function main() {
	const db = drizzle(process.env.DATABASE_URL!);

	await seed(db, { strings }).refine((f) => ({
		strings: {
			columns: {
				string1: f.string({ isUnique: true }),
				string2: f.string({ isUnique: true }),
				string3: f.string(),
				string4: f.string({ isUnique: true }),
				string5: f.string({ isUnique: true }),
				string6: f.string(),
				string7: f.string({ isUnique: true }),
				string8: f.string({ isUnique: true }),
				string9: f.string(),
				string10: f.string({ isUnique: true }),
				string11: f.string({ isUnique: true }),
				string12: f.string(),
				string13: f.string({ isUnique: true }),
			},
		},
	}));
}

main();
```
</Tab>
<Tab>
```ts
import { blob, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { seed } from "drizzle-seed";

const strings = sqliteTable("strings", {
    string1: text().unique(),
	string2: text(),
	string3: text({ length: 256 }).unique(),
	string4: text({ length: 256 }),
	string5: text({ length: 256 }),
	string6: blob().unique(),
	string7: blob(),
});

async function main() {
	const db = drizzle(process.env.DATABASE_URL!);

	await seed(db, { strings }).refine((f) => ({
		strings: {
			columns: {
				string1: f.string({ isUnique: true }),
				string2: f.string({ isUnique: true }),
				string3: f.string({ isUnique: true }),
				string4: f.string({ isUnique: true }),
				string5: f.string(),
				string6: f.string({ isUnique: true }),
				string7: f.string({ isUnique: true }),
			},
		},
	}));
}

main();
```
</Tab>
</Tabs>