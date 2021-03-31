import { Array, Literal, Record, Static } from 'runtypes';

import { GqlVisualisationSettingsSchema } from '../gql/GqlVisualisationSettingsSchema';
import {
  OverviewTableDataSchema,
  TableColumnSchema,
} from '../gql/TableSchemas';
import { CommonDetailWidgetSchema } from './CommonDetailWidgetSchema';

const BaseDetailTableWidgetSchema = CommonDetailWidgetSchema.And(
  Record({
    type: Literal('Table'),
    columns: Array(TableColumnSchema),
  })
);

export const JspDetailTableWidgetSchema = BaseDetailTableWidgetSchema.And(
  Record({
    gql: GqlVisualisationSettingsSchema,
    language: Literal('jsonpath'),
  })
);

export type JspDetailTableWidgetConfig = Static<
  typeof JspDetailTableWidgetSchema
>;

export const DetailTableWidgetSchema = BaseDetailTableWidgetSchema.And(
  Record({
    data: OverviewTableDataSchema,
  })
);

export type DetailTableWidgetConfig = Static<typeof DetailTableWidgetSchema>;
