import { Literal, Static, String } from 'runtypes';

import { JsonPathMappingSchema } from '../gql/JsonPathMapping';
import { AnyObject, ObjectType } from '../runtypes';
import {
  CommonVisualizationWidgetSchema,
  IncludedFiltersSchema,
} from './CommonVisualizationWidgetSchema';

export const JspVisualisationWidgetSchema = CommonVisualizationWidgetSchema.And(
  ObjectType(
    {
      type: String,
      language: Literal('jsonpath'),
      query: String,
      rootPath: String,
      jsonPathMapping: JsonPathMappingSchema,
      includedFilters: IncludedFiltersSchema,
    },
    {
      config: AnyObject,
    }
  )
);

export type JspVisualisationWidgetConfig = Static<
  typeof JspVisualisationWidgetSchema
>;
