export const DELAY = 1000; // ms
export const TIMER_SPEED = 16;

// PROGRESSBAR

export const NUM_OF_LINES = 40;

// COLORS

interface IDataChartParams {
  [key: string]: {
    color: string;
    gradientColor: string;
  };
}

export const DATA_CHART_PARAMS: IDataChartParams = {
  avg: {
    color: '#0b6ec5',
    gradientColor: '#e2f4ff',
  },
  p90: {
    color: '#13862e',
    gradientColor: '#ddfce4',
  },
  p95: {
    color: '#5e49af',
    gradientColor: '#f1edfe',
  },
  p99: {
    color: '#b83a05',
    gradientColor: '#ffebde',
  },
};

export const CPULOAD_COLORS = {
  low: '#4CAF50',
  mid: '#FFC107',
  high: '#F44336',
};

export const BAR_CHART_COLOR = '#b7a5fb';
export const BAR_CHART_COLOR_HOVER = '#5e49af';
export const BAR_CHART_COLOR_PLACEHOLDER = '#f0f0f0';
export const BAR_CHART_COLOR_PLACEHOLDER_HOVER = '#e0e0e0';

// SIZES

export const SVGViewBoxHeight = 170;
export const SVGViewBoxWidth = 900;

export const INITIAL_AVERAGE_DATA = {
  avgLatency: 0,
  cpu1: 0,
  cpu2: 0,
  cpu3: 0,
  cpu4: 0,
  requestsPerSec: 0,
  sumOfRequests: 0,
  avgCpuLoad: 0,
};
