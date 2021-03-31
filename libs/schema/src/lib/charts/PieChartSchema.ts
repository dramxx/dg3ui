import { Boolean, Literal, Number, Record, Static, String } from 'runtypes';
import { Array } from 'runtypes/lib/types/array';

import { ObjectType } from '../runtypes';
import { CommonChartSchema } from './CommonChartSchema';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JqVisualisationWidgetSchema } from './JqVisualisationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';

export const PieChartPropsSchema = CommonChartSchema.And(
  Record({
    enableRadialLabels: Boolean,
  })
);

export const PieChartSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('PieChart'),
    chartProps: PieChartPropsSchema,
  })
);

export const PieChartSeriesObjectSchema = ObjectType(
  {
    id: String,
    name: String,
    value: Number,
  },
  {
    color: String,
  }
);

export const PieChartVisualisationWidgetSchema = PieChartSchema.And(
  Record({
    data: Array(PieChartSeriesObjectSchema),
  })
);

export const JspPieChartSchema = JspVisualisationWidgetSchema.And(
  PieChartSchema
);

export const JqPieChartSchema = JqVisualisationWidgetSchema.And(PieChartSchema);

export type PieChartSeriesObject = Static<typeof PieChartSeriesObjectSchema>;

export type PieChartWidget = Static<typeof JspPieChartSchema>;
