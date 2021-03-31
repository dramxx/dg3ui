import tileSource, { valid as tileSourceSample } from './TileSource';
import { MapServerConfig } from '@dg3/types';

export default {
  type: 'object',
  properties: {
    tileSource: tileSource,
  },
  required: ['tileSource'],
  additionalProperties: false,
};

export const valid: MapServerConfig = {
  tileSource: tileSourceSample,
};
