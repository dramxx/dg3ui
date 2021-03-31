import { ReportConfig } from '@dg3/schema';

export const measTechnicalValidationReport: ReportConfig = {
  id: 'measTechnicalValidationReport',
  techDescription: 'Measurements technical validation',
  title: 'technická validace',
  keywords: ['kpi chart', 'measurements', 'technical validation'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'validMeasurements',
      type: 'KpiChart',
      overviewModule: 'MEAS',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query validMeasurements($time:TimeDelimitation) {
          diosSet(time: $time, filter: {AND: [{validityFilter: {includeValid: ALL, includeDuplicated: ALL}, tagFilter: {key: {equals: "readout"}}}, {NOT: {didFilter: {ids: ["information:system.cc.cxiem.latest_data_collected", "information:information_technology.network.communication.connection_successful_instantaneous", "information:information_technology.network.communication.communication_duration_instantaneous"]}}}]}) {
            count
            groupByValidity {
              key
              set {
                count
                groupByDuplicity {
                  key
                  set {
                    count
                  }
                }
              }
            }
          }
        }
      `,
      transformation:
        '{data: {id: "validMeasurements", value: ((.diosSet | ((.groupByValidity[] | select(.key == true) | .set.groupByDuplicity[] | select(.key == false).set.count) / .count ) * 100 ) // null )}}',
      position: {
        x: 0,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'validní měření',
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
      id: 'invalidMeasurements',
      type: 'KpiChart',
      overviewModule: 'MEAS',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query invalidMeasurements($time:TimeDelimitation) {
          diosSet(time: $time, filter: {AND: [{validityFilter: {includeValid: ALL, includeDuplicated: ALL}, tagFilter: {key: {equals: "readout"}}}, {NOT: {didFilter: {ids: ["information:system.cc.cxiem.latest_data_collected", "information:information_technology.network.communication.connection_successful_instantaneous", "information:information_technology.network.communication.communication_duration_instantaneous"]}}}]}) {
            count
            groupByValidity {
              key
              set {
                count
              }
            }
          }
        }
      `,
      transformation:
        '{data: {id: "invalidMeasurements", value: ((.diosSet | ((.groupByValidity[] | select(.key == false).set.count) / .count ) * 100 ) // null)}}',
      position: {
        x: 4,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'nevalidní měření',
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
      id: 'duplicityMeasurements',
      type: 'KpiChart',
      overviewModule: 'MEAS',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query duplicityMeasurements($time:TimeDelimitation) {
          diosSet(time: $time, filter: {AND: [{validityFilter: {includeValid: ALL, includeDuplicated: ALL}, tagFilter: {key: {equals: "readout"}}}, {NOT: {didFilter: {ids: ["information:system.cc.cxiem.latest_data_collected", "information:information_technology.network.communication.connection_successful_instantaneous", "information:information_technology.network.communication.communication_duration_instantaneous"]}}}]}) {
            count
            groupByDuplicity {
              key
              set {
                count
              }
            }
          }
        }
      `,
      transformation:
        '{data: {id: "duplicityMeasurements", value: ((.diosSet | ((.groupByDuplicity[] | select(.key == true).set.count) / .count ) * 100 ) // null)}}',
      position: {
        x: 8,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'duplicitní měření',
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
      id: 'invalidMeasurementsPerDay',
      type: 'BarChart',
      overviewModule: 'MEAS',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query invalidMeasurementsPerDay($time: TimeDelimitation) {
          diosSet(
            time: $time
            filter: {
              AND: [
                {
                  validityFilter: {
                    includeValid: INVALID
                    includeDuplicated: ALL
                  }
                  tagFilter: { key: { equals: "readout" } }
                }
                {
                  NOT: {
                    didFilter: {
                      ids: [
                        "information:system.cc.cxiem.latest_data_collected"
                        "information:information_technology.network.communication.connection_successful_instantaneous"
                        "information:information_technology.network.communication.communication_duration_instantaneous"
                      ]
                    }
                  }
                }
              ]
            }
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
      transformation:
        '{ data: [ .diosSet.splitByTimestampInterval[] |  { id: .from, "nevalidní": (.set.count // null)} ]}',
      position: {
        x: 0,
        y: 4,
        height: 8,
        width: 12,
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
        title: 'počet nevalidních měření',
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
          label: 'počet',
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
    {
      id: 'duplicityMeasurementsPerDay',
      type: 'BarChart',
      overviewModule: 'MEAS',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query duplicityMeasurementsPerDay($time: TimeDelimitation) {
          diosSet(
            time: $time
            filter: {
              AND: [
                {
                  validityFilter: {
                    includeValid: ALL
                    includeDuplicated: DUPLICATE
                  }
                  tagFilter: { key: { equals: "readout" } }
                }
                {
                  NOT: {
                    didFilter: {
                      ids: [
                        "information:system.cc.cxiem.latest_data_collected"
                        "information:information_technology.network.communication.connection_successful_instantaneous"
                        "information:information_technology.network.communication.communication_duration_instantaneous"
                      ]
                    }
                  }
                }
              ]
            }
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
      transformation:
        '{ data: [ .diosSet.splitByTimestampInterval[] |  { id: .from, "duplicitní": (.set.count // null)} ]}',
      position: {
        x: 12,
        y: 4,
        height: 8,
        width: 12,
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
        title: 'počet duplicitních měření',
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
          label: 'počet',
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
    {
      id: 'invalidMeasurementsDevicesTable',
      type: 'TableWidget',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query invalidMeasurementsDevicesTable($time: TimeDelimitation) {
          diosSet(time: $time, filter: {AND: [{validityFilter: {includeValid: INVALID, includeDuplicated: ALL}, tagFilter: {key: {equals: "readout"}}}, {NOT: {didFilter: {ids: ["information:system.cc.cxiem.latest_data_collected", "information:information_technology.network.communication.connection_successful_instantaneous", "information:information_technology.network.communication.communication_duration_instantaneous"]}}}]}) {
            groupByAuthor(size: 10000, ordering: DESCENDING) {
              key {
                __typename
                ... on SingleInstanceKey {
                  bucket {
                    ... on Device {
                      internalId
                      id {
                        did {
                          id
                        }
                        value
                      }
                      relDevice(edge: {type: "accessible_by", direction: OUT}) {
                        relPlace(edge: {type: "installed_at", direction: OUT}) {
                          relPlace(edge: {type: "feed_from", direction: OUT}) {
                            internalId
                            id {
                              did {
                                id
                              }
                              value
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              set {
                groupByDuplicity {
                  key
                  set {
                    count
                  }
                }
                groupByValidity {
                  key
                  set {
                    count
                  }
                }
              }
            }
          }
        }
      `,
      transformation: `
        {data:[ .diosSet.groupByAuthor[] | {
          id: {keyId: "internalId", intId: .key.bucket.internalId, valueId: .key.bucket.internalId, value: .key.bucket.internalId},
          ckod: (.key.bucket.id.value as $val | {keyId: .key.bucket.id.did.id, intId: .key.bucket.internalId, valueId: $val, value: $val}),
          dts: (.key.bucket.relDevice[0].relPlace[0].relPlace[0] as $dts | {keyId: $dts.id.did.id, intId: $dts.internalId, valueId: $dts.id.value, value: $dts.id.value}),
          invalid: (.set.groupByValidity[0] as $validity | {keyId: $validity.key, intId: $validity.key, valueId: $validity.set.count, value: $validity.set.count }),
        } ]}
      `,
      config: {
        columns: [
          {
            Header: 'zařízení',
            accessor: 'ckod',
            width: 140,
          },
          {
            Header: 'DTS mediátor',
            accessor: 'dts',
          },

          {
            Header: 'nevalidní měření',
            accessor: 'invalid',
          },
        ],
      },
      position: {
        x: 0,
        y: 12,
        height: 10,
        width: 16,
      },
      chartProps: {
        title: 'zařízení zasílající nejvíce nevalidních dat',
        showBorder: true,
        showExport: true,
        showPageSize: true,
        showPagination: true,
        enableImport: false,
        rowsInTable: 7,
      },
    },
    {
      id: 'invalidMeasurementByTag',
      type: 'PieChart',
      overviewModule: 'MEAS',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query invalidMeasurementByTag($time: TimeDelimitation) {
          LP_10_metering: diosSet(time: $time, filter: {AND: [{validityFilter: {includeDuplicated: ALL, includeValid: INVALID}, tagFilter: {key: {equals: "readout"}, value: {startsWith: "LP_10"}}}, {NOT: {didFilter: {ids: ["information:system.cc.cxiem.latest_data_collected", "information:information_technology.network.communication.connection_successful_instantaneous", "information:information_technology.network.communication.communication_duration_instantaneous"]}}}]}) {
            count
          }
          LP_15_metering: diosSet(time: $time, filter: {AND: [{validityFilter: {includeDuplicated: ALL, includeValid: INVALID}, tagFilter: {key: {equals: "readout"}, value: {startsWith: "LP_15"}}}, {NOT: {didFilter: {ids: ["information:system.cc.cxiem.latest_data_collected", "information:information_technology.network.communication.connection_successful_instantaneous", "information:information_technology.network.communication.communication_duration_instantaneous"]}}}]}) {
            count
          }
          REG_1440_metering: diosSet(time: $time, filter: {AND: [{validityFilter: {includeDuplicated: ALL, includeValid: INVALID}, tagFilter: {key: {equals: "readout"}, value: {startsWith: "REG_1440"}}}, {NOT: {didFilter: {ids: ["information:system.cc.cxiem.latest_data_collected", "information:information_technology.network.communication.connection_successful_instantaneous", "information:information_technology.network.communication.communication_duration_instantaneous"]}}}]}) {
            count
          }
        }
      `,
      transformation: `
        def tag(key): {id: key, name: key, value: .[key].count};
        keys as $k | {data: [ tag($k[0]) , tag($k[1]), tag($k[2])]}
      `,
      position: {
        x: 0,
        y: 22,
        height: 10,
        width: 10,
      },
      chartProps: {
        colors: [
          '#FFD665',
          '#FEAE5D',
          '#FD845D',
          '#FFF2AD',
          '#FFE972',
          '#F8925C',
          '#D9A051',
          '#AC772D',
          '#A56813',
        ],
        title: 'nevalidní měření podle druhu',
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: false,
        enableTooltip: true,
        widgetStyle: 'pie',
        showBorder: true,
        enableRadialLabels: true,
      },
    },
    {
      id: 'invalidMeasurementByDID',
      type: 'TableWidget',
      overviewModule: 'MEAS',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query invalidMeasurementByDID($time: TimeDelimitation) {
          diosSet(time: $time, filter: {AND: [{validityFilter: {includeValid: INVALID, includeDuplicated: ALL}, tagFilter: {key: {equals: "readout"}}}, {NOT: {didFilter: {ids: ["information:system.cc.cxiem.latest_data_collected", "information:information_technology.network.communication.connection_successful_instantaneous", "information:information_technology.network.communication.communication_duration_instantaneous"]}}}]}) {
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
                count
              }
            }
          }
        }
      `,
      transformation: `
        {data: [ .diosSet.groupByDidNew[] | {
          id: {value: .key.bucket.id},
          did: {value: .key.bucket.localization.name},
          count: {value: .set.count}
        }] | sort_by(-.count.value) }
      `,
      position: {
        x: 10,
        y: 22,
        height: 10,
        width: 10,
      },
      config: {
        columns: [
          { Header: 'veličina', accessor: 'did' },
          { Header: 'počet měření', accessor: 'count', width: 100 },
        ],
      },
      chartProps: {
        title: 'nevalidní měření podle veličin',
        showBorder: true,
        showExport: true,
        showPageSize: true,
        showPagination: true,
        enableImport: false,
        rowsInTable: 5,
      },
    },
    {
      id: 'measurementsPerDay',
      type: 'BarChart',
      overviewModule: 'MEAS',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query measurementsPerDay($time: TimeDelimitation) {
          diosSet(
            time: $time
            filter: {
              AND: [
                {
                  validityFilter: { includeValid: ALL, includeDuplicated: ALL }
                  tagFilter: { key: { equals: "readout" } }
                }
                {
                  NOT: {
                    didFilter: {
                      ids: [
                        "information:system.cc.cxiem.latest_data_collected"
                        "information:information_technology.network.communication.connection_successful_instantaneous"
                        "information:information_technology.network.communication.communication_duration_instantaneous"
                      ]
                    }
                  }
                }
              ]
            }
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
      transformation:
        '{ data: [ .diosSet.splitByTimestampInterval[] |  { id: .from, "měření": (.set.count // null)} ]}',
      position: {
        x: 0,
        y: 32,
        height: 8,
        width: 12,
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
        title: 'celkové množství měření',
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
          label: 'počet',
        },
        enableXZoom: true,
        layoutDirection: 'vertical',
      },
    },
  ],
};
