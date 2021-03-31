import { JqDetailWidgetConfig } from '@dg3/schema';

export const TASK_EXECUTION_NODE_ATTRIBUTES: JqDetailWidgetConfig = {
  id: 'taskExecutionNode.attributes',
  title: 'Atributy běhu úlohy',
  type: 'Attributes',
  language: 'jq',
  query: `
        query TaskExectutionNodeAttributes ($elementId: ID!) {
          taskExecutionNodesById(id: [$elementId]) {
            id
            activeTo
            activeFrom
            executionTree {
              template {
                id
              }
            }
          }
        }
  `,
  transformation: `
  {data: [ .taskExecutionNodesById[0] |
        { id: "name",  did: "název úlohy",   value: {
          valueId: .executionTree.template.localization.name,
          value: .executionTree.template.localization.name
        } },
        { id: "activeFrom",  did: "čas spuštění",   value: {
          valueId: .activeFrom,
          value: .activeFrom
        } },
        { id: "activeTo",  did: "čas dokončení",   value: {
          valueId: .activeTo,
          value: .activeTo
        } },
        { id: "state",
          did: "stav",
          value: {
            valueId: (if (.activeTo != null) then  "dokončená" else "běží" end),
            value: (if (.activeTo != null) then  "dokončená" else "běží" end),
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
