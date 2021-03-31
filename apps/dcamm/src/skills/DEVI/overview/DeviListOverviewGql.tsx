import { JqOverviewDataConfig } from '@dg3/types';
import { DEVI_OVERVIEW_QUERY } from '../graphql/DeviOverviewQuery';

export const DEVI_LIST_OVERVIEW_GQL: JqOverviewDataConfig = {
  language: 'jq',
  query: DEVI_OVERVIEW_QUERY,
  transformation: `
    def attribute(attr): ((.attributes[] | select(.did.id == attr)) // null);
    [ .set.items[] | {
      id: {keyId: "internalId", intId: .internalId, valueId: .internalId, value: .internalId},
      "information:attribute.ckod": (attribute("information:attribute.ckod").normalizedValue as $val | {keyId: "information:attribute.ckod", intId: ("Instance:" + .internalId), valueId: $val, value: $val}),
      "information:attribute.model": (attribute("information:attribute.model").normalizedValue as $val | {keyId: "information:attribute.model", intId: .internalId, valueId: $val, value: $val}),
      "information:attribute.device_lifecycle_phase": (
        attribute("information:attribute.device_lifecycle_phase")
        | .normalizedValue as $valId
        | (if $valId then (.did.dataType.enumValues[] | select(.id == $valId).localization.name) // null else null end) as $value
        | {keyId: "information:attribute.device_lifecycle_phase", intId: .internalId, valueId: $valId, value: $value}),
      "information:attribute.device_maintenance_status": (attribute("information:attribute.device_maintenance_status").normalizedValue as $val | {keyId: "information:attribute.device_maintenance_status", intId: .internalId, valueId: $val, value: $val}),
      kind: ({key: "kind", keyId: "kind", intId: .internalId, valueId: .kind.id, value: .kind.localization.name}),
      "information:attribute.ptb_skupina": ((.kind | attribute("information:attribute.ptb_skupina").value) as $val | {keyId: "information:attribute.ptb_skupina", intId: .internalId, valueId: $val, value: $val}),
      "information:attribute.matnr": ((.kind | attribute("information:attribute.matnr").value) as $val | {keyId: "information:attribute.matnr", intId: .internalId, valueId: $val, value: $val}),
      "information:attribute.vyrobce": ((.kind | attribute("information:attribute.vyrobce").value) as $val | {keyId: "information:attribute.vyrobce", intId: .internalId, valueId: $val, value: $val}),
      "information:attribute.konstrukcni_typ": ((.kind | attribute("information:attribute.konstrukcni_typ").value) as $val | {keyId: "information:attribute.konstrukcni_typ", intId: .internalId, valueId: $val, value: $val}),
      "mediator_ckod": ({keyId: .mediator[0].id.did.id, intId: ("Instance:" + .mediator[0].internalId), valueId: .mediator[0].id.value, value: .mediator[0].id.value}),
      place: (.instalation_place[0].placement[0] as $place | {keyId: $place.id.did.id, intId: ("Instance:" + $place.internalId), valueId: $place.id.value, value: $place.id.value}),
      dts: (.instalation_place[0].dts[0] as $dts | {keyId: $dts.id.did.id, intId: ("Instance:" + $dts.internalId), valueId: $dts.id.value, value: $dts.id.value})
    } ]
  `,
  columns: [
    {
      Header: 'ckód',
      accessor: 'information:attribute.ckod',
      detailLink: true,
      width: 140,
      sortingKey: 'information:attribute.ckod',
    },
    {
      Header: 'druh',
      accessor: 'kind',
      disableSorting: true,
    },
    {
      Header: 'místo instalace',
      accessor: 'place',
      detailLink: true,
      disableSorting: true,
    },
    {
      Header: 'PTB',
      accessor: 'information:attribute.ptb_skupina',
      width: 50,
      disableSorting: true,
    },
    {
      Header: 'materiál',
      accessor: 'information:attribute.matnr',
      disableSorting: true,
    },
    {
      Header: 'model',
      accessor: 'information:attribute.model',
      sortingKey: 'information:attribute.model',
    },
    {
      Header: 'výrobce',
      accessor: 'information:attribute.vyrobce',
      disableSorting: true,
    },
    {
      Header: 'konstrukční typ',
      accessor: 'information:attribute.konstrukcni_typ',
      disableSorting: true,
    },
    {
      Header: 'mediátor',
      accessor: 'mediator_ckod',
      detailLink: true,
      disableSorting: true,
    },
    {
      Header: 'napájecí DTS',
      accessor: 'dts',
      detailLink: true,
      disableSorting: true,
    },
    {
      Header: 'životní fáze',
      accessor: 'information:attribute.device_lifecycle_phase',
      sortingKey: 'information:attribute.device_lifecycle_phase',
    },
    {
      Header: 'servisní stav',
      accessor: 'information:attribute.device_maintenance_status',
      sortingKey: 'information:attribute.device_maintenance_status',
    },
  ],
};
