export const DELAY = 1000; // ms

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

export const BAR_CHART_COLOR = '#b7a5fb';
export const BAR_CHART_COLOR_HOVER = '#5e49af';
export const BAR_CHART_COLOR_PLACEHOLDER = '#f0f0f0';
export const BAR_CHART_COLOR_PLACEHOLDER_HOVER = '#e0e0e0';

// SIZES

export const SVGViewBoxHeight = 170;
export const SVGViewBoxWidth = 900;
