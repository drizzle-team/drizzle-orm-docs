---
title: "Drizzle ORM v1.0.0-beta.4 release"
pubDate: 2025-12-23T17:26:41Z
version: "1.0.0-beta.4"
description: "Fixes migration ordering on Linux, silent migration generation failures and incorrect AWS Data API selection during checks."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-beta.4)

Regression issues fixed(from `-beta.x` releases)

- [[BUG]: migrations.sort in migrator.js does nothing - migrations run in wrong order on Linux](https://github.com/drizzle-team/drizzle-orm/issues/5123)
- [[BUG]: drizzle-kit generate not working without error](https://github.com/drizzle-team/drizzle-orm/issues/5124)

Issues fixed(from latest tag)

- [[BUG]: drizzle-kit check wrongly tries to use AWS Data API](https://github.com/drizzle-team/drizzle-orm/issues/4775)

