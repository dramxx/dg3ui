import { JqDetailWidgetConfig } from '@dg3/schema';

export const DIO_ATTRIBUTES: JqDetailWidgetConfig = {
  id: 'dio.attributes',
  title: 'DIO atributy',
  type: 'Attributes',
  language: 'jq',
  query: `
    query DioAttributes($elementId: ID!) {
      set: diosSetById(ids: [$elementId]) {
        items {
          id
          did {
            id
            localization {
              name
            }
            dataType {
              id
              localization {
                name
              }
            }
          }
          author {
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
            internalId
              id {
                did {
                  id
                }
                value
              }
            }
            ... on GenericInstance {
            internalId
              id {
                did {
                  id
                }
                value
              }
            }
          }
          object {
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
              internalId
              id {
                did {
                  id
                }
                value
              }
            }
            ... on GenericInstance {
              internalId
              id {
                did {
                  id
                }
                value
              }
            }
          }
          timestamp
          value {
            normalizedValue
          }
          validity {
            isDuplicity
            isInvalid
          }
        }
      }
    }
  `,
  transformation: `
  {data: [ .set.items[0] |
        { id: "name",  did: "název",   value: {
          valueId: .did.localization.name,
          value: .did.localization.name
        } },
        { id: "author",
         did: "autor",
         value: {
          valueId: .author.id.value,
          value:  .author.id.value
          }
        },
        { id: "object",
         did: "objekt",
         value: {
          valueId: .object.id.value,
          value:  .object.id.value
          }
        },
       { id: "timestamp",
         did: "čas vzniku události",
         value: {
            valueId: .timestamp,
            value: .timestamp
          }
        },
        { id: "duplicita",
          did: "duplicita",
          value: {
              valueId: .validity.isDuplicity,
              value: .validity.isDuplicity
          }
        },
        { id: "validita",
          did: "validita",
          value: {
            valueId: (.validity.isInvalid // true),
            value: (.validity.isInvalid // true)
          }
        },
        { id: "value",
          did: "hodnota",
          value: {
            valueId: (if .did.dataType.id == "json" then (.value.normalizedValue | tostring) else .value.normalizedValue end),
            value: (if .did.dataType.id == "json" then (.value.normalizedValue | tostring) else .value.normalizedValue end)
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
