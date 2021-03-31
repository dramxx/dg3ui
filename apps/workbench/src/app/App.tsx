import React, { useState } from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { AppMenu } from '@dg3/app-menu';
import { Backdrop } from '@dg3/components';
import { GraphPage, PlaygroundPage } from '@dg3/pages';
import { TopBar } from '@dg3/top-bar';
import { DgTheme } from '@dg3/types';
import { getAppModuleFromUrl } from '@dg3/utils';
import { FilterBox } from '../../../dcamm/src/app/FilterBox';
import { AppMenuMockItems } from '../mock-data/AppMenuMockItems';
import { GraphiqlPage } from './GraphiqlPage';

interface CollapsibleProps {
  collapsed: boolean;
}

type isCollapsedType = {
  isCollapsed: boolean;
};

const StyledWorkbench = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize.normal};
  font-weight: ${(props) => props.theme.fontWeight.normal};
  height: 100vh;
`;

const StyledFilter = styled.div<CollapsibleProps>`
  position: fixed;
  top: ${(props) => props.theme.sizes.topBarHeight};
  left: ${(props) =>
    props.collapsed
      ? props.theme.sizes.menuCollapsedWidth
      : props.theme.sizes.menuWidth};
  width: calc(
    100% -
      ${(props) =>
        props.collapsed
          ? props.theme.sizes.menuCollapsedWidth
          : props.theme.sizes.menuWidth}
  );
  height: ${(props) => props.theme.sizes.filterBoxHeight};
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadows.shadow2};
  z-index: 2;
`;

const StyledContent = styled.div`
  height: calc(100% - ${(props) => props.theme.sizes.filterBoxHeight});
  top: ${(props) => props.theme.sizes.filterBoxHeight};
  position: relative;
`;

const StyledTopBar = styled.div`
  position: fixed;
  width: 100%;
  height: ${(props) => props.theme.sizes.topBarHeight};
  z-index: ${(props) => props.theme.zIndex.modalContent};
`;

const StyledMenuBox = styled.div<isCollapsedType>`
  position: fixed;
  top: ${(props) => props.theme.sizes.topBarHeight};
  width: ${(props) => getCollapsibleMenuWidth(props.isCollapsed, props.theme)};
  height: calc(100% - ${(props) => props.theme.sizes.topBarHeight});
`;

const StyledContentBox = styled.div<isCollapsedType>`
  position: fixed;
  top: calc(${(props) => props.theme.sizes.topBarHeight});
  left: ${(props) => getCollapsibleMenuWidth(props.isCollapsed, props.theme)};
  width: calc(
    100% - ${(props) => getCollapsibleMenuWidth(props.isCollapsed, props.theme)}
  );
  height: calc(100% - ${(props) => props.theme.sizes.topBarHeight});
  background-color: ${(props) => props.theme.colors.grey1};
  padding: 12px 12px 12px 24px;
`;

const getCollapsibleMenuWidth = (isCollapsed: boolean, theme: DgTheme) => {
  return isCollapsed ? theme.sizes.menuCollapsedWidth : theme.sizes.menuWidth;
};

export const App = ({ location }) => {
  const [collapsed, setCollapsed] = useState(false);
  const module = getAppModuleFromUrl(location.pathname);

  return (
    <StyledWorkbench>
      <Backdrop />
      <StyledTopBar>
        <TopBar logoText="Data Genie" />
      </StyledTopBar>
      <StyledMenuBox isCollapsed={collapsed}>
        <AppMenu
          collapsed={collapsed}
          menuItems={AppMenuMockItems}
          onMenuCollapse={setCollapsed}
          activeMenuItem={module}
        />
      </StyledMenuBox>
      <StyledContentBox isCollapsed={collapsed}>
        <StyledFilter collapsed={collapsed}>
          <FilterBox />
        </StyledFilter>
        <StyledContent>
          <Route path="/" exact component={GraphiqlPage} />
          <Route path="/GRAPH" exact component={GraphPage} />
          <Route path="/PLAY" exact component={PlaygroundPage} />
          <Route path="/GRAPHQL" exact component={GraphiqlPage} />
        </StyledContent>
      </StyledContentBox>
    </StyledWorkbench>
  );
};

export default withRouter(App);
