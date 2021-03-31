import { JqDetailWidgetConfig } from '@dg3/schema';

export const TASK_EXECUTION_NODE_CARDS: JqDetailWidgetConfig = {
  id: 'taskExecutionNode.cards',
  type: 'Cards',
  language: 'jq',
  query: `
          query TaskExectutionNodeCards ($elementId: ID!) {
              taskExecutionNodesById(id: [$elementId]) {
                id
                activeTo
                activeFrom
              }
          }
    `,
  transformation: `
    {data: [
      .taskExecutionNodesById[0] |
       { key: "state", label: "stav", value: (if (.activeTo != null) then  "dokončená" else "běží" end) }
    ]}
  `,
};
