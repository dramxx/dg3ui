import { JqOverviewDataConfig } from '@dg3/types';
import { READ_TASK_LOG_OVERVIEW_QUERY } from '../graphql/ReadTaskLogOverviewQuery';

export const READ_TASK_LOG_OVERVIEW_GQL: JqOverviewDataConfig = {
  language: 'jq',
  query: READ_TASK_LOG_OVERVIEW_QUERY,
  transformation: `
     [
        .set.items[] | . as $root |
        .executionRoot.childNodes[] | {
            id: {keyId: "id", intId:.id, valueId: .id, value: .id},
            dts: (.communication_peer[0].instance.installation_place[0].dts[0] as $dts |  {keyId: $dts.id.did.id, intId: ("Instance:" + $dts.internalId), valueId: $dts.id.value, value: $dts.id.value}),
            mediator: (.communication_peer[0].instance as $med | {keyId: $med.id.did.id, intId: ("Instance:" + $med.internalId), valueId: $med.id.value, value: $med.id.value}),
            template:  {keyId: "id", intId: ("TaskExecutionNode:" + .id), valueId: $root.template.id, value: $root.template.localization.name},
            activeFrom: {keyId: "activeFrom", intId: .id, valueId: .activeFrom, value: .activeFrom},
            activeTo: {keyId: "activeTo", intId: .id, valueId: .activeTo, value: .activeTo},
            state: {keyId: "state", intId: .id, valueId: (if (.activeTo != null) then  "dokončená" else "běží" end) , value: (if (.activeTo != null) then  "dokončená" else "běží" end)}
        }
     ]
  `,
  columns: [
    {
      Header: 'název úlohy',
      accessor: 'template',
      disableSorting: true,
      // TODO enable after GQL is working
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
      Header: 'mediator',
      accessor: 'mediator',
      disableSorting: true,
      detailLink: true,
    },
    {
      Header: 'DTS med.',
      accessor: 'dts',
      disableSorting: true,
      detailLink: true,
      disableColumnFilter: true,
    },
  ],
};
