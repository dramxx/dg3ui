export const NTL_SUBSTATIONS_OVERVIEW_QUERY = `
  query suspicious_substations {
    places(filter: { node: { kindName: "SUBSTATION" } }) {
      intId
      id {
        value
      }
      sub_transformer: relPlacesSet(
        walk: {
          path: [{ follow: { edge: { type: "CONNECTED_TO", direction: IN } } }]
        }
        filter: {
          node: {
            kindName: ["TRANSFORMER"]
          }
        }
      ) {
      items{
          id {
            value
          }
        }
      }
      connectedPlaces: relPlacesSet(
        walk: {
          path: [{ follow: { edge: { type: "CONNECTED_TO", direction: IN } } }]
        }
        filter: {
          node: {
            kindName: ["CONNECTION_POINT", "CONSUMPTION_POINT", "SEGMENT", "JUNCTION"]
          }
        }
      ) {
        groupByKind {
          kind {
            codeName
          }
          set {
            count
          }
        }
      }
      diosObject (filter: { didFilter: {ids: "non_technical_losses.suspicious_detection_summary_estimated"}}) {
        items{
          value{
            normalizedValue
          }
        }
      }
    }
  }
`;
