import gql from 'graphql-tag';

export const userTypeDefs = gql`
  extend type Query {
    userDetail: UserData
  }

  type UserData {
    name: String!
    locale: String!
    token: String!
  }
`;
