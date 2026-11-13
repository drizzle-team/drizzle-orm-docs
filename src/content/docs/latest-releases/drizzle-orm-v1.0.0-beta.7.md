---
title: "Drizzle ORM v1.0.0-beta.7 release"
pubDate: 2025-12-31T14:18:38Z
version: "1.0.0-beta.7"
description: "Protects custom migration tables during push, fixes migration prefixes and MSSQL foreign key schemas, and handles empty findFirst() results."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/v.1.0.0-beta.7)

**Bug fixes**

- [[BUG]: Drizzle-kit does not consider prefix when generating migrations](https://github.com/drizzle-team/drizzle-orm/issues/5143)
- [[BUG]: drizzle-kit push removes migration table (doesn't recognize custom migration table name)](https://github.com/drizzle-team/drizzle-orm/issues/5083)
- [[BUG]:Drizzle pull generate invalid autosummarize](https://github.com/drizzle-team/drizzle-orm/issues/5196)
- [[BUG]: drizzle-kit pull generated wrong syntax](https://github.com/drizzle-team/drizzle-orm/issues/5193)
- [[BUG]: [drizzle-kit] MSSQL - Foreign Key Constraints Generated via drizzle-kit generate are not scoped to the Correct Schema](https://github.com/drizzle-team/drizzle-orm/issues/5182)
- [[BUG]: findFirst fails with TypeError: null is not an object (evaluating 'row[selectionItem.key]') if no results are found](https://github.com/drizzle-team/drizzle-orm/issues/5189)

- **Push** command now respects a custom migration schema or/and table from ***drizzle.config*** and ignores them during the execution

