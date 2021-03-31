export const SUBSTATION_TOPOLOGY = `
query substationTopologyData($id: String!) {
  places(
    filter: { node: { id: { did: "identificator.object_id", values: [$id] } } }
  ) {
    nodes: relPlace(
      filter: {
        node: { kindName: ["JUNCTION", "CONNECTION_POINT", "TRANSFORMER"] }
      }
      walk: {
        path: [{ follow: { edge: { type: "CONNECTED_TO"} } }]
      }
    ) {
      id {
        value
      }
      kind {
        codeName
      }
      attrs(
        dids: ["space_and_time.gps_longitude", "space_and_time.gps_latitude"]
      ) {
        did
        value
      }
    }

    cp_jun_links: relPlace(
    filter: {  node: { kindName: [ "CONNECTION_POINT" ] } }
      walk: { path: [{ follow: { edge: { type: "CONNECTED_TO" } } }] }
    ) {
      id {
        value
      }
      target: relPlace(
        filter: {  node: { kindName: [ "JUNCTION" ] } }
        edge: { type: "CONNECTED_TO", direction: OUT }) {
        id {
          value
        }
      }
    }

    links: relPlace(
      filter: { node: { kindName: "SEGMENT" } }
      walk: { path: [{ follow: { edge: { type: "CONNECTED_TO" } } }] }
    ) {
      id {
        value
      }
      target: relPlace(edge: { type: "CONNECTED_TO", direction: IN }) {
        id {
          value
        }
      }
      source: relPlace(edge: { type: "CONNECTED_TO", direction: OUT }) {
        id {
          value
        }
      }
    }
  }
}`;
