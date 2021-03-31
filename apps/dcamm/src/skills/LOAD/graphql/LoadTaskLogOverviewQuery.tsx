export const LOAD_TASK_LOG_OVERVIEW_QUERY = `
query loadTaskLogOverview(
  $page: TaskPageDelimitation
  $time: TaskTimeDelimitation
  $taskExecutionsFilter: TaskExecutionTreeMatcher!
) {
  set: taskExecutionsSet(
    time: $time
    filter: {
      AND: [
        {
          templateId: [
            "tou_validate_events_vs_switching_plan.v1"
            "tou_send_switching_plan_to_place.v1"
            "tou_send_switching_plan_planned_to_place.v1"
            "dc.correct_switching_plan_inventory_edges.template"
            "synchronization_srv.v1"
          ]
        }
        $taskExecutionsFilter
      ]
    }
  ) {
    count
    items(page: $page, ordering: { order: DESCENDING, activeFrom: {} }) {
      id
      template {
        id
        localization {
          name
        }
      }
      executionRoot {
        activeFrom
        activeTo
        result: result(
          did: "information:system.integrator.srv_integration_summary_result"
        ) {
          did {
            dataType {
              ... on EnumDataType {
                enumValues {
                  id
                  localization {
                    name
                  }
                }
              }
            }
          }
          normalizedValue
        }
      }
    }
  }
}
`;
