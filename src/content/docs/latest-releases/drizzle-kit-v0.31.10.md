---
title: "Drizzle Kit v0.31.10 release"
pubDate: 2026-03-17T09:31:42Z
version: "0.31.10"
description: "Switches to the tsx loader for ESM and CommonJS compatibility and adds native Bun and Deno startup support."
---

[View this release on GitHub](https://github.com/drizzle-team/drizzle-orm/releases/tag/drizzle-kit%400.31.10)

- Updated to `hanji@0.0.8` - native bun `stringWidth`, `stripANSI` support, errors for non-TTY environments  
- We've migrated away from `esbuild-register` to `tsx` loader, it will now allow to use `drizzle-kit` seamlessly with both `ESM` and `CJS` modules  
- We've also added native `Bun` and `Deno` launch support, which will not trigger `tsx` loader and utilise native `bun` and `deno` imports capabilities and faster startup times

