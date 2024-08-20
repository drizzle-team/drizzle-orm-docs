export interface IData {
  time: number;
  latency: {
    avg: number;
    p90: number;
    p95: number;
    p99: number;
  };
  cpus: {
    cpu1: number;
    cpu2: number;
    cpu3: number;
    cpu4: number;
    cpus: number;
  };
  reqs: number;
  totalReqs: number;
  avg: {
    p99: number;
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
  core1: number;
  core2: number;
  core3: number;
  core4: number;
  reqs_per_sec: number;
  fail_reqs_per_sec: number;
  latency_95: number;
  latency_90: number;
  latency_99: number;
  latency_average: number;
}

export interface IParams {
  orm: string;
  dbSize: string;
  projectType: string;
  database: string;
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
