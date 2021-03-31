import { JqDetailWidgetConfig } from '@dg3/schema';

export const DIO_CARDS: JqDetailWidgetConfig = {
  id: 'dio.cards',
  type: 'Cards',
  language: 'jq',
  query: `
    query DioCards($elementId: ID!) {
      set: diosSetById(ids: [$elementId]) {
        items {
          id
          did {
            dataType {
              id
              localization {
                name
              }
            }
          }
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
    {data: [
      .set.items[0] |
       { key: "value", label: "hodnota", value: ( if .did.dataType.id == "json" then .did.dataType.localization.name else .value.normalizedValue end) },
       { key: "validity", label: "validita", value: (.validity.isInvalid == false)},
       { key: "duplicity", label: "duplicita", value: .validity.isDuplicity }
    ]}
  `,
};
