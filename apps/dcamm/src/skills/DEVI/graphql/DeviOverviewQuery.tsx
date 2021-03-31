export const DEVI_OVERVIEW_QUERY = `
query DeviListTable($devicesSetFilter: InstancesSetPatternMatcher, $page: PageDelimitation, $ordering: [InstanceOrder!]) {
  set: devicesSet(filter: $devicesSetFilter) {
    count
    items(page: $page, ordering: $ordering) {
      internalId
      attributes(dids: ["information:attribute.ckod", "information:attribute.device_lifecycle_phase", "information:attribute.device_maintenance_status", "information:attribute.model"]) {
        did {
          id
          dataType {
            ... on EnumDataType {
              enumValues {
                id
                localization  {
                  name
                }
              }
            }
          }
        }
        normalizedValue
      }
      kind {
        id
        localization  {
          name
        }
        attributes(dids: ["information:attribute.ptb_skupina", "information:attribute.matnr", "information:attribute.vyrobce", "information:attribute.konstrukcni_typ"]) {
          did {
            id
          }
          value
        }
      }
      mediator: relDevice(edge: {type: "accessible_by", direction: OUT,existsNow: {}}) {
        internalId
        id {
          did {
            id
          }
          value
        }
      }
      instalation_place: relPlace(edge: {type: "installed_at", direction: OUT, existsNow: {}}, filter: {node: {kindName: "place:place.device_location"}}) {
        placement: relPlace(edge: {type: "feed_from", direction: OUT, existsNow: {}}) {
          internalId
          id {
            did {
              id
            }
            value
          }
          attribute(did: "information:attribute.city1") {
            did {
              id
            }
            normalizedValue
          }
        }
        dts: relPlace(walk: {path: {follow: {edge: {type: "feed_from", direction: OUT, existsNow: {}}}}}, filter: {node: {kindName: "place:place.secondary_substation"}}) {
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
`;
