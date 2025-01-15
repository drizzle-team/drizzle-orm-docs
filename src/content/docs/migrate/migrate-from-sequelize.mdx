---
title: "Migrate from Sequelize to Drizzle"
---
import Npm from "@mdx/Npm.astro";
import Steps from "@mdx/Steps.astro";

## Getting Started

This guide provides a straightforward approach to migrating a basic **Sequelize** project to **Drizzle ORM**. Although the example focuses on `PostgreSQL`, the process is similar for other supported databases.

### Overview of the migration process

Regardless of your application type or API layer, the steps to transition from **Sequelize** to **Drizzle ORM** remain consistent:

1. Install **Drizzle ORM** & **Drizzle Kit**
2. Setup **Drizzle config** file
3. Introspect your database
4. Connect **Drizzle ORM** to your database
5. Transition your **Sequelize** queries to **Drizzle ORM** queries

These steps are applicable whether you're developing a REST API (for example, with Express, Koa, or NestJS) or any other type of application that utilizes **Sequelize** for database interactions.

## Overview of the Sequelize project

For this guide, we'll use a REST API built with `Express` as a sample project to migrate to **Drizzle ORM**. It has four entities:

```typescript collapsable copy filename="src/db/models/supplier.ts"
import { DataTypes, Model } from 'sequelize';
import { Product } from './product';
import { sequelize } from '../db';

export class Supplier extends Model {}

Supplier.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'suppliers',
    modelName: 'Supplier',
    timestamps: false,
  },
);

Supplier.hasMany(Product, {
  foreignKey: 'supplierId',
});

Product.belongsTo(Supplier, {
  foreignKey: 'supplierId',
  targetKey: 'id',
});
```

```typescript collapsable copy filename="src/db/models/product.ts"
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'suppliers',
        key: 'id',
      },
      field: 'supplierId',
    },
    unitPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    unitsInStock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    timestamps: false,
  },
);
```

```typescript collapsable copy filename="src/db/models/order.ts"
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';

export class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    shippedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    shipAddress: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    shipPostalCode: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    shipCountry: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    modelName: 'Order',
    timestamps: false,
  },
);
```

```typescript collapsable copy filename="src/db/models/order-detail.ts"
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../db';
import { Order } from './order';
import { Product } from './product';

export class OrderDetail extends Model {}

OrderDetail.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Order,
        key: 'id',
      },
      field: 'orderId',
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Product,
        key: 'id',
      },
      field: 'productId',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'order_details',
    modelName: 'OrderDetail',
    timestamps: false,
  },
);

Order.hasMany(OrderDetail, { foreignKey: 'orderId', as: 'details' });
OrderDetail.belongsTo(Order, { foreignKey: 'orderId' });

Product.hasMany(OrderDetail, { foreignKey: 'productId', as: 'details' });
OrderDetail.belongsTo(Product, { foreignKey: 'productId' });

Order.belongsToMany(Product, {
  through: OrderDetail,
  foreignKey: 'orderId',
  as: 'products',
  targetKey: 'id',
});
Product.belongsToMany(Order, {
  through: OrderDetail,
  foreignKey: 'productId',
  as: 'orders',
  targetKey: 'id',
});
```

The models have the following relations:

1. `one-to-many` between `Supplier` and `Product`
2. `many-to-many` between `Order` and `Product`

For `many-to-many` relation we will create a join table `order_details`, so `Order` and `Product` entities will have `one-to-many` relations with `OrderDetail` entity.

The corresponding tables have been created using Sequelize migration. Sequelize doesn't support auto generation of migrations, so you have to write them manually.

```javascript collapsable copy filename="src/db/migrations/20231220152726-init.js"
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('suppliers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      companyName: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      city: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      country: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });

    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      supplierId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'suppliers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      unitPrice: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      unitsInStock: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      orderDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      shippedDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      shipAddress: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      shipPostalCode: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      shipCountry: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    });

    await queryInterface.createTable('order_details', {
      orderId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'orders',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('order_details');
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('suppliers');
  },
};
```

This guide uses the following file structure:

```text
📦 <project root>
 ├ 📂 src
 │  ├ 📂 db
 │  │  ├ 📂 migrations
 │  │  │  └ 📜 20231220152726-init.js
 │  │  ├ 📂 models
 │  │  │  ├ 📜 order-detail.ts
 │  │  │  ├ 📜 order.ts
 │  │  │  ├ 📜 product.ts
 │  │  │  └ 📜 supplier.ts
 │  │  ├ 📜 db.ts
 │  │  └ 📜 config.js
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
 ├ 📜 .sequelizerc
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
  serial,
  text,
  foreignKey,
  integer,
  numeric,
  timestamp,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const sequelizeMeta = pgTable('SequelizeMeta', {
  name: varchar('name', { length: 255 }).primaryKey().notNull(),
});

export const suppliers = pgTable('suppliers', {
  id: serial('id').primaryKey().notNull(),
  companyName: text('companyName').notNull(),
  city: text('city'),
  country: text('country').notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  supplierId: integer('supplierId')
    .notNull()
    .references(() => suppliers.id, { onDelete: 'set null', onUpdate: 'cascade' }),
  unitPrice: numeric('unitPrice').notNull(),
  unitsInStock: integer('unitsInStock').notNull(),
});

export const orders = pgTable('orders', {
  id: serial('id').primaryKey().notNull(),
  orderDate: timestamp('orderDate', { withTimezone: true, mode: 'string' }).notNull(),
  shippedDate: timestamp('shippedDate', { withTimezone: true, mode: 'string' }),
  shipAddress: text('shipAddress').notNull(),
  shipPostalCode: text('shipPostalCode'),
  shipCountry: text('shipCountry').notNull(),
});

export const orderDetails = pgTable(
  'order_details',
  {
    orderId: integer('orderId')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    productId: integer('productId')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    quantity: integer('quantity').notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.orderId, table.productId], name: 'order_details_pkey' })
  ]
);
```

```sql collapsable copy filename="src/drizzle/0000_high_rhodey.sql"
-- Current sql file was generated after introspecting the database

CREATE TABLE IF NOT EXISTS "SequelizeMeta" (
	"name" varchar(255) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "suppliers" (
	"id" serial PRIMARY KEY NOT NULL,
	"companyName" text NOT NULL,
	"city" text,
	"country" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"supplierId" integer NOT NULL,
	"unitPrice" numeric NOT NULL,
	"unitsInStock" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderDate" timestamp with time zone NOT NULL,
	"shippedDate" timestamp with time zone,
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
 ALTER TABLE "products" ADD CONSTRAINT "products_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE set null ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE cascade ON UPDATE cascade;
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

```text
📦 <project root>
 ├ 📂 src
 │  ├ 📂 drizzle
 │  │  ├ 📂 meta
 |  |  |  ├ 📜 _journal.json
 │  │  │  └ 📜 0000_snapshot.json
 │  │  ├ 📜 0000_lush_lenny_balinger.sql
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

#### Transition your Sequelize queries to Drizzle ORM queries

In this section, we will show you how to replace several queries from **Sequelize** with **Drizzle ORM**.

##### Replace insert queries

We will show how to insert new rows into `suppliers` and `products` tables.

1. `POST /suppliers`
```typescript copy filename="src/controllers/supplier.controller.ts"
import { Supplier } from '../db/models/supplier';

const suppliers = await Supplier.bulkCreate([
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
import { Product } from '../db/models/product';

const products = await Product.bulkCreate([
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
]);
```

With **Drizzle ORM**, the query is implemented as follows:

Be careful with the `unitPrice` field. In **Sequelize** it's a `number` type, but in **Drizzle ORM** it's a `string` type, which can handle more than 16383 digits after the decimal point, unlike the `number` type.

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

In **Sequelize**, the response type is not strictly typed. For example, if you choose to include a relation or select only a few fields instead of all, these modifications will not be reflected in the response type.

```typescript copy filename="src/controllers/product.controller.ts"
import { Product } from '../db/models/product';
import { Supplier } from '../db/models/supplier';

const { id } = req.params;

const response = await Product.findByPk(id, {
  include: Supplier,
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

In **Drizzle ORM**, the response type will match precisely what is specified in the select object, so including the `supplier` relation is fully type-safe.

```typescript
// response type
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

In **Sequelize**, the result is not type-safe as it doesn't specify the fields you want to select.

```typescript copy filename="src/controllers/product.controller.ts"
import { Product } from '../db/models/product';
import { Op } from 'sequelize';

const { rows, count } = await Product.findAndCountAll({
  limit: 10,
  offset: 0,
  attributes: ['id', 'name', 'unitPrice', 'unitsInStock'],
  where: {
    name: {
      [Op.iLike]: `%test%`,
    },
  },
});
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

In **Drizzle ORM**, the result is strictly type-safe, meaning the fields you select are explicitly defined.

```typescript
// response type
const response: {
  id: number;
  name: string;
  unitPrice: string;
  unitsInStock: number;
}[]
```

3. `GET /orders/:id`

In **Sequelize** you can't implement complicated queries with methods like `findByPk`. So, you have to use raw queries, which are not type-safe as well.

We want to select `id`, `orderDate` and `shipCountry` fields from `orders` table and by using `aggregation functions` sum `totalPrice` of order, `totalQuantity` of products in the order and count `totalProducts` in the order.

```typescript copy filename="src/controllers/order.controller.ts"
import { sequelize } from '../db/db';
import { QueryTypes } from 'sequelize';

const { id } = req.params;

const response = await sequelize.query(
      `
SELECT 
  orders.id,
  orders."orderDate",
  orders."shipCountry",
  SUM(products."unitPrice" * order_details.quantity)::float AS "totalPrice",
  SUM(order_details.quantity)::int AS "totalQuantity",
  COUNT(order_details."productId")::int AS "totalProducts"
FROM orders
LEFT JOIN order_details ON orders.id = order_details."orderId"
LEFT JOIN products ON order_details."productId" = products.id
WHERE orders.id = :orderId
GROUP BY orders.id
`,
      {
        replacements: { orderId: id },
        type: QueryTypes.SELECT,
      },
    );
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
import { Supplier } from '../db/models/supplier';

const { id } = req.params;

const supplier = await Supplier.findByPk(1);
if (!supplier) {
  throw new Error('Supplier not found');
}

supplier.set({
  city: 'TestCity1Updated',
  country: 'TestCountry1Updated',
});

await supplier.save();
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
import { Order } from '../db/models/order';
import { OrderDetail } from '../db/models/order-detail';
import { sequelize } from '../db/db';

const { id } = req.params;

try {
  const order = await Order.findByPk(id);
  if (!order) {
    throw new Error('Order not found');
  }

  await sequelize.transaction(async (t) => {
    await OrderDetail.destroy({
      where: {
        orderId: id,
      },
      transaction: t,
    });

    await order.destroy({ transaction: t });
  });
} catch (e) {
  console.error(e);
}
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
