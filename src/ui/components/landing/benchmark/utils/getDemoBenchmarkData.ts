import { type IData } from "../types";
import data from "../data/demoData.json";
import dataMapper from "@components/landing/benchmark/utils/dataMapper";

// what the landing page demo shows: the runs below, and the labels that go with them
export const demoSelection = {
  orm: "go-20261120",
  runtime: "bun-1.4.4-drizzle",
} as const;

const getDemoBenchmarkData =(): null | {
  drizzleData: IData[];
  compareData: IData[];
} => {
  return {
    drizzleData: dataMapper(data["20112026:drizzle-bun14-drizzle"]),
    compareData: dataMapper(data["20112026:go"]),
  };
};

export default getDemoBenchmarkData;
