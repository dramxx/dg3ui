import { Boolean, Literal, Record, Union } from 'runtypes';

import { AnyObject } from '../runtypes';
import { CommonChartSchema } from './CommonChartSchema';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';

export const GraphChartPropsSchema = CommonChartSchema.And(
  Record({
    layout: Union(Literal('none'), Literal('circular')),
    enableRoam: Boolean,
  })
);

export const GraphChartSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('GraphChart'),
    chartProps: GraphChartPropsSchema,
  })
);

export const GraphVisualisationWidgetSchema = GraphChartSchema.And(
  Record({
    data: AnyObject,
  })
);

export const JspGraphChartSchema = JspVisualisationWidgetSchema.And(
  GraphChartSchema
);
