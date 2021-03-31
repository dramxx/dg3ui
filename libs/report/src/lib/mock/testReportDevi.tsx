import { ReportConfig } from '@dg3/schema';

export const deviReport: ReportConfig = {
  id: 'Device_report_1',
  techDescription: 'mega test report',
  title: 'Device report 1',
  keywords: ['key', 'words', 'for', 'place', 'report'],
  canvasSettings: { rows: 8, columns: 10 },
  version: '1.0.0',
  widgets: [
    {
      id: 'table123',
      type: 'TableWidget',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      position: { x: 0, y: 0, height: 8, width: 6 },
      language: 'jsonpath',
      rootPath: '',
      query: '',
      jsonPathMapping: [],
      chartProps: {
        title: 'Table Widget',
        rowsInTable: 12,
        showBorder: true,
        showExport: false,
        showPageSize: false,
        showPagination: false,
      },
    },
    {
      id: 'Pie123',
      type: 'PieChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '',
      query: '',
      jsonPathMapping: [],
      position: { x: 6, y: 0, height: 4, width: 4 },
      chartProps: {
        colors: [
          '#FFD38D',
          '#FFC452',
          '#F49A21',
          '#EA873D',
          '#D9752D',
          '#BF5533',
          '#B1423D',
          '#923545',
          '#79313D',
        ],
        title: 'Device categories',
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: true,
        enableTooltip: true,
        widgetStyle: 'pie',
        showBorder: true,
        enableRadialLabels: false,
      },
    },
    {
      id: 'BarDevi123',
      type: 'BarChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '',
      query: '',
      jsonPathMapping: [],
      position: { x: 6, y: 4, height: 4, width: 4 },
      chartProps: {
        colors: [
          'orange',
          'lightblue',
          'yellow',
          'lightgray',
          'lightblue',
          'lime',
        ],
        title: 'Grouped vertical Bar chart',
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: true,
        enableTooltip: true,
        widgetStyle: 'grouped',
        showBorder: true,
        xAxis: {
          label: '',
        },
        yAxis: {
          label: '',
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
  ],
};
