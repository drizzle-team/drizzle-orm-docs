import { type IData, type IParams } from "../types";
import data from "../data/data.json";
import dataMapper from "@components/LandingPage/Benchmark/utils/dataMapper.ts";

const variants = [
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    drizzleData: data["drizzle-node"],
    compareData: data["prisma-node"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    drizzleData: data["drizzle-node"],
    compareData: data["prisma-node"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    drizzleData: data["drizzle-node"],
    compareData: data["prisma-node"],
  },
  {
    orm: "prisma",
    dbSize: "micro",
    projectType: "ecommerce",
    database: "postgres",
    drizzleData: data["drizzle-node"],
    compareData: data["prisma-node"],
  },
];

const getBenchmarkData = (
  params: IParams,
): null | { drizzleData: IData[]; compareData: IData[] } => {
  const { orm, dbSize, projectType, database } = params;
  const foundVariants = variants.find(
    (path) =>
      path.orm === orm &&
      path.dbSize === dbSize &&
      path.projectType === projectType &&
      path.database === database,
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
