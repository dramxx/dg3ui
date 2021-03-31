import { JqDetailWidgetConfig } from '@dg3/schema';

export const DEVICE_CONSUMPTION_POINT_ATTRIBUTES_CONFIG: JqDetailWidgetConfig = {
  id: 'consumption.point.attributes.config',
  title: 'Odběrné místo',
  type: 'Attributes',
  language: 'jq',
  query: `
      query deviceConsumptionPoint($elementId: ID!) {
        places(
          filter: {
            rels: {
              toDevice: { node: { intId: [$elementId] } }
              traversal: {
                walk: {
                  path: [
                    { follow: { edge: { type: "feed_from", direction: IN } } }
                    { step: { type: "installed_at" } }
                  ]
                }
              }
            }
            node: { kindName: "place:place.consumption_point" }
          }
        ) {
          attributes {
            did {
              id
              localization   {
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
        }
      }
    `,
  transformation: `
    {data: [
      .places[].attributes[] |
        {
          id: .did.id,
          label: .did.localization.name,
          value: (.normalizedValue as $val | if .did.dataType.enumValues then (.did.dataType.enumValues[] | select(.id == $val).localization.name) // null else $val end)}
    ]}
  `,
  config: {
    columns: [
      { Header: 'Kmenová data', accessor: 'label' },
      { Header: 'Hodnota', accessor: 'value' },
    ],
    editable: [],
    refetchQueries: [],
    sortColumn: 'did',
  },
};
