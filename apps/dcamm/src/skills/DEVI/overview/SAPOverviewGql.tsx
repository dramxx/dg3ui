import { JqOverviewDataConfig } from '@dg3/types';
import { SAP_OVERVIEW_QUERY } from '../graphql/SAPOverviewQuery';

export const SAP_OVERVIEW_GQL: JqOverviewDataConfig = {
  language: 'jq',
  query: SAP_OVERVIEW_QUERY,
  transformation: `
    [ .set.items[] | {
      id: {keyId: "id", intId: .id, valueId: .id, value: .id},
      "template": {
        keyId: "id",
        intId:("TaskExecution:" + .id),
        valueId: .template.id,
        value: .template.localization.name
      },
      "sap_message_id": ( (.executionRoot.messageId.normalizedValue as $id | if $id == null or $id == "" then .id else $id end ) as $messageId | {
        keyId: "sap_message_id",
        intId: ("TaskExecution:" + .id),
        valueId: $messageId,
        value: $messageId
      }),
      "activeFrom": {
        keyId: "activeFrom",
        intId: .id,
        valueId: .executionRoot.activeFrom,
        value: .executionRoot.activeFrom
      },
      "activeTo": {
        keyId: "activeTo",
        intId: .id,
        valueId: .executionRoot.activeTo,
        value: .executionRoot.activeTo
      },
      "state": ((if .executionRoot.activeTo == null then "běží" else "dokončená" end) as $value | {
        keyId: "activeTo",
        intId: .id,
        valueId: $value,
        value: $value
      }),
      "status": {
        keyId: "status",
        intId: .id,
        valueId: .executionRoot.result.normalizedValue,
        value: (.executionRoot.result | .normalizedValue as $val | if .did.dataType.enumValues then (.did.dataType.enumValues[] | select(.id == $val).localization.name) // null else $val end)
      }
    } ]
  `,
  columns: [
    {
      Header: 'název úlohy',
      accessor: 'template',
      disableSorting: true,
      disableColumnFilter: true,
    },
    {
      Header: 'ID zprávy',
      accessor: 'sap_message_id',
      detailLink: true,
      disableSorting: true,
      disableColumnFilter: true,
      width: 180,
    },
    {
      Header: 'čas spuštění',
      accessor: 'activeFrom',
      disableSorting: true,
      disableColumnFilter: true,
      width: 135,
    },
    {
      Header: 'čas dokončení',
      accessor: 'activeTo',
      disableSorting: true,
      disableColumnFilter: true,
      width: 135,
    },
    {
      Header: 'postup',
      accessor: 'state',
      disableSorting: true,
      disableColumnFilter: true,
      width: 90,
    },
    {
      Header: 'status',
      accessor: 'status',
      disableSorting: true,
      disableColumnFilter: true,
    },
  ],
};
