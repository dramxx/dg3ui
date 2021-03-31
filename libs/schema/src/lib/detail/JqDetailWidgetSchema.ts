import { Literal, Static, String } from 'runtypes';

import { AnyObject, ObjectType } from '../runtypes';
import { CommonDetailWidgetSchema } from './CommonDetailWidgetSchema';

export const JqDetailWidgetSchema = CommonDetailWidgetSchema.And(
  ObjectType(
    {
      type: String,
      language: Literal('jq'),
      query: String,
      transformation: String,
    },
    {
      config: AnyObject,
    }
  )
);

export type JqDetailWidgetConfig = Static<typeof JqDetailWidgetSchema>;
