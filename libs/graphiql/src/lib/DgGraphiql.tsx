import 'graphiql/graphiql.css';

import GraphiQL from 'graphiql';
import { GraphQLSchema } from 'graphql';
import * as React from 'react';
import styled from 'styled-components';

// DONT delete => this is required when using whole GraphiQL component
(window as any).global = window;

export interface GraphiqlProps {
  fetcher: (graphQLParams: any) => Promise<any>;
  schema: GraphQLSchema;
}

const StyledGraphiql = styled.div`
  height: 100%;
  min-height: 80rem;
`;

export const DgGraphiql: React.FC<GraphiqlProps> = (props: GraphiqlProps) => {
  const { fetcher, schema } = props;
  return (
    <StyledGraphiql>
      <GraphiQL fetcher={fetcher} schema={schema} editorTheme={'solarized light'} />
    </StyledGraphiql>
  );
};
