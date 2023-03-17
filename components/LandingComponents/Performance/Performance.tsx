import React, { useState } from 'react';
import styles from './Performance.module.css';
import Chart from '../../Chart/Chart';
import LeftButton from './LeftButton';
import RightButton from './RightButton';

const Performance = () => {
  const [page, setPage] = useState(0);
  const benchmarks = [
    {
      query: 'select * from customer where id = ?',
      tests: [{
        name: 'drizzle:p',
        time: 92.47,
      },
      {
        name: 'kysely',
        time: 111.69,
      },
      {
        name: 'prisma',
        time: 184.46,
      },
      ],
    },
    {
      query: 'select * from customer where company_name ilike ?',
      tests: [{
        name: 'drizzle:p',
        time: 58.25,
      },
      {
        name: 'kysely',
        time: 70.89,
      },
      {
        name: 'prisma',
        time: 108.91,
      },
      ],
    },
    {
      query: 'SELECT * FROM employee',
      tests: [{
        name: 'drizzle:p',
        time: 1.42,
      },
      {
        name: 'kysely',
        time: 1.36,
      },
      {
        name: 'prisma',
        time: 1.89,
      },
      ],
    },
    {
      query: 'select * from employee where id = ? left join reportee',
      tests: [{
        name: 'drizzle:p',
        time: 9.27,
      },
      {
        name: 'kysely',
        time: 13.79,
      },
      {
        name: 'prisma',
        time: 23.44,
      },
      ],
    },
    {
      query: 'SELECT * FROM supplier',
      tests: [{
        name: 'drizzle',
        time: 0.0655,
      },
      {
        name: 'kysely',
        time: 0.08405,
      },
      {
        name: 'prisma',
        time: 0.28276,
      },
      ],
    },
    {
      query: 'SELECT * FROM product LEFT JOIN supplier WHERE product.id = ?',
      tests: [{
        name: 'drizzle:p',
        time: 80.01,
      },
      {
        name: 'kysely',
        time: 93.93,
      },
      {
        name: 'prisma',
        time: 267.18,
      },
      ],
    },
  ];

  const benchmarkIterForSec = benchmarks.map((b) => ({
    ...b,
    tests: b.tests.map((t) => ({
      ...t,
      time: +(1000 / t.time).toFixed(2),
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
