---
title: "Migrate from Prisma to Drizzle"
---
import Steps from "@mdx/Steps.astro";
import Npm from "@mdx/Npm.astro";

## Getting Started

This guide provides a straightforward approach to migrating a basic **Prisma** project to **Drizzle ORM**. Although the example focuses on `PostgreSQL`, the process is similar for other supported databases.

### Overview of the migration process

Regardless of your application type or API layer, the steps to transition from **Prisma** to **Drizzle ORM** remain consistent:

1. Install **Drizzle ORM** & **Drizzle Kit**
2. Setup **Drizzle config** file
3. Introspect your database
4. Connect **Drizzle ORM** to your database
5. Transition your **Prisma** queries to **Drizzle ORM** queries

These steps are applicable whether you're developing a REST API (for example, with Express, Koa, or NestJS) or any other type of application that utilizes **Prisma** for database interactions.

## Overview of the Prisma project

For this guide, we'll use a REST API built with `Express` as a sample project to migrate to **Drizzle ORM**. It has four entities:

```prisma  copy filename="prisma/schema.prisma" collapsable
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}


model Product {
  id              Int           @id @default(autoincrement())
  name            String
  supplierId      Int
  unitPrice       Decimal       @db.Decimal(10, 4)
  unitsInStock    Int

  supplier        Supplier?     @relation(fields: [supplierId], references: [id])
  orderDetails    OrderDetail[]

  @@map("products")
}

model Supplier {
  id           Int       @id @default(autoincrement())
  companyName  String
  city         String
  country      String

  products     Product[]

  @@map("suppliers")
}

model OrderDetail {
  orderId   Int
  productId Int
  quantity  Int

  order   Order   @relation(fields: [orderId], references: [id])
  product Product @relation(fields: [productId], references: [id])

  @@id([orderId, productId])
  @@map("order_details")
}

model Order {
  id             Int       @id @default(autoincrement())
  orderDate      DateTime  @db.Date
  shippedDate    DateTime? @db.Date
  shipAddress    String
  shipPostalCode String?
  shipCountry    String

  orderDetails OrderDetail[]

  @@map("orders")
}
```

The models have the following relations:

1. `one-to-many` between `Supplier` and `Product`
2. `many-to-many` between `Order` and `Product`

For `many-to-many` relation we will create a join table `order_details`, so `Order` and `Product` entities will have `one-to-many` relations with `OrderDetail` entity.

The corresponding tables have been created using a generated Prisma migration.


```sql copy filename="prisma/migrations/20240101200233_init/migration.sql" collapsable
-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "supplierId" INTEGER NOT NULL,
    "unitPrice" DECIMAL(10,4) NOT NULL,
    "unitsInStock" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_details" (
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_details_pkey" PRIMARY KEY ("orderId","productId")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "orderDate" DATE NOT NULL,
    "shippedDate" DATE,
    "shipAddress" TEXT NOT NULL,
    "shipPostalCode" TEXT,
    "shipCountry" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_details" ADD CONSTRAINT "order_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
```

This guide uses the following file structure:

```plaintext
📦 <project root>
 ├ 📂 prisma
 │  ├ 📂 migrations
 │  │  ├ 📂 20240101200233_init
 │  │  │  └ 📜 migration.sql
 │  │  └ 📜 migration_lock.toml
 │  └ 📜 schema.prisma
 ├ 📂 src
 │  ├ 📂 db
 │  │  └ 📜 db.ts
 │  ├ 📂 routers
 │  │  ├ 📜 order.router.ts
 │  │  ├ 📜 product.router.ts
 │  │  └ 📜 supplier.router.ts
 │  ├ 📂 controllers
 │  │  ├ 📜 order.controller.ts
 │  │  ├ 📜 product.controller.ts
 │  │  └ 📜 supplier.controller.ts
 │  ├ 📜 index.ts
 │  └ 📜 server.ts
 ├ 📜 package.json
 └ 📜 tsconfig.json
```

<Steps>

#### Install Drizzle ORM & Drizzle Kit

The first step is to install **Drizzle ORM** and `pg` package which we will use as a driver. The second step is to install **Drizzle Kit** and types for `pg`. [Drizzle Kit](/docs/kit-overview) - CLI companion for automatic SQL migrations generation and rapid prototyping. 

<Npm>
drizzle-orm pg
-D drizzle-kit @types/pg
</Npm>

#### Setup Drizzle config file

**Drizzle config** - a configuration file that is used by **Drizzle Kit** and contains all the information about your database connection, migration folder and schema files.

Create a `drizzle.config.ts` file in the root of your project and add the following content:

```typescript copy filename="drizzle.config.ts"
import 'dotenv/config'; // make sure to install dotenv package
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './src/drizzle',
  schema: './src/drizzle/schema.ts',
  dbCredentials: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT!),
    user: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
  },
  // Print all statements
  verbose: true,
  // Always ask for confirmation
  strict: true,
});
```

#### Introspect your database

**Drizzle Kit** provides a CLI command to introspect your database and generate a schema file. The schema file contains all the information about your database tables, columns, relations, and indices.

```bash
npx drizzle-kit introspect
```

This command will generate a schema.ts file, along with snapshots and migrations in the src/drizzle folder.

```typescript collapsable copy filename="src/drizzle/schema.ts"
import {
  pgTable,
  varchar,
  timestamp,
  text,
  integer,
  serial,
  foreignKey,
  numeric,
  date,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const prismaMigrations = pgTable('_prisma_migrations', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  checksum: varchar('checksum', { length: 64 }).notNull(),
  finishedAt: timestamp('finished_at', { withTimezone: true, mode: 'string' }),
  migrationName: varchar('migration_name', { length: 255 }).notNull(),
  logs: text('logs'),
  rolledBackAt: timestamp('rolled_back_at', { withTimezone: true, mode: 'string' }),
  startedAt: timestamp('started_at', { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
  appliedStepsCount: integer('applied_steps_count').default(0).notNull(),
});

export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey().notNull(),
  companyName: text('companyName').notNull(),
  city: text('city').notNull(),
  country: text('country').notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  supplierId: integer('supplierId')
    .notNull()
    .references(() => suppliers.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  unitPrice: numeric('unitPrice', { precision: 10, scale: 4 }).notNull(),
  unitsInStock: integer('unitsInStock').notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey().notNull(),
  orderDate: date('orderDate').notNull(),
  shippedDate: date('shippedDate'),
  shipAddress: text('shipAddress').notNull(),
  shipPostalCode: text('shipPostalCode'),
  shipCountry: text('shipCountry').notNull(),
});

export const orderDetails = pgTable(
  'order_details',
  {
    orderId: integer('orderId')
      .notNull()
      .references(() => orders.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
    productId: integer('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
    quantity: integer('quantity').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.orderId, table.productId], name: 'order_details_pkey' })
  ]
);
```

```sql collapsable copy filename="src/drizzle/0000_cool_puff_adder.sql"
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"companyName" text NOT NULL,
	"city" text NOT NULL,
	"country" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"supplierId" integer NOT NULL,
	"unitPrice" numeric(10, 4) NOT NULL,
	"unitsInStock" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderDate" date NOT NULL,
	"shippedDate" date,
	"shipAddress" text NOT NULL,
	"shipPostalCode" text,
	"shipCountry" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_details" (
	"orderId" integer NOT NULL,
	"productId" integer NOT NULL,
	"quantity" integer NOT NULL,
	CONSTRAINT order_details_pkey PRIMARY KEY("orderId","productId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE restrict ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
```

Also, if you want to use relational queries, you have to update your schema file with relational tables:

```typescript copy filename="src/drizzle/schema.ts"
// ...other imports
import { relations } from 'drizzle-orm';

// ...other tables
export const suppliersRelations = relations(suppliers, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  supplier: one(suppliers, { fields: [products.supplierId], references: [suppliers.id] }),
  orderDetails: many(orderDetails),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
  orderDetails: many(orderDetails),
}));

export const orderDetailsRelations = relations(orderDetails, ({ one }) => ({
  order: one(orders, { fields: [orderDetails.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderDetails.productId], references: [products.id] }),
}));
```

Now we have the following file structure:

```plaintext
📦 <project root>
 ├ 📂 src
 │  ├ 📂 drizzle
 │  │  ├ 📂 meta
 |  |  |  ├ 📜 _journal.json
 │  │  │  └ 📜 0000_snapshot.json
 │  │  ├ 📜 0000_cool_puff_adder.sql
 │  │  └ 📜 schema.ts
 │  ├ 📂 routers
 │  │  ├ 📜 order.router.ts
 │  │  ├ 📜 product.router.ts
 │  │  └ 📜 supplier.router.ts
 │  ├ 📂 controllers
 │  │  ├ 📜 order.controller.ts
 │  │  ├ 📜 product.controller.ts
 │  │  └ 📜 supplier.controller.ts
 │  ├ 📜 index.ts
 │  └ 📜 server.ts
 ├ 📜 package.json
 ├ 📜 drizzle.config.ts
 └ 📜 tsconfig.json
```

#### Connect Drizzle ORM to your database

Create a `db.ts` file in the `src/drizzle` folder and set up your database configuration:

```typescript copy filename="src/drizzle/db.ts"
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

export const client = new Client({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  user: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

// { schema } is used for relational queries
export const db = drizzle({ client, schema });
```

```typescript copy filename="src/index.ts"
import 'dotenv/config';
import { client, db } from './drizzle/db';
import { resolve } from 'node:path';
import { migrate } from 'drizzle-orm/node-postgres/migrator';


(async () => {
  await client.connect();

  // This command run all migrations from the migrations folder and apply changes to the database
  await migrate(db, { migrationsFolder: resolve(__dirname, './drizzle') });

  // ... start your application
})();
```

#### Transition your Prisma queries to Drizzle ORM queries

In this section, we will show you how to replace several queries from **Prisma** with **Drizzle ORM**.

##### Replace insert queries

We will show how to insert new rows into `suppliers` and `products` tables.

1. `POST /suppliers`
```typescript copy filename="src/controllers/supplier.controller.ts"
import { prisma } from '../db/db';

await prisma.supplier.createMany({
  data: [
    { companyName: 'TestCompanyName1', city: 'TestCity1', country: 'TestCountry1' },
    { companyName: 'TestCompanyName2', city: 'TestCity2', country: 'TestCountry2' },
  ],
});
```

With **Drizzle ORM**, the query is implemented as follows:

```typescript copy filename="src/controllers/supplier.controller.ts"
import { db } from '../drizzle/db';
import { suppliers } from '../drizzle/schema';

await db.insert(suppliers).values([
  {
    companyName: 'TestCompanyName1',
    city: 'TestCity1',
    country: 'TestCountry1',
  },
  {
    companyName: 'TestCompanyName2',
    city: 'TestCity2',
    country: 'TestCountry2',
  },
]);
```

2. `POST /products`

```typescript copy filename="src/controllers/product.controller.ts"
import { prisma } from '../db/db';

await prisma.product.createMany({
  data: [
    { 
      name: 'TestProductName1',
      supplierId: 1,
      unitPrice: 10,
      unitsInStock: 20,
    },
    {
      name: 'TestProductName2',
      supplierId: 1,
      unitPrice: 25,
      unitsInStock: 7,
    },
    {
      name: 'TestProductName3',
      supplierId: 2,
      unitPrice: 50,
      unitsInStock: 17,
    },
    {
      name: 'TestProductName4',
      supplierId: 2,
      unitPrice: 100,
      unitsInStock: 2,
    },
  ],
});
```

With **Drizzle ORM**, the query is implemented as follows:

Be careful with the `unitPrice` field. In **Prisma** it's a `number` type, but in **Drizzle ORM** it's a `string` type, which can handle more than 16383 digits after the decimal point, unlike the `number` type.

```typescript copy filename="src/controllers/product.controller.ts"
await db.insert(products).values([
  {
    name: 'TestProductName1',
    supplierId: 1,
    unitPrice: '10',
    unitsInStock: 20,
  },
  {
    name: 'TestProductName2',
    supplierId: 1,
    unitPrice: '25',
    unitsInStock: 7,
  },
  {
    name: 'TestProductName3',
    supplierId: 2,
    unitPrice: '50',
    unitsInStock: 17,
  },
  {
    name: 'TestProductName4',
    supplierId: 2,
    unitPrice: '100',
    unitsInStock: 2,
  },
]);
```

##### Replace select queries

In this section we will show how to select one row, multiple rows, count rows, filter rows, join tables and paginate results.

1. `GET /products/:id`

```typescript copy filename="src/controllers/product.controller.ts"
import { prisma } from '../db/db';

const { id } = req.params;

const response = await prisma.product.findUnique({
  where: { id },
  include: {
    supplier: true,
  },
});
```

In **Drizzle ORM**, the query is implemented as follows:

```typescript copy filename="src/controllers/product.controller.ts"
import { eq } from 'drizzle-orm';
import { db } from '../drizzle/db';
import { products, suppliers } from '../drizzle/schema';

const { id } = req.params;

const response = await db
  .select({
    product: products,
    supplier: suppliers,
  })
  .from(products)
  .where(eq(products.id, id))
  .leftJoin(suppliers, eq(suppliers.id, products.supplierId));

// or you can use relational queries
const response = await db.query.products.findFirst({
  where: (products, { eq }) => eq(products.id, id),
  with: {
    supplier: true,
  },
});
```

Response will be type-safe with both ORMs.

```typescript
// response type for Drizzle ORM
const response: {
  product: {
    name: string;
    id: number;
    supplierId: number;
    unitPrice: string;
    unitsInStock: number;
  };
  supplier: {
    id: number;
    companyName: string;
    city: string | null;
    country: string;
  } | null;
}[]
```

2. `GET /products`

```typescript copy filename="src/controllers/product.controller.ts"
import { Prisma } from '@prisma/client';
import { prisma } from '../db/db';

const whereOptions: Prisma.ProductWhereInput = {
  name: { contains: 'test', mode: 'insensitive' },
};

const [response, count] = await Promise.all([
  prisma.product.findMany({
    where: whereOptions,
    take: 10,
    skip: 0,
    select: {
      id: true,
      name: true,
      unitPrice: true,
      unitsInStock: true,
    },
  }),
  prisma.product.count({ where: whereOptions }),
]);
```

In **Drizzle ORM**, the query is implemented as follows:

```typescript collapsable copy filename="src/controllers/product.controller.ts"
import { ilike, sql } from 'drizzle-orm';
import { db } from '../drizzle/db';
import { products } from '../drizzle/schema';

const whereOptions = ilike(products.name, `%test%`);

const [response, count] = await Promise.all([
  db
    .select({
      id: products.id,
      name: products.name,
      unitPrice: products.unitPrice,
      unitsInStock: products.unitsInStock,
    })
    .from(products)
    .where(whereOptions)
    .offset(0)
    .limit(10),
  db
    .select({ count: sql<number>`cast(count(${products.id}) as integer)` })
    .from(products)
    .where(whereOptions),
]);

// or you can use relational queries
const whereOptions = ilike(products.name, `%test%`);

const [response, count] = await Promise.all([
  db.query.products.findMany({
    where: whereOptions,
    columns: {
      id: true,
      name: true,
      unitPrice: true,
      unitsInStock: true,
    },
    offset: 0,
    limit: 10,
  }),
  db
    .select({ count: sql<number>`cast(count(${products.id}) as integer)` })
    .from(products)
    .where(whereOptions),
]);
```

Response will be type-safe with both ORMs.

```typescript
// response type for Drizzle ORM
const response: {
  id: number;
  name: string;
  unitPrice: string;
  unitsInStock: number;
}[]
```

3. `GET /orders/:id`

In **Prisma**, aggregate functions require using the `aggregate` method. For complex queries, the `$queryRaw` method is used, which is not type-safe.

We want to select `id`, `orderDate` and `shipCountry` fields from `orders` table and by using `aggregation functions` sum `totalPrice` of order, `totalQuantity` of products in the order and count `totalProducts` in the order.

```typescript copy filename="src/controllers/order.controller.ts"
import { prisma } from '../db/db';

const { id } = req.params;

const order = await prisma.order.findFirst({
  where: { id },
  select: {
    id: true,
    orderDate: true,
    shipCountry: true,
  },
});
if (!order) {
  throw new Error('Order not found');
}

const { _count, _sum } = await prisma.orderDetail.aggregate({
  where: { orderId: id },
  _sum: {
    quantity: true,
  },
  _count: {
    orderId: true,
  },
});

const totalPrice: Array<{ totalPrice: number }> = await prisma.$queryRaw<number>`
  SELECT SUM(unitPrice * quantity) as "totalPrice"
  FROM order_details
  WHERE "orderId" = ${id}
`;

const response = {
  ...order,
  totalPrice: totalPrice[0].totalPrice,
  totalQuantity: _sum.quantity,
  totalProducts: _count.orderId,
};
```

In **Drizzle ORM**, the query is implemented as follows:

```typescript copy filename="src/controllers/order.controller.ts"
import { eq, sql } from 'drizzle-orm';
import { db } from '../drizzle/db';
import { orders, orderDetails, products } from '../drizzle/schema';

const { id } = req.params;

const response = await db
      .select({
        id: orders.id,
        shipCountry: orders.shipCountry,
        orderDate: orders.orderDate,
        totalPrice: sql<number>`cast(sum(${orderDetails.quantity} * ${products.unitPrice}) as float)`,
        totalQuantity: sql<number>`cast(sum(${orderDetails.quantity}) as int)`,
        totalProducts: sql<number>`cast(count(${orderDetails.productId}) as int)`,
      })
      .from(orders)
      .where(eq(orders.id, id))
      .groupBy(orders.id)
      .leftJoin(orderDetails, eq(orderDetails.orderId, orders.id))
      .leftJoin(products, eq(products.id, orderDetails.productId));
```

In **Drizzle ORM**, the result will be type-safe with aggregations too.

```typescript
// response type
const response: {
  id: number;
  shipCountry: string;
  orderDate: string;
  totalPrice: number;
  totalQuantity: number;
  totalProducts: number;
}[]
```

**Note:** as of now aggregations are not supported in relational queries, so you have to use `core queries`.

##### Replace update queries

In this section, we will show you how to update multiple rows.

1. `PATCH /suppliers/:id`
  
```typescript copy filename="src/controllers/supplier.controller.ts"
import { prisma } from '../db/db';

const { id } = req.params;

const supplier = await prisma.supplier.update({
  where: { id },
  data: { city: 'TestCity1Updated', country: 'TestCountry1Updated' },
});
```

In **Drizzle ORM**, the query is implemented as follows:

```typescript copy filename="src/controllers/supplier.controller.ts"
import { eq } from 'drizzle-orm';
import { db } from '../drizzle/db';
import { suppliers } from '../drizzle/schema';

const { id } = req.params;

await db
    .update(suppliers)
    .set({
      city: 'TestCity1Updated',
      country: 'TestCountry1Updated',
    })
    .where(eq(suppliers.id, id));
```

##### Replace delete queries

In this section, we will show you how to delete a single row and multiple rows using transactions.

1. `DELETE /orders/:id`

```typescript copy filename="src/controllers/order.controller.ts"
import { prisma } from '../db/db';

const { id } = req.params;

const orderDetailQuery = prisma.orderDetail.deleteMany({
  where: { orderId: id },
});

const orderQuery = prisma.order.deleteMany({
  where: { id },
});

await prisma.$transaction([orderDetailQuery, orderQuery]);
```

In **Drizzle ORM**, the query is implemented as follows:

```typescript copy filename="src/controllers/order.controller.ts"
import { eq } from 'drizzle-orm';
import { db } from '../drizzle/db';
import { orderDetails, orders } from '../drizzle/schema';

const { id } = req.params;

try {
  await db.transaction(async (tx) => {
    await tx.delete(orderDetails).where(eq(orderDetails.orderId, id));

    await tx.delete(orders).where(eq(orders.id, id));
  });
} catch (e) {
  console.error(e);
}
```
</Steps>
