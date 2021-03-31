import * as React from 'react';
import { Map } from './Map';
import { storiesOf } from '@storybook/react';
import { markerCircleIcon, clusterCircleIcon } from './render/MarkerIcons';
import { simpleValue, summation } from './render/MarkerValueCalculation';
import { devicesLocations } from '../mock/mockLocations';

// list of map tile providers with attributions
// https://leaflet-extras.github.io/leaflet-providers/preview/
storiesOf('Map NoSnapshot', module).add('Map open street maps default', () => {
  const mapId = 'openStreetMap';
  return (
    <Map
      id={mapId}
      clusterIcon={clusterCircleIcon}
      clusterValue={summation}
      markerIcon={markerCircleIcon}
      markerValue={simpleValue}
      pointMarkerPopupRender={() => <div>Test popup</div>}
      points={devicesLocations}
    />
  );
});
