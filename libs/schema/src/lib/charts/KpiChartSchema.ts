import {
  Boolean,
  Literal,
  Null,
  Number,
  Record,
  Static,
  String,
  Union,
} from 'runtypes';

import { ObjectType } from '../runtypes';
import { CommonVisualizationWidgetSchema } from './CommonVisualizationWidgetSchema';
import { JqVisualisationWidgetSchema } from './JqVisualisationWidgetSchema';
import { JspVisualisationWidgetSchema } from './JspVisualisationWidgetSchema';
import { KpiFormatSchema } from './KpiFormatSchema';
import { MarginSchema } from './MarginSchema';

export const KpiChartPropsSchema = ObjectType(
  {
    title: String,
    prefix: String,
    suffix: String,
    widgetStyle: Union(
      Literal('number'),
      Literal('datetime'),
      Literal('duration')
    ),
    showBorder: Boolean,
  },
  {
    format: KpiFormatSchema,
    margin: MarginSchema,
    textColor: String,
  }
);

export const KpiChartSchema = CommonVisualizationWidgetSchema.And(
  Record({
    type: Literal('KpiChart'),
    chartProps: KpiChartPropsSchema,
  })
);

export const KpiChartObjectSchema = ObjectType({
  id: String,
  value: Union(Null, Number),
});

export type KpiChartObject = Static<typeof KpiChartObjectSchema>;

export const KpiChartVisualisationWidgetSchema = KpiChartSchema.And(
  Record({
    data: KpiChartObjectSchema,
  })
);

export const JspKpiChartSchema = JspVisualisationWidgetSchema.And(
  KpiChartSchema
);

export const JqKpiChartSchema = JqVisualisationWidgetSchema.And(KpiChartSchema);
