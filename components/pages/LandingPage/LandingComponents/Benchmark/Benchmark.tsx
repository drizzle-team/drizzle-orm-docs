import React from 'react';
import ControlPanel from './components/ControlPanel/ControlPanel';
import styles from './Benchmark.module.css';
import { BenchmarkProvider } from './context/useBenchmarkContext';

const Benchmark = () => (
  <BenchmarkProvider>
    <div className={styles.wrap}>
      <div className={styles.header}>
        Performance
      </div>
      <div className={styles.description}>
        <div className={styles.description__line}>
          Drizzle has always been fast, we just wanted you to have proper benchmarks experience
        </div>
        <div>
          Well, actually it&apos;s not that Drizzle is fast, Drizzle just doesn&apos;t slow you down
        </div>
      </div>
      <div className={styles.charts}>
        <ControlPanel />
        <div className={styles.bottom}>
          <a href="https://google.com" target="_blank" rel="nofollow noreferrer" className={styles['how-it-works']}>How it works?</a>
          <div>
            |
          </div>
          <a href="https://github.com/drizzle-team/drizzle-benchmarks" target="_blank" rel="nofollow noreferrer" className={styles.github}>
            Open on Github ↗︎
          </a>
        </div>
      </div>
    </div>
  </BenchmarkProvider>
);

export default Benchmark;
