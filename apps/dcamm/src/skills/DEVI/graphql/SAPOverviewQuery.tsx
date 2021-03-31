export const SAP_OVERVIEW_QUERY = `
query SapOverviewLog($time: TaskTimeDelimitation, $page: TaskPageDelimitation) {
  set: taskExecutionsSet(
    filter: { templateId: "synchronization_sap.v1" }
    time: $time
  ) {
    count
    items(page: $page, ordering: { order: DESCENDING, activeFrom: {} }) {
      id
      template {
          id
          localization {
            name
          }
        }
      executionRoot {
        activeFrom
        activeTo
        messageId: result(did: "information:system.integrator.sap_idoc_id") {
          normalizedValue
        }
        result: result(did: "information:system.integrator.sap_integration_summary_result") {
          did {
            dataType {
              ... on EnumDataType {
                enumValues {
                  id
                  localization {
                    name
                  }
                }
              }
            }
          }
          normalizedValue
        }
      }
    }
  }
}
`;
