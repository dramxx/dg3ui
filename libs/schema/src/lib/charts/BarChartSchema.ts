import {
  Array,
  Boolean,
  Dictionary,
  Literal,
  Null,
  Number,
  Record,
  Static,
  String,
  Union,
} from 'runtypes';

import { ObjectType } from '../runtypes';
import { CommonChartSchema } from './CommonChartSchema';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JqVisualisationWidgetSchema } from './JqVisualisationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';

export const AxisConfigurationObjectSchema = ObjectType(
  {
    label: String,
  },
  {
    min: Number,
    max: Number,
    minInterval: Number,
    maxInterval: Number,
  }
);

export const BarChartPropsSchema = CommonChartSchema.And(
  Record({
    xAxis: AxisConfigurationObjectSchema,
    yAxis: AxisConfigurationObjectSchema,
    enableXZoom: Boolean,
    layoutDirection: String,
  })
);

export const BarChartSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('BarChart'),
    chartProps: BarChartPropsSchema,
  })
);

export const BarChartSeriesObjectSchema = Dictionary(
  Union(Null, String, Number)
).And(Record({ id: String }));

export type BarChartSeriesObject = Static<typeof BarChartSeriesObjectSchema>;

export const BarVisualisationWidgetSchema = BarChartSchema.And(
  Record({
    data: Array(BarChartSeriesObjectSchema),
  })
);

export const JspBarChartSchema = JspVisualisationWidgetSchema.And(
  BarChartSchema
);

export const JqBarChartSchema = JqVisualisationWidgetSchema.And(BarChartSchema);

export type BarChartWidget = Static<typeof JspBarChartSchema>;
