import { IntlShape } from 'react-intl';

import { MappingObject } from '@dg3/schema';
import { FilterChip, SimpleFilter } from '@dg3/types';
import { randomId } from '@dg3/utils';
import { createSimpleFilterChipLabel } from './createSimpleFilterChipLabel';

export const handleTaskFilter = (
  value: MappingObject,
  intl: IntlShape
): FilterChip => {
  const simpleFilter: SimpleFilter = {
    entitySelection: 'TASK',
    attributeSelection: value.keyId,
    relationalOperator: 'EQUAL',
    values: [{ id: value.valueId, name: value.value, intId: value.intId }],
  };
  const condition: FilterChip = {
    id: randomId(),
    label: createSimpleFilterChipLabel(simpleFilter, intl),
    coreEl: 'TASK',
    type: 'SIMPLE',
    value: JSON.stringify(simpleFilter),
  };
  return condition;
};
