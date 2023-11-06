import { useState, useMemo, useEffect, type FC } from "react";

import styles from "./Performance.module.css";

import type { IData, IParams } from "../../types";
import { useBenchmarkContext } from "../../context/useBenchmarkContext";
import { DELAY } from "../../constants";
import getSubArray from "../../utils/getSubArray";
import LatencyChart from "../LatencyChart/LatencyChart";
import ReqsChart from "../ReqsChart/ReqsChart";
import CPUChart from "../CpuChart/CPUChart";
import Logo from "../../utils/Logo";
import configurationData from "../../configurationData";

interface Props {
  selectedItems: IParams;
  isConfigOpen: boolean;
  maxElements: number;
  data: IData[] | null;
  speed: number;
  compareData: IData[] | null;
  maxDataLength: number;
}

const Performance: FC<Props> = ({
  selectedItems,
  isConfigOpen,
  maxElements,
  data,
  speed,
  compareData,
  maxDataLength,
}) => {
  const {
    isTimerActive,
    setIsTimerActive,
    time,
    setTime,
    intervalId,
    concatedDataDrizzle,
    setConcatedDataDrizzle,
    concatedDataCompare,
    setConcatedDataCompare,
  } = useBenchmarkContext();
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null,
  );
  const [max, setMax] = useState<number>(0);
  const [maxRequests, setMaxRequests] = useState<number>(0);

  useEffect(() => {
    if (!data || !compareData) return;
    if (selectedItemIndex === null && isTimerActive && index < maxDataLength) {
      intervalId.current = window.setInterval(() => {
        setTime((prev) => prev + 1 * speed);
      }, 10);
    } else {
      if (selectedItemIndex === null && index === maxDataLength) {
        setTime(maxDataLength * 100);
      }
      clearInterval(intervalId.current);
    }
    return () => clearInterval(intervalId.current);
  }, [data, compareData, selectedItemIndex, isTimerActive, speed]);

  const index = useMemo(() => {
    const value = Math.floor((time * 10) / DELAY);
    if (value >= maxDataLength) {
      return maxDataLength;
    }
    return Math.floor((time * 10) / DELAY);
  }, [data, compareData, time, maxDataLength]);

  useEffect(() => {
    if (!data || !compareData) return;
    const maxLatency = Math.max(
      data[maxDataLength].max.latency,
      compareData[maxDataLength].max.latency,
    );
    setMax(maxLatency);
    const maxRequestsTemp = Math.max(
      data[maxDataLength].max.reqs,
      compareData[maxDataLength].max.reqs,
    );
    setMaxRequests(maxRequestsTemp);
    setSelectedItemIndex(null);
    setIsTimerActive(true);
    setConcatedDataDrizzle(data.slice(0, 1));
    setConcatedDataCompare(compareData.slice(0, 1));
    setTime(0);
    return () => {
      setSelectedItemIndex(null);
      setIsTimerActive(true);
      setTime(0);
    };
  }, [data, compareData]);

  useEffect(() => {
    if (!data || !compareData) return;
    if (index === maxDataLength) {
      setTime(maxDataLength * 100);
      clearInterval(intervalId.current);
      setIsTimerActive(false);
    }
    setConcatedDataDrizzle(getSubArray(data, index, maxElements));
    setConcatedDataCompare(getSubArray(compareData, index, maxElements));
  }, [index]);

  return (
    <div className={isConfigOpen ? styles["wrap-hide"] : styles.wrap}>
      <div className={styles["compare-item"]}>
        <div className={styles["compare-icon-wrap"]}>
          <Logo logo="drizzle" />
        </div>
        <div>
          <div className={styles.name}>Drizzle</div>
          <div className={styles.version}>
            {configurationData.orm.items[selectedItems.orm].drizzle_version}
          </div>
        </div>
      </div>
      <div className={styles["compare-item"]}>
        <div className={styles["compare-icon-wrap"]}>
          <Logo logo={selectedItems.orm} />
        </div>
        <div>
          <div className={styles.name}>{selectedItems.orm}</div>
          <div className={styles.version}>
            {configurationData.orm.items[selectedItems.orm].compare_version}
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <LatencyChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataDrizzle}
          max={max}
          maxDataLength={maxElements}
          averageLatency={data ? data[index].avg.latency : 0}
          averageLatencyCompare={
            compareData ? compareData[index].avg.latency : 0
          }
          averageP99={data ? data[index].avg.p99 : 0}
          averageP99Compare={compareData ? compareData[index].avg.p99 : 0}
          showTooltip
          isCompleted={index === maxDataLength}
        />
      </div>
      <div className={styles.block}>
        <LatencyChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataCompare}
          max={max}
          maxDataLength={maxElements}
          averageLatency={compareData ? compareData[index].avg.latency : 0}
          averageLatencyCompare={data ? data[index].avg.latency : 0}
          averageP99={compareData ? compareData[index].avg.p99 : 0}
          averageP99Compare={data ? data[index].avg.p99 : 0}
          isCompleted={index === maxDataLength}
        />
      </div>
      <div className={styles.block}>
        <ReqsChart
          requests={data ? data[index].avg.reqs : 0}
          totalRequests={data ? data[index].totalReqs : 0}
          totalRequestsCompare={compareData ? compareData[index].totalReqs : 0}
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataDrizzle}
          maxDataLength={maxElements}
          max={maxRequests}
          isCompleted={index === maxDataLength}
          showTooltip
        />
      </div>
      <div className={styles.block}>
        <ReqsChart
          requests={compareData ? compareData[index].avg.reqs : 0}
          totalRequests={compareData ? compareData[index].totalReqs : 0}
          totalRequestsCompare={data ? data[index].totalReqs : 0}
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataCompare}
          maxDataLength={maxElements}
          max={maxRequests}
          isCompleted={index === maxDataLength}
        />
      </div>
      <div className={styles.block}>
        <CPUChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataDrizzle}
          max={100}
          maxDataLength={maxElements}
          showTooltip
          average={data ? data[index].avg.cpus : 0}
          averageCompare={compareData ? compareData[index].avg.cpus : 0}
          isCompleted={index === maxDataLength}
        />
      </div>
      <div className={styles.block}>
        <CPUChart
          setSelectedItemIndex={setSelectedItemIndex}
          selectedItemIndex={selectedItemIndex}
          pathArray={concatedDataCompare}
          max={100}
          maxDataLength={maxElements}
          average={compareData ? compareData[index].avg.cpus : 0}
          averageCompare={data ? data[index].avg.cpus : 0}
          isCompleted={index === maxDataLength}
        />
      </div>
    </div>
  );
};

export default Performance;
