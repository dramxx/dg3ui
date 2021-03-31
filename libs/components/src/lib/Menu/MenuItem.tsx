import React from 'react';
import styled from 'styled-components';

interface Props {
  active: boolean;
  label: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ComponentType;
  onClick?: () => void;
}

const StyledMenuItem = styled.div<Props>`
  padding: ${(props) => props.theme.spacing.normal};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  user-select: none;
  cursor: pointer;

  :hover {
    border-radius: ${(props) => props.theme.radius.small};
    color: ${(props) => props.theme.colors.primary1};
    background-color: ${(props) => props.theme.colors.white};

    > svg {
      fill: ${(props) => props.theme.colors.primary1};
    }
  }
`;

const StyledTitle = styled.span`
  margin-right: 1rem;
`;

const StyledSpanIcon = styled.span`
  margin-right: 1rem;
  display: flex;
  padding-right: 1.5rem;
`;

export const MenuItem = (props: Props) => {
  const { label, icon, children } = props;

  return (
    <StyledMenuItem {...props}>
      {icon && <StyledSpanIcon>{icon}</StyledSpanIcon>}
      <StyledTitle>{label}</StyledTitle>
      {children}
    </StyledMenuItem>
  );
};
