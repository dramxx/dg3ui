import { ReportConfig } from '@dg3/schema';

export const READ_TASK_PLANS_REPORT: ReportConfig = {
  title: 'plány',
  version: '1.0.0',
  id: 'read.tasks',
  canvasSettings: {
    columns: 24,
    rows: 24,
  },
  keywords: ['readout', 'tasks', 'switch'],
  techDescription: 'Readout task management',
  widgets: [
    {
      id: 'read.tasks.switch',
      language: 'jq',
      overviewModule: 'READ',
      overviewId: '',
      includedFilters: ['device'],
      type: 'TableWidget',
      position: {
        x: 0,
        y: 0,
        height: 14,
        width: 14,
      },
      query: `
        query ReadoutTaskPlans {
          taskPlans(
            filter: {
              template: {
                id: [
                  "read_LP_5_siem_data.v1"
                  "read_LP_10_siem_data.v1"
                  "read_LP_15_iem_data.v1"
                  "read_REG_iem_data.v1"
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
        rowsInTable: 12,
        showBorder: true,
        showExport: false,
        showPagination: true,
        showPageSize: false,
        enableImport: false,
        enableAdhoc: true,
        title: 'plány odečtových úloh',
        editable: {
          mutation: 'EditTaskPlans',
          refetchQueries: ['ReadoutTaskPlans'],
          successMessage: 'Odečtová úloha byla změněna.',
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
    },
  ],
};
