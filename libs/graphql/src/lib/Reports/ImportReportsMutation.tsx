import gql from 'graphql-tag';

export const IMPORT_REPORTS = gql`
  mutation importReports($reports: ReportsArr) {
    importReports(reports: $reports)
    @rest(
      path: "/importReports"
      type: "Reports"
      endpoint: "psql"
      method: "POST"
      bodyKey: "reports"
    )
  }
`;
