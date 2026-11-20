export interface IData {
  time: number;
  latency: {
    avg: number;
    p90: number;
    p95: number;
  };
  cpus: {
    cpu1: number;
    cpu2: number;
    cpu3: number;
    cpu4: number;
    cpus: number;
  };
  reqs: number;
  vus?: number;
  failReqs: number;
  totalFailReqs: number;
  totalReqs: number;
  avg: {
    p95: number;
    cpus: number;
    latency: number;
    reqs: number;
  };
  max: {
    reqs: number;
    latency: number;
  };
}

export interface IJSONData {
  time: string;
  core1: number | null;
  core2: number | null;
  core3: number | null;
  core4: number | null;
  reqs_per_sec: number;
  fail_reqs_per_sec: number;
  latency_95: number;
  latency_90: number;
  latency_99: number;
  latency_average: number;
  vus?: number;
}

export interface IParams {
  orm:
    | "go-20261120"
    | "prisma-v8.0.0-rc.33-20261120"
    | "prisma-v7.10.1-20261120";
  dbSize: "micro" | "small" | "medium" | "large" | "huge" | "extreme";
  projectType: "ecommerce" | "social" | "geo" | "analytics";
  database:
    | "postgres"
    | "mysql"
    | "sqlite"
    | "serverless_postgres"
    | "serverless_mysql"
    | "serverless_sqlite";
  runtime:
    | "bun-1.4.4-drizzle"
    | "bun-1.4.4-bun-sql"
    | "bun-1.4.4-node-pg"
    | "bun-1.4.4"
    | "bun-1.3.13-drizzle"
    | "bun-1.3.13"
    | "node-26-drizzle"
    | "node-26-node-pg"
    | "node-26"
    | "node-24-drizzle"
    | "node-24-node-pg"
    | "bun-1.3.13-bun-sql"
    | "bun-1.3.13-node-pg"
    | "node-24";
  joins: boolean;
}

export interface IModalInputData {
  value: string;
  key: string;
  items: IModalInputDataItem[];
}

export interface IModalInputDataItem {
  value: string;
  description?: string;
  disabled?: boolean;
}
