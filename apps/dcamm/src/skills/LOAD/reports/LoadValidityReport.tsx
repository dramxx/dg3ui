import { ReportConfig } from '@dg3/schema';

export const loadValidityReport: ReportConfig = {
  id: 'loadValidityReport',
  techDescription: 'Load validity',
  title: 'validnost',
  keywords: ['kpi chart', 'om', 'validity'],
  canvasSettings: { rows: 12, columns: 12 },
  version: '1.0.0',
  widgets: [
    {
      id: 'tableOmInvalidTou',
      type: 'TableWidget',
      overviewModule: 'LOAD',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.set.groupByObject[*]',
      query: `query omWithInvalidTou($time: TimeDelimitation!) {
                    set: diosSet(filter: {didFilter: {ids: ["information:electricity.load_control.register_tou_id_and_evidenced_switching_plan_id_differed"]}}, time: $time) {
                      groupByObject {
                        key {
                          ... on SingleInstanceKey {
                            bucket {
                              internalId
                              id {
                                did {
                                  id
                                }
                                value
                              }
                              device: relInstance(edge: {type: "installed_at", direction: IN}) {
                                ... on Device {
                                  internalId
                                  id {
                                    did {
                                      id
                                    }
                                    value
                                  }
                                  kind {
                                    attributes (dids: ["information:attribute.matnr"]) {
                                      did {
                                        id
                                      }
                                      value
                                    }
                                  }
                                  attributes(dids: ["information:attribute.device_maintenance_status"]) {
                                    did {
                                      id
                                    }
                                    normalizedValue
                                  }
                                }
                              }
                              dts: relInstance(edge: {type: "feed_from", direction: OUT}) {
                                ... on Place {
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
                        set {
                          items (ordering: {byField: TIMESTAMP, order: DESCENDING}) {
                            id
                            timestamp
                            value {
                              normalizedValue
                            }
                          }
                        }
                      }
                    }
                  }`,
      jsonPathMapping: [
        {
          key: 'table',
          type: 'object',
          values: [
            {
              key: 'id',
              keyId: 'id',
              intId: '$.key.bucket.internalId',
              valueId: '$.key.bucket.internalId',
              value: '$.key.bucket.internalId',
            },
            {
              key: 'om',
              keyId: 'id',
              intId: '$.key.bucket.internalId',
              valueId: '$.key.bucket.id.did.id',
              value: '$.key.bucket.id.value',
            },
            {
              key: 'information:attribute.ckod',
              keyId: 'information:attribute.ckod',
              intId: '$.key.bucket.device[0].internalId',
              valueId: '$.key.bucket.device[0].id.did.id',
              value: '$.key.bucket.device[0].id.value',
            },
            {
              key: 'feed_from',
              keyId: 'feed_from',
              intId: '$.key.bucket.dts[0].internalId',
              valueId: '$.key.bucket.dts[0].id.did.id',
              value: '$.key.bucket.dts[0].id.value',
            },
            {
              key: 'material',
              keyId: 'information:attribute.matnr',
              intId: '$.key.bucket.device[0].internalId',
              valueId:
                '$.key.bucket.device[0].kind.attributes[?(@.did.id == "information:attribute.matnr")].value',
              value:
                '$.key.bucket.device[0].kind.attributes[?(@.did.id == "information:attribute.matnr")].value',
            },
            {
              key: 'device_maintenance_status',
              keyId: 'device_maintenance_status',
              intId: '$.key.bucket.device[0].attribute',
              valueId:
                '$.key.bucket.device[0].attributes[?(@.did.id == "device_maintenance_status")].normalizedValue',
              value:
                '$.key.bucket.device[0].attributes[?(@.did.id == "device_maintenance_status")].normalizedValue',
            },
            {
              key: 'last_readout',
              keyId: 'last_readout',
              intId: 'last_readout',
              valueId: 'last_readout',
              value: '$.set.items[0].timestamp',
            },
            {
              key: 'expected_tou',
              keyId: 'expected_tou',
              intId: 'expected_tou',
              valueId: 'expected_tou',
              value: '$.set.items[0].value.normalizedValue.expected_tou_ext_id',
            },
            {
              key: 'readout_tou',
              valueId: 'readout_tou',
              intId: 'readout_tou',
              keyId: 'readout_tou',
              value: '$.set.items[0].value.normalizedValue.read_tou_ext_id',
            },
          ],
        },
      ],
      config: {
        columns: [
          {
            Header: 'OM',
            accessor: 'om',
          },
          {
            Header: 'zařízení',
            accessor: 'information:attribute.ckod',
          },
          {
            Header: 'napájeno z',
            accessor: 'feed_from',
          },
          {
            Header: 'material',
            accessor: 'material',
          },
          {
            Header: 'servisní stav',
            accessor: 'device_maintenance_status',
          },
          {
            Header: 'posl. odečet',
            accessor: 'last_readout',
          },
          {
            Header: 'očekávaná TOU',
            accessor: 'expected_tou',
          },
          {
            Header: 'vyčtená TOU',
            accessor: 'readout_tou',
          },
        ],
      },
      position: { x: 0, y: 0, height: 5, width: 10 },
      chartProps: {
        title: 'OM s nesprávnou TOU tabulkou',
        rowsInTable: 6,
        showBorder: true,
        showExport: false,
        showPageSize: false,
        showPagination: false,
      },
    },
    {
      id: 'tableOmInvalidSwitching',
      type: 'TableWidget',
      overviewModule: 'LOAD',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jsonpath',
      rootPath: '$.set.groupByObject[*]',
      query: `query omWithMissingSwitchingPlan($time: TimeDelimitation!) {
                    set: diosSet(filter: {didFilter: { ids: ["information:electricity.load_control.load_switching_follows_timeline_logical_and_1_days"]}, valueFilter: {keyword: {equals: "not_ok"}}}, time: $time) {
                      groupByObject {
                        key {
                          ... on SingleInstanceKey {
                            bucket {
                              internalId
                              id {
                                did {
                                  id
                                }
                                value
                              }
                              device: relInstance(edge: {type: "installed_at", direction: IN}) {
                                ... on Device {
                                  internalId
                                  id {
                                    did {
                                      id
                                    }
                                    value
                                  }
                                  kind {
                                    attributes (dids: ["information:attribute.matnr"]) {
                                      did {
                                        id
                                      }
                                      value
                                    }
                                  }
                                  attributes(dids: ["information:attribute.device_maintenance_status"]) {
                                    did {
                                      id
                                    }
                                    normalizedValue
                                  }
                                }
                              }
                              dts: relInstance(edge: {type: "feed_from", direction: OUT}) {
                                ... on Place {
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
                        set {
                          groupByValue {
                            key
                            set {
                              count
                            }
                          }
                        }
                      }
                    }
                  }`,
      jsonPathMapping: [
        {
          key: 'table',
          type: 'object',
          values: [
            {
              key: 'id',
              keyId: 'id',
              intId: '$.key.bucket.internalId',
              valueId: '$.key.bucket.id.value',
              value: '$.key.bucket.internalId',
            },
            {
              key: 'om',
              keyId: 'id',
              intId: '$.key.bucket.internalId',
              valueId: '$.key.bucket.id.did.id',
              value: '$.key.bucket.id.value',
            },
            {
              key: 'information:attribute.ckod',
              keyId: 'information:attribute.ckod',
              intId: '$.key.bucket.device[0].internalId',
              valueId: '$.key.bucket.device[0].id.did.id',
              value: '$.key.bucket.device[0].id.value',
            },
            {
              key: 'feed_from',
              keyId: 'feed_from',
              intId: '$.key.bucket.dts[0].internalId',
              valueId: '$.key.bucket.dts[0].id.did.id',
              value: '$.key.bucket.dts[0].id.value',
            },
            {
              key: 'material',
              keyId: 'information:attribute.matnr',
              intId: '$.key.bucket.device[0].internalId',
              valueId:
                '$.key.bucket.device[0].kind.attributes[?(@.did.id == "information:attribute.matnr")].value',
              value:
                '$.key.bucket.device[0].kind.attributes[?(@.did.id == "information:attribute.matnr")].value',
            },
            {
              key: 'device_maintenance_status',
              keyId: 'device_maintenance_status',
              intId: '$.key.bucket.device[0].attribute',
              valueId:
                '$.key.bucket.device[0].attributes[?(@.did.id == "device_maintenance_status")].normalizedValue',
              value:
                '$.key.bucket.device[0].attributes[?(@.did.id == "device_maintenance_status")].normalizedValue',
            },
            {
              key: 'last_readout',
              value: '',
            },
            {
              key: 'days_without_readout',
              keyId: 'missing_switching_plan',
              valueId: 'missing_switching_plan',
              value:
                '$.set.groupByValue[?(@.key == "missing_switching_plan")].set.count',
            },
            {
              key: 'days_ok',
              keyId: 'ok',
              valueId: 'ok',
              value: '$.set.groupByValue[?(@.key == "ok")].set.count',
            },
            {
              key: 'days_with_issue',
              keyId: 'not_ok',
              valueId: 'not_ok',
              value: '$.set.groupByValue[?(@.key == "not_ok")].set.count',
            },
            {
              key: 'days_without_dio',
              valueId: 'not_enough_data',
              keyId: 'not_enough_data',
              value:
                '$.set.groupByValue[?(@.key == "not_enough_data")].set.count',
            },
          ],
        },
      ],
      config: {
        columns: [
          {
            Header: 'OM',
            accessor: 'om',
          },
          {
            Header: 'zařízení',
            accessor: 'information:attribute.ckod',
          },
          {
            Header: 'napájeno z',
            accessor: 'feed_from',
          },
          {
            Header: 'material',
            accessor: 'material',
          },
          {
            Header: 'servisní stav',
            accessor: 'device_maintenance_status',
          },
          {
            Header: 'posl. odečet',
            accessor: 'last_readout',
          },
          {
            Header: 'dnů bez odečt. TOU',
            accessor: 'days_without_readout',
          },
          {
            Header: 'dnů OK',
            accessor: 'days_ok',
          },
          {
            Header: 'dnů s problémem',
            accessor: 'days_with_issue',
          },
          {
            Header: 'dnů bez událostí',
            accessor: 'days_without_dio',
          },
        ],
      },
      position: { x: 0, y: 5, height: 5, width: 10 },
      chartProps: {
        title: 'OM, kde události o spínání neodpovídají odečtené TOU',
        rowsInTable: 6,
        showBorder: true,
        showExport: false,
        showPageSize: false,
        showPagination: false,
      },
    },
  ],
};
