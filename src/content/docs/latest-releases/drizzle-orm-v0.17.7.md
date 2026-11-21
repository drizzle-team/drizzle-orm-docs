---
title: "Drizzle ORM v0.17.7 release"
pubDate: 2023-02-05T16:18:51Z
version: "0.17.7"
description: "Fixes SQLite returning().get() results and SQLite Proxy response mapping, with an updated proxy server example."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.17.7)

- Fix [#158](https://github.com/drizzle-team/drizzle-orm/issues/158) issue. Method `.returning()` was working incorrectly with `.get()` method in sqlite dialect
- Fix SQLite Proxy driver mapping bug
- Add test cases for SQLite Proxy driver
- Add additional example for SQLite Proxy Server setup to handle `.get()` as well

