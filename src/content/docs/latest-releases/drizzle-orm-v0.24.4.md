---
title: "Drizzle ORM v0.24.4 release"
pubDate: 2023-04-19T19:10:10Z
version: "0.24.4"
description: "Fixes nested PostgreSQL arrays and undefined insert/update values, improves empty insert errors, and removes spread arguments from values()."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.24.4)

- 🐛 Added verbose error when .values() is called without values (#441)
- 🐛 Fixed nested PG arrays mapping (#460)
- ❗ Removed spread syntax in .values() (#269)
- 🐛 Fixed passing undefined as field value to insert/update (#375)

