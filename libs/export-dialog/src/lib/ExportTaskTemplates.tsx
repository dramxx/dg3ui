export const MEASUREMENT_TEMPLATES = {
  LP5: {
    NAME: 'profil SIEM LP5',
    WEEK: 'export_to_csv_measuring_LP_5_this_week.v1',
    YESTERDAY: 'export_to_csv_measuring_LP_5_last_day.v1',
    TODAY: 'export_to_csv_measuring_LP_5_this_day.v1',
  },
  LP10: {
    NAME: 'profil SIEM LP10',
    WEEK: 'export_to_csv_measuring_LP_10_this_week.v1',
    YESTERDAY: 'export_to_csv_measuring_LP_10_last_day.v1',
    TODAY: 'export_to_csv_measuring_LP_10_this_day.v1',
  },
  LP15: {
    NAME: 'profil IEM LP15',
    WEEK: 'export_to_csv_measuring_LP_15_this_week.v1',
    YESTERDAY: 'export_to_csv_measuring_LP_15_last_day.v1',
    TODAY: 'export_to_csv_measuring_LP_15_this_day.v1',
  },
  REG: {
    NAME: 'profil IEM REG',
    WEEK: 'export_to_csv_measuring_LP_REG_this_week.v1',
    YESTERDAY: 'export_to_csv_measuring_LP_REG_last_day.v1',
    TODAY: 'export_to_csv_measuring_LP_REG_this_day.v1',
  },
  ALL: {
    NAME: 'Data ze všech profilů',
    WEEK: 'export_to_csv_measuring_all_this_week.v1',
    YESTERDAY: 'export_to_csv_measuring_all_last_day.v1',
    TODAY: 'export_to_csv_measuring_all_this_day.v1',
  },
};

export const EVENTS_TEMPLATES = {
  TARIF: {
    NAME: 'události o spínání tarifu',
    WEEK: 'export_to_csv_events_tariffs_switching_this_week.v1',
    YESTERDAY: 'export_to_csv_events_tariffs_switching_last_day.v1',
    TODAY: 'export_to_csv_events_tariffs_switching_this_day.v1',
  },
  OTHER: {
    NAME: 'ostatní události',
    WEEK: 'export_to_csv_events_others_than_tariffs_switching_this_week.v1',
    YESTERDAY: 'export_to_csv_events_others_than_tariffs_switching_last_day.v1',
    TODAY: 'export_to_csv_events_others_than_tariffs_switching_this_day.v1',
  },
};

export const MONITORING_TEMPLATES = {
  AVAILABILITY: {
    NAME: 'komunikační dostupnost',
    WEEK: 'export_to_csv_monitoring_availability_this_week.v1',
    YESTERDAY: 'export_to_csv_monitoring_availability_last_day.v1',
    TODAY: 'export_to_csv_monitoring_availability_this_day.v1',
  },
  DURATION: {
    NAME: 'komunikační latence',
    WEEK: 'export_to_csv_monitoring_communication_duration_this_week.v1',
    YESTERDAY: 'export_to_csv_monitoring_communication_duration_last_day.v1',
    TODAY: 'export_to_csv_monitoring_communication_duration_this_day.v1',
  },
};
