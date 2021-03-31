import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { Button, ButtonProps } from './Button';

const StyledSecondaryButton = styled(Button)`
  color: ${(props) => props.theme.colors.grey4};
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey3};

  ${(props) =>
    props.disabled &&
    css`
      color: ${props.theme.colors.grey3};
      border: 1px solid ${props.theme.colors.grey2};
    `};
`;

export const SecondaryButton: FC<ButtonProps> = (props) => {
  return <StyledSecondaryButton {...props} />;
};
