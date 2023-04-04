import React, { useEffect, useState } from 'react';
import styles from './Performance.module.css';
import LeftButton from './LeftButton';
import RightButton from './RightButton';
import ToggleButton from '../../common/ToggleButton';
import Charts from './Charts/Charts';
import benchmarks, { Benchmarks } from '../../../data/_benchmarks';
import DropDown from '../../common/DropDown/DropDown';

const Performance = () => {
  const [page, setPage] = useState(0);
  const [isPreparedStatements, setIsPreparedStatements] = useState(false);

  const [filteredCharts, setFilteredCharts] = useState<Benchmarks[]>();
  const [chartsType, setChartsType] = useState<string>('sqlite');

  const togglePreparedStatements = () => {
    setIsPreparedStatements((prev) => !prev);
  };

  const setType = (type: string) => {
    setPage(0);
    setChartsType(type);
  };

  useEffect(() => {
    const copyWithFilteredCharts: {
      query: string;
      tests: {
        name: string;
        time: number;
      }[];
      isItenPerMin?: boolean;
    }[] = [];

    benchmarks.filter((b) => b.type === chartsType)[0]
      .benchmarks
      .forEach((benchmark, index) => {
        copyWithFilteredCharts.push({
          query: benchmark.query,
          tests: [],
        });
        if (benchmark.tests.some((val) => val.time >= 1000)) {
          copyWithFilteredCharts[index].isItenPerMin = true;
        }
        benchmark.tests.forEach((test) => {
          if (copyWithFilteredCharts[index].isItenPerMin) {
            copyWithFilteredCharts[index].tests.push({
              ...test,
              time: +(60000 / test.time).toFixed(),
            });
          } else {
            copyWithFilteredCharts[index].tests.push({
              ...test,
              time: +(1000 / test.time).toFixed(),
            });
          }
        });
      });
    setFilteredCharts([...copyWithFilteredCharts]);
  }, [chartsType]);

  const prevPage = () => {
    setPage((prev) => (prev - 3 >= 0 ? prev - 3 : prev));
  };

  const nextPage = () => {
    setPage((prev) => (prev + 3 <= filteredCharts!.length - 1 ? prev + 3 : prev));
  };

  const isAvailablePrev = filteredCharts ? page - 3 >= 0 : false;
  const isAvailableNext = filteredCharts ? page + 3 <= (filteredCharts.length - 1) : false;

  return (
    <div>
      <div className={styles.header_wrap}>
        <div className={styles.header}>Performance</div>
        <div className={styles.buttons}>
          <DropDown values={['sqlite', 'postgres']} value={chartsType} setValue={setType} />
          <ToggleButton isToggled={isPreparedStatements} toggle={togglePreparedStatements} value="Prepared Statements toggle" />
          <LeftButton setPage={prevPage} isAvailable={isAvailablePrev} />
          <RightButton setPage={nextPage} isAvailable={isAvailableNext} />
        </div>
      </div>
      <div className={styles.charts}>
        {page !== undefined && filteredCharts
        && (
        <Charts
          charts={filteredCharts.slice(page, page + 3)}
          isPreparedStatements={isPreparedStatements}
        />
        )}
      </div>
    </div>
  );
};

export default Performance;
