import { ReportConfig } from '@dg3/schema';

export const lineChartReport: ReportConfig = {
  id: 'LineChartReport',
  techDescription: 'LineChartReport',
  title: 'Line chart report',
  keywords: ['line chart', 'devices', 'count'],
  canvasSettings: { rows: 8, columns: 8 },
  version: '1.0.0',
  widgets: [
    {
      id: 'EstimatedEnergyLostLineChart',
      type: 'LineChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '$.places[*]',
      query:
        'query secondary_substations {\n' +
        '  places(filter: {node: {kindName: "SUBSTATION"}}) {\n' +
        '    intId\n' +
        '    id {\n' +
        '      value\n' +
        '    }\n' +
        '    relPlacesSet(walk: {path: [{follow: {edge: {type: "CONNECTED_TO", direction: IN}}}]}, filter: {node: {kindName: "SEGMENT"}}) {\n' +
        '      diosObject(filter: {didFilter: {ids: "event.ntl.recognized_suspicion_energy_lost_estimated"}}) {\n' +
        '        items {\n' +
        '          id\n' +
        '          timestamp\n' +
        '          objectPlace{intId}\n' +
        '          value {\n' +
        '            normalizedValue\n' +
        '          }\n' +
        '        }\n' +
        '      }\n' +
        '    }\n' +
        '  }\n' +
        '}',
      jsonPathMapping: [
        {
          key: 'seriesObject',
          type: 'object',
          values: [{ key: 'id', value: '$.id.value' }],
        },
        {
          key: 'seriesData',
          type: 'array',
          values: [
            {
              key: 'x',
              value: '$.relPlacesSet.diosObject.items[*].objectPlace.intId',
            },
            {
              key: 'y',
              value: '$.relPlacesSet.diosObject.items[*].value.normalizedValue',
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
        colors: [
          '#FFD38D',
          '#BF5533',
          '#FFC452',
          '#F49A21',
          '#EA873D',
          '#D9752D',
          '#B1423D',
          '#923545',
          '#79313D',
        ],
        title: 'Estimated energy lost by substation parts',
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: 'stacked',
        showBorder: true,
        enableLineTooltip: true,
        enableArea: false,
        axisXLabel: 'suspicions place object',
        axisYLabel: 'est. energy lost',
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
  ],
};
