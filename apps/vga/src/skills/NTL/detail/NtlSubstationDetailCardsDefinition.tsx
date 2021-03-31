import { GqlCardsConfig } from '@dg3/types';
import { NTL_SUBSTATIONS_DETAIL_CARDS_QUERY } from '../graphql/NtlSubstationDetailQueries';

export const NTL_SUBSTATIONS_DETAIL_CARDS_GQL: GqlCardsConfig = {
  rootPath: '$.places[*]',
  query: NTL_SUBSTATIONS_DETAIL_CARDS_QUERY,
  jsonPathMapping: [
    {
      key: 'substations_cards',
      type: 'object',
      values: [
        {
          key: 'conn_points',
          value:
            '$.connectedPlaces.groupByKind[?(@.kind.codeName == "CONNECTION_POINT")].set.count',
        },
        {
          key: 'grid_seg',
          value:
            '$.connectedPlaces.groupByKind[?(@.kind.codeName == "SEGMENT")].set.count',
        },
        {
          key: 'cons_points',
          value:
            '$.connectedPlaces.groupByKind[?(@.kind.codeName == "INSTALLATION_PLACE")].set.count',
        },
        {
          key: 'estimated_daily_consumption',
          value:
            '$.diosObject.items[0].value.normalizedValue.estimated_daily_consumption',
        },
      ],
    },
  ],
  // order of labelConfig is creates the order in application
  labelConfig: [
    {
      accessor: 'estimated_daily_consumption',
      label: 'est. daily losses (kWh)',
    },
    {
      accessor: 'conn_points',
      label: 'connection points',
    },
    {
      accessor: 'cons_points',
      label: 'consumption points',
    },
    {
      accessor: 'grid_seg',
      label: 'grid segments',
    },
  ],
};
