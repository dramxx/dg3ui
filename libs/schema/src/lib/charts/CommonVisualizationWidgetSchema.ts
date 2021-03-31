import { Array, Literal, Record, String, Union } from 'runtypes';

import { PositiveInt, PositiveZeroInt } from '../runtypes';

export const IncludedFiltersSchema = Array(
  Union(
    Literal('place'),
    Literal('device'),
    Literal('task'),
    Literal('time'),
    Literal('info')
  )
);

export const CommonVisualizationWidgetSchema = Record({
  id: String,
  overviewModule: String,
  overviewId: String,
  includedFilters: IncludedFiltersSchema,
  position: Record({
    x: PositiveZeroInt,
    y: PositiveZeroInt,
    width: PositiveInt,
    height: PositiveInt,
  }),
});
