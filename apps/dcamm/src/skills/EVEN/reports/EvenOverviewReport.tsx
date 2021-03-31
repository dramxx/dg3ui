import { ReportConfig } from '@dg3/schema';

export const evenOverviewReport: ReportConfig = {
  id: 'evenOverviewReport',
  techDescription: 'Events module overview report',
  title: 'Events overview',
  keywords: ['kpi chart', 'events', 'overview'],
  canvasSettings: { rows: 24, columns: 24 },
  version: '1.0.0',
  widgets: [
    {
      id: 'totalEventsCount',
      type: 'KpiChart',
      overviewModule: 'EVEN',
      overviewId: '',
      includedFilters: ['time', 'info', 'device', 'place'],
      language: 'jq',
      query: `
        query totalEventsCount(
          $time: TimeDelimitation
          $informationSetFilter: DioFilter!
        ) {
          diosSet(
            time: $time
            filter: {
              AND: [
                $informationSetFilter
                {
                  didFilter: {
                    ids: [
                      "information:electricity.load_control.disconnector.button_local_off"
                      "information:electricity.load_control.disconnector.button_local_on"
                      "information:electricity.load_control.disconnector.remote_off_sent"
                      "information:electricity.load_control.limiter.over_current_cleared_phase_1"
                      "information:electricity.load_control.limiter.over_current_cleared_phase_2"
                      "information:electricity.load_control.limiter.over_current_cleared_phase_3"
                      "information:electricity.load_control.limiter.over_current_phase_1"
                      "information:electricity.load_control.limiter.over_current_phase_2"
                      "information:electricity.load_control.limiter.over_current_phase_3"
                      "information:electricity.load_control.limiter.passive_limiter_activated_to_meter"
                      "information:electricity.load_control.limiter.passive_limiter_set_to_meter"
                      "information:electricity.load_control.relay1_changed"
                      "information:electricity.load_control.relay2_changed"
                      "information:electricity.load_control.relay2_off_relay1_off"
                      "information:electricity.load_control.relay2_off_relay1_on"
                      "information:electricity.load_control.relay2_off_relay1_unchanged"
                      "information:electricity.load_control.relay2_on_relay1_off"
                      "information:electricity.load_control.relay2_on_relay1_on"
                      "information:electricity.load_control.relay2_on_relay1_unchanged"
                      "information:electricity.load_control.relay2_unchanged_relay1_off"
                      "information:electricity.load_control.relay2_unchanged_relay1_on"
                      "information:electricity.load_control.tariff_changed"
                      "information:electricity.load_control.tariff_switching_error"
                      "information:electricity.load_control.tariff_switching_error_cleared"
                      "information:electricity.load_control.time_TOU_error"
                      "information:electricity.load_control.time_TOU_error_cleared"
                      "information:electricity.load_control.tou_table_activated"
                      "information:electricity.power.power_off"
                      "information:electricity.power.power_off_cleared"
                      "information:electricity.service_entry.cover_closed"
                      "information:electricity.service_entry.cover_removed"
                      "information:electricity.service_entry.optical_port_connected"
                      "information:electricity.service_entry.pda_disconnected"
                      "information:electricity.tamper.dc_field_detected"
                      "information:electricity.under_voltage_cleared_phase_1"
                      "information:electricity.under_voltage_cleared_phase_2"
                      "information:electricity.under_voltage_cleared_phase_3"
                      "information:electricity.under_voltage_phase_1"
                      "information:electricity.under_voltage_phase_2"
                      "information:electricity.under_voltage_phase_3"
                      "information:electricity.voltage.missing_voltage_cleared_phase_1"
                      "information:electricity.voltage.missing_voltage_cleared_phase_2"
                      "information:electricity.voltage.missing_voltage_cleared_phase_3"
                      "information:electricity.voltage.missing_voltage_phase_1"
                      "information:electricity.voltage.missing_voltage_phase_2"
                      "information:electricity.voltage.missing_voltage_phase_3"
                      "information:electricity.voltage.over_voltage_cleared_phase_1"
                      "information:electricity.voltage.over_voltage_cleared_phase_2"
                      "information:electricity.voltage.over_voltage_cleared_phase_3"
                      "information:electricity.voltage.over_voltage_phase_1"
                      "information:electricity.voltage.over_voltage_phase_2"
                      "information:electricity.voltage.over_voltage_phase_3"
                      "information:information_technology.network.communication.meter_reading_internal_communication_fixed"
                      "information:information_technology.network.communication.meter_reading_internal_communication_problem"
                      "information:space_and_time.time.clock_adjusted"
                      "information:space_and_time.time.clock_invalidated"
                      "information:space_and_time.time.clock_invalidated_cleared"
                      "information:sensors.corinex.unknown_push_event_received"
                      "information:sensors.corinex.unknown_device_push_event_received"
                    ]
                  }
                }
              ]
            }
          ) {
            count
          }
        }
      `,
      transformation:
        '{ data: { id: "totalEventsCount", value: .diosSet.count }}',
      position: {
        x: 0,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'celkový počet událostí',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: '',
        format: {
          digits: 0,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
    {
      id: 'totalErrorEventsCount',
      type: 'KpiChart',
      overviewModule: 'EVEN',
      overviewId: '',
      includedFilters: ['time', 'info', 'device', 'place'],
      language: 'jq',
      query: `
        query totalErrorEventsCount(
          $time: TimeDelimitation
          $informationSetFilter: DioFilter!
        ) {
          diosSet(
            time: $time
            filter: {
              AND: [
                $informationSetFilter
                {
                  didFilter: {
                    ids: [
                      "information:electricity.load_control.tariff_switching_error"
                      "information:electricity.load_control.time_TOU_error"
                      "information:information_technology.network.communication.meter_reading_internal_communication_problem"
                      "information:space_and_time.time.clock_invalidated"
                      "information:sensors.corinex.unknown_push_event_received"
                      "information:sensors.corinex.unknown_device_push_event_received"
                    ]
                  }
                }
              ]
            }
          ) {
            count
          }
        }
      `,
      transformation:
        '{ data: { id: "totalEventsCount", value: .diosSet.count }}',
      position: {
        x: 4,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'počet chybových událostí',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: '',
        format: {
          digits: 0,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
    {
      id: 'totalUnknownEventsCount',
      type: 'KpiChart',
      overviewModule: 'EVEN',
      overviewId: '',
      includedFilters: ['time', 'info', 'device', 'place'],
      language: 'jq',
      query: `
        query totalUnknownEventsCount(
          $time: TimeDelimitation
          $informationSetFilter: DioFilter!
        ) {
          diosSet(
            time: $time
            filter: {
              AND: [
                $informationSetFilter
                {
                  didFilter: {
                    ids: ["information:sensors.corinex.unknown_push_event_received"]
                  }
                }
              ]
            }
          ) {
            count
          }
        }
      `,
      transformation:
        '{ data: { id: "totalEventsCount", value: .diosSet.count }}',
      position: {
        x: 8,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'počet neznámých událostí',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: '',
        format: {
          digits: 0,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
    {
      id: 'totalUnknownDeviceEventsCount',
      type: 'KpiChart',
      overviewModule: 'EVEN',
      overviewId: '',
      includedFilters: ['time', 'info', 'device', 'place'],
      language: 'jq',
      query: `
        query totalUnknownDeviceEventsCount(
          $time: TimeDelimitation
          $informationSetFilter: DioFilter!
        ) {
          diosSet(
            time: $time
            filter: {
              AND: [
                $informationSetFilter
                {
                  didFilter: {
                    ids: [
                      "information:sensors.corinex.unknown_device_push_event_received"
                    ]
                  }
                }
              ]
            }
          ) {
            count
          }
        }
      `,
      transformation:
        '{ data: { id: "totalEventsCount", value: .diosSet.count }}',
      position: {
        x: 12,
        y: 0,
        height: 4,
        width: 4,
      },
      chartProps: {
        title: 'počet událostí neznámých zařízení',
        widgetStyle: 'number',
        showBorder: true,
        prefix: '',
        suffix: '',
        format: {
          digits: 0,
          timeZone: 'UTC',
          timeFormat: 'yyyy-MM-dd HH:mm:ss.ms',
          durationFormat: 'short',
        },
      },
    },
    {
      id: 'errorEventsCountByDid',
      type: 'PieChart',
      overviewModule: 'EVEN',
      overviewId: '',
      includedFilters: ['time', 'info', 'device', 'place'],
      language: 'jsonpath',
      rootPath: '$.diosSet.groupByDid[*]',
      query: `
        query errorEventsCountByDid(
          $time: TimeDelimitation
          $informationSetFilter: DioFilter!
        ) {
          diosSet(
            time: $time
            filter: {
              AND: [
                $informationSetFilter
                {
                  didFilter: {
                    ids: [
                      "information:electricity.load_control.tariff_switching_error"
                      "information:electricity.load_control.time_TOU_error"
                      "information:information_technology.network.communication.meter_reading_internal_communication_problem"
                      "information:space_and_time.time.clock_invalidated"
                      "information:sensors.corinex.unknown_push_event_received"
                      "information:sensors.corinex.unknown_device_push_event_received"
                    ]
                  }
                }
              ]
            }
          ) {
            count
            groupByDid(size: 10000) {
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
      jsonPathMapping: [
        {
          key: 'pie',
          type: 'object',
          values: [
            {
              key: 'id',
              value: '$.key.bucket.id',
            },
            {
              key: 'name',
              value: '$.key.bucket.localization.name',
            },
            {
              key: 'value',
              value: '$.set.count',
            },
          ],
        },
      ],
      position: {
        x: 8,
        y: 4,
        height: 10,
        width: 10,
      },
      chartProps: {
        colors: [
          '#FFF2AD',
          '#FFE972',
          '#FFD665',
          '#FEAE5D',
          '#F8925C',
          '#FD845D',
          '#D9A051',
          '#AC772D',
          '#A56813',
        ],
        title: 'chybové události',
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
      id: 'eventsByCount',
      type: 'TableWidget',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['time', 'info', 'device', 'place'],
      language: 'jq',
      query: `
        query eventsByCount(
          $time: TimeDelimitation
          $informationSetFilter: DioFilter!
        ) {
          diosSet(
            time: $time
            filter: {
              AND: [
                $informationSetFilter
                {
                  didFilter: {
                    ids: [
                      "information:electricity.load_control.disconnector.button_local_off"
                      "information:electricity.load_control.disconnector.button_local_on"
                      "information:electricity.load_control.disconnector.remote_off_sent"
                      "information:electricity.load_control.limiter.over_current_cleared_phase_1"
                      "information:electricity.load_control.limiter.over_current_cleared_phase_2"
                      "information:electricity.load_control.limiter.over_current_cleared_phase_3"
                      "information:electricity.load_control.limiter.over_current_phase_1"
                      "information:electricity.load_control.limiter.over_current_phase_2"
                      "information:electricity.load_control.limiter.over_current_phase_3"
                      "information:electricity.load_control.limiter.passive_limiter_activated_to_meter"
                      "information:electricity.load_control.limiter.passive_limiter_set_to_meter"
                      "information:electricity.load_control.relay1_changed"
                      "information:electricity.load_control.relay2_changed"
                      "information:electricity.load_control.relay2_off_relay1_off"
                      "information:electricity.load_control.relay2_off_relay1_on"
                      "information:electricity.load_control.relay2_off_relay1_unchanged"
                      "information:electricity.load_control.relay2_on_relay1_off"
                      "information:electricity.load_control.relay2_on_relay1_on"
                      "information:electricity.load_control.relay2_on_relay1_unchanged"
                      "information:electricity.load_control.relay2_unchanged_relay1_off"
                      "information:electricity.load_control.relay2_unchanged_relay1_on"
                      "information:electricity.load_control.tariff_changed"
                      "information:electricity.load_control.tariff_switching_error"
                      "information:electricity.load_control.tariff_switching_error_cleared"
                      "information:electricity.load_control.time_TOU_error"
                      "information:electricity.load_control.time_TOU_error_cleared"
                      "information:electricity.load_control.tou_table_activated"
                      "information:electricity.power.power_off"
                      "information:electricity.power.power_off_cleared"
                      "information:electricity.service_entry.cover_closed"
                      "information:electricity.service_entry.cover_removed"
                      "information:electricity.service_entry.optical_port_connected"
                      "information:electricity.service_entry.pda_disconnected"
                      "information:electricity.tamper.dc_field_detected"
                      "information:electricity.under_voltage_cleared_phase_1"
                      "information:electricity.under_voltage_cleared_phase_2"
                      "information:electricity.under_voltage_cleared_phase_3"
                      "information:electricity.under_voltage_phase_1"
                      "information:electricity.under_voltage_phase_2"
                      "information:electricity.under_voltage_phase_3"
                      "information:electricity.voltage.missing_voltage_cleared_phase_1"
                      "information:electricity.voltage.missing_voltage_cleared_phase_2"
                      "information:electricity.voltage.missing_voltage_cleared_phase_3"
                      "information:electricity.voltage.missing_voltage_phase_1"
                      "information:electricity.voltage.missing_voltage_phase_2"
                      "information:electricity.voltage.missing_voltage_phase_3"
                      "information:electricity.voltage.over_voltage_cleared_phase_1"
                      "information:electricity.voltage.over_voltage_cleared_phase_2"
                      "information:electricity.voltage.over_voltage_cleared_phase_3"
                      "information:electricity.voltage.over_voltage_phase_1"
                      "information:electricity.voltage.over_voltage_phase_2"
                      "information:electricity.voltage.over_voltage_phase_3"
                      "information:information_technology.network.communication.meter_reading_internal_communication_fixed"
                      "information:information_technology.network.communication.meter_reading_internal_communication_problem"
                      "information:space_and_time.time.clock_adjusted"
                      "information:space_and_time.time.clock_invalidated"
                      "information:space_and_time.time.clock_invalidated_cleared"
                      "information:sensors.corinex.unknown_push_event_received"
                      "information:sensors.corinex.unknown_device_push_event_received"
                    ]
                  }
                }
              ]
            }
          ) {
            count
            groupByDid(size: 10000, ordering: DESCENDING) {
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
        {data:[ .diosSet.groupByDid[] | {
          id: {keyId: "internalId", intId: .key.bucket.internalId, valueId: .key.bucket.id, value: .key.bucket.id},
          "name": {keyId: "taskname", intId: .key.bucket.id, valueId: .key.bucket.localization.name, value: .key.bucket.localization.name},
          "count": {keyId: "taskcount", intId: .key.bucket.id, valueId: .set.count, value: .set.count},
        } ]}
      `,
      config: {
        columns: [
          {
            Header: 'název události',
            accessor: 'name',
          },
          {
            Header: 'četnost',
            accessor: 'count',
            width: 60,
          },
        ],
      },
      position: {
        x: 0,
        y: 4,
        height: 16,
        width: 8,
      },
      chartProps: {
        title: 'nejčastější události',
        showBorder: true,
        showExport: true,
        showPageSize: true,
        showPagination: true,
        enableImport: false,
        rowsInTable: 12,
      },
    },
  ],
};
