import { type IData, type IParams } from "../types";
import data from "../data/data.json";
import dataMapper from "@components/landing/benchmark/utils/dataMapper";

const variants = [
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-22",
    joins: false,
    drizzleData: data["drizzle-node-22"],
    compareData: data["prisma-node-22"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-18",
    joins: false,
    drizzleData: data["drizzle-node-18"],
    compareData: data["prisma-node-18"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "bun",
    joins: false,
    drizzleData: data["drizzle-bun"],
    compareData: data["prisma-bun"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-22",
    joins: true,
    drizzleData: data["drizzle-node-22"],
    compareData: data["prisma-joins-node-22"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-18",
    joins: true,
    drizzleData: data["drizzle-node-18"],
    compareData: data["prisma-joins-node-18"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "bun",
    joins: true,
    drizzleData: data["drizzle-bun"],
    compareData: data["prisma-joins-bun"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-20",
    joins: false,
    drizzleData: data["drizzle-node-20"],
    compareData: data["prisma-node-20"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    runtime: "node-20",
    joins: true,
    drizzleData: data["drizzle-node-20"],
    compareData: data["prisma-joins-node-20"],
  },
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
