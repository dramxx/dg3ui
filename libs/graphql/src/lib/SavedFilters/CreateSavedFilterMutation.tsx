import gql from 'graphql-tag';

export const CREATE_SAVED_FILTER = gql`
  mutation createSavedFilter($savedFilter: InputSavedFilter!) {
    createSavedFilter(savedFilter: $savedFilter)
      @rest(
        path: "/createSavedFilter"
        type: "SavedFilter"
        endpoint: "psql"
        method: "POST"
        bodyKey: "savedFilter"
      )
  }
`;
