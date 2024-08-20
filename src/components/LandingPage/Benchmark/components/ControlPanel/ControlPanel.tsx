import React, { useEffect, useMemo, useState, type FC } from "react";

import styles from "./ControlPanel.module.css";
import type { IData } from "../../types";

import SpeedSelector from "../SpeedSelector/SpeedSelector";
import Configuration from "../Configuration/Configuration";
import Performance from "../Performance/Performance";
import { useBenchmarkContext } from "../../context/useBenchmarkContext";
import OptionsIcon from "@/components/Icons/OptionsIcon";
import BenchmarkConifg from "../BenchmarkConfig/BenchmarkConfig";
import ArrowRight from "@/components/Icons/ArrowRight";
import getBenchmarkData from "../../utils/getBenchmarkData.ts";

interface Props {
  minWidth?: number;
}

const ControlPanel: FC<Props> = ({ minWidth = 940 }) => {
  const {
    setIsTimerActive,
    isTimerActive,
    time,
    setTime,
    intervalId,
    selectedItems,
    setSelectedItems,
  } = useBenchmarkContext();
  const [speed, setSpeed] = useState<number>(2);
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  const [isSmall, setIsSmall] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const [drizzleData, setDrizzleData] = useState<IData[] | null>(null);
  const [compareData, setCompareData] = useState<IData[] | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  const maxDataLength = useMemo(() => {
    if (drizzleData && compareData) {
      return Math.min(drizzleData.length - 1, compareData.length - 1);
    }
    return 0;
  }, [drizzleData, compareData]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth > minWidth) {
      setIsBlurred(false);
    } else {
      setIsSmall(true);
    }
  }, [typeof window]);

  const openConfigModal = () => {
    setIsConfigOpen((prev) => !prev);
    setIsTimerActive((prev) => !prev);
  };

  const skipToResults = () => {
    if (!drizzleData || !compareData) return;
    clearInterval(intervalId.current);
    setTime(maxDataLength * 100);
  };

  const pause = () => {
    if (!drizzleData || !compareData) return;
    clearInterval(intervalId.current);
    setIsTimerActive(false);
  };

  const rerun = () => {
    if (!drizzleData || !compareData) return;
    setTime(0);
    setIsTimerActive(true);
  };

  const resume = () => {
    if (!drizzleData || !compareData) return;
    setIsTimerActive(true);
  };

  const rewind = (e: any) => {
    if (!drizzleData || !compareData) return;
    setTime(Number(e.target.value));
    setIsTimerActive(false);
    clearInterval(intervalId.current);
  };

  const start = () => {
    if (window.innerWidth < minWidth && !isShaking) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 2000);
      return;
    }
    if (isShaking) return;
    rerun();
    setTimeout(() => {
      setIsBlurred(false);
    }, 200);
  };

  useEffect(() => {
    const data = getBenchmarkData(selectedItems);
    if (data) {
      setDrizzleData(data.drizzleData);
      setCompareData(data.compareData);
    }
    return () => {
      setDrizzleData(null);
      setCompareData(null);
    };
  }, [selectedItems]);

  useEffect(() => {
    if (isBlurred) {
      skipToResults();
    } else {
      rerun();
    }
  }, [drizzleData, compareData]);

  return (
    <div className={styles.content}>
      <div className={styles.control}>
        <div className={styles.time}>
          <SpeedSelector speed={speed} setSpeed={setSpeed} />
          {!isTimerActive &&
            !isConfigOpen &&
            (time === maxDataLength * 100 || time === 0) && (
              <>
                <div className={styles.divider}></div>
                <button
                  type="button"
                  className={styles["play-wrap"]}
                  onClick={rerun}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-play"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                  Run
                </button>
                <div className={styles.divider}></div>
              </>
            )}
          {!isTimerActive &&
            !isConfigOpen &&
            time !== maxDataLength * 100 &&
            time !== 0 && (
              <>
                <div className={styles.divider}></div>
                <button
                  type="button"
                  className={styles["play-wrap"]}
                  onClick={resume}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-play"
                  >
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                  Resume
                </button>
                <div className={styles.divider}></div>
              </>
            )}
          {isTimerActive && !isConfigOpen && (
            <>
              <div className={styles.divider}></div>
              <button
                type="button"
                className={styles["play-wrap"]}
                onClick={pause}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pause"
                >
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                </svg>
                Pause
              </button>
              <div className={styles.divider}></div>
            </>
          )}
          {!isConfigOpen && (
            <div className={styles.rangeContainer}>
              <div
                className={styles.rangeStep}
                style={{ width: `${350 / (360 / 100)}px` }}
              >
                0
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                1k
              </div>
              <div
                className={styles.rangeStep}
                style={{ width: `${350 / (360 / 100)}px` }}
              >
                1k
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                2k
              </div>
              <div
                className={styles.rangeStep}
                style={{ width: `${350 / (360 / 100)}px` }}
              >
                2k
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                3k
              </div>
              <div
                className={styles.rangeStep}
                style={{ borderRight: "none", width: `${350 / (360 / 60)}px` }}
              >
                3k
              </div>
              <input
                className={styles["rewind-input"]}
                type="range"
                min={0}
                max={maxDataLength * 100}
                value={time}
                onChange={rewind}
                step={1}
              />
            </div>
          )}
        </div>
        <div className={styles.config}>
          <div className={styles["config-wrap"]}>
            <div className={styles["config-popup"]}>
              <BenchmarkConifg selectedItems={selectedItems} />
            </div>
            <div className={styles["config-info"]}>Benchmark Config</div>
          </div>
          <div className={styles["arrow-wrap"]}>
            <ArrowRight />
          </div>
          <button
            type="button"
            className={styles["config-button"]}
            onClick={openConfigModal}
          >
            <OptionsIcon />
          </button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={isBlurred ? styles.blurred : styles["hide-blur"]}>
          {drizzleData && compareData && (
            <div className={styles["blur-content"]}>
              {isShaking && (
                <div className={styles["only-desktop"]}>
                  Only available on Desktop 🖥️
                </div>
              )}
              {isSmall && (
                <button
                  onClick={start}
                  type="button"
                  className={isShaking ? styles["start-shaked"] : styles.start}
                >
                  Launch your DevOps experience 🚀
                </button>
              )}
            </div>
          )}
        </div>
        <Performance
          selectedItems={selectedItems}
          isConfigOpen={isConfigOpen}
          speed={speed}
          data={drizzleData}
          compareData={compareData}
          maxElements={81}
          maxDataLength={maxDataLength}
        />
        <Configuration
          isOpened={isConfigOpen}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
