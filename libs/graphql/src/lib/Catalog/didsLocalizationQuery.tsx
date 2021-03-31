import gql from 'graphql-tag';

export const GET_DIDS_LOCALIZATION_QUERY = gql`
  query getDidsLozalization($dids: [ID!]) {
    dids(filter: { dids: $dids }) {
      id
      localization {
        name
        abbreviation
      }
    }
  }
`;
