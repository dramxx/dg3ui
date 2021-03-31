import { JqDetailWidgetConfig } from '@dg3/schema';

export const TASK_EXECUTION_ATTRIBUTES: JqDetailWidgetConfig = {
  id: 'taskExecution.attributes',
  title: 'Atributy běhu úlohy',
  type: 'Attributes',
  language: 'jq',
  query: `
        query TaskExectutionAttributes($elementId: ID!) {
          taskExecutionsById(id: [$elementId]) {
            id
            template {
              localization {
                name
              }
            }
            executionRoot {
              activeTo
              activeFrom
            }
          }
        }
  `,
  transformation: `
  {data: [ .taskExecutionsById[0] |
        { id: "name",  did: "název úlohy",   value: {
          valueId: .template.localization.name,
          value: .template.localization.name
        } },
        { id: "activeFrom",  did: "čas spuštění",   value: {
          valueId: .executionRoot.activeFrom,
          value: .executionRoot.activeFrom
        } },
        { id: "activeTo",  did: "čas dokončení",   value: {
          valueId: .executionRoot.activeTo,
          value: .executionRoot.activeTo
        } },
        { id: "state",
          did: "stav",
          value: {
            valueId: (if (.executionRoot.activeTo != null) then  "dokončená" else "běží" end),
            value: (if (.executionRoot.activeTo != null) then  "dokončená" else "běží" end),
          }
        }
   ]}
  `,
  config: {
    columns: [
      { Header: 'Atribut', accessor: 'did' },
      { Header: 'Hodnota', accessor: 'value' },
    ],
    editable: [],
    refetchQueries: [],
    sortColumn: 'did',
  },
};
