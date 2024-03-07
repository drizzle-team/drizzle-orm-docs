---
title: DrizzleORM v0.28.5 release
pubDate: 2023-08-24 12:00:00
description: Fixed incorrect OpenTelemetry type import that caused a runtime error.
---

## Fixes

- Fixed incorrect OpenTelemetry type import that caused a runtime error

The OpenTelemetry logic currently present in the ORM isn't meant to be used by Drizzle and no stats have ever been collected by Drizzle using drizzle-orm. OpenTelemetry is simply a protocol. If you take a look at the actual code that utilizes it in drizzle-orm, it simply uses the tracer to collect the query stats and doesn't send it anywhere. It was designed for the ORM users to be able to send those stats to their own telemetry consumers.

The important thing is - the OpenTelemetry logic is disabled on the current version. It literally does nothing. We experimented with it at some point in the past, but disabled it before the release.

As to the reason of the issue in the last release: it happened because of an incorrect type import on [this line](https://github.com/drizzle-team/drizzle-orm/blob/594e96538e588fee5748e372884dbaf32c331524/drizzle-orm/src/tracing.ts#L1). We've used `import { type ... }` syntax instead of `import type { ... }`, which resulted in the `import '@opentelemetry/api'` line leaking to the runtime.
