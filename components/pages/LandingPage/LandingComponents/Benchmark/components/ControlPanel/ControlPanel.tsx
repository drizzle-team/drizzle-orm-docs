import { useEffect, useMemo, useState } from 'react';

import styles from './ControlPanel.module.css';
import { IData, IInputData, IParams } from '../../types';
import Timer from '../Timer/Timer';

import SpeedSelector from '../SpeedSelector/SpeedSelector';
import Configuration from '../Configuration/Configuration';
import Performance from '../Performance/Performance';
import { useBenchmarkContext } from '@/components/pages/LandingPage/LandingComponents/Benchmark/context/useBenchmarkContext';
import OptionsIcon from '@/components/Icons/OptionsIcon';
import BenchmarkConifg from '../BenchmarkConfig/BenchmarkConfig';
import getBenchmarkPaths from '../../utils/getBenchmarkPaths';
import ArrowRight from '@/components/Icons/ArrowRight';

function ControlPanel() {
  const {
    setIsTimerActive, isTimerActive, time, setTime, intervalId,
  } = useBenchmarkContext();
  const [speed, setSpeed] = useState<number>(2);
  const [isBlurred, setIsBlurred] = useState<boolean>(true);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<IParams>({
    orm: 'prisma',
    traffic: '1000vus',
    dbSize: 'micro',
    projectType: 'ecommerce',
    database: 'postgres',
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
    const paths = getBenchmarkPaths(selectedItems);
    if (!paths) {
      return {
        drizzleData: null,
        compareData: null,
      };
    }
    let d: IInputData | null = null;
    let c: IInputData | null = null;
    [d, c] = await Promise.all([
      import(`../../data/${paths.drizzleFileName}.json`),
      import(`../../data/${paths.compareFileName}.json`),
    ]);
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

  const start = () => {
    if (window.innerWidth < 940 && !isShaking) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 2000);
      return;
    }
    if (isShaking) return;
    rerun();
    setTimeout(() => {
      setIsBlurred(false);
    }, 200);
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

  useEffect(() => {
    if (isBlurred) {
      skipToResults();
    }
  }, [drizzleData, compareData]);

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.control}>
          <div className={styles.time}>
            <Timer time={time} />
            <SpeedSelector speed={speed} setSpeed={setSpeed} />
            <div className={styles.divider} />
            {isTimerActive && !isConfigOpen && (
            <button type="button" className={styles['play-wrap']} onClick={skipToResults}>Skip to results</button>
            )}
            {!isTimerActive && !isConfigOpen && (
            <button type="button" className={styles['play-wrap']} onClick={rerun}>Rerun</button>
            )}
          </div>
          <div className={styles.config}>
            <div className={styles['config-wrap']}>
              <div className={styles['config-popup']}>
                <BenchmarkConifg selectedItems={selectedItems} />
              </div>
              <div className={styles['config-info']}>
                Benchmark Config
              </div>
            </div>
            <div className={styles['arrow-wrap']}>
              <ArrowRight />
            </div>
            <button type="button" className={styles['config-button']} onClick={openConfigModal}>
              <OptionsIcon />
            </button>
          </div>
        </div>
        <div className={styles.container}>
          <div className={isBlurred ? styles.blurred : styles['hide-blur']}>
            {drizzleData && compareData
            && (
            <div className={styles['blur-content']}>
              {isShaking && <div className={styles['only-desktop']}>Only available on Desktop 🖥️</div>}
              <button onClick={start} type="button" className={isShaking ? styles['start-shaked'] : styles.start}>Launch your DevOps experience 🚀</button>
            </div>
            )}
          </div>
          <Performance
            selectedItems={selectedItems}
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
          {!isConfigOpen && selectedItems.traffic === 'your_startup' && (
            <div className={styles['sticker-wrap']}>
              <div className={styles.congrats}>
                <div className={styles['congrats-text']}>
                  At least you have 100 Lighthouse score!
                </div>
              </div>
              <div className={styles.sticker}>
                <img src="/images/sticker.webp" alt="sticker" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
