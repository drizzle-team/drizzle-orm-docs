import Tab from '@mdx/Tab.astro';
import Tabs from '@mdx/Tabs.astro';

# Common way of defining custom types

## Examples

The best way to see how `customType` definition is working is to check how existing data types in postgres and mysql could be defined using `customType` function from Drizzle ORM.


<Tabs items={['Postgres Data Types', 'MySql Data Types']}>
  <Tab>

**Serial**

```typescript copy
import { customType } from 'drizzle-orm/pg-core';

const customSerial = customType<{ data: number; notNull: true; default: true }>(
  {
    dataType() {
      return 'serial';
    },
  },
);
```

**Text**

```typescript copy
import { customType } from 'drizzle-orm/pg-core';

const customText = customType<{ data: string }>({
  dataType() {
    return 'text';
  },
});
```

**Boolean**

```typescript copy
import { customType } from 'drizzle-orm/pg-core';

const customBoolean = customType<{ data: boolean }>({
  dataType() {
    return 'boolean';
  },
});
```

**Jsonb**

```typescript copy
import { customType } from 'drizzle-orm/pg-core';

const customJsonb = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return 'jsonb';
    },
    toDriver(value: TData): string {
      return JSON.stringify(value);
    },
  })(name);
```

**Timestamp**

```typescript copy
import { customType } from 'drizzle-orm/pg-core';

const customTimestamp = customType<
  {
    data: Date;
    driverData: string;
    config: { withTimezone: boolean; precision?: number };
  }
>({
  dataType(config) {
    const precision = typeof config.precision !== 'undefined'
      ? ` (${config.precision})`
      : '';
    return `timestamp${precision}${
      config.withTimezone ? ' with time zone' : ''
    }`;
  },
  fromDriver(value: string): Date {
    return new Date(value);
  },
});
```

Usage for all types will be same as defined functions in Drizzle ORM. For example:

```typescript copy
const usersTable = pgTable('users', {
  id: customSerial('id').primaryKey(),
  name: customText('name').notNull(),
  verified: customBoolean('verified').notNull().default(false),
  jsonb: customJsonb<string[]>('jsonb'),
  createdAt: customTimestamp('created_at', { withTimezone: true }).notNull()
    .default(sql`now()`),
});
```
  </Tab>
  <Tab>

**Serial**

```typescript copy
import { customType } from 'drizzle-orm/mysql-core';

const customInt = customType<{ data: number; notNull: false; default: false }>(
  {
    dataType() {
      return 'int';
    },
  },
);
```

**Text**

```typescript copy
import { customType } from 'drizzle-orm/mysql-core';

const customText = customType<{ data: string }>({
  dataType() {
    return 'text';
  },
});
```

**Boolean**

```typescript copy
import { customType } from 'drizzle-orm/mysql-core';

const customBoolean = customType<{ data: boolean }>({
  dataType() {
    return 'boolean';
  },
  fromDriver(value) {
    if (typeof value === 'boolean') {
      return value;
    }
    return value === 1;
  },
});
```

**Json**

```typescript copy
import { customType } from 'drizzle-orm/mysql-core';

const customJson = <TData>(name: string) =>
  customType<{ data: TData; driverData: string }>({
    dataType() {
      return 'json';
    },
    toDriver(value: TData): string {
      return JSON.stringify(value);
    },
  })(name);
```

**Timestamp**

```typescript copy
import { customType } from 'drizzle-orm/mysql-core';

const customTimestamp = customType<
  { data: Date; driverData: string; config: { fsp: number } }
>({
  dataType(config) {
    const precision = typeof config.fsp !== 'undefined'
      ? ` (${config.fsp})`
      : '';
    return `timestamp${precision}`;
  },
  fromDriver(value: string): Date {
    return new Date(value);
  },
});
```

Usage for all types will be same as defined functions in Drizzle ORM. For example:

```typescript copy
const usersTable = mysqlTable('userstest', {
  id: customInt('id').primaryKey(),
  name: customText('name').notNull(),
  verified: customBoolean('verified').notNull().default(false),
  jsonb: customJson<string[]>('jsonb'),
  createdAt: customTimestamp('created_at', { fsp: 2 }).notNull().default(
    sql`now()`,
  ),
});
```

  </Tab>
</Tabs>

## TS-doc for type definitions 

You can check ts-doc for `types` and `param` definition.

```typescript
export type CustomTypeValues = {
  /**
   * Required type for custom column, that will infer proper type model
   *
   * Examples:
   *
   * If you want your column to be `string` type after selecting/or on inserting - use `data: string`. Like `text`, `varchar`
   *
   * If you want your column to be `number` type after selecting/or on inserting - use `data: number`. Like `integer`
   */
  data: unknown;

  /**
   * Type helper, that represents what type database driver is accepting for specific database data type
   */
  driverData?: unknown;

  /**
   * What config type should be used for {@link CustomTypeParams} `dataType` generation
   */
  config?: Record<string, unknown>;

  /**
   * If your custom data type should be notNull by default you can use `notNull: true`
   *
   * @example
   * const customSerial = customType<{ data: number, notNull: true, default: true }>({
   *    dataType() {
   *      return 'serial';
   *    },
   * });
   */
  notNull?: boolean;

  /**
   * If your custom data type has default you can use `default: true`
   *
   * @example
   * const customSerial = customType<{ data: number, notNull: true, default: true }>({
   *    dataType() {
   *      return 'serial';
   *    },
   * });
   */
  default?: boolean;
};

export interface CustomTypeParams<T extends CustomTypeValues> {
  /**
   * Database data type string representation, that is used for migrations
   * @example
   * ```
   * `jsonb`, `text`
   * ```
   *
   * If database data type needs additional params you can use them from `config` param
   * @example
   * ```
   * `varchar(256)`, `numeric(2,3)`
   * ```
   *
   * To make `config` be of specific type please use config generic in {@link CustomTypeValues}
   *
   * @example
   * Usage example
   * ```
   *   dataType() {
   *     return 'boolean';
   *   },
   * ```
   * Or
   * ```
   *   dataType(config) {
   *     return typeof config.length !== 'undefined' ? `varchar(${config.length})` : `varchar`;
   *   }
   * ```
   */
  dataType: (config: T['config']) => string;

  /**
   * Optional mapping function, between user input and driver
   * @example
   * For example, when using jsonb we need to map JS/TS object to string before writing to database
   * ```
   * toDriver(value: TData): string {
   *   return JSON.stringify(value);
   * }
   * ```
   */
  toDriver?: (value: T['data']) => T['driverData'];

  /**
   * Optional mapping function, that is responsible for data mapping from database to JS/TS code
   * @example
   * For example, when using timestamp we need to map string Date representation to JS Date
   * ```
   * fromDriver(value: string): Date {
   *  return new Date(value);
   * },
   * ```
   */
  fromDriver?: (value: T['driverData']) => T['data'];
}
```
