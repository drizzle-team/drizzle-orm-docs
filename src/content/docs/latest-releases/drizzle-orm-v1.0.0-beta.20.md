---
title: "Drizzle ORM v1.0.0-beta.20 release"
pubDate: 2026-03-27T17:17:34Z
version: "1.0.0-beta.20"
description: "Fixes identifier and alias escaping in SQL helpers to address a potential SQL injection vulnerability."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-beta.20)

- Fixed `sql.identifier()`, `sql.as()` escaping issues. Previously all the values passed to this functions were not properly escaped
causing a possible SQL Injection (CWE-89) vulnerability

Thanks to @EthanKim88, @0x90sh and @wgoodall01 for reaching out to us with a reproduction and suggested fix

