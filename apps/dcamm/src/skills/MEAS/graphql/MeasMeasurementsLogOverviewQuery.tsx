export const MEAS_MEASUREMENTS_LOG_OVERVIEW_QUERY = `
  query measurementsLogOverview(
    $time: TimeDelimitation
    $page: DioPageDelimitation
    $dioOrdering: DioOrder
    $informationSetFilter: DioFilter!
  ) {
    set: diosSet(
      time: $time
      filter: {
        AND: [
          $informationSetFilter
          {
            validityFilter: { includeValid: ALL, includeDuplicated: ALL }
            tagFilter: { key: { equals: "readout" } }
          }
          {
            NOT: {
              didFilter: {
                ids: [
                  "information:system.cc.cxiem.latest_data_collected"
                  "information:information_technology.network.communication.connection_successful_instantaneous"
                  "information:information_technology.network.communication.communication_duration_instantaneous"
                ]
              }
            }
          }
        ]
      }
    ) {
      count
      items(ordering: $dioOrdering, paging: $page) {
        __typename
        id
        did {
          id
          localization {
            name
          }
          params(ids: ["unit"]) {
            param {
              id
              localization {
                name
              }
            }
            value {
              id
              localization {
                name
              }
            }
          }
        }
        startIndexing
        timestamp
        value {
          normalizedValue
        }
        validity {
          isDuplicity
          isInvalid
        }
        tags {
          key
          value
        }
        author {
          __typename
          internalId
          ... on Device {
            id {
              did {
                id
              }
              value
            }
          }
          ... on Place {
            id {
              did {
                id
              }
              value
            }
          }
          ... on GenericInstance {
            id {
              did {
                id
              }
              value
            }
          }
        }
        object {
          __typename
          internalId
          ... on Place {
            id {
              did {
                id
              }
              value
            }
          }
          ... on Device {
            id {
              did {
                id
              }
              value
            }
          }
          ... on GenericInstance {
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
`;
