import { GqlWidgetConfig } from '@dg3/schema';
import { SUBSTATION_TOPOLOGY } from '../graphql/SubstationTopologyQuery';

export const NTL_VGA_TOPOLOGY: GqlWidgetConfig = {
  rootPath: '$.places[0]',
  query: SUBSTATION_TOPOLOGY,
  jsonPathMapping: [
    {
      key: 'cp_jun_links',
      type: 'array',
      values: [
        {
          key: 'id',
          value: '$.cp_jun_links[*].id.value',
        },
        {
          key: 'name',
          value: '$.cp_jun_links[*].id.value',
        },
        {
          key: 'target',
          value: '$.cp_jun_links[*].target[0].id.value',
        },
      ],
    },
    {
      key: 'links',
      type: 'array',
      values: [
        {
          key: 'id',
          value: '$.links[*].id.value',
        },
        {
          key: 'name',
          value: '$.links[*].id.value',
        },
        {
          key: 'target',
          value: '$.links[*].target[0].id.value',
        },
        {
          key: 'source',
          value: '$.links[*].source[0].id.value',
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
          key: 'name',
          value: '$.nodes[*].id.value',
        },
        {
          key: 'x',
          value:
            "$.nodes[*].attrs[?(@.did == 'space_and_time.gps_latitude')].value",
        },
        {
          key: 'y',
          value:
            "$.nodes[*].attrs[?(@.did == 'space_and_time.gps_longitude')].value",
        },
        {
          key: 'category',
          value: '$.nodes[*].kind.codeName',
        },
      ],
    },
  ],
};
