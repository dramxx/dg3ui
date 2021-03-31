import {TileSource} from '@dg3/types'

export default {
  type: 'object',
  properties: {
    url: {
      type: 'string',
    },
    attribution: {
      type: 'string',
    },
  },
  required: ['url', 'attribution'],
  additionalProperties: false,
};

export const valid: TileSource = {
  url: 'url',
  attribution: 'attribution',
};
