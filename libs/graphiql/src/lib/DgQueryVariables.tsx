import 'graphiql/graphiql.css';

import GraphiQL from 'graphiql';
import * as React from 'react';
import styled from 'styled-components';

interface Props {
  variables: string;
  variableToType: object;
  onEdit: (vars) => void;
}

const StyledVariableEditor = styled.div`
  .CodeMirror-scroll {
    padding: 0;
    margin: 0;
  }
`;

export const DgQueryVariables: React.FC<Props> = (props: Props) => {
  const { variables, variableToType, onEdit } = props;

  return (
    <StyledVariableEditor>
      <GraphiQL.VariableEditor variableToType={variableToType} value={variables} onEdit={(vars) => onEdit(vars)} />
    </StyledVariableEditor>
  );
};
