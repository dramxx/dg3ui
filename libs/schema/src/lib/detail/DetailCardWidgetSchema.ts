import {
  Array,
  Boolean,
  Literal,
  Null,
  Number,
  Record,
  Static,
  String,
  Union,
} from 'runtypes';

import { GqlVisualisationSettingsSchema } from '../gql/GqlVisualisationSettingsSchema';
import { CommonDetailWidgetSchema } from './CommonDetailWidgetSchema';

const BaseDetailCardWidgetSchema = CommonDetailWidgetSchema.And(
  Record({
    type: Literal('Cards'),
  })
);

export const JspDetailCardWidgetSchema = BaseDetailCardWidgetSchema.And(
  Record({
    gql: GqlVisualisationSettingsSchema,
    language: Literal('jsonpath'),
  })
);

export type JspDetailCardWidgetConfig = Static<
  typeof JspDetailCardWidgetSchema
>;

export const DetailCardDataSchema = Array(
  Record({
    key: String,
    label: String,
    value: Union(String, Boolean, Null, Number),
  })
);

export const DetailCardWidgetSchema = BaseDetailCardWidgetSchema.And(
  Record({
    data: DetailCardDataSchema,
  })
);

export type DetailCardWidgetConfig = Static<typeof DetailCardWidgetSchema>;
