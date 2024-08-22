import { type IData } from "../types";
import data from "../data/demoData.json";
import dataMapper from "@components/LandingPage/Benchmark/utils/dataMapper.ts";

const getDemoBenchmarkData = (): null | {
  drizzleData: IData[];
  compareData: IData[];
} => {
  return {
    drizzleData: dataMapper(data["drizzle-bun"]),
    compareData: dataMapper(data["prisma-bun"]),
  };
};

export default getDemoBenchmarkData;
