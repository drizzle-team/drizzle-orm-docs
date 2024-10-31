---
title: Cloudflare D1 HTTP API with Drizzle Kit
slug: d1-http-with-drizzle-kit
---

import Prerequisites from "@mdx/Prerequisites.astro";

<Prerequisites>
- [Drizzle Kit](/docs/kit-overview)
- [Drizzle Studio](/docs/kit-overview#drizzle-studio)
- [Drizzle Chrome Extension](https://chromewebstore.google.com/detail/drizzle-studio/mjkojjodijpaneehkgmeckeljgkimnmd)
- You should have installed `drizzle-kit@0.21.3` or higher
- You should have [Cloudflare account](https://dash.cloudflare.com/login), deployed [D1 database](https://developers.cloudflare.com/d1/) and token with D1 edit permissions
</Prerequisites>

To use Drizzle kit with Cloudflare D1 HTTP API, you need to configure the `drizzle.config.ts` file like this:

```ts copy filename="drizzle.config.ts" {7, 9-11}
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
    token: process.env.CLOUDFLARE_D1_TOKEN!,
  },
});
```

You can find `accountId`, `databaseId` and `token` in [Cloudflare dashboard](https://dash.cloudflare.com/login?).

1. To get `accountId` go to **Workers & Pages** -> **Overview** -> copy **Account ID** from the right sidebar.
2. To get `databaseId` open D1 database you want to connect to and copy **Database ID**.
3. To get `token` go to **My profile** -> **API Tokens** and create token with D1 edit permissions.

After you have configured `drizzle.config.ts` file, Drizzle Kit lets you run `migrate`, `push`, `introspect` and `studio` commands using Cloudflare D1 HTTP API.

You can also use [Drizzle Chrome Extension](https://chromewebstore.google.com/detail/drizzle-studio/mjkojjodijpaneehkgmeckeljgkimnmd) to browse Cloudflare D1 database directly in their admin panel.


