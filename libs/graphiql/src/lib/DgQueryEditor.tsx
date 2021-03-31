import 'graphiql/graphiql.css';

import GraphiQL from 'graphiql';
import { GraphQLSchema } from 'graphql';
import React, { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDebounce } from 'use-lodash-debounce';

const StyledQueryEditor = styled.div`
  max-height: 300px;
  overflow: scroll;
`;

interface Props {
  schema: GraphQLSchema;
  query: string;
  onEdit: (query) => void;
}

export const DgQueryEditor: FunctionComponent<Props> = (props: Props) => {
  const { schema, query, onEdit } = props;
  const [value, setValue] = useState<string>(query);
  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    onEdit(debouncedValue);
  }, [debouncedValue]);

  return (
    <StyledQueryEditor>
      <div>Query Editor</div>
      <GraphiQL.QueryEditor schema={schema} value={value} onEdit={(value) => setValue(value)} />
    </StyledQueryEditor>
  );
};
