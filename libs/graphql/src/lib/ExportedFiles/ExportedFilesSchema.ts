import gql from 'graphql-tag';

export const exportedFilesTypeDefs = gql`
  extend type Query {
    exportedFiles: [ExportedFile]
  }

  type ExportedFile {
    id: Int!
    filename: String!
    created_at: String!
    username: String!
    task_id: String!
    filesize: Int!
  }
`;
