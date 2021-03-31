import { JqDetailWidgetConfig } from '@dg3/schema';

export const PLACE_CARDS: JqDetailWidgetConfig = {
  id: 'place.cards',
  type: 'Cards',
  language: 'jq',
  query: `
      query PlaceCards($elementId: ID!) {
        places(filter: {node: {intId: [$elementId]}}) {
          attributes(dids: ["information:attribute.tariftype", "information:attribute.anlart", "information:attribute.mr_source", "information:attribute.typ_mereni"]) {
            did {
              id
              localization  {
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
      .places[0].attributes[]
      | {
        key: .did.id,
        label: .did.localization.name,
        value: (.normalizedValue as $val | if .did.dataType.enumValues then (.did.dataType.enumValues[] | select(.id == $val).localization.name) // null else $val end)
      }
    ]}
  `,
};
