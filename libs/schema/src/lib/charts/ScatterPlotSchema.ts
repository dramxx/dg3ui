import { Array, Boolean, Literal, Record, String } from 'runtypes';

import { AnyObject, ObjectType, PositiveInt } from '../runtypes';
import { CommonChartSchema } from './CommonChartSchema';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';

export const ScatterPlotPropsSchema = CommonChartSchema.And(
  ObjectType(
    {
      axisXLabel: String,
      axisYLabel: String,
      valueLabel: String,
      enableXZoom: Boolean,
    },
    {
      minSymbolSize: PositiveInt,
      maxSymbolSize: PositiveInt,
    }
  )
);

export const ScatterPlotSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('ScatterPlot'),
    chartProps: ScatterPlotPropsSchema,
  })
);

export const ScatterPlotVisualisationWidgetSchema = ScatterPlotSchema.And(
  Record({
    data: Array(AnyObject),
  })
);

export const JspScatterPlotSchema = JspVisualisationWidgetSchema.And(
  ScatterPlotSchema
);
