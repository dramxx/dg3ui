import { Boolean, Literal, Record, String, Union } from 'runtypes';

import { AnyObject, ObjectType } from '../runtypes';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';
import { KpiFormatSchema } from './KpiFormatSchema';
import { MarginSchema } from './MarginSchema';

export const MeterChartPropsSchema = ObjectType(
  {
    prefix: String,
    suffix: String,
    kpiFormat: KpiFormatSchema,
    widgetStyle: Union(Literal('arc'), Literal('progress'), Literal('metric')),
    showBorder: Boolean,
  },
  {
    title: String,
    margin: MarginSchema,
    textColor: String,
  }
);

export const MeterChartSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('MeterChart'),
    chartProps: MeterChartPropsSchema,
  })
);

export const MeterChartVisualisationWidgetSchema = MeterChartSchema.And(
  Record({
    data: AnyObject,
  })
);

export const JspMeterChartSchema = JspVisualisationWidgetSchema.And(
  MeterChartSchema
);
