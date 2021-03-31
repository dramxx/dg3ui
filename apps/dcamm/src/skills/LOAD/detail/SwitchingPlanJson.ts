import { JqDetailWidgetConfig } from '@dg3/schema';

export const SWITCHING_PLAN_WIDGET: JqDetailWidgetConfig = {
  id: 'switching_plan.json',
  type: 'Json',
  language: 'jq',
  query: `
     query switchingPlanSpecificationJson($elementId: ID!) {
        instances(filter: {node: {intId: [$elementId]}}) {
          id {
            did {
              id
            }
          }
          attribute(did: "information:electricity.load_control.switching_plan_specification") {
            did {
              id
            }
            normalizedValue
          }
        }
      }
    `,
  transformation: `
    {data:
      .instances[0] |
       { key: "switchingPlanJson", value: (.attribute.normalizedValue | tostring) }
    }
  `,
};
