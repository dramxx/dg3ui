import Leaflet from 'leaflet';
import { isEmpty, isNil } from 'ramda';
import React, { useState } from 'react';
import {
  Circle,
  GeoJSON,
  LayerGroup,
  Map as LeafletMap,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import styled from 'styled-components';

import {
  GeoPoint,
  MapCenter,
  MapEdge,
  MapNode,
  MapServerConfig,
  MarkerValue,
  Point,
} from '@dg3/types';
import LeafletCss from './LeafletCss';
import { MapFoldingButton } from './MapFoldingButton';
import { clusterCircleIcon, markerCircleIcon } from './render/MarkerIcons';
import { simpleValue, summation } from './render/MarkerValueCalculation';
import MapServerContext from './server/MapServerContext';
import { TOPOLOGY_GEO_JSON } from './topology-geojson';

type MapProps = {
  id: string;
  clustering?: boolean;
  points: Array<Point>;
  nodes?: Map<string, MapNode>;
  edges?: Map<string, MapEdge>;
  mapCenter?: MapCenter;
  clusterValue?: (values: Array<Leaflet.Marker>) => MarkerValue;
  clusterIcon?: (
    value: MarkerValue,
    childrenCount: number,
    containsActivePoint: boolean
  ) => string;
  markerIcon?: (value: MarkerValue, active: boolean) => string;
  markerValue?: (point: Point) => MarkerValue;
  pointMarkerPopupRender: (point: Point) => React.ReactNode;
};

const StyledMapContainer = styled.div<{
  width: string;
  height: string;
}>`
  display: flex;
  justify-content: center;
  flex-direction: row;

  .leaflet-container {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    box-sizing: border-box;
    word-break: normal;
  }

  .map_foldingBtn {
    z-index: 1000;
    margin-left: -4rem;
    margin-top: 0.5rem;
  }

  .markerIcon {
    background: ${(props) => props.theme.colors.primary1};
    border: 1px solid ${(props) => props.theme.colors.white};
  }
  .markerIcon.active {
    border: none;
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.red};
  }
  .markerClusterIcon {
    background: ${(props) => props.theme.colors.primary1};
    border: 1px solid ${(props) => props.theme.colors.white};
  }
  .markerClusterIcon.active {
    border: none;
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.red};
  }
`;

const style = (feature) => {
  return {
    color: 'red',
  };
};

const toArray = (obj: object): Array<any> =>
  Object.keys(obj).map((key) => obj[key]);

const createTopologyFromGeojson = () => {
  return (
    <GeoJSON
      data={TOPOLOGY_GEO_JSON}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
};

const onEachFeature = (feature, layer) => {
  layer.bindPopup(
    `<div>FID: ${feature.properties.FID}</div>Length: ${feature.properties.FID}m</div>`
  );

  let popupIsVisible = false;

  layer.on('mouseover', function () {
    layer.setStyle({ color: 'blue' });
  });

  layer.on('mouseout', function () {
    !popupIsVisible && layer.setStyle({ color: 'red' });
  });

  layer.on('popupopen', function () {
    popupIsVisible = true;
    layer.setStyle({ color: 'blue' });
  });

  layer.on('popupclose', function () {
    popupIsVisible = false;
    layer.setStyle({ color: 'red' });
  });
};

const createTopologyEdges = (
  edges: Map<string, MapEdge>,
  nodes: Map<string, MapNode>
) => {
  if (edges && nodes) {
    return (
      <LayerGroup>
        {toArray(edges).map((edge) => {
          if (
            edge != null &&
            edge.target != null &&
            edge.source != null &&
            nodes
          ) {
            return (
              <Polyline
                key={edge.id}
                positions={addEdge(
                  nodes[edge.source.toString()],
                  nodes[edge.target.toString()]
                )}
                color={'red'}
              />
            );
          }
        })}
      </LayerGroup>
    );
  }
};

export const Map: React.FC<MapProps> = ({
  id,
  edges,
  nodes,
  points,
  mapCenter = {
    center: {
      lat: 49.195061,
      lon: 16.606836,
    },
    activePointId: null,
    zoom: 7,
  },
  clustering = true,
  clusterIcon = clusterCircleIcon,
  clusterValue = summation,
  markerIcon = markerCircleIcon,
  markerValue = simpleValue,
  pointMarkerPopupRender,
}: MapProps) => {
  const [folded, setFolded] = useState<boolean>(false);
  const containerWidthString = '80vw';
  const containerHeightString = `${folded ? 8 : 70}vh`;

  const createMapPointsMarkers = (): Marker[] => {
    return points.map((point) => {
      const active = point.id === mapCenter.activePointId;
      const popupContent = pointMarkerPopupRender(point);
      const value = markerValue(point);
      const markerIconTemplate = markerIcon(value, active);

      const markerIconDiv = new Leaflet.DivIcon({
        html: markerIconTemplate,
        iconAnchor: [6, -10],
        className: 'leaflet-custom-group-marker',
      });

      return (
        <Marker
          id={point.id}
          key={point.id}
          position={leafletCoords(point.coordinates)}
          icon={markerIconDiv}
          // this value need to be passed for marker cluster operations
          value={value}
        >
          <Popup>{popupContent}</Popup>
        </Marker>
      );
    });
  };

  const createTopologyNodes = () => {
    if (nodes) {
      return (
        <LayerGroup>
          {toArray(nodes).map((node) => (
            <Circle key={node.id} center={[node.lat, node.lon]} radius={0.5} />
          ))}
        </LayerGroup>
      );
    }
  };

  const createMarkerClusterIcon = (cluster) => {
    const childMarkers = cluster.getAllChildMarkers();

    const containsActivePoint = checkClusterGroupForActiveMarker(
      childMarkers,
      mapCenter.activePointId
    );
    const value = clusterValue(childMarkers);

    const markerClusterIconTemplate = clusterIcon(
      value,
      childMarkers.length,
      containsActivePoint
    );

    return new Leaflet.DivIcon({
      html: markerClusterIconTemplate,
      className: 'leaflet-custom-group-marker',
    });
  };

  const handleFoldToggle = () => {
    setFolded(!folded);
  };

  const createMapPoints = () => {
    const pointMarkers = createMapPointsMarkers();

    return clustering ? (
      <MarkerClusterGroup iconCreateFunction={createMarkerClusterIcon}>
        {pointMarkers}
      </MarkerClusterGroup>
    ) : (
      pointMarkers
    );
  };

  // Bounds calculation in default override map centering
  const bounds =
    !isNil(mapCenter.activePointId) || isEmpty(points)
      ? undefined
      : Leaflet.latLngBounds(
          points.map((point) => leafletCoords(point.coordinates))
        );

  return (
    <MapServerContext.Consumer>
      {(mapServer: MapServerConfig) => {
        return (
          <StyledMapContainer
            className="map_container"
            width={containerWidthString}
            height={containerHeightString}
          >
            <LeafletCss />
            <LeafletMap
              id={id}
              center={mapCenter.center}
              zoom={mapCenter.zoom}
              maxZoom={18}
              minZoom={1}
              bounds={bounds}
              scrollWheelZoom={false}
            >
              <TileLayer
                url={mapServer.tileSource.url}
                attribution={mapServer.tileSource.attribution}
              />
              {points && createMapPoints()}
              {edges && createTopologyEdges(edges, nodes)}
              {createTopologyFromGeojson()}
              {nodes && createTopologyNodes()}
            </LeafletMap>

            <div className="map_foldingBtn">
              <MapFoldingButton
                folded={folded}
                onFoldToggle={handleFoldToggle}
              />
            </div>
          </StyledMapContainer>
        );
      }}
    </MapServerContext.Consumer>
  );
};

function retrieveNode(node: MapNode): [number, number] {
  return [node.lat, node.lon];
}

function addEdge(
  nodeA: MapNode,
  nodeB: MapNode
): [[number, number], [number, number]] {
  return [retrieveNode(nodeA), retrieveNode(nodeB)];
}

function checkClusterGroupForActiveMarker(
  markers: Leaflet.Marker[],
  activePointId: string | null | undefined
): boolean {
  return markers.find((marker) => marker.options.id === activePointId) != null;
}

function leafletCoords(point: GeoPoint) {
  return [point.lat, point.lon];
}
