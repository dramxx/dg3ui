import { IntlShape } from 'react-intl';

import { MappingObject } from '@dg3/schema';
import { FilterChip, OverviewPageType, SimpleFilter } from '@dg3/types';
import { randomId } from '@dg3/utils';
import { createSimpleFilterChipLabel } from '../../filter/createSimpleFilterChipLabel';
import {
  informationColumnIdToAttributeSelection,
  informationColumnIdToEntitySelection,
} from '../../filter/InformationColumnIdToSimpleFilter';
import { Detail } from '../detail/Detail';
import { handleDEVIColumnFilter } from '../DEVI';
import { handlePlacColumnFilter } from '../PLAC';
import { EVEN_EVENTS_LOG_OVERVIEW_GQL } from './overview/EvenEventsLogOverviewGql';

export const handleEVENColumnFilter = (
  columnId: string,
  value: MappingObject,
  intl: IntlShape
): FilterChip => {
  switch (columnId) {
    case 'author':
      // Currently we support only devices as author
      if (value.keyId === 'information:attribute.ckod') {
        return handleDEVIColumnFilter(value.keyId, value, intl);
      }
      return undefined;
    case 'object':
      // Currently we support only devices as author
      if (
        value.keyId === 'information:attribute.anlage' ||
        value.keyId === 'information:attribute.sjz'
      ) {
        return handlePlacColumnFilter(value.keyId, value, intl);
      }
      return undefined;

    default:
      const simpleFilter: SimpleFilter = {
        entitySelection: informationColumnIdToEntitySelection(columnId),
        attributeSelection: informationColumnIdToAttributeSelection(
          columnId,
          value?.keyId
        ),
        relationalOperator: 'EQUAL',
        values: [{ id: value.valueId, name: value.value, intId: value.intId }],
      };

      const condition: FilterChip = {
        id: randomId(),
        label: createSimpleFilterChipLabel(simpleFilter, intl),
        coreEl: 'INFORMATION',
        type: 'SIMPLE',
        value: JSON.stringify(simpleFilter),
      };

      return condition;
  }
};

export const EvenOverviewPagesDefinition: Array<OverviewPageType> = [
  {
    id: 'events_log',
    name: 'log událostí',
    tableName: 'časový log událostí',
    module: 'EVEN',
    overview: EVEN_EVENTS_LOG_OVERVIEW_GQL,
    onColumnFilter: handleEVENColumnFilter,
    type: 'OVERVIEW',
    enableImport: false,
    detail: Detail,
    includedFilters: ['info', 'time', 'device', 'place'],
  },
];
