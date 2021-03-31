import { Literal, Record, Static, String } from 'runtypes';

import { GqlVisualisationSettingsSchema } from '../gql/GqlVisualisationSettingsSchema';
import { ObjectType } from '../runtypes';
import { CommonDetailWidgetSchema } from './CommonDetailWidgetSchema';

export const BaseDetailJsonWidgetSchema = CommonDetailWidgetSchema.And(
  Record({
    type: Literal('Json'),
  })
);

export const JspDetailJsonWidgetSchema = BaseDetailJsonWidgetSchema.And(
  Record({
    gql: GqlVisualisationSettingsSchema,
    language: Literal('jsonpath'),
  })
);

export type JspDetailJsonWidgetConfig = Static<
  typeof JspDetailJsonWidgetSchema
>;

export const DetailJsonDataSchema = ObjectType({
  key: String,
  value: String,
});

export const DetailJsonWidgetSchema = BaseDetailJsonWidgetSchema.And(
  Record({
    data: DetailJsonDataSchema,
  })
);

export type DetailJsonWidgetConfig = Static<typeof DetailJsonWidgetSchema>;
