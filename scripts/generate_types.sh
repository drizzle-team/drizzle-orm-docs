#!/bin/bash

cd "$(dirname "$(dirname "$0")")" || exit 1

PACKAGE_NAME=drizzle-orm
PACKAGE_VERSION=0.23.3
OUT_DIR=src/types

mkdir -p "$OUT_DIR" || exit 1
rm -rf drizzle-orm || exit 1
mkdir -p drizzle-orm || exit 1
cp -r ./node_modules/drizzle-orm/ drizzle-orm/ || exit 1

find drizzle-orm -name "index.d.ts" | xargs -I {} sh -c 'npx rollup --plugin rollup-plugin-dts --format=es --file="types/$(dirname {})/index.d.ts" -- "{}" || exit 1'
rm -rf drizzle-orm