---
title: "Drizzle ORM v0.17.6 release"
pubDate: 2023-02-03T20:43:23Z
version: "0.17.6"
description: "Resolves circular dependencies in PostgreSQL and MySQL query building and moves AWS Data API typing logic into its dialect."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.17.6)

Fix circular dependency for query building on all pg and mysql drivers

Moved all aws data api typings specific logic to dialect from sql to prevent circular dependency issues

