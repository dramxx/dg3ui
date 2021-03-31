import { JqDetailWidgetConfig } from '@dg3/schema';

export const DIO_AUTHOR_ATTRIBUTES: JqDetailWidgetConfig = {
  id: 'dio.author.attributes',
  title: 'Atributy autora',
  type: 'Attributes',
  language: 'jq',
  query: `
    query AuthorAttributes($elementId: ID!) {
      set: diosSetById(ids: [$elementId]) {
        items {
          id
          author {
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
    {data: [ .set.items[0].author.attributes[] |
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
