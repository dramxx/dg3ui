export const NTL_SUBSTATIONS_DETAIL_QUERY = `
 query substation_detail($id: String!) {
    places(filter: {AND: [{node: {kindName: "SUBSTATION"}},
    {
      rels: {
        toPlace: {
          node: {
            id: {did: "identificator.object_id", values: [$id]}
          }
        }
        traversal: {edge: {direction: ANY, type: "CONNECTED_TO"}}
      }}]}) {


    diosObject(
      filter: {
        didFilter: { ids: "non_technical_losses.suspicious_detection_summary_estimated" }
      }
    ) {
      items {
        id
        objectPlace {
          intId
          id {
            value
          }
        }
        value {
          normalizedValue
        }
      }
    }
  }
}
`;

export const NTL_SUBSTATIONS_DETAIL_CARDS_QUERY = `
query substation_detail_cards($id: String!) {
  places(filter: {AND: [{node: {kindName: "SUBSTATION"}},
    {
      rels: {
        toPlace: {
          node: {
            id: {did: "identificator.object_id", values: [$id]}
          }
        }
        traversal: {edge: {direction: ANY, type: "CONNECTED_TO"}}
      }}]}) {
      connectedPlaces: relPlacesSet(walk: {path: [{follow: {edge: {type: "CONNECTED_TO", direction: IN}}}]}, filter: {node: {kindName: ["CONNECTION_POINT", "CONSUMPTION_POINT", "SEGMENT"]}}) {
      groupByKind {
        kind {
          codeName
        }
        set {
          count
        }
      }
    }
    diosObject(filter: {didFilter: {ids: "non_technical_losses.suspicious_detection_summary_estimated"}}) {
      items {
        value {
          normalizedValue
        }
      }
    }
  }
}
`;
