export default `import { eq } from 'drizzle-orm/expressions';
import { drizzle } from 'drizzle-orm/node-postgres';
import { InferModel, integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql';
import { Pool } from 'pg';
 
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  fullName: text('full_name').notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  role: text<'user' | 'admin'>('role').default('user').notNull(),
  cityId: integer('city_id').references(() => cities.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
 
export type User = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, 'insert'>;
 
export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
});
 
export type City = InferModel<typeof cities>;
export type NewCity = InferModel<typeof cities, 'insert'>;
 
const pool = new Pool({
  connectionString: 'postgres://user:password@host:port/db',
});
 
const db = drizzle(pool);
 
// Insert
const newUser: NewUser = {
  fullName: 'John Doe',
  phone: '+123456789',
};
const insertedUsers /* : User */ = await db.insert(users).values(newUser).returning();
const insertedUser = insertedUsers[0]!;
 
const newCity: NewCity = {
  name: 'New York',
};
const insertedCities /* : City */ = await db.insert(cities).values(newCity).returning();
const insertedCity = insertedCities[0]!;
 
// Update
const updateResult /* : { updated: Date }[] */ = await db.update(users)
  .set({ cityId: insertedCity.id, updatedAt: new Date() })
  .where(eq(users.id, insertedUser.id))
  .returning({ updated: users.updatedAt });
 
// Select
const allUsers /* : User[] */ = await db.select(users);
 
// Select custom fields
const upperCaseNames /* : { id: number; name: string }[] */ = await db.select(users)
  .fields({
    id: users.id,
    name: sql\`upper(\${users.fullName})\`.as<string>(),
  });
 
// Joins
// You wouldn't BELIEVE how SMART the result type is! 😱
const allUsersWithCities = await db.select(users)
  .fields({
    id: users.id,
    name: users.fullName,
    city: {
      id: cities.id,
      name: cities.name,
    },
  })
  .leftJoin(cities, eq(users.cityId, cities.id));
 
// Delete
const deletedNames /* : { name: string }[] */ = await db.delete(users)
  .where(eq(users.id, insertedUser.id))
  .returning({ name: users.fullName });`;
