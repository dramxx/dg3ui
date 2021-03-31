import gql from 'graphql-tag';

export const UPDATE_INVENTORY_ENTITY = gql`
  mutation updateEntity($command: String) {
    updateEntity(input: $command)
      @rest(
        type: "Update"
        method: "POST"
        endpoint: "inventory"
        path: "/load"
        bodySerializer: "jsonlines"
      ) {
      NoData
    }
  }
`;
