import React, { useEffect } from 'react';

import { mapVar } from '@dg3/graphql';
import { MapCenter, Point } from '@dg3/types';
import { Map } from './Map';

type PropTypes = {
  id: string;
  points?: Point[];
  pointMarkerPopupRender?: (point: Point) => React.ReactNode;
  mapCenter?: MapCenter;
};

export const MapContainer = (props: PropTypes) => {
  useEffect(() => {
    mapVar({
      mapId: props.id,
      mapCenter: props.mapCenter,
    });
  }, []);

  const map = mapVar();

  const mapCenter = map && map?.mapId ? map.mapCenter : props.mapCenter;

  return (
    <React.Fragment>
      <Map
        id={props.id}
        points={props.points}
        pointMarkerPopupRender={props.pointMarkerPopupRender}
        mapCenter={mapCenter}
      />
    </React.Fragment>
  );
};

MapContainer.defaultProps = {
  pointMarkerPopupRender: () => <div>Test Popup</div>,
  points: [],
  mapCenter: {
    center: {
      lat: 49.195061,
      lon: 16.606836,
    },
    activePointId: null,
    zoom: 7,
  },
};
