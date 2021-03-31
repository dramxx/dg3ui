import { useQuery } from '@apollo/client';
import { isNil } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { AppMenu } from '@dg3/app-menu';
import { Backdrop, ErrorLabel } from '@dg3/components';
import { REPORTS_QUERY, reportsVar } from '@dg3/graphql';
import { DgTheme } from '@dg3/types';
import { getAppModuleFromUrl } from '@dg3/utils';
import { AppMenuMockItems } from '../mock-data/AppMenuMockItems';
import { FilterBox } from './FilterBox';
import { Router } from './router';

interface CollapsedType {
  isCollapsed: boolean;
}

const StyledWorkbench = styled.div`
  font-family: ${(props) => props.theme.fontFamily};
  font-size: ${(props) => props.theme.fontSize.normal};
  font-weight: ${(props) => props.theme.fontWeight.normal};
  height: 100vh;
`;

const StyledMenuBox = styled.div<CollapsedType>`
  position: fixed;
  top: ${(props) => props.theme.sizes};
  width: ${(props) => getCollapsibleMenuWidth(props.isCollapsed, props.theme)};
  height: 100%;
`;

const StyledFilter = styled.div<CollapsedType>`
  position: fixed;
  top: 0;
  right: 0;
  height: ${(props) => props.theme.sizes.filterBoxHeight};
  margin-top: 2rem;
`;

const StyledContentBox = styled.div<CollapsedType>`
  position: fixed;
  top: 0;
  left: ${(props) => getCollapsibleMenuWidth(props.isCollapsed, props.theme)};
  width: calc(
    100% - ${(props) => getCollapsibleMenuWidth(props.isCollapsed, props.theme)}
  );
  height: 100%;
  background-color: ${(props) => props.theme.colors.white};
  padding: ${(props) => props.theme.spacing.large};
  padding-top: ${(props) => props.theme.sizes.topBarHeight};
  padding-right: ${(props) => props.theme.spacing.normal};
`;

const getCollapsibleMenuWidth = (isCollapsed: boolean, theme: DgTheme) => {
  return isCollapsed ? theme.sizes.menuCollapsedWidth : theme.sizes.menuWidth;
};

export const App = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const module = getAppModuleFromUrl(location.pathname);
  const { data, error } = useQuery(REPORTS_QUERY);

  useEffect(() => {
    if (data && isNil(error)) {
      reportsVar(data.reportsList);
    }
  }, [data, error]);

  return isNil(error) ? (
    <StyledWorkbench>
      <Backdrop />
      <StyledMenuBox isCollapsed={collapsed}>
        <AppMenu
          collapsed={collapsed}
          menuItems={AppMenuMockItems}
          onMenuCollapse={setCollapsed}
          activeMenuItem={module}
        />
      </StyledMenuBox>
      <StyledContentBox isCollapsed={collapsed}>
        <StyledFilter isCollapsed={collapsed}>
          <FilterBox isCollapsed={collapsed} />
        </StyledFilter>
        <Router />
      </StyledContentBox>
    </StyledWorkbench>
  ) : (
    <ErrorLabel>{error.message}</ErrorLabel>
  );
};

export default App;
