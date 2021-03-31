import {
  Array,
  Literal,
  Null,
  Number,
  Record,
  Static,
  String,
  Union,
} from 'runtypes';

import { PositiveInt } from '../runtypes';
import { CommonChartSchema } from './CommonChartSchema';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JqVisualisationWidgetSchema } from './JqVisualisationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';

export const HeatMapDataSchema = Array(
  Record({
    timestamp: String,
    value: Union(Number, Null),
  })
);

export type HeatMapData = Static<typeof HeatMapDataSchema>;

export const HeatMapSeriesSchema = Array(
  Record({
    id: String,
    label: String,
    data: HeatMapDataSchema,
  })
);

export type HeatMapSeries = Static<typeof HeatMapSeriesSchema>;

export const CalendarHeatMapPropsSchema = CommonChartSchema.And(
  Record({
    cellSize: PositiveInt,
  })
);

export const CalendarHeatMapSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('CalendarHeatMap'),
    chartProps: CalendarHeatMapPropsSchema,
  })
);

export const CalendarHeatMapVisualisationWidgetSchema = CalendarHeatMapSchema.And(
  Record({
    data: HeatMapDataSchema,
  })
);

export const MultiSeriesHeatMapPropsSchema = CommonChartSchema.And(
  Record({
    xAxisLabel: String,
  })
);

export const MultiSeriesHeatMapSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('MultiSeriesHeatMap'),
    chartProps: MultiSeriesHeatMapPropsSchema,
  })
);

export const MultiSeriesHeatMapVisualisationWidgetSchema = MultiSeriesHeatMapSchema.And(
  Record({
    data: HeatMapSeriesSchema,
  })
);

export const JspCalendarHeatMapSchema = JspVisualisationWidgetSchema.And(
  CalendarHeatMapSchema
);

export const JspMultiSeriesHeatMapSchema = JspVisualisationWidgetSchema.And(
  MultiSeriesHeatMapSchema
);

export const JqMultiSeriesHeatMapSchema = JqVisualisationWidgetSchema.And(
  MultiSeriesHeatMapSchema
);
