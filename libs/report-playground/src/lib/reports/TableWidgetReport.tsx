import { ReportConfig } from '@dg3/schema';

export const tableWidgetReport: ReportConfig = {
  id: 'TableWidgetReport',
  techDescription: 'mega test report',
  title: 'Table Widget Report',
  keywords: ['devices table', 'table', 'top 20 devices'],
  canvasSettings: { rows: 8, columns: 8 },
  version: '1.0.0',
  widgets: [
    {
      id: 'suspicions',
      type: 'TableWidget',
      overviewModule: 'NTL',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '$.diosSet.items[*]',
      query: `
              query list_of_suspicions {
                diosSet(
                  filter: {
                    didFilter: { ids: "non_technical_losses.suspicious_detection_summary_estimated" }
                  }
                ) {
                  items {
                    id
                    objectPlace {
                      id {
                        value
                      }
                    }
                    value {
                      certainty
                      normalizedValue
                    }
                  }
                }
              }
        `,
      jsonPathMapping: [
        {
          key: 'table',
          type: 'object',
          values: [
            { key: 'id', value: '$.id' },
            {
              key: 'susp_segment',
              value: '$.value.normalizedValue.segments',
            },
            { key: 'trans_subs', value: '$.objectPlace.id.value' },
            {
              key: 'seg_length',
              value: '$.value.normalizedValue.segments_length_sum',
            },
            {
              key: 'est_daily_loss',
              value: '$.value.normalizedValue.estimated_daily_consumption',
            },
            {
              key: 'num_of_seg',
              value: '$.value.normalizedValue.segments.length',
            },
          ],
        },
      ],
      config: {
        columns: [
          {
            Header: 'suspicious segments',
            accessor: 'susp_segment',
          },
          {
            Header: 'transformer substation',
            accessor: 'trans_subs',
          },
          {
            Header: 'number of segments',
            accessor: 'num_of_seg',
          },
          {
            Header: 'suspicious segments length (m)',
            accessor: 'seg_length',
          },
          {
            Header: 'estimated daily loss (kWh)',
            accessor: 'est_daily_loss',
          },
        ],
      },
      position: { x: 0, y: 0, height: 8, width: 8 },
      chartProps: {
        title: 'Top 15 suspicions',
        rowsInTable: 15,
        showBorder: true,
        showExport: false,
        showPageSize: false,
        showPagination: false,
      },
    },
  ],
};
