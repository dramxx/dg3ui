import gql from 'graphql-tag';

export const LOGOUT = gql`
  query logout {
    logout @rest(path: "", type: "Logout", endpoint: "logout")
  }
`;
