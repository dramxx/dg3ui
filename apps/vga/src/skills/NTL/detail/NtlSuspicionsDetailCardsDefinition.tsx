import { GqlCardsConfig } from '@dg3/types';
import { NTL_SUSPICION_DETAIL_CARDS_QUERY } from '../graphql/NtlSuspicionDetailQueries';

export const NTL_SUSPICION_DETAIL_CARDS_GQL: GqlCardsConfig = {
  rootPath: '$.diosSetById.items[*]',
  query: NTL_SUSPICION_DETAIL_CARDS_QUERY,
  jsonPathMapping: [
    {
      key: 'substations_cards',
      type: 'object',
      values: [
        {
          key: 'loss_volume',
          value: '$.value.normalizedValue.estimated_daily_consumption',
        },
        {
          key: 'seg_length',
          value: '$.value.normalizedValue.segments_length_sum',
        },
        {
          key: 'num_of_seg',
          value: '$.value.normalizedValue.segments.length',
        },
        {
          key: 'certainty',
          value: '$.value.certainty',
        },
      ],
    },
  ],
  // order of labelConfig is creates the order in application
  labelConfig: [
    {
      accessor: 'loss_volume',
      label: 'est. daily losses (kWh)',
    },
    {
      accessor: 'seg_length',
      label: 'segments length (m)',
    },
    {
      accessor: 'num_of_seg',
      label: 'number of segments',
    },
    {
      accessor: 'certainty',
      label: 'suspicion certainty',
    },
  ],
};
