import gql from 'graphql-tag';

export const contentFilterTypeDefs = gql`
  extend type Query {
    contentFilter: ContentFilter!
  }

  type ContentFilter {
    chips: [FilterChip]!
  }

  type FilterChip {
    id: String!
    label: String!
    coreEl: String!
    type: String!
    value: String!
  }

  input InputFilterChip {
    id: String!
    label: String!
    coreEl: String!
    type: String!
    value: String!
  }

  input InputContentFilter {
    chips: [InputFilterChip]!
  }
`;
