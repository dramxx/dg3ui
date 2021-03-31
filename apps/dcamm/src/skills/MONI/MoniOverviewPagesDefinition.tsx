import { IntlShape } from 'react-intl';

import { MappingObject } from '@dg3/schema';
import { FilterChip, OverviewPageType } from '@dg3/types';
import { handleTaskFilter } from '../../filter/handleTaskFilter';
import { Detail } from '../detail/Detail';
import { handleDEVIColumnFilter } from '../DEVI';
import { handlePlacColumnFilter } from '../PLAC';
import { MONI_TASK_LOG_OVERVIEW_GQL } from './overview/MoniTaskLogOverviewGql';

const onColumnFilter = (
  columnId: string,
  value: MappingObject,
  intl: IntlShape
): FilterChip => {
  switch (columnId) {
    case 'template':
      return handleTaskFilter(value, intl);
    case 'mediator':
      return handleDEVIColumnFilter(value.keyId, value, intl);
    case 'dts':
      return handlePlacColumnFilter(value.keyId, value, intl);
  }
  return undefined;
};

export const MoniOverviewPagesDefinition: Array<OverviewPageType> = [
  {
    id: 'log_uloh',
    name: 'log úloh',
    tableName: 'log monitorovacích úloh',
    module: 'MONI',
    overview: MONI_TASK_LOG_OVERVIEW_GQL,
    type: 'OVERVIEW',
    detail: Detail,
    includedFilters: ['time', 'task', 'device'],
    onColumnFilter,
  },
];
