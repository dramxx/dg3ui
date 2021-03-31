import * as React from 'react';
import { MapServerConfig } from '@dg3/types';

const defaultMapServer: MapServerConfig = {
  tileSource: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
};

const MapServerContext: React.Context<MapServerConfig> = React.createContext(
  defaultMapServer
);

export default MapServerContext;
