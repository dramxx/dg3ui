import { ApolloError, useQuery } from '@apollo/client';
import { DocumentNode } from 'graphql';
import { FC } from 'react';

interface Props {
  query: DocumentNode;
  variables: object;
  onCompleted: (data: object) => void;
  onError: (error: ApolloError) => void;
}

export const ExportQuery: FC<Props> = (props) => {
  const { query, variables, onCompleted, onError } = props;
  useQuery(query, { variables, onCompleted, onError, fetchPolicy: 'no-cache' });
  return null;
};
