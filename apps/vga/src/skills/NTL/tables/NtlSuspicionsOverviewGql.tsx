import { GqlTableConfig } from '@dg3/schema';
import { NTL_SUSPICIONS_OVERVIEW_QUERY } from './NtlSuspicionsOverviewQuery';

export const NTL_SUSPICIONS_OVERVIEW_GQL: GqlTableConfig = {
  rootPath: '$.diosSet.items[*]',
  query: NTL_SUSPICIONS_OVERVIEW_QUERY,
  jsonPathMapping: [
    {
      key: 'tableColumns',
      type: 'object',
      values: [
        { key: 'id', value: '$.id' },
        {
          key: 'susp_segment',
          value: '$.value.normalizedValue.segments',
        },
        { key: 'trans_subs', value: '$.objectPlace.id.value' },
        {
          key: 'seg_length',
          value: '$.value.normalizedValue.segments_length_sum',
        },
        {
          key: 'est_daily_loss',
          value: '$.value.normalizedValue.estimated_daily_consumption',
        },
        {
          key: 'num_of_seg',
          value: '$.value.normalizedValue.segments.length',
        },
      ],
    },
  ],
  widgetConfig: [
    {
      Header: 'suspicious segments',
      accessor: 'susp_segment',
    },
    {
      Header: 'transformer substation',
      accessor: 'trans_subs',
    },
    {
      Header: 'suspicious segments (count)',
      accessor: 'num_of_seg',
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
