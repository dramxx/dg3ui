import { GqlTableConfig } from '@dg3/schema';
import { NTL_SUBSTATIONS_DETAIL_QUERY } from '../graphql/NtlSubstationDetailQueries';

export const NTL_SUBSTATIONS_DETAIL_GQL: GqlTableConfig = {
  rootPath: '$.places[0].diosObject.items[*]',
  query: NTL_SUBSTATIONS_DETAIL_QUERY,
  jsonPathMapping: [
    {
      key: 'tableColumns',
      type: 'object',
      values: [
        { key: 'id', value: '$.id' },
        { key: 'susp_segment', value: '$.value.normalizedValue.segments' },
        { key: 'trans_subs', value: '$.objectPlace.id.value' },
        {
          key: 'seg_length',
          value: '$.value.normalizedValue.segments_length_sum',
        },
        {
          key: 'est_daily_loss',
          value: '$.value.normalizedValue.estimated_daily_consumption',
        },
        { key: 'num_of_seg', value: '$.value.normalizedValue.segments.length' },
      ],
    },
  ],
  widgetConfig: [
    {
      Header: 'suspicious segment',
      accessor: 'susp_segment',
    },
    {
      Header: 'number of segments',
      accessor: 'num_of_seg',
    },
    {
      Header: 'segments length (m)',
      accessor: 'seg_length',
    },
    {
      Header: 'est. daily loss (kWh)',
      accessor: 'est_daily_loss',
    },
  ],
};
