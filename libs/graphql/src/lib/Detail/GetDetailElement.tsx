import gql from 'graphql-tag';

export const GET_DETAIL_ELEMENT = gql`
  query getDetailElement($intId: ID!) {
    instances(filter: { node: { intId: [$intId] } }) {
      internalId
      id {
        value
      }
      coreElement {
        id
        localization {
          name
        }
      }
    }
    set: diosSetById(ids: [$intId]) {
      items {
        id
        did {
          id
          localization {
            name
          }
        }
      }
    }
    taskExecutionsById(id: [$intId]) {
      id
      template {
        localization {
          name
        }
      }
    }
  }
`;
