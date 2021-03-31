export type GeoPoint = {
  lat: number;
  lon: number;
};

export type MapData = {
  mapId: string;
  mapCenter: MapCenter;
};

export type MapCenter = {
  center: GeoPoint;
  activePointId: string | null | undefined;
  zoom: number;
};

export type Point = {
  id: string;
  title: string;
  value: PointValue;
  coordinates: GeoPoint;
};

export type PointValue = number | string;

// TODO decide what params we actually need in map
export type MapNode = {
  id: number;
  n_id: number;
  n_om: number;
  n_typ: string;
  lat: number;
  lon: number;
};

// TODO decide what params we actually need in map
export type MapEdge = {
  source: number;
  target: number;
  id: number;
  e_delka: number;
  e_typ: string;
};

export type TileSource = {
  url: string;
  attribution: string;
};

export type MapServerConfig = {
  tileSource: TileSource;
};

export type MarkerValue = number | string;
