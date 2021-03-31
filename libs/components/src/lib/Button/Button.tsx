import React from 'react';
import styled, { css } from 'styled-components';

const StyledButtonChild = styled.div``;

const StyledButton = styled.div<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: max-content;
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey3};
  padding: 3px ${(props) => props.theme.spacing.normal};
  border-radius: ${(props) => props.theme.radius.small};
  font-size: ${(props) => props.theme.fontSize.normal};
  font-weight: ${(props) => props.theme.fontWeight.bold};
  cursor: pointer;
  box-shadow: ${props=>props.theme.shadows.shadow4};

  ${(props) =>
    props.disabled
      ? css`
          border: 1px solid ${props.theme.colors.grey2};
          color: ${props.theme.colors.grey3};
          box-shadow: none;
          pointer-events: none;
        `
      : css`
          :hover {
            box-shadow: ${props.theme.shadows.shadow5};
            ${StyledButtonChild} {
              transform: scale(1.08);
            }
          }

          :active {
            box-shadow: none;
          }
        `};
`;

export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <StyledButton {...props}>
      <StyledButtonChild>{props.children}</StyledButtonChild>
    </StyledButton>
  );
};
