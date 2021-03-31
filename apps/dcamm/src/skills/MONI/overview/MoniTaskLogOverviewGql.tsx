import { JqOverviewDataConfig } from '@dg3/types';
import { MONI_TASK_LOG_OVERVIEW_QUERY } from '../graphql/MoniTaskLogOverviewQuery';

export const MONI_TASK_LOG_OVERVIEW_GQL: JqOverviewDataConfig = {
  language: 'jq',
  query: MONI_TASK_LOG_OVERVIEW_QUERY,
  transformation: `
     def getState: if .activeTo != null then (if .problemDios.count > 0 then "neúspěch" else "dokončená" end) else "běží" end;
     [
        .set.items[] | . as $root |
        .executionRoot.childNodes[] | {
            id: {keyId: "id", intId:.id, valueId: .id, value: .id},
            dts: (.communication_peer[0].instance.installation_place[0].dts[0] as $dts |  {keyId: $dts.id.did.id, intId: ("Instance:" + $dts.internalId), valueId: $dts.id.value, value: $dts.id.value}),
            mediator: (.communication_peer[0].instance as $med | {keyId: $med.id.did.id, intId: ("Instance:" + $med.internalId), valueId: $med.id.value, value: $med.id.value}),
            template:  {keyId: "id", intId: ("TaskExecutionNode:" + .id), valueId: $root.template.id, value: $root.template.localization.name},
            activeFrom: {keyId: "activeFrom", intId: .id, valueId: .activeFrom, value: .activeFrom},
            activeTo: {keyId: "activeTo", intId: .id, valueId: .activeTo, value: .activeTo},
            state: {keyId: "state", intId: .id, valueId: getState , value: getState}
        }
     ]
  `,
  columns: [
    {
      Header: 'název úlohy',
      accessor: 'template',
      disableSorting: true,
      // detailLink: true,
    },
    {
      Header: 'čas spuštění',
      accessor: 'activeFrom',
      disableSorting: true,
      disableColumnFilter: true,
    },
    {
      Header: 'čas dokončení',
      accessor: 'activeTo',
      disableSorting: true,
      disableColumnFilter: true,
    },
    // TODO: this is state is able to show only running/not running
    {
      Header: 'stav',
      accessor: 'state',
      disableSorting: true,
      disableColumnFilter: true,
    },
    {
      Header: 'ckód zařízení',
      accessor: 'mediator',
      disableSorting: true,
      detailLink: true,
    },
    {
      Header: 'DTS zařízení',
      accessor: 'dts',
      disableSorting: true,
      detailLink: true,
      disableColumnFilter: true,
    },
  ],
};
