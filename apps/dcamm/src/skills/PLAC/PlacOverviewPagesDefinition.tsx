import { IntlShape } from 'react-intl';

import { MappingObject } from '@dg3/schema';
import { FilterChip, OverviewPageType, SimpleFilter } from '@dg3/types';
import { randomId } from '@dg3/utils';
import { createSimpleFilterChipLabel } from '../../filter/createSimpleFilterChipLabel';
import {
  placeColumnIdToAttributeSelection,
  placeColumnIdToEntitySelection,
} from '../../filter/PlaceColumnIdToSimpleFilter';
import { Detail } from '../detail/Detail';
import { SAP_OVERVIEW_GQL } from '../DEVI/overview/SAPOverviewGql';
import { PLAC_LIST_OVERVIEW_GQL } from './overview/PlacListOverviewGql';

export const handlePlacColumnFilter = (
  columnId: string,
  value: MappingObject,
  intl: IntlShape
): FilterChip => {
  const simpleFilter: SimpleFilter = {
    entitySelection: placeColumnIdToEntitySelection(columnId),
    attributeSelection: placeColumnIdToAttributeSelection(
      columnId,
      value?.keyId
    ),
    relationalOperator: 'EQUAL',
    values: [{ id: value.valueId, name: value.value, intId: value.intId }],
  };

  const condition: FilterChip = {
    id: randomId(),
    label: createSimpleFilterChipLabel(simpleFilter, intl),
    coreEl: 'PLACE',
    type: 'SIMPLE',
    value: JSON.stringify(simpleFilter),
  };

  return condition;
};

export const PlacOverviewPagesDefinition: Array<OverviewPageType> = [
  {
    id: 'SAP_log',
    name: 'log SAP úloh',
    tableName: 'log SAP úloh',
    module: 'PLAC',
    overview: SAP_OVERVIEW_GQL,
    type: 'OVERVIEW',
    enableImport: false,
    detail: Detail,
    includedFilters: ['time'],
  },
  {
    id: 'seznam',
    name: 'seznam',
    tableName: 'seznam míst',
    module: 'PLAC',
    overview: PLAC_LIST_OVERVIEW_GQL,
    onColumnFilter: handlePlacColumnFilter,
    type: 'OVERVIEW',
    enableImport: true,
    detail: Detail,
    includedFilters: ['place'],
  },
];
