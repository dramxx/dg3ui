import gql from 'graphql-tag';

export const REQUEST_TASK_EXECUTION = gql`
  mutation requestTaskExecution($file: String) {
    requestTaskExecution(input: $file)
      @rest(
        type: "ReqTaskExecution"
        method: "POST"
        endpoint: "taskController"
        path: "/reqTaskExecution"
        bodySerializer: "jsonlinestext"
      ) {
      NoData
    }
  }
`;
