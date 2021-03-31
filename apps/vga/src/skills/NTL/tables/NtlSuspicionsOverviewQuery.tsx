export const NTL_SUSPICIONS_OVERVIEW_QUERY = `
  query list_of_suspicions {
    diosSet(
      filter: {
        didFilter: { ids: "non_technical_losses.suspicious_detection_summary_estimated" }
      }
    ) {
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
