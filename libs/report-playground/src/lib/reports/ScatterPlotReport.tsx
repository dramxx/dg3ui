import { ReportConfig } from '@dg3/schema';

export const scatterPlotReport: ReportConfig = {
  id: 'ScatterPlotReport',
  techDescription: 'ScatterPlotReport',
  title: 'Scatter plot  report',
  keywords: ['scatter plot', 'suspicious detection', 'kind'],
  canvasSettings: { rows: 8, columns: 8 },
  version: '1.0.0',
  widgets: [
    {
      id: 'suspiciousDetectionSummary',
      type: 'ScatterPlot',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jsonpath',
      rootPath: '$',
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
          key: 'seriesObject',
          type: 'object',
          values: [{ key: 'id', value: 'test' }],
        },
        {
          key: 'seriesData',
          type: 'array',
          values: [
            { key: 'x', value: '$.diosSet.items[*].value.certainty' },
            {
              key: 'y',
              value:
                '$.diosSet.items[*].value.normalizedValue.segments_length_sum',
            },
            {
              key: 'value',
              value:
                '$.diosSet.items[*].value.normalizedValue.estimated_daily_consumption',
            },
            {
              key: 'label',
              value: '$.diosSet.items[*].value.normalizedValue.segments',
            },
          ],
        },
      ],
      position: {
        x: 0,
        y: 0,
        height: 8,
        width: 8,
      },
      chartProps: {
        title: 'Suspicious detections by substation',
        widgetStyle: '',
        showBorder: true,
        colors: [
          'hsl(2, 59%, 54%)',
          'hsl(206, 33%, 33%)',
          '#FFD38D',
          '#B1423D',
          '#FFC452',
          '#D9752D',
          '#BF5533',
          '#B1423D',
          '#923545',
          '#79313D',
        ],
        legendShow: true,
        enableLegendHiding: true,
        enableDataSelection: true,
        enableDataLabels: true,
        enableTooltip: false,
        axisXLabel: 'Certainty',
        axisYLabel: 'Segment length',
        valueLabel: 'Value',
        enableXZoom: true,
        minSymbolSize: 10,
        maxSymbolSize: 100,
      },
    },
  ],
};
