import { IntlShape } from 'react-intl';

import { MappingObject } from '@dg3/schema';
import { ContentFilterOptions, OverviewPageType } from '@dg3/types';
import { NtlDetailPage } from './detail/NtlDetailPage';
import { NTL_SUBSTATIONS_OVERVIEW_GQL } from './tables/NtlSubstationsOverviewGql';
import { NTL_SUSPICIONS_OVERVIEW_GQL } from './tables/NtlSuspicionsOverviewGql';

// TODO: This is just mocked function needs to be replaced by real one
export const mockedHandleColumnFilter = (
  columnId: string,
  value: MappingObject,
  intl: IntlShape
): ContentFilterOptions => {
  const options = {
    variables: {
      condition: null,
    },
  };

  return options;
};

export const NtlOverviewPagesDefinition: Array<OverviewPageType> = [
  {
    id: 'substations',
    name: 'substations',
    module: 'NTL',
    overview: NTL_SUBSTATIONS_OVERVIEW_GQL,
    detail: NtlDetailPage,
    type: 'OVERVIEW',
    onColumnFilter: mockedHandleColumnFilter,
    tableName: 'substations',
  },
  {
    id: 'suspicions',
    name: 'suspicions',
    module: 'NTL',
    overview: NTL_SUSPICIONS_OVERVIEW_GQL,
    detail: NtlDetailPage,
    type: 'OVERVIEW',
    onColumnFilter: mockedHandleColumnFilter,
    tableName: 'suspicions',
  },
];
