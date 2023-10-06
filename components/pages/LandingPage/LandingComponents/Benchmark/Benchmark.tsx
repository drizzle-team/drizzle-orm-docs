import React from 'react';
import ControlPanel from './components/ControlPanel/ControlPanel';
import styles from './Benchmark.module.css';
import { BenchmarkProvider } from './context/useBenchmarkContext';

const Benchmark = () => (
  <BenchmarkProvider>
    <div className={styles.wrap}>
      <div className={styles.header}>
        Benchmarks
      </div>
      <div className={styles.charts}>
        <ControlPanel />
      </div>
    </div>
  </BenchmarkProvider>
);

export default Benchmark;
