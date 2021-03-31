import { JqDetailWidgetConfig } from '@dg3/schema';

export const TASK_EXECUTION_CARDS: JqDetailWidgetConfig = {
  id: 'taskExecution.cards',
  type: 'Cards',
  language: 'jq',
  query: `
    query TaskExectutionCards($elementId: ID!) {
      taskExecutionsById(id: [$elementId]) {
        id
        template {
          id
        }
        executionRoot {
          activeFrom
          activeTo
          messageId: result(did: "information:system.integrator.sap_idoc_id") {
            normalizedValue
          }
          results {
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
              id
            }
            normalizedValue
          }
        }
      }
    }
  `,
  transformation: `
    { data: [
      .taskExecutionsById[0] |
        { key: "messageID", label: "ID zprávy", value: (.executionRoot.messageId.normalizedValue as $id | if $id == null or $id == "" then .id else $id end ) },
        { key: "activeFrom", label: "čas zahájení", value: .executionRoot.activeFrom },
        { key: "state", label: "postup", value: (if (.executionRoot.activeTo != null) then "dokončená" else "běží" end) },
        { key: "status", label: "status", value:
          (if (.template.id == "synchronization_sap.v1")
            then (.executionRoot.results[] | select(.did.id == "information:system.integrator.sap_integration_summary_result") as $val |
              if ($val.did.dataType.enumValues)
                then ($val.did.dataType.enumValues[] | select(.id == $val.normalizedValue).localization.name) // null
                else $val.normalizedValue
              end
            ) else (.executionRoot.results[] | select(.did.id == "information:system.integrator.srv_integration_summary_result") as $val |
              if ($val.did.dataType.enumValues)
                then ($val.did.dataType.enumValues[] | select(.id == $val.normalizedValue).localization.name) // null
                else $val.normalizedValue
              end
            )
          end) }
      ] }
  `,
};
