export const MONI_TASK_LOG_OVERVIEW_QUERY = `
  query moniTaskLogOverview(
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
              "measure_communication_availability_and_delay.v1"
              "measure_communication_availability_and_delay_manual.v1"
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
            problemDios: diosSet(filter: {OR: [{didFilter: {ids: "information:system.cc.error_report"}}, {didFilter: {ids: "information:information_technology.network.communication.connection_successful_instantaneous"}, valueFilter: {logic: {equals: false}}}]}) {
              count
            }
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
