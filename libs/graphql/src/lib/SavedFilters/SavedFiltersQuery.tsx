import gql from 'graphql-tag';

export const SAVED_FILTERS_QUERY = gql`
  query savedFiltersQuery {
    savedFiltersList
      @rest(path: "/savedFilters", type: "SavedFilters", endpoint: "psql") {
      savedFilters
    }
  }
`;
