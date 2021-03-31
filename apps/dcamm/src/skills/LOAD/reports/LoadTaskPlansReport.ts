import { ReportConfig } from '@dg3/schema';

export const LOAD_TASK_PLANS_REPORT: ReportConfig = {
  title: 'plány',
  version: '1.0.0',
  id: 'load.tasks',
  canvasSettings: {
    columns: 24,
    rows: 24,
  },
  keywords: ['load', 'tasks', 'switch'],
  techDescription: 'Load task management',
  widgets: [
    {
      id: 'load.tasks.switch',
      language: 'jq',
      overviewModule: 'LOAD',
      overviewId: '',
      type: 'TableWidget',
      position: {
        x: 0,
        y: 0,
        height: 10,
        width: 10,
      },
      query: `
        query LoadTaskPlans {
          taskPlans(
            filter: {
              template: {
                id: [
                "tou_validate_events_vs_switching_plan.v1",
                "tou_send_switching_plan_to_place.v1",
                "tou_send_switching_plan_planned_to_place.v1",
                "dc.correct_switching_plan_inventory_edges.template"
                ]
              }
            }
          ) {
            id
            template {
              id
              localization {
                name
              }
            }
            active
            nextTriggerTime
            filter
            schedule
          }
        }
      `,
      transformation: `
         { data: [ .taskPlans[] |
          {
            id: {value: .id},
            type: {value: .template.localization.name, valueId: .template.id},
            schedule: {value: .schedule.expression, options: .schedule},
            nextRun: {value: .nextTriggerTime},
            state: {value: .active}
          }
        ]}
      `,
      chartProps: {
        rowsInTable: 7,
        showBorder: true,
        showExport: false,
        showPagination: true,
        showPageSize: false,
        title: 'plány úloh řízení zátěže',
        editable: {
          mutation: 'EditTaskPlans',
          refetchQueries: ['LoadTaskPlans'],
          successMessage: 'Úloha řízení zátěže byla změněna.',
        },
      },
      config: {
        columns: [
          { Header: 'typ úlohy', accessor: 'type' },
          { Header: 'perioda', accessor: 'schedule' },
          { Header: 'příští běh', accessor: 'nextRun' },
          {
            Header: 'stav',
            accessor: 'state',
            editable: {
              type: 'boolean',
              trueLabel: 'aktivní',
              falseLabel: 'neaktivní',
              body: '{id: .id, active: .value}',
            },
          },
        ],
      },
      includedFilters: [],
    },
  ],
};
