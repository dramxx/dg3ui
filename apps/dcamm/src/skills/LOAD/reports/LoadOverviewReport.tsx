import { ReportConfig } from '@dg3/schema';

export const loadOverviewReport: ReportConfig = {
  id: 'loadOverviewReport',
  techDescription: 'Load overview',
  title: 'přehled',
  keywords: ['kpi chart', 'om', 'overview'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'omInvalidTou',
      type: 'KpiChart',
      overviewModule: 'LOAD',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet',
      query: `query omInvalidTou($time: TimeDelimitation!) {
                  diosSet(filter: {didFilter: {
                    ids: ["information:electricity.load_control.register_tou_id_and_evidenced_switching_plan_id_differed"]
                  }},time: $time) {
                  count
                  }
                }`,
      jsonPathMapping: [
        {
          key: 'kpiObject',
          type: 'object',
          values: [
            {
              key: 'id',
              value: 'load.omInvalidTou',
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
        height: 4,
        width: 5,
      },
      chartProps: {
        title: 'OM s nesprávnou TOU',
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
      id: 'omInvalidSwitching',
      type: 'KpiChart',
      overviewModule: 'LOAD',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet',
      query: `query omWithInvalidSwitching($time: TimeDelimitation!) {
                  diosSet(filter: {didFilter: {
                    ids: ["information:electricity.load_control.load_switching_follows_timeline_logical_and_1_days"]
                  }, valueFilter: {keyword: {equals: "not_ok"}}},time: $time) {
                  count
                  }
                }`,
      jsonPathMapping: [
        {
          key: 'kpiObject',
          type: 'object',
          values: [
            {
              key: 'id',
              value: 'load.omInvalidSwitching',
            },
            {
              key: 'value',
              value: '$[*].count',
            },
          ],
        },
      ],
      position: {
        x: 5,
        y: 0,
        height: 4,
        width: 5,
      },
      chartProps: {
        title: 'počet OM s nesprávným spínáním',
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
      id: 'OmWith2TTarifType',
      type: 'KpiChart',
      overviewModule: 'LOAD',
      overviewId: '',
      includedFilters: ['place'],
      language: 'jsonpath',
      rootPath: '$.set',
      query: `
          query OmWith2TTarifType ($placesSetFilter: InstancesSetPatternMatcher!){
            set: placesSet (filter: {AND: [
              $placesSetFilter,
              { node: { kindName: "place:place.consumption_point"}},
              { node: {attrValue: {did: "information:attribute.tariftype", value: ["PE8D25D","PE8C25D","PE8D57D","PE8C57D","PE8D45D","PE8D45D"]} }}
            ]}) {
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
              value: 'load.om2T',
            },
            {
              key: 'value',
              value: '$[*].count',
            },
          ],
        },
      ],
      position: {
        x: 10,
        y: 0,
        height: 4,
        width: 5,
      },
      chartProps: {
        title: 'počet OM s 2T sazbou',
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
      id: 'omInvalidTouBarChart',
      type: 'BarChart',
      overviewModule: 'LOAD',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.splitByTimestampInterval[*]',
      query: `
        query omWithInvalidTou($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:electricity.load_control.register_tou_id_and_evidenced_switching_plan_id_differed"
                ]
              }
            }
            time: $time
          ) {
            splitByTimestampInterval(
              split: {
                flexible: {
                  granularity: { calendarInterval: { time: DAY } }
                  showEmpty: true
                  size: 100
                }
              }
            ) {
              from
              set {
                count
              }
            }
          }
        }
      `,
      jsonPathMapping: [
        {
          key: 'bar',
          type: 'object',
          values: [
            {
              key: 'id',
              value: '$.from',
            },
            {
              key: 'odběrná místa',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 4,
        height: 10,
        width: 12,
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
        title: 'počet OM s nesprávnou TOU',
        legendShow: false,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: '',
        showBorder: true,
        xAxis: {
          label: '',
          minInterval: 1,
        },
        yAxis: {
          label: 'počet',
          minInterval: 1,
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
    {
      id: 'omInvalidTOUSwitchingBarChart',
      type: 'BarChart',
      overviewModule: 'LOAD',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.splitByTimestampInterval[*]',
      query: `
        query omWithInvalidTou($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:electricity.load_control.load_switching_follows_timeline_logical_and_1_days"
                ]
              }
              valueFilter: { keyword: { equals: "not_ok" } }
            }
            time: $time
          ) {
            splitByTimestampInterval(
              split: {
                flexible: {
                  granularity: { calendarInterval: { time: DAY } }
                  showEmpty: true
                  size: 100
                }
              }
            ) {
              from
              set {
                count
              }
            }
          }
        }
      `,
      jsonPathMapping: [
        {
          key: 'bar',
          type: 'object',
          values: [
            {
              key: 'id',
              value: '$.from',
            },
            {
              key: 'odběrná místa',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 14,
        height: 10,
        width: 12,
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
        title: 'počet OM, kde události o spínání neodpovídají odečtené TOU',
        legendShow: false,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: '',
        showBorder: true,
        xAxis: {
          label: '',
          minInterval: 1,
        },
        yAxis: {
          label: 'počet',
          minInterval: 1,
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
  ],
};
