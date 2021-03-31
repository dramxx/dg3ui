import { BarChartWidget, ReportConfig } from '@dg3/schema';

const createBarChartWidget = (
  id: string,
  x: number,
  y: number
): BarChartWidget => ({
  id,
  type: 'BarChart',
  overviewModule: 'DEVI',
  overviewId: '',
  includedFilters: [],
  language: 'jsonpath',
  rootPath: '$.places[*]',
  query:
    'query substations_part_count {\n' +
    '  places(filter: {node: {kindName: "SUBSTATION"}}, page: {offset: 0, size: 10}) {\n' +
    '    intId\n' +
    '    id {\n' +
    '      did\n' +
    '      value\n' +
    '    }\n' +
    '    \n' +
    '    relPlacesSet(walk: {path: [{follow: {edge: {type: "CONNECTED_TO", direction: IN}}}]}) {\n' +
    '      groupByKind {\n' +
    '        kind {\n' +
    '          codeName\n' +
    '        }\n' +
    '        set {\n' +
    '          count\n' +
    '        }\n' +
    '      }\n' +
    '    }\n' +
    '  }\n' +
    '}',
  jsonPathMapping: [
    {
      key: 'bar',
      type: 'object',
      values: [
        {
          key: 'id',
          value: '$.id.value',
        },
        {
          key: '$.relPlacesSet.groupByKind[*].kind.codeName',
          value: '$.relPlacesSet.groupByKind[*].set.count',
        },
      ],
    },
  ],
  position: {
    x,
    y,
    height: 4,
    width: 4,
  },
  chartProps: {
    colors: [
      '#FFD38D',
      '#BF5533',
      '#F49A21',
      '#BF5533',
      '#EA873D',
      '#D9752D',
      '#BF5533',
      '#B1423D',
      '#923545',
      '#FFC452',
    ],
    title: 'stacked vertical Bar chart',
    legendShow: true,
    enableLegendHiding: true,
    enableDataSelection: true,
    enableDataLabels: true,
    enableTooltip: true,
    widgetStyle: 'stacked',
    showBorder: true,
    xAxis: {
      label: 'substations',
    },
    yAxis: {
      label: 'parts count',
    },
    enableXZoom: true,
    layoutDirection: 'vertical',
  },
});

export const barChartReport: ReportConfig = {
  id: 'BarChartReport',
  techDescription: 'BarChartReport',
  title: 'Bar chart report',
  keywords: ['bar chart', 'devices', 'count'],
  canvasSettings: { rows: 8, columns: 8 },
  version: '1.0.0',
  widgets: [
    createBarChartWidget('DevicesCount', 0, 0),
    createBarChartWidget('DevicesCount1', 4, 0),
    createBarChartWidget('DevicesCount2', 0, 4),
  ],
};
