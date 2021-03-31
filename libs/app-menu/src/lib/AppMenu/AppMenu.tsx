import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { CollapseButton } from '@dg3/components';
import { AppMenuItemProps, AppTypesSortOrder } from '@dg3/types';
import { AppMenuItem } from './AppMenuItem';

const StyledAppMenuWrapper = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: ${(props) => props.theme.shadows.shadow1};
`;

const StyledAppMenu = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledAppMenuItems = styled.div`
  padding-top: 22.5px;
`;

const StyledCollapseButtonWrapper = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateX(-50%);
`;

interface Props {
  collapsed: boolean;
  menuItems: AppMenuItemProps[];
  onMenuCollapse: (collapsed: boolean) => void;
  activeMenuItem: string;
  appLogo?: React.ReactNode;
}

export const AppMenu: React.FC<Props> = (props: Props) => {
  const { activeMenuItem, collapsed, menuItems, appLogo } = props;
  const history = useHistory();

  const sortedMenuItems = menuItems.sort((a, b) => {
    return AppTypesSortOrder[a.id] - AppTypesSortOrder[b.id];
  });

  const setActiveMenuItem = (activeMenuItem: string) => {
    history.push(`/${activeMenuItem}/`);
  };

  return (
    <StyledAppMenuWrapper>
      <StyledCollapseButtonWrapper>
        <CollapseButton
          collapsed={props.collapsed}
          onCollapse={props.onMenuCollapse}
        />
      </StyledCollapseButtonWrapper>
      <StyledAppMenu>
        <StyledAppMenuItems>
          {sortedMenuItems.map((item: AppMenuItemProps) => {
            return (
              <AppMenuItem
                key={item.id}
                {...item}
                isActive={activeMenuItem === item.id}
                onActiveChange={setActiveMenuItem}
                isCollapsed={collapsed}
              />
            );
          })}
        </StyledAppMenuItems>
        {appLogo}
      </StyledAppMenu>
    </StyledAppMenuWrapper>
  );
};
