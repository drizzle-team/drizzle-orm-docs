import React, { useEffect, useRef } from 'react';
import styles from './Chart.module.css';

interface Props {
  item: {
    name: string,
    time: number,
  },
  max: number,
  isItemForMin?: boolean;
}

const Chart: React.FC<Props> = ({ item, max, isItemForMin }) => {
  const blockRef = useRef<HTMLDivElement>(null!);
  const size = 200;
  const maxHeight = (item.time / max) * size;
  useEffect(() => {
    if (blockRef.current) {
      blockRef.current.style.height = `${maxHeight}px`;
    }
  }, [item.time, max]);

  return (
    <div className={styles.wrap}>
      <div>{item.time}</div>
      <div className={styles.text}>{isItemForMin ? 'iter/min' : 'iter/sec'}</div>
      <div className={styles.chart_block}>
        <div className={styles.block} ref={blockRef} />
      </div>
      <div className={styles.name}>{item.name}</div>
    </div>
  );
};

export default Chart;
