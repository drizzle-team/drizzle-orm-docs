import {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';

import { SVGViewBoxHeight, SVGViewBoxWidth, DATA_CHART_PARAMS } from '../../constants';
import CheckIcon from '@/components/CheckIcon';
import { IData } from '../../types';
import fixedHelper from '../../utils/fixedHelper';
import formatMs from '../../utils/formatMs';

import styles from './LatencyChart.module.css';

interface IProps {
  setSelectedItemIndex: (index: number | null) => void;
  selectedItemIndex: number | null;
  pathArray: IData[];
  maxDataLength: number;
  max: number;
  average: number;
  averageCompare: number;
  isCompleted: boolean;
  showTooltip?: boolean;
}

const LatencyChart: FC<IProps> = ({
  setSelectedItemIndex,
  selectedItemIndex,
  pathArray,
  max,
  maxDataLength,
  average,
  isCompleted,
  averageCompare,
  showTooltip,
}) => {
  const [tipPosition, setTipPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const svgHeight = SVGViewBoxHeight;
  const svgWidth = SVGViewBoxWidth;
  const statsRef = useRef<HTMLDivElement>(null!);
  const lineRef = useRef<SVGLineElement>(null!);
  const params: Array<keyof IData['latency']> = ['p99', 'p95', 'p90', 'avg'];
  const itemSize = svgWidth / (maxDataLength - 1);

  const calculatePath = (arr: IData[], param: keyof IData['latency']) => {
    if (arr.length === 0 || !max) return '';
    return arr
      .map(
        (item, index) => `${(index * itemSize).toFixed()},${
          (svgHeight - (svgHeight * +item.latency[param]) / max).toFixed()
        }`,
      )
      .join(',');
  };

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

  const calculateCirclePosition = (
    arr: IData[],
    param: keyof IData['latency'],
  ) => {
    if (arr.length === 0 || !max) return {};
    return {
      cx: ((arr.length - 1) * itemSize).toFixed(),
      cy: (svgHeight - (svgHeight * +arr[arr.length - 1].latency[param]) / max).toFixed(),
    };
  };

  const getCircles = useMemo(() => {
    if (!max) return;
    return params.map((param, index) => (
      <circle
        key={index}
        strokeWidth="3"
        fill="#ffffff"
        stroke={DATA_CHART_PARAMS[param].color}
        r="3.5"
        data-screenshot-exclude="true"
        {...calculateCirclePosition(pathArray, param)}
      />
    ));
  }, [pathArray]);

  const getPolylines = useMemo(() => params.map((param, index) => (
    <g key={index}>
      <polyline
        fill="none"
        stroke={DATA_CHART_PARAMS[param].color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={calculatePath(pathArray, param)}
      />
      <polyline
        fill={DATA_CHART_PARAMS[param].gradientColor}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={`0 ${svgHeight} ${calculatePath(pathArray, param)} ${
          (pathArray.length - 1) * itemSize
        } ${svgHeight}`}
      />
    </g>
  )), [pathArray]);

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
    return params.map((param, index) => (
      <circle
        key={index}
        strokeWidth="3"
        fill="#ffffff"
        stroke={DATA_CHART_PARAMS[param].color}
        r="3.5"
        data-screenshot-exclude="true"
        cx={selectedItemIndex * itemSize}
        cy={
					svgHeight
					- (svgHeight * +pathArray[selectedItemIndex].latency[param]) / max
				}
      />
    ));
  };

  useEffect(() => {
    if (lineRef.current && selectedItemIndex !== null) {
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

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.label}>
          avg latency:
          {' '}
          {formatMs(average)}
        </div>
        {pathArray.length > 0 && isCompleted && showTooltip && (
        <div className={(isCompleted && showTooltip) ? styles['tooltip-wrap-underline'] : styles['tooltip-wrap']}>
          <div className={styles.tooltip}>
            Drizzle has x
            {fixedHelper(+averageCompare.toFixed() / +average.toFixed(), 1)}
            {' '}
            times better latency
          </div>
          <div className={styles['success-icon-wrap']}>
            <CheckIcon />
          </div>
          x
          {fixedHelper(+averageCompare.toFixed() / +average.toFixed(), 1)}
        </div>
        )}
      </div>
      <div className={styles['chart-wrap']}>
        <svg
          viewBox={`0 0 ${svgWidth + 7} ${svgHeight + 15}`}
          className="chart"
        >
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
            left: tipPosition.x,
            top: tipPosition.y,
          }}
        >
          <div className={styles['stats-item']}>
            <div
              className={styles.circle}
              style={{
                backgroundColor: DATA_CHART_PARAMS.avg.color,
              }}
            />
            avg:
            <div className={styles['accent-text']}>
              {formatMs(pathArray[selectedItemIndex].latency.avg)}
            </div>
          </div>
          <div className={styles['stats-item']}>
            <div
              className={styles.circle}
              style={{ backgroundColor: DATA_CHART_PARAMS.p90.color }}
            />
            p90:
            <div className={styles['accent-text']}>
              {formatMs(pathArray[selectedItemIndex].latency.p90)}
            </div>
          </div>
          <div className={styles['stats-item']}>
            <div
              className={styles.circle}
              style={{ backgroundColor: DATA_CHART_PARAMS.p95.color }}
            />
            p95:
            <div className={styles['accent-text']}>
              {formatMs(pathArray[selectedItemIndex].latency.p95)}
            </div>
          </div>
          <div className={styles['stats-item']}>
            <div
              className={styles.circle}
              style={{ backgroundColor: DATA_CHART_PARAMS.p99.color }}
            />
            p99:
            <div className={styles['accent-text']}>
              {formatMs(pathArray[selectedItemIndex].latency.p99)}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default LatencyChart;
