import { IntlShape } from 'react-intl';

import { MappingObject } from '@dg3/schema';
import { FilterChip, OverviewPageType } from '@dg3/types';
import { handleTaskFilter } from '../../filter/handleTaskFilter';
import { Detail } from '../detail/Detail';
import { LOAD_LIST_OVERVIEW_GQL } from './overview/LoadListOverviewGql';
import { LOAD_TASK_LOG_OVERVIEW_GQL } from './overview/LoadTaskLogOverview';

const onColumnFilter = (
  columnId: string,
  value: MappingObject,
  intl: IntlShape
): FilterChip => {
  switch (columnId) {
    case 'template':
      return handleTaskFilter(value, intl);
  }
};

export const LoadOverviewPagesDefinition: Array<OverviewPageType> = [
  {
    id: 'plany',
    name: 'spínací plány',
    tableName: 'spínací plány',
    module: 'LOAD',
    overview: LOAD_LIST_OVERVIEW_GQL,
    type: 'OVERVIEW',
    detail: Detail,
    includedFilters: ['time'],
  },
  {
    id: 'log_ulog',
    name: 'log úloh',
    tableName: 'přehled běhů úloh',
    module: 'LOAD',
    overview: LOAD_TASK_LOG_OVERVIEW_GQL,
    type: 'OVERVIEW',
    detail: Detail,
    includedFilters: ['time', 'task', 'device'],
    onColumnFilter,
  },
];
