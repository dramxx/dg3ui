import { ReportConfig } from '@dg3/schema';

export const evenOverviewReport: ReportConfig = {
  id: 'evenOverviewReport',
  techDescription: 'Events overview',
  title: 'přehled',
  keywords: ['kpi chart', 'events', 'overview'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'warningEventsCountByDid',
      type: 'TableWidget',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
              query warningEventsCount($time: TimeDelimitation) {
                diosSet(time: $time, filter: {didFilter: {ids: ["information:electricity.load_control.disconnector.button_local_off","information:electricity.load_control.disconnector.button_local_on","information:electricity.load_control.disconnector.remote_off_sent","information:electricity.load_control.limiter.over_current_phase_1","information:electricity.load_control.limiter.over_current_phase_2","information:electricity.load_control.limiter.over_current_phase_3","information:electricity.power.power_off","information:electricity.service_entry.cover_closed","information:electricity.service_entry.cover_removed","information:electricity.service_entry.optical_port_connected","information:electricity.service_entry.optical_port_disconnected","information:electricity.tamper.dc_field_detected","information:electricity.under_voltage_phase_1","information:electricity.under_voltage_phase_2","information:electricity.under_voltage_phase_3","information:electricity.voltage.missing_voltage_phase_1","information:electricity.voltage.missing_voltage_phase_2","information:electricity.voltage.missing_voltage_phase_3","information:electricity.voltage.over_voltage_phase_1","information:electricity.voltage.over_voltage_phase_2","information:electricity.voltage.over_voltage_phase_3"]}}) {
                  countp
                  groupByDidNew (size: 10000, ordering: DESCENDING) {
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
        {data:[ .diosSet.groupByDidNew[] | {
          id: {keyId: "internalId", intId: .key.bucket.internalId, valueId: .key.bucket.id, value: .key.bucket.id},
          "name": {keyId: "taskname", intId: .key.bucket.id, valueId: .key.bucket.localization.name, value: .key.bucket.localization.name},
          "count": {keyId: "taskcount", intId: .key.bucket.id, valueId: .set.count, value: .set.count},
        } ]}
      `,
      config: {
        columns: [
          {
            Header: 'název úlohy',
            accessor: 'name',
          },
          {
            Header: 'počet',
            accessor: 'count',
            width: 50,
          },
        ],
      },
      position: {
        x: 0,
        y: 0,
        height: 20,
        width: 10,
      },
      chartProps: {
        title: 'události upozornění',
        showBorder: true,
        showExport: true,
        showPageSize: true,
        showPagination: true,
        enableImport: false,
        rowsInTable: 30,
      },
    },
    {
      id: 'clearEventsCountByDid',
      type: 'TableWidget',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time'],
      language: 'jq',
      query: `
              query warningEventsCount($time: TimeDelimitation) {
                diosSet(time: $time, filter: {didFilter: {ids: ["information:electricity.load_control.limiter.over_current_cleared_phase_1","information:electricity.load_control.limiter.over_current_cleared_phase_2","information:electricity.load_control.limiter.over_current_cleared_phase_3","information:electricity.load_control.tariff_switching_error_cleared","information:electricity.load_control.time_TOU_error_cleared","information:electricity.power.power_off_cleared","information:electricity.under_voltage_cleared_phase_1","information:electricity.under_voltage_cleared_phase_2","information:electricity.under_voltage_cleared_phase_3","information:electricity.voltage.missing_voltage_cleared_phase_1","information:electricity.voltage.missing_voltage_cleared_phase_2","information:electricity.voltage.missing_voltage_cleared_phase_3","information:electricity.voltage.over_voltage_cleared_phase_1","information:electricity.voltage.over_voltage_cleared_phase_2","information:electricity.voltage.over_voltage_cleared_phase_3","information:information_technology.network.communication.meter_reading_internal_communication_fixed","information:space_and_time.time.clock_invalidated_cleared"]}}) {
                  countp
                  groupByDidNew (size: 10000, ordering: DESCENDING) {
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
        {data:[ .diosSet.groupByDidNew[] | {
          id: {keyId: "internalId", intId: .key.bucket.internalId, valueId: .key.bucket.id, value: .key.bucket.id},
          "name": {keyId: "taskname", intId: .key.bucket.id, valueId: .key.bucket.localization.name, value: .key.bucket.localization.name},
          "count": {keyId: "taskcount", intId: .key.bucket.id, valueId: .set.count, value: .set.count},
        } ]}
      `,
      config: {
        columns: [
          {
            Header: 'název úlohy',
            accessor: 'name',
          },
          {
            Header: 'počet',
            accessor: 'count',
            width: 50,
          },
        ],
      },
      position: {
        x: 10,
        y: 0,
        height: 20,
        width: 10,
      },
      chartProps: {
        title: 'události oprav',
        showBorder: true,
        showExport: true,
        showPageSize: true,
        showPagination: true,
        enableImport: false,
        rowsInTable: 30,
      },
    },
  ],
};
