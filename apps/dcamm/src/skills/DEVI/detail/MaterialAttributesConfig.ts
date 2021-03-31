import { JspDetailWidgetConfig } from '@dg3/schema';

export const MATERIAL_ATTRIBUTES: JspDetailWidgetConfig = {
  id: 'material.attributes',
  title: 'Atributy materiálu',
  type: 'Attributes',
  language: 'jsonpath',
  gql: {
    query: `
    query deviceKindAttributes($elementId: ID!) {
      devices(filter: {node: {intId: [$elementId]}}) {
        kind {
          id
          attributes {
            did {
              id
              localization  {
                name
              }
            }
            value
          }
        }
      }
    }
  `,
    rootPath: '$.devices[0].kind.attributes[*]',
    jsonPathMapping: [
      {
        type: 'object',
        key: 'tableColumns',
        values: [
          {
            key: 'id',
            value: '$.did.id',
          },
          {
            key: 'did',
            value: '$.did.localization.name',
          },
          {
            key: 'value',
            value: '$.value',
          },
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
