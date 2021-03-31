import { IntlShape } from 'react-intl';

import { MappingObject } from '@dg3/schema';
import { FilterChip, OverviewPageType, SimpleFilter } from '@dg3/types';
import { randomId } from '@dg3/utils';
import { createSimpleFilterChipLabel } from '../../filter/createSimpleFilterChipLabel';
import {
  deviColumnIdToAttributeSelection,
  deviColumnIdToEntitySelection,
} from '../../filter/DeviceColumnIdToSimpleFilter';
import { Detail } from '../detail/Detail';
import { DEVI_LIST_OVERVIEW_GQL } from './overview/DeviListOverviewGql';
import { SAP_OVERVIEW_GQL } from './overview/SAPOverviewGql';

export const handleDEVIColumnFilter = (
  columnId: string,
  value: MappingObject,
  intl: IntlShape
): FilterChip => {
  const simpleFilter: SimpleFilter = {
    entitySelection: deviColumnIdToEntitySelection(columnId),
    attributeSelection: deviColumnIdToAttributeSelection(
      columnId,
      value?.keyId
    ),
    relationalOperator: 'EQUAL',
    values: [{ id: value.valueId, name: value.value, intId: value.intId }],
  };

  const condition: FilterChip = {
    id: randomId(),
    label: createSimpleFilterChipLabel(simpleFilter, intl),
    coreEl: 'DEVICE',
    type: 'SIMPLE',
    value: JSON.stringify(simpleFilter),
  };

  return condition;
};

export const DeviOverviewPagesDefinition: Array<OverviewPageType> = [
  {
    id: 'SAP_log',
    name: 'log SAP úloh',
    tableName: 'log SAP úloh',
    module: 'DEVI',
    overview: SAP_OVERVIEW_GQL,
    type: 'OVERVIEW',
    enableImport: false,
    detail: Detail,
    includedFilters: ['time'],
  },
  {
    id: 'seznam',
    name: 'seznam',
    tableName: 'seznam zařízení',
    module: 'DEVI',
    overview: DEVI_LIST_OVERVIEW_GQL,
    onColumnFilter: handleDEVIColumnFilter,
    type: 'OVERVIEW',
    enableImport: true,
    detail: Detail,
    includedFilters: ['device', 'place'],
  },
];
