export const GET_NODES = `
  query nodes(
    $deviceFilter: InstancePatternMatcher
    $placeFilter: InstancePatternMatcher
  ) {
    places(page: { offset: 0, size: 100 }, filter: $placeFilter) {
      intId
      id {
        did {
          id
        }
        value
      }
      kind {
        id
      }
      attrs {
        did {
          id
        }
        value
      }
      edgeDevice {
        intId
        type
        dir
        edgeEndPoint {
          intId
        }
      }
      edgePlace {
        intId
        type
        dir
        edgeEndPoint {
          intId
        }
      }
    }
    devices(page: { offset: 0, size: 100 }, filter: $deviceFilter) {
      intId
      id {
        did {
          id
        }
        value
      }
      kind {
        id
      }
      attrs {
        did {
          id
        }
        value
      }
      edgeDevice {
        intId
        type
        dir
        edgeEndPoint {
          intId
        }
      }
      edgePlace {
        intId
        type
        dir
        edgeEndPoint {
          intId
        }
      }
    }
  }
`;
