import {
  FC, useEffect, useMemo, useRef, useState,
} from 'react';

import styles from './ReqsChart.module.css';

import CheckIcon from '@/components/CheckIcon';
import {
  SVGViewBoxHeight,
  SVGViewBoxWidth,
  BAR_CHART_COLOR_PLACEHOLDER_HOVER,
  BAR_CHART_COLOR_HOVER,
  BAR_CHART_COLOR_PLACEHOLDER,
  BAR_CHART_COLOR,
} from '../../constants';
import { IData } from '../../types';
import fixedHelper from '../../utils/fixedHelper';
import roundToThousand from '../../utils/roundToThousand';

interface IProps {
  setSelectedItemIndex: (index: number | null) => void;
  selectedItemIndex: number | null;
  pathArray: IData[];
  maxDataLength: number;
  max: number;
  isCompleted: boolean;
  requests: number;
  totalRequests: number;
  totalRequestsCompare: number;
  showTooltip?: boolean;
}

const CustomBarChart: FC<IProps> = ({
  setSelectedItemIndex,
  selectedItemIndex,
  pathArray,
  max,
  maxDataLength,
  isCompleted,
  requests,
  totalRequests,
  totalRequestsCompare,
  showTooltip,
}) => {
  const [tipPosition, setTipPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const svgHeight = SVGViewBoxHeight;
  const svgWidth = SVGViewBoxWidth;
  const selectedBarRef = useRef<SVGRectElement>(null!);
  const svgGroupRef = useRef<SVGGElement>(null!);
  const statsRef = useRef<HTMLDivElement>(null!);
  const fullItemSize = svgWidth / maxDataLength;
  const itemSize = (svgWidth - fullItemSize / 2) / (maxDataLength - 1);

  const calculatePath = (arr: IData[]) => arr
    .map(
      (item, index) => `${(index * itemSize).toFixed(2)},${svgHeight},${(index * itemSize).toFixed(2)},${(svgHeight - (svgHeight * item.reqs) / max).toFixed(2)},${(index * itemSize + itemSize / 2).toFixed(2)},${(svgHeight - (svgHeight * item.reqs) / max).toFixed(2)},${(index * itemSize + itemSize / 2).toFixed(2)},${svgHeight},${((index + 1) * itemSize).toFixed(2)},${svgHeight}`,
    )
    .join(',');

  const getPolylines = (
    <g>
      <polyline
        fill={BAR_CHART_COLOR}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={`0 ${svgHeight} ${calculatePath(pathArray)} ${((pathArray.length - 1) * itemSize).toFixed(2)} ${svgHeight}`}
      />
    </g>
  );

  const calculateRect = () => pathArray.map(() => `v-${svgHeight}h${(itemSize / 2).toFixed(2)}v${svgHeight}h${(itemSize / 2).toFixed(2)}`).join('');

  const generateRect = (
    <path
      fill={BAR_CHART_COLOR_PLACEHOLDER}
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
      d={`M0 ${svgHeight} ${calculateRect()} ${svgHeight}Z`}
    />
  );

  const getRects = useMemo(() => pathArray.map((_, index) => (
    <rect
      key={index}
      fill="transparent"
      width={itemSize}
      height={svgHeight}
      onMouseEnter={() => setSelectedItemIndex(index)}
      x={index * itemSize - itemSize / 4}
      y={0}
    />
  )), [pathArray.length]);

  const removeSelectedItemIndex = () => {
    setSelectedItemIndex(null);
  };

  useEffect(() => {
    if (
      selectedBarRef.current
			&& svgGroupRef.current
			&& selectedItemIndex !== null
    ) {
      const { x } = selectedBarRef.current.getBoundingClientRect();
      const { y } = svgGroupRef.current.getBoundingClientRect();
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
          avg:
          {' '}
          {roundToThousand(requests)}
          {' '}
          req/sec
        </div>
        <div className={styles['info-wrap']}>
          <div className={(isCompleted && showTooltip) ? styles['tooltip-wrap-underline'] : styles['tooltip-wrap']}>
            <div className={styles.tooltip}>
              Drizzle handled x
              {fixedHelper(totalRequests / totalRequestsCompare, 2)}
              {' '}
              more
              requests
            </div>
            {pathArray.length > 0 && isCompleted && showTooltip && (
            <>
              <div className={styles['success-icon-wrap']}>
                <CheckIcon />
              </div>
              x
              {fixedHelper(totalRequests / totalRequestsCompare, 2)}
            </>
            )}
          </div>
          {pathArray.length > 0 && isCompleted && showTooltip && ' | '}
          {roundToThousand(totalRequests)}
        </div>
      </div>
      <div className={styles['chart-wrap']} onMouseLeave={removeSelectedItemIndex}>
        <svg
          viewBox={`0 0 ${svgWidth + 7} ${svgHeight + 15}`}
          className="chart"
        >
          <g ref={svgGroupRef} transform="translate(0,10)">
            <g>
              {generateRect}
            </g>
            {getPolylines}
            {selectedItemIndex !== null && (
            <g>
              <rect
                ref={selectedBarRef}
                fill={BAR_CHART_COLOR_PLACEHOLDER_HOVER}
                width={itemSize / 2}
                height={svgHeight}
                x={selectedItemIndex * itemSize}
                y={0}
              />
              <rect
                fill={BAR_CHART_COLOR_HOVER}
                width={itemSize / 2}
                x={selectedItemIndex * itemSize}
                y={svgHeight - (svgHeight * pathArray[selectedItemIndex].reqs) / max}
                height={svgHeight - (svgHeight
                  - (svgHeight * pathArray[selectedItemIndex].reqs) / max)}
              />
            </g>
            )}
            <line
              x1="0"
              y1="0"
              x2={svgWidth}
              y2="0"
              fill="none"
              strokeWidth="1"
              stroke={BAR_CHART_COLOR}
              transform={`translate(0, ${svgHeight})`}
            />
            <g onMouseLeave={removeSelectedItemIndex}>
              {getRects}
            </g>
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
          {pathArray[selectedItemIndex].reqs}
          {' '}
          req/sec
        </div>
        )}
      </div>
    </div>
  );
};

export default CustomBarChart;
