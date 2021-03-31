import React from 'react';
import styled from 'styled-components';

import { TabMenuItem } from './TabMenuItem';

interface TabMenuProps {
  menuItems: TabMenuItemType[];
  activeItemId: string;
  onActiveChange: (id: string) => void;
}

export type TabMenuItemType = {
  name: string;
  id: string;
  children: React.ReactNode;
};

const StyledTabMenu = styled.div``;

const StyledMenu = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
`;

const StyledContent = styled.div`
  padding: 2rem;
`;

export const TabMenu = (props: TabMenuProps) => {
  const { menuItems, activeItemId, onActiveChange } = props;
  const content = menuItems.find((item) => item.id === activeItemId);

  return (
    <StyledTabMenu>
      <StyledMenu>
        {menuItems.map((item) => (
          <TabMenuItem
            key={item.id}
            id={item.id}
            active={item.id === activeItemId}
            name={item.name}
            onClick={() => onActiveChange(item.id)}
          />
        ))}
      </StyledMenu>
      <StyledContent>{content && content.children}</StyledContent>
    </StyledTabMenu>
  );
};
