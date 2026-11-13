---
title: "Drizzle ORM v0.35.3 release"
pubDate: 2024-10-21T20:50:03Z
version: "0.35.3"
description: "Adds dedicated libSQL driver modules for Node.js, browsers, HTTP, WebSockets, local SQLite and the experimental WASM client."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.35.3)

# New LibSQL driver modules

Drizzle now has native support for all `@libsql/client` driver variations:

1. `@libsql/client` - defaults to node import, automatically changes to web if target or platform is set for bundler, e.g. `esbuild --platform=browser`

```ts
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL, 
  authToken: process.env.DATABASE_AUTH_TOKEN 
}});
```

2. `@libsql/client/node`  node compatible module, supports :memory:, file, wss, http and turso connection protocols

```ts
import { drizzle } from 'drizzle-orm/libsql/node';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL, 
  authToken: process.env.DATABASE_AUTH_TOKEN 
}});
```

3. `@libsql/client/web`  module for fullstack web frameworks like next, nuxt, astro, etc.

```ts
import { drizzle } from 'drizzle-orm/libsql/web';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL, 
  authToken: process.env.DATABASE_AUTH_TOKEN 
}});
```

4. `@libsql/client/http`  module for http and https connection protocols

```ts
import { drizzle } from 'drizzle-orm/libsql/http';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL, 
  authToken: process.env.DATABASE_AUTH_TOKEN 
}});
```

5. `@libsql/client/ws`  module for ws and wss connection protocols

```ts
import { drizzle } from 'drizzle-orm/libsql/ws';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL, 
  authToken: process.env.DATABASE_AUTH_TOKEN 
}});
```

6. `@libsql/client/sqlite3`  module for :memory: and file connection protocols

```ts
import { drizzle } from 'drizzle-orm/libsql/wasm';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL, 
  authToken: process.env.DATABASE_AUTH_TOKEN 
}});
```

7. `@libsql/client-wasm`  Separate experimental package for WASM

```ts
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle({ connection: {
  url: process.env.DATABASE_URL, 
  authToken: process.env.DATABASE_AUTH_TOKEN 
}});
```

