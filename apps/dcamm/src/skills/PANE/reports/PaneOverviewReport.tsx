import { ReportConfig } from '@dg3/schema';

export const paneOverviewReport: ReportConfig = {
  id: 'paneOverviewReport',
  techDescription: 'Panel overview',
  title: 'přehled',
  keywords: ['kpi chart', 'panel', 'overview'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'devicesCount',
      type: 'KpiChart',
      overviewModule: 'PANE',
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
              value: 'pane.devicesCount',
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
      id: 'placesCount',
      type: 'KpiChart',
      overviewModule: 'PANE',
      overviewId: '',
      includedFilters: ['place'],
      language: 'jsonpath',
      rootPath: '$.placesSet',
      query: `
        query PlacesCount($placesSetFilter: InstancesSetPatternMatcher!) {
          placesSet(filter: {AND: [$placesSetFilter, {node: {kindId: ["place:place.consumption_point","place:place.secondary_substation"]}}]}) {
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
              value: 'pane.placesCount',
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
        title: 'aktuální počet míst',
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
