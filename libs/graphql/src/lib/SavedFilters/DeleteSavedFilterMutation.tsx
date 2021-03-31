import gql from 'graphql-tag';

export const DELETE_SAVED_FILTER = gql`
  mutation deleteSavedFilter($savedFilter: InputSavedFilter!) {
    deleteSavedFilter(savedFilter: $savedFilter)
      @rest(
        path: "/deleteSavedFilter"
        type: "SavedFilter"
        endpoint: "psql"
        method: "POST"
        bodyKey: "savedFilter"
      )
  }
`;
