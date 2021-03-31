import { JqDetailWidgetConfig } from '@dg3/schema';

export const DEVICE_ATTRIBUTES: JqDetailWidgetConfig = {
  id: 'device.attributes',
  title: 'Atributy zařízení',
  type: 'Attributes',
  language: 'jq',
  query: `
    fragment AllDeviceAttributes on DeviceKind {
      id
      didCollections(didCollecton: ["can_be_object_of"]) {
        entries {
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
        }
      }
    }
    query deviceAttributes($elementId: ID!) {
      devices(filter: { node: { intId: [$elementId] } }) {
        attributes {
          did {
            id
          }
          normalizedValue
        }
        kind {
          ...AllDeviceAttributes
          ancestors {
            ...AllDeviceAttributes
          }
        }
        edgeTemplateShouldSatisfy(edge: {include:ACTIVE, existsNow:{}}) {
          internalId
          edgeEndPoint {
            id
            localization {
              name
            }
          }
        }
      }
      templates {
        id
        localization {
          name
        }
      }
    }
  `,
  transformation: `
    {data: ([
      .devices[].attributes as $attrs
      | .devices[].kind
      | .didCollections + .ancestors[].didCollections
      | .[].entries[].did
      | . as $did
      | $attrs
      | map(select(.did.id == $did.id))
      | {
        id: $did.id,
        did: $did.localization.name,
        value: {
          valueId: .[0].normalizedValue,
          value: (.[0].normalizedValue as $val | if $did.dataType.enumValues then ($did.dataType.enumValues[] | select(.id == $val).localization.name) // null else $val end),
          enumValues: ($did.dataType.enumValues | if . then  [ .[] | {id: .id, name: .localization.name} ] else . end)
        }
      }
    ] + [
      .devices[].edgeTemplateShouldSatisfy[0] as $template
      | {
        id: "template",
        did: "Šablona",
        value: {
          intId: $template.internalId,
          valueId: $template.edgeEndPoint.id,
          value: $template.edgeEndPoint.localization.name,
          enumValues: [( .templates[] | select(.id | startswith("template:template.device")) | {id: .id, name: .localization.name} )]
        }
      }
    ])}
  `,
  config: {
    columns: [
      { Header: 'Kmenová data', accessor: 'did' },
      { Header: 'Hodnota', accessor: 'value' },
    ],
    mutation: 'EditInventoryEntity',
    editable: [
      {
        rowId: 'information:attribute.device_lifecycle_phase',
        columnId: 'value',
        type: 'enum',
        command:
          '{UPDATE_INSTANCE: [{}, {id: .id, "information:attribute.device_lifecycle_phase": .value}]}',
      },
      {
        rowId: 'information:attribute.device_maintenance_status',
        columnId: 'value',
        type: 'string',
        command:
          '{UPDATE_INSTANCE: [{}, {id: .id, "information:attribute.device_maintenance_status": .value}]}',
      },
      {
        rowId: 'template',
        columnId: 'value',
        type: 'enum',
        command:
          '{CREATE_EDGE: [{}, {type: "should_satisfy", from: .id, to: {template_id: .value}, "exists_from": "now"}]} + if .internalId then {TERMINATE_EDGE: [{}, {id: .internalId, "exists_to": "now"}]} else {} end',
      },
    ],
    refetchQueries: ['DeviListTable', 'deviceAttributes'],
    sortColumn: 'did',
  },
};
