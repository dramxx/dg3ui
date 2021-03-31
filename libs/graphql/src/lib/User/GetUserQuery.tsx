import gql from 'graphql-tag';

export const USER_DETAILS = gql`
  query userDetailQuery {
    userDetail @rest(path: "", type: "User", endpoint: "user") {
      user
    }
  }
`;
