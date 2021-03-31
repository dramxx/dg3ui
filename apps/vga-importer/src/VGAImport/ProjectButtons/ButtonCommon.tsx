import React from 'react';
import styled from 'styled-components';

const StyledButtonCommon = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 20px 20px 0;
  background: ${(props) => props.theme.colors.grey1};
  border-radius: ${(props) => props.theme.radius.normal};
  box-shadow: ${(props) => props.theme.shadows.shadow4};
`;

export const ButtonCommon = (props) => (
  <StyledButtonCommon {...props}>{props.children}</StyledButtonCommon>
);
