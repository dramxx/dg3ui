import { IntlShape } from 'react-intl';

import { MappingObject } from '@dg3/schema';
import { FilterChip, OverviewPageType } from '@dg3/types';
import { handleTaskFilter } from '../../filter/handleTaskFilter';
import { Detail } from '../detail/Detail';
import { handleDEVIColumnFilter } from '../DEVI';
import { handlePlacColumnFilter } from '../PLAC';
import { READ_TASK_LOG_OVERVIEW_GQL } from './overview/ReadTaskLogOverview';

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
};

export const ReadOverviewPagesDefinition: Array<OverviewPageType> = [
  {
    id: 'log_uloh',
    name: 'log odečtových úloh',
    tableName: 'poslední odečtové úlohy na DTS',
    module: 'READ',
    overview: READ_TASK_LOG_OVERVIEW_GQL,
    type: 'OVERVIEW',
    enableImport: false,
    detail: Detail,
    includedFilters: ['time', 'task', 'device'],
    onColumnFilter,
  },
];
