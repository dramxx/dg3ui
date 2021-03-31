import { String } from 'runtypes';

import { ObjectType } from '../runtypes';

export const CommonDetailWidgetSchema = ObjectType(
  {
    id: String,
  },
  {
    title: String,
  }
);
