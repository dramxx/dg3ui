import gql from 'graphql-tag';

export const EXPORTED_FILES_QUERY = gql`
  query exportedFilesQuery {
    exportedFiles
      @rest(path: "/exportedFiles", type: "ExportedFiles", endpoint: "psql") {
      id
      filename
      created_at
      task_id
      filesize
    }
  }
`;
