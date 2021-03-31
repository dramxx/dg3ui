import React from 'react';
import styled from 'styled-components';

interface TabMenuItemProps {
  active?: boolean;
  name: string;
  id: string;
  onClick: () => void;
}

const StyledTabMenuItem = styled.div<TabMenuItemProps>`
  padding: 1rem 0;
  width: 100%;
  text-align: center;
  font-weight: bold;
  background-color: ${(props) => props.theme.colors.white};
  color: ${(props) =>
    props.active ? props.theme.colors.primary2 : props.theme.colors.primary1}
  border-bottom: 0.3rem solid ${(props) =>
    props.active ? props.theme.colors.primary2 : props.theme.colors.grey2};
`;

export const TabMenuItem: React.FC<TabMenuItemProps> = (
  props: TabMenuItemProps
) => {
  return <StyledTabMenuItem {...props}>{props.name}</StyledTabMenuItem>;
};
