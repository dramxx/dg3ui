import { Array, Record, Static, String } from 'runtypes';

import { DetailWidgetConfigSchema } from './DetailWidgetSchema';

export const DetailConfigSchema = Record({
  id: String,
  version: String,
  widgets: Array(DetailWidgetConfigSchema),
});

export type DetailConfig = Static<typeof DetailConfigSchema>;
