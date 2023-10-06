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
    cpus: number;
    latency: number;
    reqs: number;
  };
  max: {
    reqs: number;
    latency: number;
  };
}

export interface IInputData {
  data: IData[];
}

export interface IParams {
  dbSize: string;
  projectType: string;
  database: string;
  traffic: string;
}

export interface IModalInputData {
  value: string;
  key: string;
  items: IModalInputDataItem[];
}

export interface IModalInputDataItem {
  id: string;
  value: string;
  description?: string;
  disabled?: boolean;
}
