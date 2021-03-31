import { PieChartWidget, ReportConfig } from '@dg3/schema';

const createPieChartWidget = (
  id: string,
  x: number,
  y: number
): PieChartWidget => ({
  id,
  type: 'PieChart',
  overviewModule: 'DEVI',
  overviewId: '',
  includedFilters: [],
  language: 'jsonpath',
  rootPath: '$.placesSet.groupByKind[*]',
  query:
    '{\n' +
    '    placesSet{\n' +
    '    groupByKind{\n' +
    '      kind{codeName}\n' +
    '      set{count}\n' +
    '    }\n' +
    '  }\n' +
    '}',
  jsonPathMapping: [
    {
      key: 'pie',
      type: 'object',
      values: [
        {
          key: 'id',
          value: '$.kind.codeName',
        },
        {
          key: 'name',
          value: '$.kind.codeName',
        },
        {
          key: 'value',
          value: '$.set.count',
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
      '#B1423D',
      '#FFC452',
      '#D9752D',
      '#BF5533',
      '#B1423D',
      '#923545',
      '#79313D',
    ],
    title: 'Devices count by Kind',
    legendShow: true,
    enableLegendHiding: true,
    enableDataSelection: true,
    enableDataLabels: false,
    enableTooltip: true,
    widgetStyle: 'pie',
    showBorder: true,
    enableRadialLabels: true,
  },
});

export const pieChartReport: ReportConfig = {
  id: 'PieChartReport',
  techDescription: 'PieChartReport',
  title: 'Pie chart report',
  keywords: ['pie chart', 'devices', 'kind'],
  canvasSettings: { rows: 8, columns: 8 },
  version: '1.0.0',
  widgets: [
    createPieChartWidget('DevicesByKindPie', 0, 0),
    createPieChartWidget('DevicesByKindPie1', 4, 4),
  ],
};
