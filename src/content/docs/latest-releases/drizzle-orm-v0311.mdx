---
title: DrizzleORM v0.31.1 release
pubDate: 2024-06-04
description: React Live Queries 🎉
---

# New Features

## Live Queries 🎉

> ### For a full explanation about Drizzle + Expo welcome to [discussions](https://github.com/drizzle-team/drizzle-orm/discussions/2447)

As of `v0.31.1` Drizzle ORM now has native support for Expo SQLite Live Queries!
We've implemented a native `useLiveQuery` React Hook which observes necessary database changes and automatically re-runs database queries. It works with both SQL-like and Drizzle Queries:

```tsx
import { useLiveQuery, drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import { users } from './schema';
import { Text } from 'react-native';

const expo = openDatabaseSync('db.db', { enableChangeListener: true }); // <-- enable change listeners
const db = drizzle(expo);

const App = () => {
  // Re-renders automatically when data changes
  const { data } = useLiveQuery(db.select().from(users));

  // const { data, error, updatedAt } = useLiveQuery(db.query.users.findFirst());
  // const { data, error, updatedAt } = useLiveQuery(db.query.users.findMany());


  return <Text>{JSON.stringify(data)}</Text>;
};

export default App;
```

We've intentionally not changed the API of ORM itself to stay with conventional React Hook API, so we have `useLiveQuery(databaseQuery)` as opposed to `db.select().from(users).useLive()` or `db.query.users.useFindMany()`

We've also decided to provide `data`, `error` and `updatedAt` fields as a result of hook for concise explicit error handling following practices of `React Query` and `Electric SQL`