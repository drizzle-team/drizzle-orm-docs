import type {
  IData,
  IJSONData,
} from "@components/landing/benchmark/types";

type Core = "core1" | "core2" | "core3" | "core4";

// A second with no CPU sample (null) takes the value of the nearest second that has one.
const nearest = (data: IJSONData[], index: number, core: Core): number => {
  for (let d = 0; d < data.length; d++) {
    const value = data[index - d]?.[core] ?? data[index + d]?.[core];
    if (value != null) return value;
  }
  return 0;
};

export default (data: IJSONData[]): IData[] => {
  return data
    .map((item, index) => ({
      time: new Date(item.time).getMilliseconds(),
      latency: {
        avg: item.latency_average,
        p90: item.latency_90,
        p95: item.latency_95,
      },
      cpus: {
        cpu1: nearest(data, index, "core1"),
        cpu2: nearest(data, index, "core2"),
        cpu3: nearest(data, index, "core3"),
        cpu4: nearest(data, index, "core4"),
        cpus:
          (nearest(data, index, "core1") +
            nearest(data, index, "core2") +
            nearest(data, index, "core3") +
            nearest(data, index, "core4")) /
          4,
      },
      reqs: item.reqs_per_sec,
      vus: item.vus,
      failReqs: item.fail_reqs_per_sec,
      totalReqs: null,
      totalFail: null,
      avg: null,
      max: null,
    }))
    .map((newItem, index, self) => {
      const sliced = self.slice(0, index + 1);

      const p95 =
        sliced.reduce((prev, next) => prev + next.latency.p95, 0) /
        sliced.length;
      const cpus =
        sliced.reduce((prev, next) => prev + next.cpus.cpus, 0) / sliced.length;
      const latency =
        sliced.reduce((prev, next) => prev + next.latency.avg, 0) /
        sliced.length;
      const reqs =
        sliced.reduce((prev, next) => prev + next.reqs, 0) / sliced.length;
      const totalReqs = sliced.reduce((prev, next) => prev + next.reqs, 0);
      const totalFailReqs = sliced.reduce(
        (prev, next) => prev + next.failReqs,
        0,
      );
      const maxReqs = Math.max(...sliced.map(({ reqs }) => reqs));
      const maxLatency = Math.max(
        ...sliced.map(({ latency }) => Math.max(...Object.values(latency))),
      );

      return {
        ...newItem,
        totalReqs,
        totalFailReqs,
        avg: {
          p95,
          cpus,
          latency,
          reqs,
        },
        max: {
          reqs: maxReqs,
          latency: maxLatency,
        },
      };
    })
    .sort((a, b) => a.time - b.time);
};
