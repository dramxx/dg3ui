import { ReportConfig } from '@dg3/schema';

export const kpiChartReport: ReportConfig = {
  id: 'KpiChartReport',
  techDescription: 'KpiChartReport',
  title: 'Kpi chart report',
  keywords: ['kpi chart', 'devices', 'count'],
  canvasSettings: { rows: 8, columns: 8 },
  version: '1.0.0',
  widgets: [
    {
      id: 'DevicesCount',
      type: 'KpiChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['device'],
      language: 'jsonpath',
      rootPath: '$.placesSet',
      query: `{ placesSet { count }}`,
      jsonPathMapping: [
        {
          key: 'kpiObject',
          type: 'object',
          values: [
            {
              key: 'id',
              value: 'kpi123',
            },
            {
              key: 'value',
              value: '$[*].count',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 0,
        height: 3,
        width: 3,
      },
      chartProps: {
        title: 'Devices total count',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: '',
        format: {
          digits: -1,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
  ],
};
