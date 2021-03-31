import { JspDetailWidgetConfig } from '@dg3/schema';

export const DEVICE_LOCATION_ATTRIBUTES_CONFIG: JspDetailWidgetConfig = {
  id: 'device.location.attributes',
  type: 'Attributes',
  title: 'Místo instalace',
  language: 'jsonpath',
  gql: {
    query: `
      query deviceLocation($elementId: ID!) {
        places(
          filter: {
            rels: {
              toDevice: { node: { intId: [$elementId] } }
              traversal: { edge: { type: "installed_at" } }
            }
            node: { kindName: "place:place.device_location" }
          }
        ) {
          attributes {
            did {
              id
              localization  {
                name
              }
            }
            normalizedValue
          }
        }
      }
    `,
    rootPath: '$.places[0].attributes[*]',
    jsonPathMapping: [
      {
        type: 'object',
        key: 'tableColumns',
        values: [
          { key: 'id', value: '$.did.id' },
          { key: 'did', value: '$.did.localization.name' },
          { key: 'value', value: '$.normalizedValue' },
        ],
      },
    ],
  },
  columns: [
    { Header: 'Kmenová data', accessor: 'did' },
    { Header: 'Hodnota', accessor: 'value' },
  ],
  editable: [],
  refetchQueries: [],
  sortColumn: 'did',
};
