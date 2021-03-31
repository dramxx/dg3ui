import { ReportConfig } from '@dg3/schema';

export const placTemplatesReport: ReportConfig = {
  id: 'placTemplatesReport',
  techDescription: 'Place templates',
  title: 'šablony',
  keywords: ['kpi chart', 'plac', 'templates'],
  canvasSettings: { rows: 12, columns: 12 },
  version: '1.0.0',
  widgets: [
    {
      id: 'placTemplates',
      type: 'TableWidget',
      overviewModule: 'PLAC',
      overviewId: '',
      language: 'jq',
      includedFilters: [],
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
        '{data: [ [.elements[] | select( .id | startswith("template:template.place"))] | .[] | { id, title: {value: .localization.name}, shouldSatisfyPlaces: {value: .instancesShouldSatisfySet.count}, satisfyPlaces: {value: .instancesSatisfySet.count} }]}',
      config: {
        columns: [
          {
            Header: 'název šablony',
            accessor: 'title',
          },
          {
            Header: 'přiřazená místa',
            accessor: 'shouldSatisfyPlaces',
            width: 130,
          },
          {
            Header: 'odpovídající místa',
            accessor: 'satisfyPlaces',
            width: 130,
          },
        ],
      },
      position: { x: 0, y: 0, height: 7, width: 7 },
      chartProps: {
        title: 'šablony míst',
        rowsInTable: 10,
        enableImport: true,
        showBorder: true,
        showExport: false,
        showPageSize: true,
        showPagination: true,
      },
    },
  ],
};
