import { Static, Union } from 'runtypes';

import {
  BarChartSchema,
  BarVisualisationWidgetSchema,
  JqBarChartSchema,
  JspBarChartSchema,
} from '../charts/BarChartSchema';
import {
  GraphChartSchema,
  GraphVisualisationWidgetSchema,
  JspGraphChartSchema,
} from '../charts/GraphChartSchema';
import {
  CalendarHeatMapSchema,
  CalendarHeatMapVisualisationWidgetSchema,
  JqMultiSeriesHeatMapSchema,
  JspCalendarHeatMapSchema,
  JspMultiSeriesHeatMapSchema,
  MultiSeriesHeatMapSchema,
  MultiSeriesHeatMapVisualisationWidgetSchema,
} from '../charts/HeatMapSchema';
import {
  JqKpiChartSchema,
  JspKpiChartSchema,
  KpiChartSchema,
  KpiChartVisualisationWidgetSchema,
} from '../charts/KpiChartSchema';
import {
  JspLineChartSchema,
  LineChartSchema,
  LineChartVisualisationWidgetSchema,
} from '../charts/LineChartSchema';
import {
  JspMeterChartSchema,
  MeterChartSchema,
  MeterChartVisualisationWidgetSchema,
} from '../charts/MeterChartSchema';
import {
  JqPieChartSchema,
  JspPieChartSchema,
  PieChartSchema,
  PieChartVisualisationWidgetSchema,
} from '../charts/PieChartSchema';
import {
  JspScatterPlotSchema,
  ScatterPlotSchema,
  ScatterPlotVisualisationWidgetSchema,
} from '../charts/ScatterPlotSchema';
import {
  JqSunburstChartSchema,
  JspSunburstChartSchema,
  SunburstChartSchema,
  SunburstChartVisualisationWidgetSchema,
} from '../charts/SunburstChartSchema';
import {
  JqTableWidgetSchema,
  JspTableWidgetSchema,
  TableVisualisationWidgetSchema,
  TableWidgetSchema,
} from '../charts/TableWidgetSchema';

export const VisualizationWidgetSchema = Union(
  LineChartSchema,
  GraphChartSchema,
  BarChartSchema,
  PieChartSchema,
  MeterChartSchema,
  KpiChartSchema,
  ScatterPlotSchema,
  TableWidgetSchema,
  CalendarHeatMapSchema,
  MultiSeriesHeatMapSchema,
  SunburstChartSchema
);

export const JspVisualisationWidgetSchema = Union(
  JspBarChartSchema,
  JspCalendarHeatMapSchema,
  JspGraphChartSchema,
  JspKpiChartSchema,
  JspLineChartSchema,
  JspMeterChartSchema,
  JspMultiSeriesHeatMapSchema,
  JspPieChartSchema,
  JspScatterPlotSchema,
  JspSunburstChartSchema,
  JspTableWidgetSchema
);

export const JqVisualisationWidgetSchema = Union(
  JqTableWidgetSchema,
  JqKpiChartSchema,
  JqBarChartSchema,
  JqMultiSeriesHeatMapSchema,
  JqPieChartSchema,
  JqSunburstChartSchema
);

export const VisualisationWidgetConfigSchema = Union(
  JspVisualisationWidgetSchema,
  JqVisualisationWidgetSchema
);

export type VisualizationConfig = Static<
  typeof VisualisationWidgetConfigSchema
>;

export const OutputVisualisationWidgetSchema = Union(
  BarVisualisationWidgetSchema,
  CalendarHeatMapVisualisationWidgetSchema,
  GraphVisualisationWidgetSchema,
  KpiChartVisualisationWidgetSchema,
  LineChartVisualisationWidgetSchema,
  MeterChartVisualisationWidgetSchema,
  MultiSeriesHeatMapVisualisationWidgetSchema,
  PieChartVisualisationWidgetSchema,
  ScatterPlotVisualisationWidgetSchema,
  SunburstChartVisualisationWidgetSchema,
  TableVisualisationWidgetSchema
);

export type OutputVisualisationWidgetConfig = Static<
  typeof OutputVisualisationWidgetSchema
>;
