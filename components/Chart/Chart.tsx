import React, { useEffect, useRef } from 'react';
import styles from './Chart.module.css';

interface Props {
  item: {
    name: string,
    time: number,
  },
  max: number,
}

const Chart: React.FC<Props> = ({ item, max }) => {
  const blockRef = useRef<HTMLDivElement>(null!);
  const size = 200;
  const maxHeight = (item.time / max) * size;

  useEffect(() => {
    if (blockRef.current) {
      blockRef.current.style.height = `${maxHeight}px`;
    }
  }, [item.time]);

  return (
    <div className={styles.wrap}>
      <div>{item.name}</div>
      <div className={styles.chart_block}>
        <div className={styles.block} ref={blockRef} />
      </div>
      <div>{item.time}</div>
      <div className={styles.text}>iter/sec</div>
    </div>
  );
};

export default Chart;
