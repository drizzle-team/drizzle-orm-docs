import {
  FC, useState, useRef, useEffect, useMemo,
} from 'react';

import CheckIcon from '@/components/CheckIcon';
import { SVGViewBoxHeight, SVGViewBoxWidth, DATA_CHART_PARAMS } from '../../constants';
import { IData } from '../../types';
import fixedHelper from '../../utils/fixedHelper';

import styles from './CPUChart.module.css';

interface IProps {
  setSelectedItemIndex: (index: number | null) => void;
  selectedItemIndex: number | null;
  pathArray: IData[];
  maxDataLength: number;
  isCompleted: boolean;
  max: number;
  average: number;
  averageCompare: number;
  showTooltip?: boolean;
}

const CPUChart: FC<IProps> = ({
  setSelectedItemIndex,
  selectedItemIndex,
  pathArray,
  max,
  maxDataLength,
  isCompleted,
  average,
  averageCompare,
  showTooltip,
}) => {
  const [tipPosition, setTipPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const svgHeight = SVGViewBoxHeight;
  const svgWidth = SVGViewBoxWidth;
  const lineRef = useRef<SVGLineElement>(null!);
  const statsRef = useRef<HTMLDivElement>(null!);
  const itemSize = svgWidth / (maxDataLength - 1);

  const formatCpu = (cpu?: number) => {
    if (!cpu && cpu !== 0) return '0';
    if (cpu < 100) {
      return cpu.toFixed(1);
    }
    return cpu.toFixed();
  };

  const calculatePath = (arr: IData[]) => arr
    .map(
      (item, index) => `${(index * itemSize).toFixed()},${(svgHeight - (svgHeight * item.cpus.cpus) / max).toFixed()}`,
    )
    .join(',');

  const getLines = useMemo(() => (
    <>
      <line
        stroke="#e1e1e1"
        strokeWidth="1"
        x1={0}
        x2={svgWidth}
        y1={1}
        y2={1}
        strokeDasharray="12, 12"
      />
      <line
        stroke="#e1e1e1"
        strokeWidth="1"
        x1={0}
        x2={svgWidth}
        y1={svgHeight / 3}
        y2={svgHeight / 3}
        strokeDasharray="12, 12"
      />
      <line
        stroke="#e1e1e1"
        strokeWidth="1"
        x1={0}
        x2={svgWidth}
        y1={(svgHeight / 3) * 2}
        y2={(svgHeight / 3) * 2}
        strokeDasharray="12, 12"
      />
      <line
        stroke="#e1e1e1"
        strokeWidth="1"
        x1={0}
        x2={svgWidth}
        y1={svgHeight}
        y2={svgHeight}
      />
    </>
  ), []);

  const calculateCirclePosition = (arr: IData[]) => {
    if (arr.length === 0) return {};
    return {
      cx: ((arr.length - 1) * itemSize).toFixed(2),
      cy: (svgHeight - (svgHeight * arr[arr.length - 1].cpus.cpus) / max).toFixed(),
    };
  };

  const getCircles = useMemo(() => (
    <circle
      strokeWidth="3"
      fill="#ffffff"
      stroke={DATA_CHART_PARAMS.avg.color}
      r="3.5"
      data-screenshot-exclude="true"
      {...calculateCirclePosition(pathArray)}
    />
  ), [pathArray]);

  const getPolylines = useMemo(() => (
    <g>
      <polyline
        fill="none"
        stroke={DATA_CHART_PARAMS.avg.color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={calculatePath(pathArray)}
      />
      <polyline
        fill="url(#linegraph-blue-gradient-0)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={`0 ${svgHeight} ${calculatePath(pathArray)} ${((pathArray.length - 1) * itemSize).toFixed()} ${svgHeight}`}
      />
    </g>
  ), [pathArray]);

  const getRects = useMemo(() => pathArray.map((_, index) => (
    <rect
      key={index}
      fill="transparent"
      width={itemSize}
      height={svgHeight}
      onMouseEnter={() => setSelectedItemIndex(index)}
      x={index * itemSize - itemSize / 2}
      y={0}
    />
  )), [pathArray.length]);

  const removeSelectedItemIndex = () => {
    setSelectedItemIndex(null);
  };

  const getSelectedItemCircles = () => {
    if (selectedItemIndex === null) return;
    return (
      <circle
        strokeWidth="3"
        fill="#ffffff"
        stroke={DATA_CHART_PARAMS.avg.color}
        r="3.5"
        data-screenshot-exclude="true"
        cx={selectedItemIndex * itemSize}
        cy={
					svgHeight - (svgHeight * pathArray[selectedItemIndex].cpus.cpus) / max
				}
      />
    );
  };

  useEffect(() => {
    if (lineRef.current && selectedItemIndex !== null && statsRef.current) {
      const { x, y } = lineRef.current.getBoundingClientRect();
      const { width } = statsRef.current.getBoundingClientRect();
      if (x + width / 2 > window.innerWidth - 20) {
        setTipPosition({
          x: x - (x + width / 2 - window.innerWidth) - 20,
          y: y + window.scrollY,
        });
        return;
      }
      if (x - width / 2 < 20) {
        setTipPosition({
          x: x - (x - width / 2 - 20),
          y: y + window.scrollY,
        });
        return;
      }
      setTipPosition({ x: x + window.scrollX, y: y + window.scrollY });
    }
  }, [selectedItemIndex]);

  const xTimes = () => {
    const a = average || 1;
    const b = averageCompare || 1;
    return fixedHelper(b / a, 2);
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.label}>
          avg CPU load:
          {' '}
          {formatCpu(average)}
          %
        </div>
        {pathArray.length > 0 && isCompleted && showTooltip && (
        <div className={(isCompleted && showTooltip) ? styles['tooltip-wrap-underline'] : styles['tooltip-wrap']}>
          <div className={styles.tooltip}>
            Drizzle has x
            {xTimes()}
            {' '}
            lower cpu usage
          </div>
          <div className={styles['success-icon-wrap']}>
            <CheckIcon />
          </div>
          x
          {xTimes()}
        </div>
        )}
      </div>
      <div className={styles['chart-wrap']}>
        <svg
          viewBox={`0 0 ${svgWidth + 7} ${svgHeight + 15}`}
          className="chart"
        >
          <defs>
            <linearGradient
              id="linegraph-blue-gradient-0"
              x1="0"
              x2="0"
              y1="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={DATA_CHART_PARAMS.avg.gradientColor}
                stopOpacity="0.85"
              />
              <stop
                offset="90%"
                stopColor={DATA_CHART_PARAMS.avg.gradientColor}
                stopOpacity="0.1"
              />
            </linearGradient>
          </defs>
          <g transform="translate(0,10)" onMouseLeave={removeSelectedItemIndex}>
            {getLines}
            {getPolylines}
            {getRects}
            {getCircles}
            {selectedItemIndex !== null && (
            <line
              ref={lineRef}
              stroke="#000000"
              strokeWidth="1"
              x1={selectedItemIndex * itemSize}
              x2={selectedItemIndex * itemSize}
              y1={0}
              y2={svgHeight}
            />
            )}
            {selectedItemIndex !== null && getSelectedItemCircles()}
          </g>
        </svg>
        {selectedItemIndex !== null && (
        <div
          className={styles.stats}
          ref={statsRef}
          style={{
            top: tipPosition.y,
            left: tipPosition.x,
          }}
        >
          <div className={styles['stats-item']}>
            CPUs:
            <div className={styles['accent-text']}>
              <span>
                {formatCpu(pathArray[selectedItemIndex].cpus.cpu1)}
                %
                {' '}
              </span>
              <span>
                {formatCpu(pathArray[selectedItemIndex].cpus.cpu2)}
                %
                {' '}
              </span>
              <span>
                {formatCpu(pathArray[selectedItemIndex].cpus.cpu3)}
                %
                {' '}
              </span>
              <span>
                {formatCpu(pathArray[selectedItemIndex].cpus.cpu4)}
                %
                {' '}
              </span>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default CPUChart;
