---
title: "Drizzle ORM v0.45.2 release"
pubDate: 2026-03-27T17:06:36Z
version: "0.45.2"
description: "Fixes sql.identifier() and sql.as() escaping in Drizzle ORM 0.45.2 to address a potential SQL injection vulnerability."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.45.2)

- Fixed `sql.identifier()`, `sql.as()` escaping issues. Previously all the values passed to this functions were not properly escaped
causing a possible SQL Injection (CWE-89) vulnerability

Thanks to @EthanKim88, @0x90sh and @wgoodall01 for reaching out to us with a reproduction and suggested fix

