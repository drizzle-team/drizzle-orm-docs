import Callout from '@mdx/Callout.astro';
import CodeTabs from '@mdx/CodeTabs.astro';
import YoutubeCards from '@mdx/YoutubeCards.astro';

# Drizzle ORM  
> Drizzle is a good friend who's there for you when necessary and doesn't bother when you need some space.

Drizzle ORM is a headless TypeScript ORM with a head. 🐲

It looks and feels simple, performs on day _1000_ of your project, 
lets you do things your way, and is there when you need it.  

**It's the only ORM with both [relational](/docs/rqb) and [SQL-like](/docs/select) query APIs**, 
providing you the best of both worlds when it comes to accessing your relational data. 
Drizzle is lightweight, performant, typesafe, non-lactose, gluten-free, sober, flexible and **serverless-ready by design**.
Drizzle is not just a library, it's an experience. 🤩

[![Drizzle bestofjs](@/assets/images/bestofjs.jpg)](https://bestofjs.org/projects/drizzle-orm)

## Headless ORM? 
First and foremost, Drizzle is a library and a collection of complementary opt-in tools. 

**ORM** stands for _object relational mapping_, and developers tend to call Django-like or Spring-like tools an ORM. 
We truly believe it's a misconception based on legacy nomenclature, and we call them **data frameworks**.

<Callout type="error" emoji="️💔">
  With data frameworks you have to build projects **around them** and not **with them**.
</Callout>

**Drizzle** lets you build your project the way you want, without interfering with your project or structure. 

Using Drizzle you can define and manage database schemas in TypeScript, access your data in a SQL-like 
or relational way, and take advantage of opt-in tools 
to push your developer experience _through the roof_. 🤯 

## Why SQL-like?
**If you know SQL, you know Drizzle.**

Other ORMs and data frameworks tend to deviate/abstract you away from SQL, which 
leads to a double learning curve: needing to know both SQL and the framework's API.  

Drizzle is the opposite. 
We embrace SQL and built Drizzle to be SQL-like at its core, so you can have zero to no 
learning curve and access to the full power of SQL.  

We bring all the familiar **[SQL schema](/docs/sql-schema-declaration)**, **[queries](/docs/select)**, 
**[automatic migrations](/docs/migrations)** and **[one more thing](/docs/rqb)**. ✨

<CodeTabs items={["index.ts", "schema.ts", "migration.sql"]}>
```typescript copy
// Access your data
await db
	.select()
	.from(countries)
	.leftJoin(cities, eq(cities.countryId, countries.id))
	.where(eq(countries.id, 10))
```
```typescript copy
// manage your schema
export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  countryId: integer('country_id').references(() => countries.id),
});
```
```sql
-- generate migrations
CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256)
);

CREATE TABLE IF NOT EXISTS "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"country_id" integer
);

ALTER TABLE "cities" ADD CONSTRAINT "cities_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE no action ON UPDATE no action;
```
</CodeTabs>

## Why not SQL-like?
We're always striving for a perfectly balanced solution, and while SQL-like does cover 100% of the needs, 
there are certain common scenarios where you can query data in a better way.  

We've built the **[Queries API](/docs/rqb)** for you, so you can fetch relational nested data from the database 
in the most convenient and performant way, and never think about joins and data mapping.  

**Drizzle always outputs exactly 1 SQL query.** Feel free to use it with serverless databases and never worry about performance or roundtrip costs!

```ts
const result = await db.query.users.findMany({
	with: {
		posts: true
	},
});
```

## Serverless?
<Callout type="info" emoji="🥳">
  The best part is no part. **Drizzle has exactly 0 dependencies!**
</Callout>


![Drizzle is slim an Serverless ready](@/assets/images/drizzle31kb.jpg)
  
Drizzle ORM is dialect-specific, slim, performant and serverless-ready **by design**.  

We've spent a lot of time to make sure you have best-in-class SQL dialect support, including Postgres, MySQL, and others.

Drizzle operates natively through industry-standard database drivers. We support all major **[PostgreSQL](/docs/get-started-postgresql)**, **[MySQL](/docs/get-started-mysql)** or **[SQLite](/docs/get-started-sqlite)** drivers out there, and we're adding new ones **[really fast](https://twitter.com/DrizzleORM/status/1653082492742647811?s=20)**.  


## Welcome on board!
More and more companies are adopting Drizzle in production, experiencing immense benefits in both DX and performance.

**We're always there to help, so don't hesitate to reach out. We'll gladly assist you in your Drizzle journey!**

We have an outstanding **[Discord community](https://driz.link/discord)** and welcome all builders to our **[Twitter](https://twitter.com/drizzleorm)**.
  
Now go build something awesome with Drizzle and your **[PostgreSQL](/docs/get-started-postgresql)**, **[MySQL](/docs/get-started-mysql)** or **[SQLite](/docs/get-started-sqlite)** database. 🚀

### Video Showcase

{/* tRPC + NextJS App Router = Simple Typesafe APIs
Jack Herrington 19:17
https://www.youtube.com/watch?v=qCLV0Iaq9zU */}
{/* https://www.youtube.com/watch?v=qDunJ0wVIec */}
{/* https://www.youtube.com/watch?v=NZpPMlSAez0 */}

 {/* https://www.youtube.com/watch?v=-A0kMiJqQRY */}

<YoutubeCards cards={[
	{
		id: "vyU5mJGCJMw",
		title: "Full Drizzle Course for Beginners",
		description: "Code Genix",
		time: "1:37:39",
	},
	{
		id: "7-NZ0MlPpJA",
		title: "Learn Drizzle In 60 Minutes",
		description: "Web Dev Simplified",
		time: "56:09"
	},
	{
		id: "i_mAHOhpBSA",
		title: "Drizzle ORM in 100 Seconds",
		description: "Fireship",
		time: "2:55"
	},
	{
		id: "hIYNOiZXQ7Y",
		title: "Learn Drizzle ORM in 13 mins (crash course)",
		description: "Neon",
		time: "14:00"
	},
	{
		id: "4ZhtoOFKFP8",
		title: "Easiest Database Setup in Next.js&nbsp;14 with Turso&nbsp;&&nbsp;Drizzle",
		description: "Sam Meech-Ward",
		time: '38:08'
	}, 
	{
		id: "NfVELsEZFsA",
		title: "Next.js Project with Vercel, Neon, Drizzle, TailwindCSS, FlowBite and more!",
		description: "CodingEntrepreneurs",
		time: '5:46:28'
	}, 
	{
		id: "_SLxGYzv6jo",
		title: "I Have A New Favorite Database&nbsp;Tool",
		description: "Theo - t3.gg",
		time: '5:46'
	}, 
	{
		id: "Qo-RXkSwOtc",
		title: "Drizzle ORM First impressions - migrations, relations, queries!",
		description: "Marius Espejo",
		time: '33:52'
	},
	{
		id: "yXNEqyvA0OY",
		title: "I want to learn Drizzle ORM, so I'm starting another next14 project",
		description: "Web Dev Cody",
		time: "9:00"
	},
	{
		id: "h7vVhR-dFYo",
		title: "Picking an ORM is Getting Harder...",
		description: "Ben Davis",
		time: "5:18"
	},
	{
		id: "8met6WTk0mQ",
		title: "This New Database Tool is a Game-Changer",
		description: "Josh tried coding",
		time: "8:49"
	},
	{
		id: "woWW1T9DXEY",
		title: "My Favorite Database Tool Just Got EVEN Better",
		description: "Josh tried coding",
		time: "4:23"
	},
	{
		id: "A3l6YYkXzzg",
		title: "SaaS Notion Clone with Realtime cursors, Nextjs 13, Stripe, Drizzle ORM, Tailwind, Supabase, Sockets",
		description: "Web Prodigies",
		time: "11:41:46"
	},
	{
		id: "EQfaw5bDE1s",
		title: "SvelteKit + Drizzle Code Breakdown",
		description: "Ben Davis",
		time: "12:18"
	},
	{
		id: "b6VhN_HHDiQ",
		title: "Build a Multi-Tenanted, Role-Based Access Control System",
		description: "TomDoesTech",
		time: "2:01:29"
	},
	{
		id: "3tl9XCiQErA",
		title: "The Prisma killer is finally here",
		description: "SST",
		time: "5:42"
	},
	{
		id: "VQFjyEa8vGE",
		title: "Learning Drizzle ORM and working on a next14 project",
		description: "Web Dev Cody",
		time: "1:07:41"
	},
	{
		id: "5G0upg4sxgE",
		title: "This Trick Makes My Favorite Database Tool Even Better",
		description: "Josh tried coding",
		time: "6:01"
	},
	{
		id: "-JnEuvPmt-Q",
		title: "Effortless Auth in Next.js 14: Use Auth.js & Drizzle ORM for Secure Login",
		description: "Sam Meech-Ward",
		time: "26:29"
	},
]} />
