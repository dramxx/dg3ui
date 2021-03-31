import { JqOverviewDataConfig } from '@dg3/types';
import { PLAC_OVERVIEW_QUERY } from '../graphql/PlacOverviewQuery';

export const PLAC_LIST_OVERVIEW_GQL: JqOverviewDataConfig = {
  language: 'jq',
  query: PLAC_OVERVIEW_QUERY,
  transformation: `
    def attribute(attr): ((.attributes[] | select(.did.id == attr)) // null);
    [ .set.items[] | {
      id: {keyId: "internalId", intId: .internalId, valueId: .internalId, value: .internalId},
      "ean": (attribute("information:attribute.ean").normalizedValue as $val | {keyId: "information:attribute.ean", intId: ("Instance:" + .internalId), valueId: $val, value: $val}),
      "placeId": {keyId: .id.did.id, intId: ("Instance:" + .internalId), valueId: .id.value, value: .id.value},
      "ms": (attribute("information:attribute.house").normalizedValue as $val | {keyId: "information:attribute.house", intId: .internalId, valueId: $val, value: $val}),
      "sazba": (attribute("information:attribute.tariftype").normalizedValue as $val | {keyId: "information:attribute.tariftype", intId: .internalId, valueId: $val, value: $val}),
      "oj": (attribute("information:attribute.oj").normalizedValue as $val | {keyId: "information:attribute.oj", intId: .internalId, valueId: $val, value: $val}),
      "city": (attribute("information:attribute.city1").normalizedValue as $val | {keyId: "information:attribute.city1", intId: .internalId, valueId: $val, value: $val}),
      "district": (attribute("information:attribute.city2").normalizedValue as $val | {keyId: "information:attribute.city2", intId: .internalId, valueId: $val, value: $val}),
      "street": (attribute("information:attribute.street").normalizedValue as $val | {keyId: "information:attribute.street", intId: .internalId, valueId: $val, value: $val}),
      "cp": (attribute("information:attribute.house_num1").normalizedValue as $val | {keyId: "information:attribute.house_num1", intId: .internalId, valueId: $val, value: $val}),
      "anlart": (attribute("information:attribute.anlart").normalizedValue as $val | {keyId: "information:attribute.anlart", intId: .internalId, valueId: $val, value: $val}),
      "typ_mereni": (attribute("information:attribute.typ_mereni").normalizedValue as $val | {keyId: "information:attribute.typ_mereni", intId: .internalId, valueId: $val, value: $val}),
      "technologie": (attribute("information:attribute.mr_source").normalizedValue as $val | {keyId: "information:attribute.mr_source", intId: .internalId, valueId: $val, value: $val}),
      "information:attribute.place_maintenance_status": (attribute("information:attribute.place_maintenance_status").normalizedValue as $val | {keyId: "information:attribute.place_maintenance_status", intId: .internalId, valueId: $val, value: $val}),
    } ]
  `,
  columns: [
    {
      Header: 'ean',
      accessor: 'ean',
      sortingKey: 'information:attribute.ean',
      width: 150,
    },
    {
      Header: 'ID místa',
      accessor: 'placeId',
      detailLink: true,
      sortingKey: null,
      width: 90,
    },
    {
      Header: 'přípojný objekt',
      accessor: 'ms',
      sortingKey: 'information:attribute.house',
      width: 100,
    },
    {
      Header: 'sazba',
      accessor: 'sazba',
      sortingKey: 'information:attribute.tariftype',
    },
    {
      Header: 'OJ',
      accessor: 'oj',
      sortingKey: 'information:attribute.oj',
    },
    {
      Header: 'místo',
      accessor: 'city',
      sortingKey: 'information:attribute.city1',
    },
    {
      Header: 'místní část',
      accessor: 'district',
      sortingKey: 'information:attribute.city2',
    },
    {
      Header: 'ulice',
      accessor: 'street',
      sortingKey: 'information:attribute.street',
    },
    {
      Header: 'ČP',
      accessor: 'cp',
      sortingKey: 'information:attribute.house_num1',
      width: 50,
    },
    {
      Header: 'druh OM',
      accessor: 'anlart',
      sortingKey: 'information:attribute.anlart',
      width: 50,
    },
    {
      Header: 'typ měření',
      accessor: 'typ_mereni',
      sortingKey: 'information:attribute.typ_mereni',
    },
    {
      Header: 'technologie',
      accessor: 'technologie',
      sortingKey: 'information:attribute.mr_source',
    },
    {
      Header: 'servisní stav',
      accessor: 'information:attribute.place_maintenance_status',
      sortingKey: 'information:attribute.place_maintenance_status',
    },
  ],
};
