---
title: Vector similarity search with pgvector extension
slug:  vector-similarity-search
---

import Section from "@mdx/Section.astro";
import IsSupportedChipGroup from "@mdx/IsSupportedChipGroup.astro";
import Prerequisites from "@mdx/Prerequisites.astro";
import CodeTabs from '@mdx/CodeTabs.astro';
import CodeTab from '@mdx/CodeTab.astro';
import Npm from "@mdx/Npm.astro";

<Prerequisites>
- Get started with [PostgreSQL](/docs/get-started-postgresql)
- [Select statement](/docs/select)
- [Indexes](/docs/indexes-constraints#indexes)
- [sql operator](/docs/sql)
- [pgvector extension](/docs/extensions/pg#pg_vector)
- [Drizzle kit](/docs/kit-overview)
- You should have installed the `openai` [package](https://www.npmjs.com/package/openai) for generating embeddings. 
<Npm>
  openai
</Npm>
- You should have `drizzle-orm@0.31.0` and `drizzle-kit@0.22.0` or higher.  
</Prerequisites>

To implement vector similarity search in PostgreSQL with Drizzle ORM, you can use the `pgvector` extension. This extension provides a set of functions to work with vectors and perform similarity search.

As for now, Drizzle doesn't create extension automatically, so you need to create it manually. Create an empty migration file and add SQL query:

<Section>
```bash
npx drizzle-kit generate --custom
```

```sql
CREATE EXTENSION vector;
```
</Section>

To perform similarity search, you need to create a table with a vector column and an `HNSW` or `IVFFlat` index on this column for better performance:

<CodeTabs items={["schema.ts", "migration.sql"]}>
  <CodeTab>
  ```ts copy {10, 13}
  import { index, pgTable, serial, text, vector } from 'drizzle-orm/pg-core';

  export const guides = pgTable(
    'guides',
    {
      id: serial('id').primaryKey(),
      title: text('title').notNull(),
      description: text('description').notNull(),
      url: text('url').notNull(),
      embedding: vector('embedding', { dimensions: 1536 }),
    },
    (table) => [
      index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops')),
    ]
  );
  ```
  </CodeTab>
  ```sql
  CREATE TABLE IF NOT EXISTS "guides" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" text NOT NULL,
    "description" text NOT NULL,
    "url" text NOT NULL,
    "embedding" vector(1536)
  );
  --> statement-breakpoint
  CREATE INDEX IF NOT EXISTS "embeddingIndex" ON "guides" USING hnsw (embedding vector_cosine_ops);
  ```
</CodeTabs>

The `embedding` column is used to store vector embeddings of the guide descriptions. Vector embedding is just a representation of some data. It converts different types of data into a common format (vectors) that language models can process. This allows us to perform mathematical operations, such as measuring the distance between two vectors, to determine how similar or different two data items are.

In this example we will use `OpenAI` model to generate [embeddings](https://platform.openai.com/docs/guides/embeddings) for the description:
```ts copy
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'],
});

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\n', ' ');

  const { data } = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input,
  });

  return data[0].embedding;
};
```

To search for similar guides by embedding, you can use `gt` and `sql` operators with `cosineDistance` function to calculate the similarity between the `embedding` column and the generated embedding:

<Section>
```ts copy {10,15,16}
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
import { generateEmbedding } from './embedding';
import { guides } from './schema';

const db = drizzle(...);

const findSimilarGuides = async (description: string) => {
  const embedding = await generateEmbedding(description);

  const similarity = sql<number>`1 - (${cosineDistance(guides.embedding, embedding)})`;

  const similarGuides = await db
    .select({ name: guides.title, url: guides.url, similarity })
    .from(guides)
    .where(gt(similarity, 0.5))
    .orderBy((t) => desc(t.similarity))
    .limit(4);

  return similarGuides;
};
```

```ts
const description = 'Guides on using Drizzle ORM with different platforms';

const similarGuides = await findSimilarGuides(description);
```

```json
[
  {
    name: 'Drizzle with Turso',
    url: '/docs/tutorials/drizzle-with-turso',
    similarity: 0.8642314333984994
  },
  {
    name: 'Drizzle with Supabase Database',
    url: '/docs/tutorials/drizzle-with-supabase',
    similarity: 0.8593631126014918
  },
  {
    name: 'Drizzle with Neon Postgres',
    url: '/docs/tutorials/drizzle-with-neon',
    similarity: 0.8541051184461372
  },
  {
    name: 'Drizzle with Vercel Edge Functions',
    url: '/docs/tutorials/drizzle-with-vercel-edge-functions',
    similarity: 0.8481551084241092
  }
]
```
</Section>
