export type ChartType =
  | 'BarChart'
  | 'CalendarHeatMap'
  | 'DetailCards'
  | 'GraphChart'
  | 'JsonWidget'
  | 'KpiChart'
  | 'LineChart'
  | 'MeterChart'
  | 'MultiSeriesHeatMap'
  | 'PieChart'
  | 'ScatterPlot'
  | 'SunburstChart'
  | 'TableWidget';

export type JsonReport = {
  id: string;
  name: string;
  author: string;
  description: string;
  config: string;
  module: string;
};

export type ModuleReports = {
  key: string;
  reports: Array<JsonReport>;
};
