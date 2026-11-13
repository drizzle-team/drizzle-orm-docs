---
title: "Drizzle ORM v0.25.0 release"
pubDate: 2023-04-23T12:51:09Z
version: "0.25.0"
description: "Adds ESM support alongside CommonJS, minified builds and source maps. SQL helpers now import directly from drizzle-orm."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/0.25.0)

## ESM support

- 🎉 Added ESM support! You can now use `drizzle-orm` in both ESM and CJS environments.
- 🎉 Added code minification and source maps.
- ❗ Removed several nested import paths. Most notably, everything from `drizzle-orm/sql` and `drizzle-orm/expressions` should now be imported from `drizzle-orm` instead.

