export const NTL_SUSPICIONS_DETAIL_QUERY = `
    query suspicion_detail($id: [ID!]) {
    dios(
      filter: {
        didFilter: { ids: "non_technical_losses.suspicious_detection_summary_estimated" }
        objectFilter: { ids: $id}
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
`;

export const NTL_SUSPICION_DETAIL_CARDS_QUERY = `
  query suspicionDetailCards ($id: ID!) {
    diosSetById(ids: [$id]) {
      items {
        id
        objectPlace {
          id {
            value
          }
        }
        value {
          certainty
          normalizedValue
        }
      }
    }
  }
`;
