---
title: "Drizzle ORM v0.17.4 release"
pubDate: 2023-02-02T19:04:47Z
version: "0.17.4"
description: "Introduces the SQLite Proxy driver for routing database calls through custom logic, including serverless applications."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.17.4)

We have released [SQLite Proxy Driver](https://github.com/drizzle-team/drizzle-orm/tree/main/examples/sqlite-proxy)

---

Perfect way to setup custom logic for database calls instead of predefined drivers

Should work well with serverless apps 🚀

```typescript
// Custom Proxy HTTP driver
  const db = drizzle(async (sql, params, method) => {
    try {
      const rows = await axios.post('http://localhost:3000/query', { sql, params, method });

      return { rows: rows.data };
    } catch (e: any) {
      console.error('Error from sqlite proxy server: ', e.response.data)
      return { rows: [] };
    }
  });
```

> For more example you can check [full documentation](https://github.com/drizzle-team/drizzle-orm/tree/main/examples/sqlite-proxy)

