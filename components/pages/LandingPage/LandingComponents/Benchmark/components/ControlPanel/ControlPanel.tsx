import { useEffect, useMemo, useState } from 'react';

import styles from './ControlPanel.module.css';
// import Variant from './Application/Variant';
import { IData, IInputData, IParams } from '../../types';
import Timer from '../Timer/Timer';

import SpeedSelector from '../SpeedSelector/SpeedSelector';
import Configuration from '../Configuration/Configuration';
import Performance from '../Performance/Performance';
import { useBenchmarkContext } from '@/components/pages/LandingPage/LandingComponents/Benchmark/context/useBenchmarkContext';

function ControlPanel() {
  const {
    setIsTimerActive, isTimerActive, time, setTime, intervalId,
  } = useBenchmarkContext();
  const [speed, setSpeed] = useState<number>(2);
  const [selectedItems, setSelectedItems] = useState<IParams>({
    dbSize: 'm',
    projectType: 'ecommerce',
    database: 'postgres',
    traffic: '500vus',
  });

  const [drizzleData, setDrizzleData] = useState<IData[] | null>(null);
  const [compareData, setCompareData] = useState<IData[] | null>(null);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);

  const maxDataLength = useMemo(
    () => {
      if (drizzleData && compareData) {
        return Math.min(drizzleData.length - 1, compareData.length - 1);
      }
      return 0;
    },
    [drizzleData, compareData],
  );

  const getFile = async (): Promise<{
    drizzleData: IData[] | null;
    compareData: IData[] | null;
  }> => {
    let d: IInputData | null = null;
    let c: IInputData | null = null;
    if (selectedItems.traffic === '500vus') {
      [d, c] = await Promise.all([
        import('../../data/drizzle-500vus.json'),
        import('../../data/prisma-500vus.json'),
      ]);
    }
    if (selectedItems.traffic === '1000vus') {
      [d, c] = await Promise.all([
        import('../../data/drizzle-1000vus.json'),
        import('../../data/prisma-1000vus.json'),
      ]);
    }
    if (selectedItems.traffic === 'spikes') {
      [d, c] = await Promise.all([
        import('../../data/drizzle-spikes.json'),
        import('../../data/prisma-spikes.json'),
      ]);
    }
    if (d && c) {
      return { drizzleData: d.data, compareData: c.data };
    }
    return {
      drizzleData: null,
      compareData: null,
    };
  };

  const openConfigModal = () => {
    setIsConfigOpen((prev) => !prev);
    setIsTimerActive((prev) => !prev);
  };

  const skipToResults = () => {
    if (!drizzleData || !compareData) return;
    clearInterval(intervalId.current);
    setTime(maxDataLength * 100);
  };

  const rerun = () => {
    if (!drizzleData || !compareData) return;
    setTime(0);
    setIsTimerActive(true);
  };

  useEffect(() => {
    getFile().then((data) => {
      if (!data.drizzleData || !data.compareData) return;
      setDrizzleData(data.drizzleData);
      setCompareData(data.compareData);
      rerun();
    });
    return () => {
      setDrizzleData(null);
      setCompareData(null);
    };
  }, [selectedItems]);

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.control}>
          <div className={styles.time}>
            <Timer time={time} />
            <SpeedSelector speed={speed} setSpeed={setSpeed} />
            {isTimerActive && !isConfigOpen && (
            <button type="button" className={styles['play-wrap']} onClick={skipToResults}>Skip to results</button>
            )}
            {!isTimerActive && !isConfigOpen && (
            <button type="button" className={styles['play-wrap']} onClick={rerun}>Rerun</button>
            )}
          </div>
          <button type="button" className={styles['config-button']} onClick={openConfigModal}>
            Configure benchmark
          </button>
        </div>
        <div className={styles.container}>
          <Performance
            isConfigOpen={isConfigOpen}
            speed={speed}
            data={drizzleData}
            compareData={compareData}
            maxElements={81}
            maxDataLength={maxDataLength}
          />
          <Configuration
            isOpened={isConfigOpen}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
