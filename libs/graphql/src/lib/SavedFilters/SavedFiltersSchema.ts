import gql from 'graphql-tag';

export const savedFiltersTypeDefs = gql`
  extend type Query {
    savedFiltersList: SavedFiltersList
  }

  type SavedFilter {
    name: String!
    author: String!
    contentFilter: ContentFilter!
  }

  type SavedFiltersList {
    savedFilters: [SavedFilter]!
  }

  extend type Mutation {
    deleteSavedFilter(savedFilterName: InputSavedFilter!): Void
  }

  input InputSavedFilter {
    name: String!
    author: String!
    contentFilter: InputContentFilter!
  }
`;
