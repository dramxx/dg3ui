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
import { MEAS_MEASUREMENTS_LOG_OVERVIEW_GQL } from './overview/MeasMeasurementsLogOverviewGql';

export const handleMeasColumnFilter = (
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

export const MeasOverviewPagesDefinition: Array<OverviewPageType> = [
  {
    id: 'measurements_log',
    name: 'log měření',
    tableName: 'log měření',
    module: 'MEAS',
    overview: MEAS_MEASUREMENTS_LOG_OVERVIEW_GQL,
    type: 'OVERVIEW',
    onColumnFilter: handleMeasColumnFilter,
    enableImport: false,
    detail: Detail,
    includedFilters: ['info', 'time', 'device', 'place'],
  },
];
