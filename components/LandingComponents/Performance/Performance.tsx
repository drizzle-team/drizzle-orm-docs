import React, { useState } from 'react';
import styles from './Performance.module.css';
import Chart from '../../Chart/Chart';
import LeftButton from './LeftButton';
import RightButton from './RightButton';

const Performance = () => {
  const [page, setPage] = useState(0);
  const benchmarks = [
    {
      query: 'select * from customer',
      tests: [{
        name: 'drizzle:p',
        time: 0.1269,
      },
      {
        name: 'typeorm',
        time: 0.6961,
      },
      {
        name: 'prisma',
        time: 0.74131,
      },
      ],
    },
    {
      query: 'select * from customer where id = ?',
      tests: [{
        name: 'drizzle:p',
        time: 0.76558,
      },
      {
        name: 'typeorm',
        time: 8.19,
      },
      {
        name: 'prisma',
        time: 12.08,
      },
      ],
    },
    {
      query: 'select * from customer where company_name like ?',
      tests: [{
        name: 'drizzle:p',
        time: 1.75,
      },
      {
        name: 'typeorm',
        time: 7.57,
      },
      {
        name: 'prisma',
        time: 11.17,
      },
      ],
    },
    {
      query: 'select * from employee where id = ? left join reportee',
      tests: [{
        name: 'drizzle:p',
        time: 0.12255,
      },
      {
        name: 'typeorm',
        time: 2.67,
      },
      {
        name: 'prisma',
        time: 2.28,
      },
      ],
    },
    {
      query: 'SELECT * FROM supplier',
      tests: [{
        name: 'drizzle:p',
        time: 0.4657,
      },
      {
        name: 'typeorm',
        time: 0.25741,
      },
      {
        name: 'prisma',
        time: 0.28276,
      },
      ],
    },
    {
      query: 'select all order with sum and count',
      tests: [{
        name: 'drizzle:p',
        time: 132.6,
      },
      {
        name: 'typeorm',
        time: 6560,
      },
      {
        name: 'prisma',
        time: 3960,
      },
      ],
    },
  ];

  const benchmarkIterForSec = benchmarks.map((b) => ({
    ...b,
    tests: b.tests.map((t) => ({
      ...t,
      time: +(1000 / t.time).toFixed(),
    })),
  }));

  const prevPage = () => {
    setPage((prev) => (prev - 3 >= 0 ? prev - 3 : prev));
  };

  const nextPage = () => {
    setPage((prev) => (prev + 3 <= benchmarkIterForSec.length - 1 ? prev + 3 : prev));
  };

  const isAvailablePrev = page - 3 >= 0;
  const isAvailableNext = page + 3 <= (benchmarkIterForSec.length - 1);

  return (
    <div>
      <div className={styles.header_wrap}>
        <div className={styles.header}>Performance</div>
        <div className={styles.buttons}>
          <LeftButton setPage={prevPage} isAvailable={isAvailablePrev} />
          <RightButton setPage={nextPage} isAvailable={isAvailableNext} />
        </div>
      </div>
      <div className={styles.charts}>
        {page !== undefined && benchmarkIterForSec.slice(page, page + 3).map((b, index) => {
          const { time } = b.tests
            .reduce((prev, current) => ((prev.time > current.time) ? prev : current));
          return (
            <div className={styles.chart} key={index}>
              <div className={styles.query}>{b.query}</div>
              <div className={styles.chart_block}>
                {b.tests.map((t, key) => <Chart item={t} max={time} key={`${index} ${key}`} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Performance;
