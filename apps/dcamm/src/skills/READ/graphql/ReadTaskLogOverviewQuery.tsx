export const READ_TASK_LOG_OVERVIEW_QUERY = `
  query readTaskLogOverview(
    $page: TaskPageDelimitation
    $time: TaskTimeDelimitation
    $taskExecutionsFilter: TaskExecutionTreeMatcher!
  ) {
    set: taskExecutionsSet(
      time: $time
      filter: {
        AND: [
          {
            templateId: [
              "read_LP_10_siem_data.v1"
              "read_REG_iem_data.v1"
              "read_LP_15_iem_data.v1"
              "read_REG_iem_data_manual.v1"
              "read_LP_15_iem_data_manual.v1"
              "read_LP_10_siem_data_manual.v1"
            ]
          }
          $taskExecutionsFilter
        ]
      }
    ) {
      count
      items(page: $page, ordering: { order: DESCENDING, activeFrom: {} }) {
        template {
          id
          localization {
            name
          }
        }
        executionRoot {
          childNodes {
            id
            activeFrom
            activeTo
            communication_peer: scope(filter: { group: "communication_peer" }) {
              instance {
                internalId
                ... on Device {
                  id {
                    did {
                      id
                    }
                    value
                  }
                  installation_place: relPlace(
                    edge: { type: "installed_at", direction: OUT }
                    filter: {
                      node: { kindName: "place:place.device_location" }
                    }
                  ) {
                    dts: relPlace(
                      walk: {
                        path: {
                          follow: {
                            edge: { type: "feed_from", direction: OUT }
                          }
                        }
                      }
                      filter: {
                        node: { kindName: "place:place.secondary_substation" }
                      }
                    ) {
                      internalId
                      id {
                        did {
                          id
                        }
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
