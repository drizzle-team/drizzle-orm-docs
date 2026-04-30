#!/usr/bin/env node
// Aggregates k6 parquet + CPU csv files in ./out into a single data.json
// keyed by file stem. Pairs `<stem>.parquet` with `cpu-usage-<stem>.csv`.
// Requires the `duckdb` CLI on PATH.

import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const outDir = resolve(repoRoot, process.argv[2] ?? "out");
const outFile = join(outDir, "data.json");

if (!existsSync(outDir)) {
  console.error(`Directory not found: ${outDir}`);
  process.exit(1);
}

const stems = readdirSync(outDir)
  .filter((f) => f.endsWith(".parquet"))
  .map((f) => f.slice(0, -".parquet".length));

if (stems.length === 0) {
  console.error(`No .parquet files in ${outDir}`);
  process.exit(1);
}

const sqlFor = (parquetPath, csvPath) => {
  const cpuCte = csvPath
    ? `cpu AS (
         SELECT CAST(timestamp / 1000 AS BIGINT) AS time_sec,
                AVG(core1) AS core1, AVG(core2) AS core2,
                AVG(core3) AS core3, AVG(core4) AS core4
         FROM read_csv_auto('${csvPath}')
         GROUP BY time_sec
       )`
    : `cpu AS (SELECT NULL::BIGINT AS time_sec, NULL::DOUBLE AS core1,
              NULL::DOUBLE AS core2, NULL::DOUBLE AS core3, NULL::DOUBLE AS core4 WHERE false)`;

  return `
    WITH src AS (
      SELECT CAST(timestamp AS BIGINT) AS ts, metric_name, metric_value
      FROM read_parquet('${parquetPath}')
    ),
    per_sec AS (
      SELECT ts AS time_sec,
        CAST(SUM(CASE WHEN metric_name='http_reqs' THEN 1 ELSE 0 END) AS INTEGER) AS reqs_per_sec,
        CAST(SUM(CASE WHEN metric_name='http_req_failed' AND metric_value=1 THEN 1 ELSE 0 END) AS INTEGER) AS fail_reqs_per_sec,
        AVG(CASE WHEN metric_name='http_req_duration' THEN metric_value END) AS latency_average,
        QUANTILE_CONT(CASE WHEN metric_name='http_req_duration' THEN metric_value END, 0.90) AS latency_90,
        QUANTILE_CONT(CASE WHEN metric_name='http_req_duration' THEN metric_value END, 0.95) AS latency_95,
        QUANTILE_CONT(CASE WHEN metric_name='http_req_duration' THEN metric_value END, 0.99) AS latency_99
      FROM src
      GROUP BY ts
    ),
    ${cpuCte}
    SELECT
      strftime(to_timestamp(per_sec.time_sec) AT TIME ZONE 'UTC',
               '%Y-%m-%dT%H:%M:%S.000Z') AS time,
      COALESCE(cpu.core1, 0)              AS core1,
      COALESCE(cpu.core2, 0)              AS core2,
      COALESCE(cpu.core3, 0)              AS core3,
      COALESCE(cpu.core4, 0)              AS core4,
      per_sec.reqs_per_sec                AS reqs_per_sec,
      per_sec.fail_reqs_per_sec           AS fail_reqs_per_sec,
      COALESCE(per_sec.latency_95, 0)     AS latency_95,
      COALESCE(per_sec.latency_90, 0)     AS latency_90,
      COALESCE(per_sec.latency_99, 0)     AS latency_99,
      COALESCE(per_sec.latency_average, 0) AS latency_average
    FROM per_sec LEFT JOIN cpu USING (time_sec)
    ORDER BY per_sec.time_sec;
  `;
};

const result = {};
for (const stem of stems) {
  const parquet = join(outDir, `${stem}.parquet`);
  const csv = join(outDir, `cpu-usage-${stem}.csv`);
  const csvPath = existsSync(csv) ? csv : null;
  if (!csvPath) {
    console.warn(`[warn] no cpu csv for ${stem} (looked for cpu-usage-${stem}.csv) — emitting zeros`);
  }

  const sql = sqlFor(parquet, csvPath);
  const json = execFileSync("duckdb", ["-json", "-c", sql], {
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  result[stem] = JSON.parse(json);
  console.log(`[ok] ${stem}: ${result[stem].length} rows`);
}

writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log(`\nWrote ${outFile}`);
console.log(`Merge keys you produced: ${Object.keys(result).join(", ")}`);
console.log(
  "\nNext: copy/merge these keys into",
  "src/ui/components/landing/benchmark/data/data.json",
  "and update variants in getBenchmarkData.ts as needed.",
);
