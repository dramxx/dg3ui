import { ReportConfig } from '@dg3/schema';

export const sunburstChartReport: ReportConfig = {
  id: 'SunburstChartReport',
  techDescription: 'SunburstChartReport',
  title: 'Sunburst Chart report',
  keywords: ['sunburst chart', 'devices', 'kind'],
  canvasSettings: { rows: 8, columns: 8 },
  version: '1.0.0',
  widgets: [
    {
      id: 'devicesByKind',
      type: 'SunburstChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '$.devicesSet.groupByKind[*]',
      query: `
          query DevicesSunburstReport {
            devicesSet {
              groupByKind {
                kind {
                  id
                  localization {
                    name
                  }
                }
                set {
                  count
                  groupByAttr(did: "attribute.device_lifecycle_phase") {
                    attr {
                      did {
                        id
                        localization {
                          name
                        }
                      }
                      value
                    }
                    set {
                      count
                    }
                  }
                }
              }
            }
          }
        `,
      jsonPathMapping: [
        {
          key: 'root',
          type: 'array',
          values: [
            { key: 'intId', value: '$.kind.id' },
            { key: 'name', value: '$.kind.localization.name' },
            { key: 'value', value: '$.set.count' },
            {
              key: 'children',
              type: 'array',
              values: [
                { key: 'intId', value: '$.set.groupByAttr[*].attr.did.id' },
                {
                  key: 'localizationName',
                  value: '$.set.groupByAttr[*].attr.did.localization.name',
                },
                { key: 'name', value: '$.set.groupByAttr[*].attr.value' },
                { key: 'value', value: '$.set.groupByAttr[*].set.count' },
              ],
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
        title: 'Devices by kind',
        widgetStyle: '',
        showBorder: true,
        colors: [
          '#FFD38D',
          '#b1423d',
          '#FFC452',
          '#D9752D',
          '#BF5533',
          '#B1423D',
          '#923545',
          '#79313D',
        ],
        legendShow: false,
        enableLegendHiding: false,
        enableDataSelection: false,
        enableDataLabels: true,
        enableTooltip: true,
        enableLabelRotation: 0,
      },
    },
  ],
};
