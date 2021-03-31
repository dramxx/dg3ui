import { GqlWidgetConfig } from '@dg3/schema';
import { SUBSTATION_DYNAMIC_DATA } from '../graphql/SubstationDynamicDataQuery';

export const NTL_VGA_DYNAMIC: GqlWidgetConfig = {
  rootPath: '$.places[0]',
  query: SUBSTATION_DYNAMIC_DATA,
  jsonPathMapping: [
    {
      key: 'links',
      type: 'array',
      values: [
        {
          key: 'id',
          value: '$.links[*].id.value',
        },
        {
          key: 'did',
          value: '$.links[*].diosObject.items[*].did.id',
        },
        {
          key: 'timestamp',
          value: '$.links[*].diosObject.items[*].timestamp',
        },
        {
          key: 'value',
          value: '$.links[*].diosObject.items[*].value.normalizedValue',
        },
      ],
    },
    {
      key: 'nodes',
      type: 'array',
      values: [
        {
          key: 'id',
          value: '$.nodes[*].id.value',
        },
        {
          key: 'did',
          value: '$.nodes[*].diosObject.items[*].did.id',
        },
        {
          key: 'timestamp',
          value: '$.nodes[*].diosObject.items[*].timestamp',
        },
        {
          key: 'value',
          value: '$.nodes[*].diosObject.items[*].value.normalizedValue',
        },
      ],
    },
  ],
};
