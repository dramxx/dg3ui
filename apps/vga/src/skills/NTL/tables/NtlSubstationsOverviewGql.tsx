import { GqlTableConfig } from '@dg3/schema';
import { NTL_SUBSTATIONS_OVERVIEW_QUERY } from '../graphql/NtlSubstationsOverviewQuery';

export const NTL_SUBSTATIONS_OVERVIEW_GQL: GqlTableConfig = {
  rootPath: '$.places[*]',
  query: NTL_SUBSTATIONS_OVERVIEW_QUERY,
  jsonPathMapping: [
    {
      key: 'tableColumns',
      type: 'object',
      values: [
        { key: 'id', value: '$.sub_transformer.items[0].id.value' },
        { key: 'trans_subs', value: '$.id.value' },
        {
          key: 'conn_points',
          value:
            "$.connectedPlaces.groupByKind[?(@.kind.codeName == 'CONNECTION_POINT')].set.count",
        },
        {
          key: 'grid_seg',
          value:
            "$.connectedPlaces.groupByKind[?(@.kind.codeName == 'SEGMENT')].set.count",
        },
        {
          key: 'cons_points',
          value:
            "$.connectedPlaces.groupByKind[?(@.kind.codeName == 'CONSUMPTION_POINT')].set.count",
        },
        {
          key: 'junctions',
          value:
            "$.connectedPlaces.groupByKind[?(@.kind.codeName == 'JUNCTION')].set.count",
        },
        {
          key: 'seg_length',
          value:
            '$.diosObject.items[0].value.normalizedValue.segments_length_sum',
        },
        {
          key: 'est_daily_loss',
          value:
            '$.diosObject.items[0].value.normalizedValue.estimated_daily_consumption',
        },
      ],
    },
  ],
  widgetConfig: [
    {
      Header: 'transformer substation',
      accessor: 'trans_subs',
    },
    {
      Header: 'connection points (count)',
      accessor: 'conn_points',
    },
    {
      Header: 'consumption points (count)',
      accessor: 'cons_points',
    },
    {
      Header: 'grid segments (count)',
      accessor: 'grid_seg',
    },
    {
      Header: 'junctions (count)',
      accessor: 'junctions',
    },
    {
      Header: 'suspicious segments length (m)',
      accessor: 'seg_length',
    },
    {
      Header: 'est. daily loss (kWh)',
      accessor: 'est_daily_loss',
    },
  ],
};
