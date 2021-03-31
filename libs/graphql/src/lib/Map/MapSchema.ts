import gql from 'graphql-tag';

export const mapTypeDefs = gql`
  extend type Query {
    maps: [MapData]!
    getMapById(mapId: String!): MapData
  }

  type Center {
    lat: Int!
    lon: Int!
  }

  type MapCenter {
    center: Center!
    zoom: Int!
    activePointId: String!
  }

  type MapData {
    mapId: String!
    mapCenter: MapCenter!
  }
`;
