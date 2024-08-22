import styles from "./Benchmark.module.css";
import React, { useState } from "react";

const Benchmark = () => {
  const [isShaking, setIsShaking] = useState<boolean>(false);

  const start = (e: any) => {
    if (window.innerWidth < 1190 && !isShaking) {
      e.preventDefault();
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 2000);
      return;
    }
    if (isShaking) {
      e.preventDefault();
      return;
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>Performance</div>
      <div className={styles.description}>
        <div className={styles.description__line}>
          Drizzle has always been fast, we just wanted you to have proper
          benchmarks experience
        </div>
        <div>
          Well, actually it&apos;s not that Drizzle is fast, Drizzle just
          doesn&apos;t slow you down
        </div>
      </div>
      <div className={styles.charts}>
        <div className={styles.blurred}>
          <div className={styles["blur-content"]}>
            {isShaking && (
              <div className={styles["only-desktop"]}>
                Only available on Desktop 🖥️
              </div>
            )}
            <a
              href={"/benchmarks"}
              onClick={start}
              className={isShaking ? styles["start-shaked"] : styles.start}
            >
              Launch your DevOps experience 🚀
            </a>
          </div>
        </div>
        <img
          className={styles["image-light"]}
          src="/images/benchmarks/light.png"
          alt="benchmarks"
        />
        <img
          className={styles["image-dark"]}
          src="/images/benchmarks/dark.png"
          alt="benchmarks"
        />
      </div>
    </div>
  );
};

export default Benchmark;
