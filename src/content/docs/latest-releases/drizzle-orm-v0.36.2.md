---
title: "Drizzle ORM v0.36.2 release"
pubDate: 2024-11-14T10:57:31Z
version: "0.36.2"
description: "Expands types accepted by pattern-matching operators and fixes Expo SQLite, generated columns and MySQL returning IDs."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.36.2)

## New Features

- [Support more types in like, notLike, ilike and notIlike expressions](https://github.com/drizzle-team/drizzle-orm/pull/2805)


## Bug and typo fixes

- Fixed typos in repository: thanks @armandsalle, @masto, @wackbyte, @Asher-JH, @MaxLeiter

- [Fixed .generated behavior with non-strict tsconfig](https://github.com/drizzle-team/drizzle-orm/pull/3542)
- [Fix Drizzle ORM for expo-sqlite](https://github.com/drizzle-team/drizzle-orm/pull/3197)
- [Fixed lack of schema name on columns in sql](https://github.com/drizzle-team/drizzle-orm/pull/3531)
- [fix: Adjust neon http driver entity kind](https://github.com/drizzle-team/drizzle-orm/pull/3424)
- [Export PgIntegerBuilderInitial type](https://github.com/drizzle-team/drizzle-orm/pull/2846)
- [[MySQL] Correct $returningId() implementation to correctly store selected fields](https://github.com/drizzle-team/drizzle-orm/pull/2975)

