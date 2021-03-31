import * as React from 'react';
import { FormatDateOptions } from 'react-intl';

import {
  BarChartSeriesObject,
  HeatMapData,
  HeatMapSeries,
  KpiChartObject,
  PieChartSeriesObject,
  TableEditable,
} from '@dg3/schema';
import { FilterTypeIndicatorKeys } from './FilterProps';
import { ColumnConf, TableDataObject } from './Table';

export type LineChartSeriesObject = {
  id: string;
  color?: string;
  data: Array<LineChartDataObject>;
};

type LineChartDataObject = {
  x: string | number;
  y: string | number;
};

export type ScatterPlotSeriesObject = {
  id: string;
  color?: string;
  // x, y, value, label, series_id
  data: Array<[number, number, number, string, string]>;
};

export type GraphChartNodeObject = {
  id: string;
  name: string;
  x: number;
  y: number;
  value: number;
  symbolSize: number;
  category: string;
};

export type GraphChartLinkObject = {
  id: string;
  name: string;
  source: string;
  target: string;
};

export type GraphChartDataObject = {
  rootNode?: GraphChartNodeObject;
  nodes: GraphChartNodeObject[];
  links: GraphChartLinkObject[];
};

export type SunburstChartSeriesObject = {
  name: string;
  value?: number;
  children?: Array<SunburstChartSeriesObject>;
};

export type MeterChartDataObject = {
  id: string;
  value: number;
  range: {
    from: number;
    to: number;
  };
  rangeProps: Array<MeterRangeObject>;
};

export type MeterRangeObject = {
  id: string;
  from: number;
  to: number;
  color: string;
  label: string;
};

export type KpiDataFormat = 'number' | 'datetime' | 'duration';

export type KpiDataFormatProps = {
  digits: number;
  timeZone: string;
  timeFormat: string;
  durationFormat: string;
};

export type MarginProps = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

export const JUSTIFY_CONTENT_TYPE = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
};

export type JustifyContent = keyof typeof JUSTIFY_CONTENT_TYPE;

export interface ChartWidgetProps {
  noData: boolean;
  chart: React.ReactNode;
  title?: string;
  justifyContent?: JustifyContent;
  onExport?: () => void;
  overviewModule: string;
  enableImport?: boolean;
  disableExport?: boolean;
  enableAdhoc?: boolean;
  enableDataSelection: boolean;
  showBorder: boolean;
  showFooter: boolean;
  includedFilters?: Array<FilterTypeIndicatorKeys>;
  refetchQuery?: (variables?: {}) => void;
}

export interface OverviewWidgetProps {
  noData: boolean;
  overview: React.ReactNode;
  title: string;
  pageSize: number;
  changePageSize: (newPageSize: number) => void;
  onExport?: () => void;
  enableImport?: boolean;
  module: string;
  overviewModule: string;
  enableDataSelection: boolean;
  includeFilters: FilterTypeIndicatorKeys[];
}

export interface ChartProps {
  type: string;
  overviewModule: string;
  colors: Array<string>;
  title?: string;
  includedFilters?: Array<FilterTypeIndicatorKeys>;
  legendShow: boolean;
  enableLegendHiding: boolean;
  enableDataSelection: boolean;
  enableDataLabels: boolean;
  enableTooltip: boolean;
  widgetStyle: string;
  showBorder: boolean;
  legendSize?: number;
}

export interface LineChartProps extends ChartProps {
  data: LineChartSeriesObject[];
  enableLineTooltip: boolean;
  enableArea: boolean;
  axisXLabel: string;
  axisYLabel: string;
  enableXZoom: boolean;
  layoutDirection: string;
}

export interface CalendarHeatMapProps extends ChartProps {
  data: HeatMapData;
  cellSize: number;
}

export interface MultiSeriesHeatMapProps extends ChartProps {
  data: HeatMapSeries;
  xAxisLabel: string;
}

export interface ScatterPlotChartProps extends ChartProps {
  data: ScatterPlotSeriesObject[];
  axisXLabel: string;
  axisYLabel: string;
  valueLabel: string;
  enableXZoom: boolean;
  minSymbolSize: number;
  maxSymbolSize: number;
}

export interface BarChartProps extends ChartProps {
  data: BarChartSeriesObject[];
  xAxis: {
    label: string;
    min?: number;
    max?: number;
    minInterval?: number;
    maxInterval?: number;
    formatDateOpts?: FormatDateOptions;
  };
  yAxis: {
    label: string;
    min?: number;
    max?: number;
    minInterval?: number;
    maxInterval?: number;
    formatDateOpts?: FormatDateOptions;
  };
  enableXZoom: boolean;
  layoutDirection: string;
}

export interface PieChartProps extends ChartProps {
  data: Array<PieChartSeriesObject>;
  enableRadialLabels: boolean;
}

export interface GraphChartProps extends ChartProps {
  data: GraphChartDataObject;
  layout: 'none' | 'circular';
  enableRoam: boolean;
}

export interface SunburstChartProps extends ChartProps {
  data: SunburstChartSeriesObject[];
  enableLabelRotation: 0 | 'tangential' | 'radial';
}

export interface KpiChartProps {
  type: string;
  overviewModule: string;
  title: string;
  width: number;
  height: number;
  widgetStyle: 'number' | 'datetime' | 'duration';
  showBorder: boolean;
  data: KpiChartObject;
  prefix: string;
  suffix: string;
  format: KpiDataFormatProps;
  margin?: MarginProps;
  textColor?: string;
  includedFilters?: Array<FilterTypeIndicatorKeys>;
}

export interface MeterChartProps {
  type: string;
  overviewModule: string;
  title: string;
  widgetStyle: 'arc' | 'progress' | 'metric';
  showBorder: boolean;
  data: MeterChartDataObject;
  prefix: string;
  suffix: string;
  kpiFormat: KpiDataFormatProps;
  margin?: MarginProps;
  textColor?: string;
  includedFilters?: Array<FilterTypeIndicatorKeys>;
}

export interface TableWidgetProps {
  overviewModule: string;
  overviewId: string;
  title: string;
  height: string;
  showBorder: boolean;
  data: Array<TableDataObject>;
  columnsConf: Array<ColumnConf>;
  rangeOfRows?: Array<number>; // TODO deprecated
  enableImport?: boolean; // TODO: solve visualisation actions by generic approach
  enableAdhoc?: boolean;
  rowsInTable: number;
  showExport: boolean;
  showPageSize: boolean;
  showPagination: boolean;
  includedFilters?: Array<FilterTypeIndicatorKeys>;
  editable?: TableEditable;
  refetchQuery?: (variables?: {}) => void;
}
