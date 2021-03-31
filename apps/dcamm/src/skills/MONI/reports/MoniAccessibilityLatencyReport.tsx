import { ReportConfig } from '@dg3/schema';

export const moniAccessibilityLatencyReport: ReportConfig = {
  id: 'moniAccessibilityLatencyReport',
  techDescription: 'Monitoring accessibility and latency',
  title: 'dostupnost',
  keywords: ['kpi chart', 'monitoring', 'accessibility', 'latency'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'accessibilityTable',
      type: 'TableWidget',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
        query moniAccessibilityTable($time: TimeDelimitation) {
          diosSet(filter: {didFilter: {ids: ["information:information_technology.network.communication.connection_successful_instantaneous", "information:information_technology.network.communication.communication_duration_instantaneous"]}}, time: $time) {
            groupByObject {
              key {
                ... on SingleInstanceKey {
                  bucket {
                    ... on Device {
                      id {
                        did {
                          id
                        }
                        value
                      }
                      internalId
                      attributes(dids: ["information:attribute.ckod", "information:attribute.device_maintenance_status"]) {
                        did {
                          id
                        }
                        normalizedValue
                      }
                      kind {
                        id
                        attributes(dids: ["information:attribute.matnr", "information:attribute.vyrobce"]) {
                          did {
                            id
                          }
                          value
                        }
                      }
                      relPlace(edge: {type: "installed_at", direction: OUT}, filter: {node: {OR: [{kindName: "place:place.secondary_substation"}, {kindName: "place:place.device_location"}]}}) {
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
                groupByDid {
                  key {
                    ... on SingleDidKey {
                      bucket {
                        id
                      }
                    }
                  }
                  set {
                    avgNumberValue
                  }
                }
              }
            }
          }
        }
      `,
      transformation: `
        def attribute(attr): ((.attributes[] | select(.did.id == attr)) // null);
        def diosDid(did): ((.groupByDid[] | select(.key.bucket.id == did)) // null);

        {data:[ .diosSet.groupByObject[] | {
          id: {keyId: "internalId", intId: .key.bucket.internalId, valueId: .key.bucket.internalId, value: .key.bucket.internalId},
          "ckod": ((.key.bucket | attribute("information:attribute.ckod").normalizedValue) as $val | {keyId: "information:attribute.ckod", intId: .key.bucket.internalId, valueId: $val, value: $val}),
          "maintenance_status": ((.key.bucket | attribute("information:attribute.device_maintenance_status").normalizedValue) as $val | {keyId: "information:attribute.device_maintenance_status", intId: .authorDevice.internalId, valueId: $val, value: $val}),
          "matnr": ((.key.bucket.kind | attribute("information:attribute.matnr").value) as $val | {keyId: "information:attribute.matnr", intId: .key.bucket.internalId, valueId: $val, value: $val}),
          "vyrobce": ((.key.bucket.kind | attribute("information:attribute.vyrobce").value) as $val | {keyId: "information:attribute.vyrobce", intId: .key.bucket.internalId, valueId: $val, value: $val}),
          dts_om: (.key.bucket.relPlace[0] as $dtsOm | {keyId: $dtsOm.id.did.id, intId: $dtsOm.internalId, valueId: $dtsOm.id.value, value: $dtsOm.id.value}),
           accessibility: ((.set | diosDid("information:information_technology.network.communication.connection_successful_instantaneous") as $accessibility | {keyId: $accessibility.key.bucket.id, intId: $accessibility.key.bucket.id, valueId: $accessibility.set.avgNumberValue, value: (if ($accessibility.set.avgNumberValue != null) then (($accessibility.set.avgNumberValue * 100) // 0 | tostring ) else null end) })),
           reading_delay: ((.set | diosDid("information:information_technology.network.communication.communication_duration_instantaneous") as $delay | {keyId: $delay.key.bucket.id, intId: $delay.key.bucket.id, valueId: $delay.set.avgNumberValue, value: (if ($delay.set.avgNumberValue != null) then (($delay.set.avgNumberValue * 1000) // 0 | tostring) else null end) })),
        } ]}
      `,
      config: {
        columns: [
          {
            Header: 'DTS/OM',
            accessor: 'dts_om',
          },
          {
            Header: 'zařízení',
            accessor: 'ckod',
            width: 140,
          },
          {
            Header: 'výrobce',
            accessor: 'vyrobce',
          },
          {
            Header: 'material',
            accessor: 'matnr',
          },
          {
            Header: 'průměrná dostupnost (%)',
            accessor: 'accessibility',
          },
          {
            Header: 'průměrná latence (ms)',
            accessor: 'reading_delay',
          },
          {
            Header: 'servisní stav',
            accessor: 'maintenance_status',
          },
        ],
      },
      position: {
        x: 0,
        y: 0,
        height: 12,
        width: 16,
      },
      chartProps: {
        title: 'dostupnost',
        showBorder: true,
        showExport: true,
        showPageSize: true,
        showPagination: true,
        enableImport: false,
        enableAdhoc: false,
        rowsInTable: 7,
      },
    },
  ],
};
