import { JqOverviewDataConfig } from '@dg3/types';
import { EVEN_EVENTS_LOG_OVERVIEW_QUERY } from '../graphql/EvenEventsLogOverviewQuery';

export const EVEN_EVENTS_LOG_OVERVIEW_GQL: JqOverviewDataConfig = {
  language: 'jq',
  query: EVEN_EVENTS_LOG_OVERVIEW_QUERY,
  transformation: `
    [ .set.items[] | {
      id: {keyId: "intId", intId:.id, valueId: .id, value: .id},
      event: {keyId: "id", intId: (.__typename + ":" + .id), valueId: .did.id, value: .did.localization.name},
      author: {keyId: .author.id.did.id, intId: ("Instance:" + .author.internalId), valueId: .author.id.value, value: .author.id.value},
      author_kind: {keyId: "kind", intId: .author.internalId, valueId: .author.kind.id, value: .author.kind.localization.name},
      object: {keyId: .object.id.did.id, intId: ("Instance:" + .object.internalId), valueId: .object.id.value, value: .object.id.value},
      object_kind: {keyId: "kind", intId: .object.internalId, valueId: .object.kind.id, value: .object.kind.localization.name},
      timestamp: {keyId: "timestamp", intId: .id, valueId: .timestamp, value: .timestamp},
      value: {keyId: "value", intId: .id, valueId: .value.normalizedValue, value: .value.normalizedValue},
      validity: {keyId: "validity", intId: .id, valueId: (.validity.isInvalid // true), value: (.validity.isInvalid // true) },
      duplicity: {keyId: "duplicity", intId: .id, valueId: .validity.isDuplicity, value: .validity.isDuplicity }
    } ]
  `,
  defaultOrdering: {
    key: 'TIMESTAMP',
    order: 'DESCENDING',
  },
  columns: [
    {
      Header: 'čas vzniku',
      accessor: 'timestamp',
      disableColumnFilter: true,
      width: 135,
      sortingKey: 'TIMESTAMP',
    },
    {
      Header: 'událost',
      accessor: 'event',
      detailLink: true,
      width: 300,
      sortingKey: 'DID',
    },
    {
      Header: 'druh autora',
      accessor: 'author_kind',
      disableColumnFilter: true,
      disableSorting: true,
    },
    {
      Header: 'autor',
      accessor: 'author',
      detailLink: true,
      disableSorting: true,
    },
    {
      Header: 'druh objektu',
      accessor: 'object_kind',
      disableColumnFilter: true,
      disableSorting: true,
    },
    {
      Header: 'objekt',
      accessor: 'object',
      detailLink: true,
      disableSorting: true,
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
  ],
};
