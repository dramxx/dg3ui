import { JqDetailWidgetConfig } from '@dg3/schema';

export const DEVICE_CARDS: JqDetailWidgetConfig = {
  id: 'device.cards',
  type: 'Cards',
  language: 'jq',
  query: `
      query lifecycle($elementId: ID!) {
        devices(filter: {node: {intId: [$elementId]}}) {
          attributes(dids: ["information:attribute.device_lifecycle_phase"]) {
            did {
              id
              localization   {
                name
              }
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
        }
      }
    `,
  transformation: `
    {data: [
      .devices[0].attributes[]
      | {
        key: .did.id,
        label: .did.localization.name,
        value: (.normalizedValue as $val | if .did.dataType.enumValues then (.did.dataType.enumValues[] | select(.id == $val).localization.name) // null else $val end)
      }
    ]}
  `,
};
