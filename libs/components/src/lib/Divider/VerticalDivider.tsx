import React from 'react';
import styled from 'styled-components';

const StyledDivider = styled.div`
  background: ${(props) => props.theme.colors.grey2};
  width: 1px;
  height: auto;
  margin: 0 1rem;
`;

export const VerticalDivider = () => {
  return <StyledDivider/>;
};
