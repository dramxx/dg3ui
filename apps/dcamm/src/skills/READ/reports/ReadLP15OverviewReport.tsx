import { ReportConfig } from '@dg3/schema';

export const readLP15OverviewReport: ReportConfig = {
  id: 'readLP15OverviewReport',
  techDescription: 'readout LP15 overview',
  title: 'odečtenost IEM LP15',
  keywords: ['kpi chart', 'readout', 'count'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'readout15Mwait6hours',
      type: 'KpiChart',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
          query readout15Mwait6hours($time: TimeDelimitation!) {
            diosSet(filter: {didFilter: {ids: ["information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_6_hours_last_average_1_days"]}}, time: $time) {
              count
              avgValue
            }
          }
        `,
      transformation: '{data: {id: "15Mwait6hours", value: .diosSet.avgValue}}',
      position: {
        x: 0,
        y: 0,
        height: 3,
        width: 4,
      },
      chartProps: {
        title: 'IEM LP15 po 6 hodinách',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: '%',
        format: {
          digits: 1,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
    {
      id: 'readout15Mwait1dayCount',
      type: 'KpiChart',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
          query readout15Mwait1day($time: TimeDelimitation!) {
            diosSet(filter: {didFilter: {ids: ["information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_1_day_last_average_1_days"]}}, time: $time) {
              count
              avgValue
            }
          }
        `,
      transformation: '{data: {id: "15Mwait1day", value: .diosSet.avgValue}}',
      position: {
        x: 4,
        y: 0,
        height: 3,
        width: 4,
      },
      chartProps: {
        title: 'IEM LP15 po 1 dni',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: '%',
        format: {
          digits: 1,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
    {
      id: 'readout15Mwait3days',
      type: 'KpiChart',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
          query readout15Mwait1week($time: TimeDelimitation!) {
            diosSet(filter: {didFilter: {ids: ["information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_3_days_last_average_1_days"]}}, time: $time) {
              count
              avgValue
            }
          }
        `,
      transformation: '{data: {id: "15Mwait3days", value: .diosSet.avgValue}}',
      position: {
        x: 8,
        y: 0,
        height: 3,
        width: 4,
      },
      chartProps: {
        title: 'IEM LP15 po 3 dnech',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: '%',
        format: {
          digits: 1,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
    {
      id: 'readout15Mwait1weekCount',
      type: 'KpiChart',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
          query readout15Mwait1week($time: TimeDelimitation!) {
            diosSet(filter: {didFilter: {ids: ["information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_1_week_last_average_1_days"]}}, time: $time) {
              count
              avgValue
            }
          }
        `,
      transformation: '{data: {id: "15Mwait1week", value: .diosSet.avgValue}}',
      position: {
        x: 12,
        y: 0,
        height: 3,
        width: 4,
      },
      chartProps: {
        title: 'IEM LP15 po 1 týdnu',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: '%',
        format: {
          digits: 1,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
    {
      id: 'IEM_LP15_6_HOURS',
      type: 'BarChart',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.splitByTimestampInterval[*]',
      query: `
        query readPerDayLP151day($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_6_hours_last_average_1_days"
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
                avgValue
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
              key: 'průměrná odečtenost',
              value: '$.set.avgValue',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 3,
        height: 8,
        width: 8,
      },
      chartProps: {
        colors: [
          '#FD845D',
          '#A56813',
          '#FFD665',
          '#F8925C',
          '#FEAE5D',
          '#AC772D',
          '#FFE972',
          '#D9A051',
          '#FFF2AD',
        ],
        title: 'průběh odečtenosti IEM LP15 po 6 hodinách',
        legendShow: false,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: '',
        showBorder: true,
        xAxis: {
          label: '',
        },
        yAxis: {
          label: 'odečtenost (%)',
          min: 0,
          max: 100,
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
    {
      id: 'IEM_LP15_1_DAY',
      type: 'BarChart',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.splitByTimestampInterval[*]',
      query: `
        query readPerDayLP151day($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_1_day_last_average_1_days"
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
                avgValue
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
              key: 'průměrná odečtenost',
              value: '$.set.avgValue',
            },
          ],
        },
      ],
      position: {
        x: 8,
        y: 3,
        height: 8,
        width: 8,
      },
      chartProps: {
        colors: [
          '#FD845D',
          '#A56813',
          '#FFD665',
          '#F8925C',
          '#FEAE5D',
          '#AC772D',
          '#FFE972',
          '#D9A051',
          '#FFF2AD',
        ],
        title: 'průběh odečtenosti IEM LP15 po 1 dni',
        legendShow: false,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: '',
        showBorder: true,
        xAxis: {
          label: '',
        },
        yAxis: {
          label: 'odečtenost (%)',
          min: 0,
          max: 100,
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
    {
      id: 'IEM_LP15_3_DAY',
      type: 'BarChart',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.splitByTimestampInterval[*]',
      query: `
        query readPerDayLP151day($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_3_days_last_average_1_days"
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
                avgValue
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
              key: 'průměrná odečtenost',
              value: '$.set.avgValue',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 11,
        height: 8,
        width: 8,
      },
      chartProps: {
        colors: [
          '#FD845D',
          '#A56813',
          '#FFD665',
          '#F8925C',
          '#FEAE5D',
          '#AC772D',
          '#FFE972',
          '#D9A051',
          '#FFF2AD',
        ],
        title: 'průběh odečtenosti IEM LP15 po 3 dnech',
        legendShow: false,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: '',
        showBorder: true,
        xAxis: {
          label: '',
        },
        yAxis: {
          label: 'odečtenost (%)',
          min: 0,
          max: 100,
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
    {
      id: 'IEM_LP15_1_week',
      type: 'BarChart',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.splitByTimestampInterval[*]',
      query: `
        query readPerDayLP151day($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_1_week_last_average_1_days"
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
                avgValue
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
              key: 'průměrná odečtenost',
              value: '$.set.avgValue',
            },
          ],
        },
      ],
      position: {
        x: 8,
        y: 11,
        height: 8,
        width: 8,
      },
      chartProps: {
        colors: [
          '#FD845D',
          '#A56813',
          '#FFD665',
          '#F8925C',
          '#FEAE5D',
          '#AC772D',
          '#FFE972',
          '#D9A051',
          '#FFF2AD',
        ],
        title: 'průběh odečtenosti IEM LP15 po týdnu',
        legendShow: false,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: '',
        showBorder: true,
        xAxis: {
          label: '',
        },
        yAxis: {
          label: 'odečtenost (%)',
          min: 0,
          max: 100,
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
    {
      id: 'avgLP15',
      type: 'LineChart',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.groupByDidNew[*]',
      query: `
        query readPerDayLP151day($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_1_day_last_average_1_days"
                  "information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_1_week_last_average_1_days"
                  "information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_3_days_last_average_1_days"
                  "information:information_technology.network.communication.reading_success_rate.reading_success_rate_LP_15_metering_waiting_6_hours_last_average_1_days"
                ]
              }
            }
            time: $time
          ) {
            groupByDidNew {
              key {
                ... on SingleDidKey {
                  bucket {
                    id
                    localization {
                      name
                    }
                  }
                }
              }
              set {
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
                    avgValue
                  }
                }
              }
            }
          }
        }
      `,
      jsonPathMapping: [
        {
          key: 'seriesObject',
          type: 'object',
          values: [{ key: 'id', value: '$.key.bucket.localization.name' }],
        },
        {
          key: 'seriesData',
          type: 'array',
          values: [
            {
              key: 'x',
              value: '$.set.splitByTimestampInterval[*].from',
            },
            {
              key: 'y',
              value: '$.set.splitByTimestampInterval[*].set.avgValue',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 19,
        height: 10,
        width: 16,
      },
      chartProps: {
        colors: [
          '#F8925C',
          '#A56813',
          '#FFD665',
          '#FD845D',
          '#FEAE5D',
          '#AC772D',
          '#FFE972',
          '#D9A051',
          '#FFF2AD',
        ],
        title: 'Průměrná odečtenost IEM LP15',
        legendShow: true,
        legendSize: 50,
        enableLegendHiding: true,
        enableDataSelection: false,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: 'grouped',
        showBorder: true,
        enableLineTooltip: true,
        enableArea: false,
        axisXLabel: '',
        axisYLabel: 'odečtenost (%)',
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
  ],
};
