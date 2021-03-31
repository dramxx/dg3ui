import gql from 'graphql-tag';

export const backdropTypeDefs = gql`
  extend type Query {
    backdrop: Backdrop!
  }

  type Backdrop {
    show: Boolean!
    modal: Boolean!
  }
`;
