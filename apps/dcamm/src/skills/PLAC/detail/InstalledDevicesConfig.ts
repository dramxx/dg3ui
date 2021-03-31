import { JqDetailWidgetConfig } from '@dg3/schema';

export const INSTALLED_DEVICES_CONFIG: JqDetailWidgetConfig = {
  id: 'installed.devices',
  type: 'Attributes',
  title: 'Instalovaná zařízení',
  language: 'jq',
  query: `
    query installedDevices($elementId: ID!) {
      places(filter: { node: { intId: [$elementId] } }) {
        id {
          value
        }
        internalId
        kind {
          id
        }
        relPlace(edge: { type: "feed_from", direction: IN }) {
          kind {
            id
            localization {
              name
            }
          }
          edgeDevice(edge: { type: "installed_at", direction: IN }) {
            existsFrom
            existsTo
            edgeEndPoint {
              ... on Device {
                internalId
                id {
                  value
                }
                attributes(
                  dids: [
                    "information:attribute.serge"
                    "information:attribute.hdo_group_id"
                    "information:attribute.ckod"
                    "information:attribute.device_lifecycle_phase"
                  ]
                ) {
                  did {
                    id
                    localization {
                      name
                    }
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
                kind {
                  id
                  localization {
                    name
                  }
                }
                mediator: relDevice(
                  edge: { type: "accessible_by", direction: OUT }
                ) {
                  internalId
                  id {
                    did {
                      id
                    }
                    value
                  }
                }
                installation_place: relPlace(
                  edge: { type: "installed_at", direction: OUT }
                  filter: { node: { kindName: "place:place.device_location" } }
                ) {
                  dts: relPlace(
                    walk: {
                      path: {
                        follow: { edge: { type: "feed_from", direction: OUT } }
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
  `,
  transformation: `
    def attribute(attr): ((.attributes[] | select(.did.id == attr)) // null);
    {data: [
      .places[0].relPlace[].edgeDevice[]
      | {
        id: .edgeEndPoint.internalId,
        existsFrom: .existsFrom,
        existsTo: .existsTo,
        kind: .edgeEndPoint.kind.localization.name,
        hdo: .edgeEndPoint| attribute("information:attribute.hdo_group_id").normalizedValue,
        ckod: .edgeEndPoint| attribute("information:attribute.ckod").normalizedValue,
        dts: .edgeEndPoint.installation_place[0].dts[0].id.value,
        mediator: .edgeEndPoint.mediator[0].id.value,
        lifecycle_phase: (
          .edgeEndPoint | attribute("information:attribute.device_lifecycle_phase")
          | .normalizedValue as $val
          | if $val then (.did.dataType.enumValues[] | select(.id == $val).localization.name) else null end
        )
      }
    ]}
  `,
  config: {
    columns: [
      { Header: 'ckód', accessor: 'ckod' },
      { Header: 'materiál', accessor: 'kind' },
      { Header: 'HDO skupina', accessor: 'hdo' },
      { Header: 'napájecí DTS', accessor: 'dts' },
      { Header: 'mediátor', accessor: 'mediator' },
      { Header: 'platnost od', accessor: 'existsFrom' },
      { Header: 'platnost do', accessor: 'existsTo' },
      { Header: 'životní fáze', accessor: 'lifecycle_phase' },
    ],
    editable: [],
    refetchQueries: [],
    sortColumn: 'ckod',
  },
};
