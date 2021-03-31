import gql from 'graphql-tag';

export const REPORTS_QUERY = gql`
  query reportsQuery {
    reportsList @rest(path: "/reports", type: "Reports", endpoint: "psql") {
      reports
    }
  }
`;
