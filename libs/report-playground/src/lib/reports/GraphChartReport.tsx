import { ReportConfig } from '@dg3/schema';

export const graphChartReport: ReportConfig = {
  id: 'GraphChartReport',
  techDescription: 'GraphChartReport',
  title: 'Graph chart  report',
  keywords: ['Graph chart', 'suspicious detection', 'kind'],
  canvasSettings: { rows: 8, columns: 8 },
  version: '1.0.0',
  widgets: [
    {
      id: 'substation topology',
      type: 'GraphChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '$.places[0]',
      query: `query substationTopologyData {
          places(
            filter: { node: { id: { did: "identificator.object_id", values: ["TRANSF_608656"] } } }
          ) {
            nodes: relPlace(
              filter: {
                node: { kindName: ["JUNCTION", "CONNECTION_POINT", "TRANSFORMER"] }
              }
              walk: {
                path: [{ follow: { edge: { type: "CONNECTED_TO" } } }]
              }
            ) {
              id {
                value
              }
              kind {
                codeName
              }
              attrs(
                dids: ["space_and_time.gps_longitude", "space_and_time.gps_latitude"]
              ) {
                did
                value
              }
            }

            cp_jun_links: relPlace(
            filter: {  node: { kindName: "CONNECTION_POINT" } }
              walk: { path: [{ follow: { edge: { type: "CONNECTED_TO" } } }] }
            ) {
              id {
                value
              }
              target: relPlace(
                filter: {  node: { kindName: "JUNCTION" } }
                edge: { type: "CONNECTED_TO", direction: OUT }) {
                id {
                  value
                }
              }
            }

            links: relPlace(
            filter: {  node: { kindName: [ "SEGMENT" ] } }
              walk: { path: [{ follow: { edge: { type: "CONNECTED_TO" } } }] }
            ) {
              id {
                value
              }
              kind {
                codeName
              }

              target: relPlace(edge: { type: "CONNECTED_TO", direction: IN }) {
                id {
                  value
                }
              }
              source: relPlace(edge: { type: "CONNECTED_TO", direction: OUT }) {
                id {
                  value
                }
              }
            }
          }
        }`,
      jsonPathMapping: [
        {
          key: 'links',
          type: 'array',
          values: [
            {
              key: 'id',
              value: '$.links[*].id.value',
            },
            {
              key: 'name',
              value: '$.links[*].id.value',
            },
            {
              key: 'target',
              value: '$.links[*].target[0].id.value',
            },
            {
              key: 'source',
              value: '$.links[*].source[0].id.value',
            },
          ],
        },
        {
          key: 'cp_jun_links',
          type: 'array',
          values: [
            {
              key: 'id',
              value: '$.cp_jun_links[*].id.value',
            },
            {
              key: 'name',
              value: '$.cp_jun_links[*].id.value',
            },
            {
              key: 'target',
              value: '$.cp_jun_links[*].target[0].id.value',
            },
          ],
        },
        {
          key: 'nodes',
          type: 'array',
          values: [
            {
              key: 'id',
              value: '$.nodes[*].id.value',
            },
            {
              key: 'name',
              value: '$.nodes[*].id.value',
            },
            {
              key: 'x',
              value:
                "$.nodes[*].attrs[?(@.did == 'space_and_time.gps_latitude')].value",
            },
            {
              key: 'y',
              value:
                "$.nodes[*].attrs[?(@.did == 'space_and_time.gps_longitude')].value",
            },
            {
              key: 'category',
              value: '$.nodes[*].kind.codeName',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 0,
        height: 8,
        width: 8,
      },
      chartProps: {
        title: 'Substation topology',
        widgetStyle: '',
        showBorder: true,
        colors: [
          'hsl(2, 59%, 54%)',
          'hsl(206, 33%, 33%)',
          '#FFD38D',
          '#B1423D',
          '#FFC452',
          '#D9752D',
          '#BF5533',
          '#B1423D',
          '#923545',
          '#79313D',
        ],
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: true,
        enableTooltip: false,
        layout: 'none',
        enableRoam: true,
      },
    },
  ],
};
