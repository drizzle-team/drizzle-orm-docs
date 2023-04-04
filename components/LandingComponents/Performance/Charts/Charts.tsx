import React from 'react';
import styles from './Charts.module.css';
import Chart from './Chart/Chart';

interface Props {
  charts: {
    query: string;
    tests: {
      name: string;
      time: number;
    }[];
    isItenPerMin?: boolean | undefined;
  }[];
  isPreparedStatements: boolean;
}

const Charts: React.FC<Props> = ({ charts, isPreparedStatements }) => (
  <>
    {charts.map((b, index) => (
      <div className={styles.chart} key={index}>
        <div className={styles.query}>{b.query}</div>
        <div className={styles.chart_block}>
          {b.tests.filter((t) => (isPreparedStatements ? t.name !== 'drizzle' : t.name !== 'drizzle:p')).map((t, key) => {
            const { time } = b.tests.filter((test) => (isPreparedStatements ? test.name !== 'drizzle' : test.name !== 'drizzle:p'))
              .reduce((prev, current) => ((prev.time > current.time) ? prev : current));

            return <Chart isItemForMin={b.isItenPerMin} item={t} max={time} key={`${index} ${key}`} />;
          })}
        </div>
      </div>
    ))}
  </>
);

export default Charts;
