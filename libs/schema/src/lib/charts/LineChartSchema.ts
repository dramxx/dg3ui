import { Array, Boolean, Literal, Record, String, Unknown } from 'runtypes';

import { CommonChartSchema } from './CommonChartSchema';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';

export const LineChartPropsSchema = CommonChartSchema.And(
  Record({
    enableLineTooltip: Boolean,
    enableArea: Boolean,
    axisXLabel: String,
    axisYLabel: String,
    enableXZoom: Boolean,
    layoutDirection: String,
  })
);

export const LineChartSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('LineChart'),
    chartProps: LineChartPropsSchema,
  })
);

export const LineChartVisualisationWidgetSchema = LineChartSchema.And(
  Record({
    data: Array(Unknown),
  })
);

export const JspLineChartSchema = JspVisualisationWidgetSchema.And(
  LineChartSchema
);
