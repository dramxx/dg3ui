import { Literal, Static, String } from 'runtypes';

import { AnyObject, ObjectType } from '../runtypes';
import {
  CommonVisualizationWidgetSchema,
  IncludedFiltersSchema,
} from './CommonVisualizationWidgetSchema';

export const JqVisualisationWidgetSchema = CommonVisualizationWidgetSchema.And(
  ObjectType(
    {
      type: String,
      language: Literal('jq'),
      query: String,
      transformation: String,
      chartProps: AnyObject,
      includedFilters: IncludedFiltersSchema,
    },
    {
      config: AnyObject,
    }
  )
);

export type JqVisualisationWidgetConfig = Static<
  typeof JqVisualisationWidgetSchema
>;
