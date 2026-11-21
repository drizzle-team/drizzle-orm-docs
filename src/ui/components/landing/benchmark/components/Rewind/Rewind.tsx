import { type FC, useMemo, useRef } from "react";

import styles from "./Rewind.module.css";

interface Props {
  maxDataLength: number;
  time: number;
  rewind: (e: any) => void;
  /** virtual users per second of the run; null until the data is loaded */
  vus: number[] | null;
}

const formatVus = (vus: number) => (vus >= 1000 ? `${vus / 1000}k` : `${vus}`);

// Splits the run at every 1k VUs crossed: "0 → 1k", "1k → 2k", …, up to the run's peak
const getSegments = (series: number[]) => {
  if (series.length === 0) return [];
  const peak = Math.max(...series);
  const segments: { from: number; to: number | null; seconds: number }[] = [];
  let start = 0;
  let from = 0;
  for (let to = 1000; to < peak; to += 1000) {
    const end = series.findIndex((vus) => vus > to);
    segments.push({ from, to, seconds: end - start });
    start = end;
    from = to;
  }
  if (peak % 1000 === 0) {
    // the ramp ends on a round number: its plateau gets its own segment
    const end = series.findIndex((vus) => vus >= peak);
    segments.push({ from, to: peak, seconds: end - start });
    segments.push({ from: peak, to: null, seconds: series.length - end });
  } else {
    segments.push({ from, to: peak, seconds: series.length - start });
  }
  return segments;
};

const Rewind: FC<Props> = ({ maxDataLength, time, rewind, vus }) => {
  const sliderRef = useRef<any>();

  const progress = useMemo(() => {
    return (time / (maxDataLength * 100)) * 100;
  }, [time, maxDataLength]);

  const series = useMemo(
    () => (vus ?? []).slice(0, maxDataLength + 1),
    [vus, maxDataLength],
  );

  const segments = useMemo(() => getSegments(series), [series]);

  const currentUsers =
    series[Math.min(Math.floor(time / 100), series.length - 1)] ?? 0;

  return (
    <div className={styles.wrap}>
      <div
        className={styles.tooltip}
        style={{ left: `${350 / (100 / progress)}px` }}
      >
        {currentUsers} VUs
      </div>
      <div className={styles.rangeContainer}>
        <div
          className={styles["progress-line"]}
          style={{ width: `${progress}%` }}
        ></div>
        {segments.map(({ from, to, seconds }, i) => (
          <div
            key={from}
            className={styles.rangeStep}
            style={{
              width: `${(seconds / series.length) * 100}%`,
              ...(i === segments.length - 1 && {
                borderRight: "1px solid transparent",
              }),
            }}
          >
            {formatVus(from)}
            {to !== null && (
              <>
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
                {formatVus(to)}
              </>
            )}
          </div>
        ))}
        <input
          ref={sliderRef}
          className={styles["rewind-input"]}
          type="range"
          min={0}
          max={maxDataLength * 100}
          value={time}
          onChange={rewind}
          step={1}
        />
      </div>
    </div>
  );
};

export default Rewind;
