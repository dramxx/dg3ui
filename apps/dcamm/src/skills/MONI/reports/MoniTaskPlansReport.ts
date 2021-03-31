import { ReportConfig } from '@dg3/schema';

export const MONI_TASK_PLANS_REPORT: ReportConfig = {
  title: 'plány',
  version: '1.0.0',
  id: 'moni.tasks',
  canvasSettings: {
    columns: 24,
    rows: 24,
  },
  keywords: ['monitoring', 'tasks', 'switch'],
  techDescription: 'Monitoring task management',
  widgets: [
    {
      id: 'moni.tasks.switch',
      language: 'jq',
      overviewModule: 'MONI',
      overviewId: '',
      includedFilters: ['device'],
      type: 'TableWidget',
      position: {
        x: 0,
        y: 0,
        height: 10,
        width: 10,
      },
      query: `
        query MoniTaskPlans {
          taskPlans(
            filter: {
              template: {
                id: ["measure_communication_availability_and_delay.v1"]
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
        enableImport: false,
        enableAdhoc: true,
        title: 'plány monitorovacích úloh',
        editable: {
          mutation: 'EditTaskPlans',
          refetchQueries: ['MoniTaskPlans'],
          successMessage: 'Úloha byla změněna.',
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
