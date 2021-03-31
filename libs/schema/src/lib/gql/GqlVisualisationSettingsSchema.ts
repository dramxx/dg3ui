import { Array, Record, Static, String } from 'runtypes';

import { JsonPathMappingSchema } from './JsonPathMapping';
import { TableColumnSchema } from './TableSchemas';

export const GqlVisualisationSettingsSchema = Record({
  query: String,
  rootPath: String,
  jsonPathMapping: JsonPathMappingSchema,
});

export const TableGqlVisualisationSettingsSchema = GqlVisualisationSettingsSchema.And(
  Record({
    widgetConfig: Array(TableColumnSchema),
  })
);

export type GqlWidgetConfig = Static<typeof GqlVisualisationSettingsSchema>;
export type GqlTableConfig = Static<typeof TableGqlVisualisationSettingsSchema>;
