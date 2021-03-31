import { ReportConfig } from '@dg3/schema';

export const placOverviewReport: ReportConfig = {
  id: 'placOverviewReport',
  techDescription: 'Places overview',
  title: 'přehled',
  keywords: ['kpi chart', 'places', 'count'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'placesCount',
      type: 'KpiChart',
      overviewModule: 'PLAC',
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
              value: 'plac.placesCount',
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
    {
      id: 'dtsCount',
      type: 'KpiChart',
      overviewModule: 'PLAC',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '$.placesSet',
      query: `
        query DTSCount {
          placesSet(filter: {node: {kindId: ["place:place.secondary_substation"]}}) {
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
              value: 'plac.dtsCount',
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
        title: 'aktuální počet DTS',
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
