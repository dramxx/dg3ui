import * as React from 'react';
import styled from 'styled-components';

interface Props {
  result: string;
}

const StyledResult = styled.div`
  max-height: 300px;
  overflow: scroll;
`;

export const GraphQLResultView: React.FC<Props> = (props: Props) => {
  const { result } = props;
  return (
    <StyledResult>
      <div>Result of Query</div>
      {result}
    </StyledResult>
  );
};
