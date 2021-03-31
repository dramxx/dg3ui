import gql from 'graphql-tag';

export const UPDATE_TASK_PLANS = gql`
  mutation updatePlan($input: String) {
    updatePlan(input: $input)
      @rest(
        type: "Update"
        method: "POST"
        endpoint: "taskController"
        path: "/plans/edit"
      ) {
      NoData
    }
  }
`;
