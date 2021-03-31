import { ReportConfig } from '@dg3/schema';

export const deviTemplatesReport: ReportConfig = {
  id: 'deviTemplatesReport',
  techDescription: 'Devices templates',
  title: 'šablony',
  keywords: ['kpi chart', 'devi', 'templates'],
  canvasSettings: { rows: 12, columns: 12 },
  version: '1.0.0',
  widgets: [
    {
      id: 'deviTemplates',
      type: 'TableWidget',
      overviewModule: 'DEVI',
      overviewId: '',
      includedFilters: [],
      language: 'jq',
      query: `
        query templates {
          elements {
            ... on Template {
              id
              localization {
                name
              }
              instancesSatisfySet(edge: {existsNow: {}}) {
                count
              }
              instancesShouldSatisfySet(edge: {existsNow: {}}) {
                count
              }
            }
          }
        }
      `,
      transformation:
        '{data: [ [.elements[] | select( .id | startswith("template:template.device"))] | .[] | { id, title: {value: .localization.name}, shouldSatisfyDevices: {value: .instancesShouldSatisfySet.count}, satisfyDevices: {value: .instancesSatisfySet.count} }]}',
      config: {
        columns: [
          {
            Header: 'název šablony',
            accessor: 'title',
          },
          {
            Header: 'přiřazená zařízení',
            accessor: 'shouldSatisfyDevices',
            width: 130,
          },
          {
            Header: 'odpovídající zařízení',
            accessor: 'satisfyDevices',
            width: 130,
          },
        ],
      },
      position: { x: 0, y: 0, height: 7, width: 7 },
      chartProps: {
        title: 'šablony zařízení',
        rowsInTable: 10,
        showBorder: true,
        showExport: false,
        enableImport: true,
        showPageSize: true,
        showPagination: true,
      },
    },
  ],
};
