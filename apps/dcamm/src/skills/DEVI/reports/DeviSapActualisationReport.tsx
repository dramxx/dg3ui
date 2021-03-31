import { ReportConfig } from '@dg3/schema';

export const deviSapActualisationReport: ReportConfig = {
  id: 'deviSapActualisationReport',
  techDescription: 'Devices SAP actualisation',
  title: 'aktualizace SAP',
  keywords: ['kpi chart', 'devices', 'SAP'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'sapDeviTaskOverview',
      type: 'TableWidget',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
            query sapDeviTaskOverview($time: TaskTimeDelimitation) {
              set: taskExecutionsSet(time: $time, filter: {templateId: ["synchronization_sap.v1"]}) {
                count
                items(ordering: {order: DESCENDING, activeFrom: {}}) {
                  executionRoot {
                    activeFrom
                    activeTo
                  }
                }
              }
            }
      `,
      transformation: `
          {data:[ .set.items[] | {
            id: {keyId: "id", intId:.id, valueId: .id, value: .id},
            activeFrom: {keyId: "activeFrom", intId: .id, valueId: .executionRoot.activeFrom, value: .executionRoot.activeFrom},
            activeTo: {keyId: "activeTo", intId: .id, valueId: .executionRoot.activeTo, value: .executionRoot.activeTo},
            state: {keyId: "state", intId: .id, valueId: (if (.executionRoot.activeTo != null) then  "dokončená" else "běží" end) , value: (if (.executionRoot.activeTo != null) then  "dokončená" else "běží" end)}
          } ]}
      `,
      config: {
        columns: [
          {
            Header: 'čas spuštění',
            accessor: 'activeFrom',
          },
          {
            Header: 'status',
            accessor: 'state',
          },
        ],
      },
      position: {
        x: 8,
        y: 0,
        height: 10,
        width: 6,
      },
      chartProps: {
        title: 'průběh aktualizací ze SAP',
        showBorder: true,
        showExport: true,
        showPageSize: true,
        showPagination: true,
        enableImport: false,
        rowsInTable: 10,
      },
    },
    {
      id: 'updatedDevicesCount',
      type: 'BarChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query SAPUpdatedCount($time: TimeDelimitation!) {
          diosSet(
            filter: { didFilter: { ids: ["information:system.inv.node_changed"] } }
            time: $time
          ) {
            groupByObjectCoreElement {
              key {
                ... on SingleCoreElementKey {
                  bucket {
                    id
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
                  to
                  granularity {
                    interval {
                      quantity
                      time
                    }
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
      transformation: `
        { data: [
          .diosSet.groupByObjectCoreElement[] | select(.key.bucket.id == "device").set.splitByTimestampInterval[] |
          {
            id: .from,
            "aktualizovaná zařízení": .set.count
          }
        ]}
      `,
      position: {
        x: 0,
        y: 10,
        height: 8,
        width: 10,
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
        title: 'počet aktualizovaných zařízení ze SAP',
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
      id: 'insertedDevicesCount',
      type: 'BarChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query SAPCreatedCount($time: TimeDelimitation!) {
          diosSet(
            filter: { didFilter: { ids: ["information:system.inv.node_created"] } }
            time: $time
          ) {
            groupByObjectCoreElement {
              key {
                ... on SingleCoreElementKey {
                  bucket {
                    id
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
                  to
                  granularity {
                    interval {
                      quantity
                      time
                    }
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
      transformation: `
        { data: [
          .diosSet.groupByObjectCoreElement[] | select(.key.bucket.id == "device").set.splitByTimestampInterval[] |
          {
            id: .from,
            "nová zařízení": .set.count
          }
        ]}
      `,
      position: {
        x: 10,
        y: 10,
        height: 8,
        width: 10,
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
        title: 'počet nově vložených zařízení ze SAP',
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
      id: 'sapSystemDeviEventsCount',
      type: 'PieChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query sapDEVISystemEventsCount($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:system.inv.node_changed"
                  "information:system.inv.node_created"
                  "information:system.integrator.SAP_device_update_failed"
                  "information:system.integrator.SAP_new_device_missing_mandatory_params"
                  "information:system.integrator.SAP_new_device_kind_unrecognized"
                ]
              }
            }
            time: $time
          ) {
            count
            groupByObjectCoreElement {
              key {
                ... on SingleCoreElementKey {
                  bucket {
                    id
                  }
                }
              }
              set {
                count
                groupByDid {
                  key {
                    ... on SingleDidKey {
                      bucket {
                        id
                        localization {
                          abbreviation
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
          }
        }
      `,
      transformation: `
        { data: [
          .diosSet.groupByObjectCoreElement[] | select(.key.bucket.id == "device").set.groupByDid[] |
          {
            id: .key.bucket.id,
            name: .key.bucket.localization.abbreviation,
            value: .set.count
          }
        ]}
      `,
      position: {
        x: 0,
        y: 0,
        height: 10,
        width: 8,
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
        title: 'počty událostí ze SAP pro zařízení',
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
      id: 'devicesSapErrorCount',
      type: 'BarChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.splitByTimestampInterval[*]',
      query: `
        query devicesSapErrorCount($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:system.integrator.SAP_new_device_missing_mandatory_params"
                  "information:system.integrator.SAP_new_device_kind_unrecognized"
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
              to
              granularity {
                interval {
                  quantity
                  time
                }
              }
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
              key: 'počet chyb',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 18,
        height: 8,
        width: 10,
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
        title:
          'počet událostí s výskytem chyby při vkládání nového zařízení ze SAP',
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
      id: 'devicesSapMalformedCount',
      type: 'BarChart',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.splitByTimestampInterval[*]',
      query: `
        query readPerDayLP151day($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: ["information:system.integrator.SAP_malformed_record_received"]
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
              to
              granularity {
                interval {
                  quantity
                  time
                }
              }
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
              key: 'počet poškozených záznamů',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 10,
        y: 18,
        height: 8,
        width: 10,
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
        title: 'počet událostí o obdržení poškozených záznamů ze SAP',
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
    // {
    //   id: 'deviceSapSyncTaskSwitch',
    //   language: 'jq',
    //   overviewModule: 'DEVI',
    //   overviewId: '',
    //   type: 'TableWidget',
    //   position: {
    //     x: 17,
    //     y: 0,
    //     height: 10,
    //     width: 10,
    //   },
    //   query: `
    //     query DeviSapSyncTaskPlans {
    //       taskPlans(
    //         filter: { template: { id: ["sap_synchronize_evidence_data.v1"] } }
    //       ) {
    //         id
    //         template {
    //           id
    //           localization {
    //             name
    //           }
    //         }
    //         active
    //         filter
    //         schedule
    //       }
    //     }
    //   `,
    //   transformation: `
    //      { data: [ .taskPlans[] |
    //       {
    //         id: {value: .id},
    //         type: {value: .template.localization.name, valueId: .template.id},
    //         schedule: {value: .schedule.expression, options: .schedule},
    //         state: {value: .active}
    //       }
    //     ]}
    //   `,
    //   chartProps: {
    //     rowsInTable: 7,
    //     showBorder: true,
    //     showExport: false,
    //     showPagination: true,
    //     showPageSize: false,
    //     title: 'plány aktualizací ze SAP',
    //     editable: {
    //       mutation: 'EditTaskPlans',
    //       refetchQueries: ['DeviSapSyncTaskPlans'],
    //       successMessage: 'Aktualizační úloha byla změněna.',
    //     },
    //   },
    //   config: {
    //     columns: [
    //       { Header: 'typ úlohy', accessor: 'type' },
    //       { Header: 'perioda', accessor: 'schedule' },
    //       {
    //         Header: 'stav',
    //         accessor: 'state',
    //         editable: {
    //           type: 'boolean',
    //           trueLabel: 'aktivní',
    //           falseLabel: 'neaktivní',
    //           body: '{id: .id, active: .value}',
    //         },
    //       },
    //     ],
    //   },
    //   includedFilters: [],
    // },
  ],
};
