import { JqDetailWidgetConfig } from '@dg3/schema';

export const DIO_OBJECT_ATTRIBUTES: JqDetailWidgetConfig = {
  id: 'dio.object.attributes',
  title: 'Atributy objektu',
  type: 'Attributes',
  language: 'jq',
  query: `
    query ObjectAttributes($elementId: ID!) {
      set: diosSetById(ids: [$elementId]) {
        items {
          id
          object {
            __typename
            internalId
            ... on Device {
              attributes {
                did {
                  id
                  localization {
                    name
                  }
                }
                normalizedValue
              }
            }
            ... on Place {
              attributes {
                did {
                  id
                  localization {
                    name
                  }
                }
                normalizedValue
              }
            }
            ... on GenericInstance {
              attributes {
                did {
                  id
                  localization {
                    name
                  }
                }
                normalizedValue
              }
            }
          }
        }
      }
    }
  `,
  transformation: `
    {data: [ .set.items[0].object.attributes[] |
      {
        id: .did.id,
        did: .did.localization.name,
        value: {
          valueId: .normalizedValue,
          value: .normalizedValue
        }
      }
   ]}
  `,
  config: {
    columns: [
      { Header: 'Kmenová data', accessor: 'did' },
      { Header: 'Hodnota', accessor: 'value' },
    ],
    editable: [],
    refetchQueries: [],
    sortColumn: 'did',
  },
};
