import { JqOverviewDataConfig } from '@dg3/types';
import { MEAS_MEASUREMENTS_LOG_OVERVIEW_QUERY } from '../graphql/MeasMeasurementsLogOverviewQuery';

export const MEAS_MEASUREMENTS_LOG_OVERVIEW_GQL: JqOverviewDataConfig = {
  language: 'jq',
  query: MEAS_MEASUREMENTS_LOG_OVERVIEW_QUERY,
  transformation: `
    [ .set.items[] | {
      id: {keyId: "intId", intId:.id, valueId: .id, value: .id},
      measurement: {keyId: "id", intId: (.__typename + ":" + .id), valueId: .did.id, value: .did.localization.name},
      timestamp: {keyId: "timestamp", intId: .id, valueId: .timestamp, value: .timestamp},
      value: {keyId: "value", intId: .id, valueId: .value.normalizedValue, value: .value.normalizedValue},
      unit: ((.did.params[] | select(.param.id == "unit") // null) as $unit | {keyId: $unit.param.id, intId: .id, valueId: $unit.value.id, value: $unit.value.localization.name}),
      profile: {keyId: "profile", intId: .id, valueId: (.tags[] | select(.key == "readout").value[] // null), value: (.tags[] | select(.key == "readout").value[] // null)},
      validity: ((.validity.isInvalid == false) as $validity | {keyId: "validity", intId: .id, valueId: $validity, value: $validity }),
      duplicity: {keyId: "duplicity", intId: .id, valueId: .validity.isDuplicity, value: .validity.isDuplicity },
      author: {keyId: .author.id.did.id, intId: ("Instance:" + .author.internalId), valueId: .author.id.value, value: .author.id.value},
      object: {keyId: .object.id.did.id, intId: ("Instance:" + .object.internalId), valueId: .object.id.value, value: .object.id.value},
      startIndexing: {keyId: "startIndexing", intId: .id, valueId: .startIndexing, value: .startIndexing},
    } ]
  `,
  defaultOrdering: {
    key: 'TIMESTAMP',
    order: 'DESCENDING',
  },
  columns: [
    {
      Header: 'čas měření',
      accessor: 'timestamp',
      disableColumnFilter: true,
      width: 135,
      sortingKey: 'TIMESTAMP',
    },
    {
      Header: 'veličina',
      accessor: 'measurement',
      detailLink: true,
      width: 300,
      sortingKey: 'DID',
    },
    {
      Header: 'jednotka',
      accessor: 'unit',
      disableSorting: true,
      disableColumnFilter: true,
    },
    {
      Header: 'profil',
      accessor: 'profile',
      disableSorting: true,
      disableColumnFilter: true,
    },
    {
      Header: 'hodnota',
      accessor: 'value',
      disableColumnFilter: true,
      sortingKey: 'VALUE',
    },
    {
      Header: 'validita',
      accessor: 'validity',
      sortingKey: 'VALIDITY_INVALID',
    },
    {
      Header: 'duplicita',
      accessor: 'duplicity',
      sortingKey: 'VALIDITY_DUPLICATE',
    },
    {
      Header: 'autor',
      accessor: 'author',
      detailLink: true,
      disableSorting: true,
    },
    {
      Header: 'objekt',
      accessor: 'object',
      detailLink: true,
      disableSorting: true,
    },
    {
      Header: 'čas odečtení',
      accessor: 'startIndexing',
      disableColumnFilter: true,
      width: 135,
      sortingKey: 'STARTINDEXING',
    },
  ],
};
