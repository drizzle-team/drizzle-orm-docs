import React, { useState } from 'react';
import styles from './Performance.module.css';
import Chart from '../../Chart/Chart';
import LeftButton from './LeftButton';
import RightButton from './RightButton';
import ToggleButton from '../../common/ToggleButton';

const Performance = () => {
  const [page, setPage] = useState(0);
  const [isPreparedStatements, setIsPreparedStatements] = useState(false);

  const togglePreparedStatements = () => {
    setIsPreparedStatements((prev) => !prev);
  };
  const benchmarks = [
    {
      query: 'select * from customer',
      tests: [{
        name: 'drizzle:p',
        time: 0.1269,
      },
      {
        name: 'drizzle',
        time: 0.1493,
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
        name: 'drizzle',
        time: 2.74,
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
        name: 'drizzle',
        time: 0.1329,
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
        name: 'drizzle',
        time: 0.81061,
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
        time: 0.04657,
      },
      {
        name: 'drizzle',
        time: 0.0655,
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
        name: 'drizzle',
        time: 132.51,
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

  const benchmarkIterForSec: {
    query: string;
    tests: {
      name: string;
      time: number;
    }[];
    isItenPerMin?: boolean;
  }[] = [];

  benchmarks.forEach((benchmark, index) => {
    benchmarkIterForSec.push({
      query: benchmark.query,
      tests: [],
    });
    if (benchmark.tests.some((val) => val.time >= 1000)) {
      benchmarkIterForSec[index].isItenPerMin = true;
    }
    benchmark.tests.forEach((test) => {
      if (benchmarkIterForSec[index].isItenPerMin) {
        benchmarkIterForSec[index].tests.push({
          ...test,
          time: +(60000 / test.time).toFixed(),
        });
      } else {
        benchmarkIterForSec[index].tests.push({
          ...test,
          time: +(1000 / test.time).toFixed(),
        });
      }
    });
  });

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
          <ToggleButton isToggled={isPreparedStatements} toggle={togglePreparedStatements} value="Prepared Statements toggle" />
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
                {b.tests.filter((t) => (isPreparedStatements ? t.name !== 'drizzle' : t.name !== 'drizzle:p')).map((t, key) => <Chart isItemForMin={b.isItenPerMin} item={t} max={time} key={`${index} ${key}`} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Performance;
