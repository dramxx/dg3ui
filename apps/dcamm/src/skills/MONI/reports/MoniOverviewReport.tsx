import { ReportConfig } from '@dg3/schema';

export const moniOverviewReport: ReportConfig = {
  id: 'moniOverviewReport',
  techDescription: 'Monitoring overview',
  title: 'přehled',
  keywords: ['kpi chart', 'monitoring', 'overview'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'monitoredDevices',
      type: 'KpiChart',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet',
      query: `
          query readingSuccess($time: TimeDelimitation) {
            diosSet(time: $time, filter: {didFilter: {ids: [
              "information:information_technology.network.communication.connection_successful_instantaneous",
            ]}}) {
              uniqueCountObject
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
              value: 'monitoredDevices',
            },
            {
              key: 'value',
              value: '$[*].uniqueCountObject',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'počet monitorovaných zařízení',
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
      id: 'totalAvgDeviceAvailability',
      type: 'KpiChart',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query totalAvgDeviceAvailability($time: TimeDelimitation) {
          diosSet(time: $time, filter: {didFilter: {ids: [
            "information:information_technology.network.communication.connection_successful_instantaneous",
          ]}}) {
            avgValue
          }
        }
      `,
      transformation:
        '{ data: { id: "totalAvgDeviceAvailability", value: (if (.diosSet.avgValue != null) then (.diosSet.avgValue * 100) else 0 end) }}',
      position: {
        x: 4,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'průměrná dostupnost',
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
      id: 'totalAvgDeviceLatence',
      type: 'KpiChart',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query totalAvgDeviceLatence($time: TimeDelimitation) {
          diosSet(time: $time, filter: {didFilter: {ids: [
            "information:information_technology.network.communication.communication_duration_instantaneous",
          ]}}) {
            avgValue
          }
        }
      `,
      transformation:
        '{ data: { id: "totalAvgDeviceLatence", value: (if (.diosSet.avgValue != null) then (.diosSet.avgValue * 1000) else 0 end) }}',
      position: {
        x: 8,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'průměrná latence',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: 'ms',
        format: {
          digits: 0,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
    {
      id: 'avgDeviceAvailabilityPerDay',
      type: 'BarChart',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query avgDeviceAvailability($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:information_technology.network.communication.connection_successful_instantaneous"
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
      transformation:
        '{ data: [ .diosSet.splitByTimestampInterval[] |  { id: .from, "průměrná dostupnost": (if (.set.avgValue != null) then (.set.avgValue * 100) else null end)} ]}',
      position: {
        x: 0,
        y: 14,
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
        title: 'průběh průměrné dostupnosti zařízení',
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
          label: 'dostupnost (%)',
          min: 0,
          max: 100,
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
    {
      id: 'avgDeviceReadingDelayPerDay',
      type: 'BarChart',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query avgDeviceReadingDelay($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:information_technology.network.communication.communication_duration_instantaneous"
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
      transformation:
        '{ data: [ .diosSet.splitByTimestampInterval[] |  { id: .from, "průměrná odezva": (if (.set.avgValue != null) then (.set.avgValue * 1000) else null end)} ]}',
      position: {
        x: 8,
        y: 14,
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
        title: 'průběh průměrné latence zařízení',
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
          label: 'latence (ms)',
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
    {
      id: 'devicesAvailabilityByDay',
      type: 'MultiSeriesHeatMap',
      overviewModule: 'MONI',
      overviewId: '',
      position: {
        x: 0,
        y: 4,
        height: 10,
        width: 16,
      },
      language: 'jq',
      query: `
        query devicesAvailabilityByDay($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:information_technology.network.communication.connection_successful_instantaneous"
                ]
              }
            }
            time: $time
          ) {
            groupByObject {
              key {
                ... on SingleInstanceKey {
                  bucket {
                    ... on Device {
                      id {
                        value
                      }
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
      transformation: `
        {data: [
          .diosSet.groupByObject[]
          | .key.bucket.id.value as $id
          | {
            id: $id,
            label: $id,
            data: [.set.splitByTimestampInterval[] | {timestamp: .from, value: .set.avgValue}]
          }
        ]}
      `,
      chartProps: {
        title: 'dostupnost podle zařízení',
        xAxisLabel: 'ckód',
        colors: ['#FD845D', '#FEAE5D', '#FFD665', '#FFE972', '#FFF2AD'],
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: true,
        enableTooltip: true,
        showBorder: true,
        widgetStyle: '',
      },
      includedFilters: ['time'],
    },
  ],
};
