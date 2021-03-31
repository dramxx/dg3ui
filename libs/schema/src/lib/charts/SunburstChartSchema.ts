import { Array, Literal, Record, Union } from 'runtypes';

import { AnyObject } from '../runtypes';
import { CommonChartSchema } from './CommonChartSchema';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JqVisualisationWidgetSchema } from './JqVisualisationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';

export const SunburstChartPropsSchema = CommonChartSchema.And(
  Record({
    enableLabelRotation: Union(
      Literal(0),
      Literal('tangential'),
      Literal('radial')
    ),
  })
);

export const SunburstChartSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('SunburstChart'),
    chartProps: SunburstChartPropsSchema,
  })
);

export const SunburstChartVisualisationWidgetSchema = SunburstChartSchema.And(
  Record({
    data: Array(AnyObject),
  })
);

export const JspSunburstChartSchema = JspVisualisationWidgetSchema.And(
  SunburstChartSchema
);

export const JqSunburstChartSchema = JqVisualisationWidgetSchema.And(
  SunburstChartSchema
);
