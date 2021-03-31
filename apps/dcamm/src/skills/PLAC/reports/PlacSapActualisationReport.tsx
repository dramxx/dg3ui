import { ReportConfig } from '@dg3/schema';

export const placSapActualisationReport: ReportConfig = {
  id: 'placSapActualisationReport',
  techDescription: 'Places SAP actualisation',
  title: 'aktualizace SAP',
  keywords: ['kpi chart', 'place', 'SAP'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'sapPlacTaskOverview',
      type: 'TableWidget',
      overviewModule: 'PLAC',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
            query sapPlacTaskOverview($time: TaskTimeDelimitation) {
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
      id: 'updatedPlacesCount',
      type: 'BarChart',
      overviewModule: 'PLAC',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query SAPUpdatedCount($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: { ids: ["information:system.inv.node_changed"] }
              objectFilter: {
                kinds: [
                  "place:place.secondary_substation"
                  "place:place.consumption_point"
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
      transformation: `
        { data: [
          .diosSet.splitByTimestampInterval[] |
          {
            id: .from,
            "aktualizovaná místa": .set.count
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
        title: 'počet aktualizovaných míst ze SAP',
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
      id: 'insertedPlacesCount',
      type: 'BarChart',
      overviewModule: 'PLAC',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query SAPCreatedCount($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: { ids: ["information:system.inv.node_created"] }
              objectFilter: {
                kinds: [
                  "place:place.secondary_substation"
                  "place:place.consumption_point"
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
      transformation: `
        { data: [
          .diosSet.splitByTimestampInterval[] |
          {
            id: .from,
            "nová místa": .set.count
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
        title: 'počet nově vložených míst ze SAP',
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
      id: 'sapSystemPlacEventsCount',
      type: 'PieChart',
      overviewModule: 'PLAC',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query SapPLACSystemEventsCount($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:system.inv.node_changed"
                  "information:system.inv.node_created"
                  "information:system.integrator.SAP_place_update_failed"
                  "information:system.integrator.SAP_new_place_missing_mandatory_params"
                  "information:system.integrator.SAP_new_place_kind_unrecognized"
                ]
              }
              objectFilter: {
                kinds: [
                  "place:place.secondary_substation"
                  "place:place.consumption_point"
                ]
              }
            }
            time: $time
          ) {
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
      `,
      transformation: `
        { data: [
          .diosSet.groupByDid[] |
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
        title: 'počty událostí ze SAP na místech',
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
      id: 'placesSapErrorCount',
      type: 'BarChart',
      overviewModule: 'PLAC',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.diosSet.splitByTimestampInterval[*]',
      query: `
        query placesSapErrorCount($time: TimeDelimitation!) {
          diosSet(
            filter: {
              didFilter: {
                ids: [
                  "information:system.integrator.SAP_new_place_missing_mandatory_params"
                  "information:system.integrator.SAP_new_place_kind_unrecognized"
                ]
              }
              objectFilter: {
                kinds: [
                  "place:place.secondary_substation"
                  "place:place.consumption_point"
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
          'počet událostí s výskytem chyby při vkládání nového místa ze SAP',
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
    //   id: 'placeSapSyncTaskSwitch',
    //   language: 'jq',
    //   overviewModule: 'PLAC',
    //   overviewId: '',
    //   type: 'TableWidget',
    //   position: {
    //     x: 14,
    //     y: 0,
    //     height: 10,
    //     width: 10,
    //   },
    //   query: `
    //     query PlacSapSyncTaskPlans {
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
    //       refetchQueries: ['PlacSapSyncTaskPlans'],
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
