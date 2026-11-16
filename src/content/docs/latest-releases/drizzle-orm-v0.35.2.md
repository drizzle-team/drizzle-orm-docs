---
title: "Drizzle ORM v0.35.2 release"
pubDate: 2024-10-18T11:33:49Z
version: "0.35.2"
description: "Fixes driver imports across ESM, CommonJS and Cloudflare environments, and restores the PostgreSQL transaction client type."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.35.2)

- Fix issues with importing in several environments after updating the Drizzle driver implementation

We've added approximately 240 tests to check the ESM and CJS builds for all the drivers we have. You can check them [here](https://github.com/drizzle-team/drizzle-orm/tree/main/integration-tests/js-tests/driver-init)

- Fixed [[BUG]: Type Error in PgTransaction Missing $client Property After Upgrading to drizzle-orm@0.35.1](https://github.com/drizzle-team/drizzle-orm/issues/3140)
- Fixed [[BUG]: New critical Build error drizzle 0.35.0 deploying on Cloudflare ](https://github.com/drizzle-team/drizzle-orm/issues/3137)

