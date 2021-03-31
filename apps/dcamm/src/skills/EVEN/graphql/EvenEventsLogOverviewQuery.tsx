export const EVEN_EVENTS_LOG_OVERVIEW_QUERY = `
  query eventsLogOverview(
    $time: TimeDelimitation
    $page: DioPageDelimitation
    $dioOrdering: DioOrder
    $informationSetFilter: DioFilter!
  ) {
    set: diosSet(
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
      items(ordering: $dioOrdering, paging: $page) {
        __typename
        id
        did {
          id
          localization {
            name
          }
        }
        author {
          __typename
          internalId
          ... on Device {
            id {
              did {
                id
              }
              value
            }
            kind {
              ... on DeviceKind {
                id
                localization {
                  name
                }
              }
            }
          }
          ... on Place {
            id {
              did {
                id
              }
              value
            }
            kind {
              ... on PlaceKind {
                id
                localization {
                  name
                }
              }
            }
          }
          ... on GenericInstance {
            id {
              did {
                id
              }
              value
            }
          }
        }
        object {
          __typename
          internalId
          ... on Place {
            id {
              did {
                id
              }
              value
            }
            kind {
              ... on PlaceKind {
                id
                localization {
                  name
                }
              }
            }
          }
          ... on Device {
            id {
              did {
                id
              }
              value
            }
            kind {
              ... on DeviceKind {
                id
                localization {
                  name
                }
              }
            }
          }
          ... on GenericInstance {
            id {
              did {
                id
              }
              value
            }
          }
        }
        timestamp
        value {
          normalizedValue
        }
        validity {
          isDuplicity
          isInvalid
        }
      }
    }
  }
`;
