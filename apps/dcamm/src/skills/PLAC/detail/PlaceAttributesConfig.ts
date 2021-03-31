import { JqDetailWidgetConfig } from '@dg3/schema';

export const PLACE_ATTRIBUTES: JqDetailWidgetConfig = {
  id: 'place.attributes',
  title: 'Atributy místa',
  type: 'Attributes',
  language: 'jq',
  query: `
    fragment AllPlaceAttributes on PlaceKind {
      id
      didCollections(didCollecton: ["can_be_object_of"]) {
        entries {
          did {
            id
            localization {
              name
            }
          }
        }
      }
    }

    query PlaceAttributes($elementId: ID!) {
      places(filter: { node: { intId: [$elementId] } }) {
        attributes {
          did {
            id
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
          ...AllPlaceAttributes
          ancestors {
            ...AllPlaceAttributes
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
      .places[].attributes as $attrs
      | .places[].kind
      | .ancestors[].didCollections + .didCollections
      | .[].entries[].did as $did
      | $attrs
      | map(select(.did.id == $did.id))
      | {
          id: $did.id,
          label: $did.localization.name,
          value: (.[0].normalizedValue as $val |
            if .[0].did.dataType.enumValues
              then (.[0].did.dataType.enumValues[] | select(.id == $val).localization.name) // null
              else $val end
          )
        }
    ] + [
      .places[].edgeTemplateShouldSatisfy[0] as $template
      | {
        id: "template",
        label: "Šablona",
        value: {
          intId: $template.internalId,
          valueId: $template.edgeEndPoint.id,
          value: $template.edgeEndPoint.localization.name,
          enumValues: [( .templates[] | select(.id | startswith("template:template.place")) | {id: .id, name: .localization.name} )]
        }
      }
    ])}
  `,
  config: {
    columns: [
      { Header: 'Kmenová data', accessor: 'label' },
      { Header: 'Hodnota', accessor: 'value' },
    ],
    mutation: 'EditInventoryEntity',
    editable: [
      {
        rowId: 'information:attribute.place_maintenance_status',
        columnId: 'value',
        type: 'string',
        command:
          '{UPDATE_INSTANCE: [{}, {id: .id, "information:attribute.place_maintenance_status": .value}]}',
      },
      {
        rowId: 'template',
        columnId: 'value',
        type: 'enum',
        command:
          '{CREATE_EDGE: [{}, {type: "should_satisfy", from: .id, to: {template_id: .value}, "exists_from": "now"}]} + if .internalId then {TERMINATE_EDGE: [{}, {id: .internalId, "exists_to": "now"}]} else {} end',
      },
    ],
    refetchQueries: ['PlaceAttributes', 'PlacesListTable'],
    sortColumn: 'did',
  },
};
