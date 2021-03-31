import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { Button, ButtonProps } from './Button';

const StyledPrimaryButton = styled(Button)`
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primary2};
  border: transparent;

  ${(props) =>
    props.disabled &&
    css`
      color: ${props.theme.colors.grey3};
      border: 1px solid ${props.theme.colors.grey2};
      background-color: ${props.theme.colors.white};
    `};
`;

export const PrimaryButton: FC<ButtonProps> = (props) => {
  return <StyledPrimaryButton {...props} />;
};
