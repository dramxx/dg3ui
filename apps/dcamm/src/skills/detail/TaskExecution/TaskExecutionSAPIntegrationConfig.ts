import { JqDetailWidgetConfig } from '@dg3/schema';

export const TASK_EXECUTION_SAP_INTEGRATION: JqDetailWidgetConfig = {
  id: 'taskExecution.SAPIntegration',
  title: 'Události integračního rozhraní',
  type: 'Table',
  language: 'jq',
  query: `
    query TaskExecutionSAPIntegrationTable($elementId: ID!) {
      taskExecutionsById(id: [$elementId]) {
        diosSet(
          filter: {
            authorFilter: { kinds: "system:system.amm-integrator" }
            include: NESTED
          }
        ) {
          items(ordering: { byField: TIMESTAMP }) {
            id
            timestamp
            did {
              id
              localization {
                abbreviation
              }
            }
            object {
              id {
                did {
                  id
                  localization {
                    name
                  }
                }
                value
              }
            }
            value {
              normalizedValue
            }
          }
        }
      }
    }
  `,
  transformation: `
    {data: [
      .taskExecutionsById[0].diosSet.items[] | {
        id: {
          keyId: "id",
          intId: .id,
          valueId: .id,
          value: .id
        },
        timestamp: {
          keyId: "timestamp",
          intId: .id,
          valueId: .timestamp,
          value: .timestamp
        },
        eventDescription: {
          keyId: "eventDescription",
          intId: .id,
          valueId: .did.localization.abbreviation,
          value: .did.localization.abbreviation
        },
        object: {
          keyId: "object",
          intId: .id,
          valueId: .object.id.did.id,
          value: .object.id.value
        },
        actionParameters: {
          keyId: "actionParameters",
          intId: .id,
          valueId: .value.normalizedValue | tostring,
          value: .value.normalizedValue | tostring,
        }
      }
    ]}
  `,
  config: {
    columns: [
      {
        Header: 'čas',
        accessor: 'timestamp',
        disableSorting: true,
        width: 135,
      },
      {
        Header: 'popis události',
        accessor: 'eventDescription',
        disableSorting: true,
      },
      {
        Header: 'předmět',
        accessor: 'object',
        disableSorting: true,
      },
      {
        Header: 'podrobné parametry akce',
        accessor: 'actionParameters',
        disableSorting: true,
      },
    ],
    // sortColumn: 'timestamp',
  },
};
