import { ReportConfig } from '@dg3/schema';

export const deviOverviewReport: ReportConfig = {
  id: 'deviOverviewReport',
  techDescription: 'Devices overview',
  title: 'přehled',
  keywords: ['kpi chart', 'devices', 'count'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'DevicesCount',
      type: 'KpiChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['device'],
      language: 'jsonpath',
      rootPath: '$.devicesSet',
      query: `
          query DeviceCount($devicesSetFilter: InstancesSetPatternMatcher!){
            devicesSet (filter: $devicesSetFilter) {
              count
            }
          }
        `,
      jsonPathMapping: [
        {
          key: 'kpiObject',
          type: 'object',
          values: [
            {
              key: 'id',
              value: 'devi.devicescOUNT',
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
        width: 4,
      },
      chartProps: {
        title: 'aktuální počet zařízení',
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
    {
      id: 'electricMetersCount',
      type: 'KpiChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['device'],
      language: 'jsonpath',
      rootPath: '$.devicesSet',
      query: `
          query ElectricMetersCount($devicesSetFilter: InstancesSetPatternMatcher!) {
            devicesSet(filter: {AND: [$devicesSetFilter, {node: {kind: {attrValue: {did: "information:attribute.ptb_skupina", value: ["1", "2", "3", "4"]}}}}]}) {
              count
            }
          }
        `,
      jsonPathMapping: [
        {
          key: 'kpiObject',
          type: 'object',
          values: [
            {
              key: 'id',
              value: 'devi.electricMetersCount',
            },
            {
              key: 'value',
              value: '$[*].count',
            },
          ],
        },
      ],
      position: {
        x: 4,
        y: 0,
        height: 3,
        width: 4,
      },
      chartProps: {
        title: 'počet elektroměrů',
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
