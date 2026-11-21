---
title: "Drizzle Kit v0.31.1 release"
pubDate: 2025-05-03T12:09:18Z
version: "0.31.1"
description: "Fixes Gel introspection for extension schemas whose names contain double colons, such as ext::auth."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.31.1)

### Fixed `drizzle-kit pull` bugs when using Gel extensions.

Because Gel extensions create schema names containing `::` (for example, `ext::auth`), Drizzle previously handled these names incorrectly. Starting with this release, you can use Gel extensions without any problems. Here’s what you should do:

1. Enable extensions schemas in `drizzle.config.ts`

```ts
import  { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: 'gel',
  schemaFilter: ['ext::auth', 'public']
});
```

2. Run `drizzle-kit pull`

3. Done!

