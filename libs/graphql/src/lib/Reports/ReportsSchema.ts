import gql from 'graphql-tag';

export const reportsTypeDefs = gql`
  scalar JSON

  extend type Query {
    reports: ReportsArr!
    getReportsByModuleId(moduleId: String!): ModuleReports
  }

  type Report {
    id: String!
    name: String!
    author: String!
    description: String
    config: JSON!
    module: String!
  }

  type ModuleReports {
    key: String!
    reports: [Report]!
  }

  type ReportsArr {
    reports: [ModuleReports]
  }
`;
