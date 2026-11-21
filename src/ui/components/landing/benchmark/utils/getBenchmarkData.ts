import { type IData, type IParams } from "../types";
import data from "../data/data.json";
import dataMapper from "@components/landing/benchmark/utils/dataMapper";

const base = {
  dbSize: "micro",
  projectType: "ecommerce",
  database: "postgres",
  joins: false,
} as const;

// 2026-11-20 runs, see scripts/configs.ts in drizzle-team/drizzle-benchmarks
const variants = [
  // Drizzle (runtime / driver) vs Go
  ...(
    [
      ["bun-1.4.4-drizzle", "bun14-drizzle"],
      ["bun-1.4.4-bun-sql", "bun14-bunsql"],
      ["bun-1.4.4-node-pg", "bun14-pg"],
      ["bun-1.3.13-drizzle", "bun13-drizzle"],
      ["bun-1.3.13-bun-sql", "bun13-bunsql"],
      ["bun-1.3.13-node-pg", "bun13-pg"],
      ["node-26-drizzle", "node26-drizzle"],
      ["node-26-node-pg", "node26-pg"],
      ["node-24-drizzle", "node24-drizzle"],
      ["node-24-node-pg", "node24-pg"],
    ] as const
  ).map(([runtime, run]) => ({
    ...base,
    orm: "go-20261120",
    runtime,
    drizzleData: data[`20112026:drizzle-${run}`],
    compareData: data["20112026:go"],
  })),
  // Drizzle on its own driver vs Prisma on node-postgres, same runtime
  ...(
    [
      ["bun-1.4.4", "bun14"],
      ["bun-1.3.13", "bun13"],
      ["node-26", "node26"],
      ["node-24", "node24"],
    ] as const
  ).flatMap(([runtime, rt]) => [
    {
      ...base,
      orm: "prisma-v8.0.0-rc.33-20261120",
      runtime,
      drizzleData: data[`20112026:drizzle-${rt}-drizzle`],
      compareData: data[`20112026:prisma8-${rt}`],
    },
    {
      ...base,
      orm: "prisma-v7.10.1-20261120",
      runtime,
      drizzleData: data[`20112026:drizzle-${rt}-drizzle`],
      compareData: data[`20112026:prisma7-${rt}`],
    },
  ]),
];

const getBenchmarkData = (
  params: IParams,
): null | { drizzleData: IData[]; compareData: IData[] } => {
  const { orm, dbSize, projectType, database, runtime, joins } = params;
  const foundVariants = variants.find(
    (path) =>
      path.orm === orm &&
      path.dbSize === dbSize &&
      path.projectType === projectType &&
      path.database === database &&
      path.joins === joins &&
      path.runtime === runtime,
  );
  if (!foundVariants) {
    return null;
  }

  return {
    drizzleData: dataMapper(foundVariants.drizzleData),
    compareData: dataMapper(foundVariants.compareData),
  };
};

export default getBenchmarkData;
